import React from 'react';
import { Button, Input, Rate, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { RootState } from '../../redux/store';
import { useCreateReviewMutation, useGetAllReviewQuery } from '../../redux/features/review/reviewApi';
import { useGetUserQuery } from '../../redux/user/userApi';
import { toast } from 'sonner';

// Define Review form inputs
type ReviewFormInputs = {
  rating: number;
  feedback: string;
};
export type Review = {
  _id:string
  user:{email: string}
  rating: number;
  feedback: string;
};

const Review: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userData } = useGetUserQuery(user?.email, { skip: !user?.email });
  const { data: reviewData } = useGetAllReviewQuery('');

  const [createReview] = useCreateReviewMutation();
  const navigate = useNavigate();

  // Initialize the form using useForm from react-hook-form
  const { control, handleSubmit, reset, formState: { errors }, setValue, trigger } = useForm<ReviewFormInputs>({
    defaultValues: {
      rating: 0,
      feedback: '',
    },
  });

  const averageRating = reviewData?.data?.reduce((acc: number, review:any) => acc + review.rating, 0) / (reviewData?.data?.length || 1) || 0;

  // Function to handle review submission
  const onSubmit = async (data: ReviewFormInputs) => {
    const toastId = toast.loading("Creating review....");

    if (user && data.rating > 0 && data.feedback) {
      try {
        const res = await createReview({
          user: userData?.data?._id,
          rating: data.rating,
          feedback: data.feedback,
        }).unwrap();

        toast.success(res.message, { id: toastId });
        reset();  // Reset the form inputs
      } catch (error: any) {
        console.error("Error submitting review:", error);
        toast.error(error?.data?.message, { id: toastId });
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

 

  return (
    <div className="relative p-6 my-10 rounded-lg">
      {/* Overlay for non-logged-in users */}
      {!user && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
          <Button
            type="primary"
            onClick={handleLoginRedirect}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Login to Leave a Review
          </Button>
        </div>
      )}

       
        <>
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-semibold mb-4">Leave a Review</h2>

          {/* Form submission handled by react-hook-form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Rating */}
            <div className="mb-4">
              <Controller
                name="rating"
                control={control}
                rules={{
                  required: 'Rating is required',
                  validate: value => value > 0 || 'Rating must be greater than 0',
                }}
                render={({ field: { value } }) => (
                  <>
                    <Rate
                      onChange={(val) => {
                        setValue('rating', val); // Set the value in the form
                        trigger('rating'); // Manually trigger validation
                      }}
                      value={value}
                      allowHalf // Allows half-star ratings
                      className="text-yellow-400"
                    />
                    {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                  </>
                )}
              />
            </div>

            {/* Feedback */}
            <Controller
              name="feedback"
              control={control}
              rules={{ required: 'Feedback is required' }}
              render={({ field }) => (
                <>
                  <Input.TextArea
                    {...field}
                    rows={3}
                    placeholder="Write your feedback here..."
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                  {errors.feedback && <p className="text-red-500">{errors.feedback.message}</p>}
                </>
              )}
            />

            {/* Submit button */}
            <Button
              type="primary"
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              htmlType="submit"
              disabled={!user}
            >
              Submit Review
            </Button>
          </form> <br />

          {/* Average Rating Display */}
          <div className="mb-4">
            <h3 className="text-xl sm:text-xl md:text-2xl font-semibold">Overall Rating: {averageRating.toFixed(1)} / 5</h3>
            <Rate disabled value={averageRating} allowHalf className="text-yellow-400" />
          </div>

          {/* Recent Reviews Display */}
          {reviewData?.data?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl sm:text-xl md:text-2xl font-semibold">Recent Reviews</h3>
              {reviewData.data.slice(0, 2).map((review:Review) => (
                <div key={review?._id} className="mt-4 p-4 border rounded-lg bg-gray-100">
                  <p className="font-semibold">{review?.user?.email}</p> 
                  <Rate disabled value={review.rating} allowHalf className="text-yellow-400" />
                  <p className="mt-2 text-gray-700">{review.feedback}</p>
                </div>
              ))}
              <Button
                type="link"
                className="mt-4 text-blue-500 underline"
                onClick={() => navigate('/reviews')}
              >
                See All Reviews
              </Button>
            </div>
          )}
        </>
      

    
    </div>
  );
};

export default Review;

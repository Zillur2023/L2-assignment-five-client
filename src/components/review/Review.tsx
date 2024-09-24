import React, { useState } from 'react';
import { Button, Input, Rate, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useCreateReviewMutation, useGetAllReviewQuery } from '../../redux/features/review/reviewApi';
import { useGetUserQuery } from '../../redux/user/userApi';
import { toast } from 'sonner';

// Types for the Review
type Review = {
  user: string;
  rating: number;
  feedback: string;
};

const Review: React.FC = () => {
  // Fetching the user from Redux state
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userData } = useGetUserQuery(user?.email, {
    skip: !user?.email,
  });
  
  // Fetching all reviews from the API
  const { data: reviewData } = useGetAllReviewQuery('');

  // Mutation to create a new review
  const [createReview] = useCreateReviewMutation();

  // State for rating, feedback, and modal visibility
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  // Function to handle review submission
  const handleSubmitReview = async () => {
    const toastId = toast.loading("Creating review....")
    if (user && rating > 0 && feedback) {
      try {
        // Creating a new review using the API
       const res =  await createReview({ user:userData?.data?._id, rating, feedback}).unwrap();
       console.log(res)

         toast.success(res.message, {id: toastId})

        // Show the modal
        setIsModalVisible(true);

        // Resetting the form inputs
        setRating(0);
        setFeedback('');
      } catch (error:any) {
        console.error("Error submitting review:", error);
        toast.error(error?.data?.message, {id:toastId})
      }
    
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page
  };

  const redirectToHome = () => {
    setIsModalVisible(false);
    navigate('/'); // Redirect to home or review section after successful submission
  };

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">
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

      {user && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
          <div className="mb-4">
            <Rate
              onChange={(value) => setRating(value)}
              value={rating}
              className="text-yellow-400"
            />
          </div>
          <Input.TextArea
            rows={4}
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <Button
            type="primary"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            disabled={rating === 0 || feedback === ''}
            onClick={handleSubmitReview}
          >
            Submit Review
          </Button>

          {/* Post-Submission Display */}
          {reviewData?.data?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Recent Reviews</h3>
              {reviewData?.data?.map((review, index) => (
                <div key={index} className="mt-4 p-4 border rounded-lg bg-gray-100">
                  <Rate disabled value={review.rating} className="text-yellow-400" />
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
      )}

      {/* Modal after submission */}
      <Modal
        title="Review Submitted"
        visible={isModalVisible}
        onOk={redirectToHome}
        onCancel={() => setIsModalVisible(false)}
        okText="Go to Home"
      >
        <p>Thank you for your review! You will now be redirected.</p>
      </Modal>
    </div>
  );
};

export default Review;

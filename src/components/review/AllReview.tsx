import React from 'react';
import { Rate, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetAllReviewQuery } from '../../redux/features/review/reviewApi';
import { Review } from './Review';

const AllReview: React.FC = () => {
  const { data: reviewData } = useGetAllReviewQuery('');
  const navigate = useNavigate();

  return (
    <div className="p-6 mt-10 rounded-lg">
      <h2 className="text-xl sm:text-xl md:text-2xl font-semibold mb-4">All Reviews</h2>
      {reviewData?.data?.length ? (
        reviewData.data.map((review: Review ) => (
          <div key={review._id} className="mb-4 p-4 border rounded-lg bg-gray-100">
            <p className="font-semibold">{review?.user?.email}</p>
            <Rate disabled value={review.rating} allowHalf className="text-yellow-400" />
            <p className="mt-2 text-gray-700">{review.feedback}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews available.</p>
      )}
      <Button
        type="link"
        className="mt-4 text-blue-500 underline"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Go Back
      </Button>
    </div>
  );
};

export default AllReview;

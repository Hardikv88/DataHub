import React from 'react';
import type { Review } from '../../modals/ProductResponseModal';
import { Rate } from 'antd';

interface ProductReviewsProps {
  reviews: Review[];
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="no-reviews">No reviews yet.</p>;
  }

  return (
    <div className="product-reviews-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-header">
            <h4 className="reviewer-name">{review.reviewerName}</h4>
            <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
          </div>
          <div className="review-rating">
            <Rate disabled defaultValue={review.rating} />
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

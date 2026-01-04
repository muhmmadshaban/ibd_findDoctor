import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, size = 16 }) => {
  // Handle both string ("5.0/5") and number (5.0) formats
  let numericRating = 0;
  
  if (typeof rating === 'string') {
    // If it's a string like "5.0/5"
    numericRating = parseFloat(rating.split('/')[0]);
  } else if (typeof rating === 'number') {
    // If it's already a number
    numericRating = rating;
  } else {
    // Default to 0 if undefined
    numericRating = 0;
  }
  
  // Make sure it's a valid number between 0-5
  numericRating = isNaN(numericRating) ? 0 : Math.min(Math.max(numericRating, 0), 5);
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= numericRating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStars;
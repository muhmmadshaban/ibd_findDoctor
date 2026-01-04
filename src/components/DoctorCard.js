import React, { useState } from 'react';
import { MapPin,  Building2, IndianRupee, ChevronRight } from 'lucide-react';
import RatingStars from './RatingStars';



const DoctorCard = ({ doctor, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewReviews = doctor.reviews.slice(0, 2);
  
  const getRatingColor = (rating) => {
    const numericRating = parseFloat(rating.split('/')[0]);
    if (numericRating >= 4.5) return 'text-green-600';
    if (numericRating >= 4.0) return 'text-yellow-600';
    if (numericRating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold tracking-tight text-xl">{doctor.name}</div>
        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Building2 size={14} />
              Hospital
            </span>
            <span className="font-medium text-right">{doctor.hospital}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <MapPin size={14} />
              Location
            </span>
            <span className="font-medium">{doctor.location}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <IndianRupee size={14} />
              Consultation Fee
            </span>
            <span className="font-medium">{doctor.consultationFee}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <span className="text-muted-foreground">Rating</span>
            <div className="flex items-center gap-2">
              <RatingStars rating={doctor.averageRating} size={14} />
              <span className={`font-medium ${getRatingColor(doctor.averageRating)}`}>
                {doctor.rating}
              </span>
            </div>
          </div>
          
          {/* Preview Reviews */}
          {doctor.reviews.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Recent Reviews:</h4>
              {previewReviews.map((review, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <div className="flex items-center justify-between">
                    <RatingStars rating={review.rating} size={12} />
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm mt-1 line-clamp-2">{review.comment}</p>
                </div>
              ))}
              
              {doctor.reviews.length > 2 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary text-sm font-medium mt-2 flex items-center gap-1 hover:underline"
                >
                  {isExpanded ? 'Show less' : `Show all ${doctor.reviews.length} reviews`}
                  <ChevronRight size={14} className={`transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              )}
              
              {/* Expanded Reviews */}
              {isExpanded && doctor.reviews.slice(2).map((review, index) => (
                <div key={index} className="mb-2 last:mb-0 mt-2">
                  <div className="flex items-center justify-between">
                    <RatingStars rating={review.rating} size={12} />
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm mt-1">{review.comment}</p>
                  {review.reviewer !== 'Anonymous' && (
                    <p className="text-xs text-muted-foreground mt-1">- {review.reviewer}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={() => onViewDetails(doctor)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full mt-4"
          >
            View Details & Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
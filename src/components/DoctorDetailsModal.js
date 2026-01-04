import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, MapPin, Building2, IndianRupee, Calendar, User } from 'lucide-react';
import RatingStars from './RatingStars';

const DoctorDetailsModal = ({ doctor, isOpen, onClose }) => {
  if (!doctor) return null;

  const getRatingColor = (rating) => {
    const numericRating = parseFloat(rating);
    if (numericRating >= 4.5) return 'text-green-600';
    if (numericRating >= 4.0) return 'text-yellow-600';
    if (numericRating >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-2xl font-bold">{doctor.name}</Dialog.Title>
            <Dialog.Close className="rounded-full p-1 hover:bg-gray-100">
              <X size={20} />
            </Dialog.Close>
          </div>
          
          <div className="space-y-4">
            {/* Doctor Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-muted-foreground" />
                <span className="font-medium">Specialty:</span>
                <span>{doctor.specialty}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="font-medium">Location:</span>
                <span>{doctor.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-muted-foreground" />
                <span className="font-medium">Hospital:</span>
                <span>{doctor.hospital}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <IndianRupee size={16} className="text-muted-foreground" />
                <span className="font-medium">Fee:</span>
                <span>{doctor.consultationFee}</span>
              </div>
            </div>
            
            {/* Overall Rating */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Overall Rating</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingStars rating={doctor.averageRating} size={20} />
                    <span className={`text-lg font-bold ${getRatingColor(doctor.averageRating)}`}>
                      {doctor.averageRating}/5
                    </span>
                    <span className="text-muted-foreground">({doctor.totalReviews} reviews)</span>
                  </div>
                </div>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSd2SY5WcVhFtDHEybC3RGs0vdpLrc18nFDw895-Ht891YzLTw/viewform?usp=sharing&ouid=117483857499560129697"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                >
                  Add Review
                </a>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Patient Reviews</h3>
              <div className="space-y-4">
                {doctor.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-muted-foreground" />
                        <span className="font-medium">{review.reviewer}</span>
                        <RatingStars rating={review.rating} size={14} />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={12} />
                        {review.date}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DoctorDetailsModal;
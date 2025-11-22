import { Doctor } from "./types";
import { Modal } from "./modal";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReviewsModal = ({
  isOpen,
  onClose,
  doctor,
}: {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center gap-4 pr-8">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover border border-zinc-700"
            />
            <div>
              <h3 className="text-lg font-bold text-zinc-100">
                Reviews for {doctor.name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 font-bold text-zinc-100">
                    {doctor.rating}
                  </span>
                </div>
                <span className="text-zinc-500">
                  • {doctor.reviews.length} total reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {doctor.reviews.length === 0 ? (
            <div className="text-center text-zinc-500 py-8">
              No reviews yet for this doctor.
            </div>
          ) : (
            doctor.reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-zinc-800 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-zinc-200">
                      {review.author}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < review.rating
                          ? "fill-current"
                          : "text-zinc-700 fill-zinc-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  &quot;{review.comment}&quot;
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
          <Button variant="secondary" className="w-full" onClick={onClose}>
            Close Reviews
          </Button>
        </div>
      </div>
    </Modal>
  );
};

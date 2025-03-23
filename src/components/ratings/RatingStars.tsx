
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  initialRating?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  onChange?: (rating: number) => void;
}

const RatingStars = ({
  initialRating = 0,
  size = "md",
  readOnly = false,
  onChange,
}: RatingStarsProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating: number) => {
    if (readOnly) return;
    setRating(selectedRating);
    onChange?.(selectedRating);
  };

  const sizes = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizes[size],
            "mx-0.5 cursor-pointer transition-colors",
            (hoverRating >= star || (!hoverRating && rating >= star))
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300 hover:text-yellow-400",
            readOnly && "cursor-default"
          )}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default RatingStars;

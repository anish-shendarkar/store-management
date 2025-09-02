import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
  label?: string;
}

export function StarRating({
  value,
  onChange,
  readOnly = false,
  size = 20,
  label,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(starValue)}
            className={`transition-colors ${
              starValue <= value
                ? "text-yellow-500"
                : "text-gray-300 hover:text-yellow-400"
            }`}
          >
            <Star
              fill={starValue <= value ? "currentColor" : "none"}
              strokeWidth={1.5}
              size={size}
            />
          </button>
        );
      })}
    </div>
  );
}

import React from "react";

const reviewLabel = (score) => {
  if (score >= 9) return "Exceptional";
  if (score >= 8.5) return "Excellent";
  if (score >= 8) return "Very good";
  return "Good";
};

const RatingBadge = ({ score, count = null, size = "md", variant = "light" }) => {
  const onDark = variant === "dark";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center justify-center rounded-sm bg-plum font-bold text-cream ${
          size === "sm" ? "h-7 min-w-7 px-1 text-xs" : "h-8 min-w-8 px-1.5 text-sm"
        }`}
      >
        {score.toFixed(1)}
      </span>
      <span className="leading-tight">
        <span className={`block font-semibold ${onDark ? "text-cream" : "text-ink"}`}>{reviewLabel(score)}</span>
        {count != null && (
          <span className={`block text-xs ${onDark ? "text-cream/70" : "text-stone"}`}>
            {count.toLocaleString()} reviews
          </span>
        )}
      </span>
    </div>
  );
};

export default RatingBadge;
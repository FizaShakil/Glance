import React from "react";
import { Link } from "react-router-dom";

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  action = null,
}) => {
  const alignment =
    align === "left"
      ? "text-left"
      : "text-center mx-auto";
  return (
    <div className={`max-w-2xl ${alignment} mb-10 sm:mb-14`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-stone sm:text-lg">
          {subtitle}
        </p>
      )}
      {action && (
        <div className="mt-6">
          <Link to={action.to} className="group inline-flex items-center gap-2 text-sm font-semibold text-iris transition-colors hover:text-iris-deep">
            {action.label}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
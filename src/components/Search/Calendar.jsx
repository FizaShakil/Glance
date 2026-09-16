import React, { useState } from "react";
import {
  monthGrid,
  shiftMonth,
  toISODate,
  isSameDay,
  isBefore,
  isBetweenInclusive,
  MONTHS,
  WEEKDAYS,
} from "../../utils/dates";

const Calendar = ({ checkIn, checkOut, onSelect, double = false }) => {
  const [viewMonth, setViewMonth] = useState(() => {
    const base = checkIn ? new Date(checkIn) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const today = new Date();

  const choose = (day) => {
    if (day.getTime() < today.setHours(0, 0, 0, 0)) return;

    if (!checkIn || (checkIn && checkOut)) {
      onSelect({ checkIn: toISODate(day), checkOut: null });
      return;
    }
    if (isBefore(day, new Date(checkIn))) {
      onSelect({ checkIn: toISODate(day), checkOut: null });
      return;
    }
    onSelect({ checkIn, checkOut: toISODate(day) });
  };

  const renderMonth = (anchor) => {
    const cells = monthGrid(anchor);
    const monthLabel = `${MONTHS[anchor.getMonth()]} ${anchor.getFullYear()}`;

    return (
      <div className="min-w-[236px] flex-1">
        <p className="mb-2 text-center text-sm font-semibold text-ink">{monthLabel}</p>
        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="py-1 text-[11px] font-semibold uppercase text-taupe">
              {w}
            </span>
          ))}
          {cells.map((day, i) => {
            if (!day) return <span key={i} className="h-9" />;
            const iso = toISODate(day);
            const inRange = isBetweenInclusive(day, checkIn && new Date(checkIn), checkOut && new Date(checkOut));
            const isCI = isSameDay(day, checkIn && new Date(checkIn));
            const isCO = isSameDay(day, checkOut && new Date(checkOut));
            const past = day.getTime() < today.setHours(0, 0, 0, 0);
            const selected = isCI || isCO;

            return (
              <button
                key={iso}
                type="button"
                onClick={() => choose(day)}
                disabled={past}
                aria-label={iso}
                className={`relative flex h-9 w-full items-center justify-center rounded-full text-sm transition-colors duration-200 ${
                  inRange && !selected
                    ? "bg-iris-soft text-iris-deep"
                    : selected
                    ? "bg-plum font-semibold text-cream shadow-soft"
                    : past
                    ? "cursor-not-allowed text-taupe/40"
                    : "hover:bg-sand"
                }`}
              >
                {day.getDate()}
                {isCI && isCO && (
                  <span className="absolute inset-0 rounded-full ring-2 ring-plum" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewMonth((m) => shiftMonth(m, -1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
          aria-label="Previous month"
          disabled={viewMonth.getMonth() === today.getMonth() && viewMonth.getFullYear() === today.getFullYear()}
        >
          <i className="fas fa-chevron-left text-xs" aria-hidden="true"></i>
        </button>
        <div className="text-xs font-medium text-stone">
          {checkIn
            ? checkOut
              ? "Select dates — done when ready"
              : "Select a check-out date"
            : "Select your check-in date"}
        </div>
        <button
          type="button"
          onClick={() => setViewMonth((m) => shiftMonth(m, 1))}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
          aria-label="Next month"
        >
          <i className="fas fa-chevron-right text-xs" aria-hidden="true"></i>
        </button>
      </div>

      <div className={`flex flex-col gap-6 ${double ? "sm:flex-row sm:gap-8" : ""}`}>
        {renderMonth(viewMonth)}
        {double && <div className="hidden sm:block">{renderMonth(shiftMonth(viewMonth, 1))}</div>}
      </div>

      {checkIn && checkOut && (
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <p className="text-sm text-stone">
            {new Date(checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            {" — "}
            {new Date(checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </p>
          <button
            type="button"
            onClick={() => onSelect({ checkIn: null, checkOut: null })}
            className="text-sm font-semibold text-iris hover:text-iris-deep"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { destinations, getDestinationBySlug } from "../../data/destinations";
import { formatLong } from "../../utils/dates";
import Calendar from "./Calendar";

const FieldLabel = ({ children }) => (
  <span className="mb-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-taupe">
    {children}
  </span>
);

const SearchBar = ({ onSearchStart, compact = false }) => {
  const navigate = useNavigate();

  const [openPanel, setOpenPanel] = useState(null); // 'where' | 'dates' | 'guests'
  const [where, setWhere] = useState("");
  const [whereQuery, setWhereQuery] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const containerRef = useRef(null);

  const togglePanel = (name) => {
    setOpenPanel((cur) => (cur === name ? null : name));
  };

  const closePanels = () => setOpenPanel(null);

  useEffect(() => {
    const onOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closePanels();
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const filteredDests = destinations.filter((d) =>
    d.destName.toLowerCase().includes(whereQuery.toLowerCase())
  );

  const destinationMatch = getDestinationBySlug(where);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where) params.set("where", where);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    params.set("adults", String(adults));
    if (children > 0) params.set("children", String(children));
    onSearchStart?.();
    closePanels();
    navigate(`/stays?${params.toString()}`);
  };

  const guestsTotal = adults + children;

  const changeGuests = (setter, current, min, max, delta) => {
    const next = Math.min(max, Math.max(min, current + delta));
    setter(next);
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSearch}
      className={`relative w-full ${compact ? "" : "max-w-4xl"}`}
    >
      <div
        className={`flex flex-col rounded-lg border border-white/15 bg-white/90 shadow-lift backdrop-blur-xl transition-shadow duration-300 focus-within:shadow-lift lg:flex-row ${
          compact ? "" : ""
        }`}
      >
        {/* Where */}
        <div className="relative flex-1 rounded-t-lg border-b border-line lg:rounded-l-lg lg:rounded-t-none lg:border-b-0 lg:border-r">
          <button
            type="button"
            onClick={() => togglePanel("where")}
            className={`flex w-full flex-col px-5 py-4 text-left transition-colors duration-200 ${
              openPanel === "where" ? "bg-iris-soft/60" : "hover:bg-cream-alt"
            }`}
            aria-expanded={openPanel === "where"}
          >
            <FieldLabel>Where</FieldLabel>
            <span className={`text-sm ${where ? "font-semibold text-ink" : "text-stone"}`}>
              {where
                ? destinationMatch
                  ? destinationMatch.destName
                  : where
                : "Any destination"}
            </span>
          </button>

          <AnimatePresence>
            {openPanel === "where" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-full z-30 mt-2 w-full min-w-[280px] rounded-base border border-line bg-cream p-2 shadow-card lg:w-72"
              >
                <input
                  autoFocus
                  type="text"
                  value={whereQuery}
                  onChange={(e) => setWhereQuery(e.target.value)}
                  placeholder="Search destinations"
                  className="mb-2 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris-soft"
                />
                <div className="max-h-56 overflow-y-auto">
                  {filteredDests.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setWhere(d.slug);
                        setWhereQuery("");
                        closePanels();
                      }}
                      className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                        where === d.slug
                          ? "bg-iris-soft font-semibold text-iris-deep"
                          : "text-ink hover:bg-sand"
                      }`}
                    >
                      <span>
                        {d.destName}
                        <span className="ml-1.5 text-xs text-taupe">{d.country}</span>
                      </span>
                      <i className="fas fa-arrow-right text-[10px] text-taupe" aria-hidden="true"></i>
                    </button>
                  ))}
                  {filteredDests.length === 0 && (
                    <p className="px-3 py-2 text-sm text-stone">No destinations match.</p>
                  )}
                </div>
                {where && (
                  <button
                    type="button"
                    onClick={() => {
                      setWhere("");
                      setWhereQuery("");
                      closePanels();
                    }}
                    className="mt-2 w-full border-t border-line px-3 py-2 text-left text-xs font-semibold text-taupe hover:text-ink"
                  >
                    Clear destination
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dates */}
        <div className="relative flex-1 border-b border-line sm:flex lg:border-b-0 lg:border-r">
          <button
            type="button"
            onClick={() => togglePanel("dates")}
            className={`flex w-full flex-col px-5 py-4 text-left transition-colors duration-200 ${
              openPanel === "dates" ? "bg-iris-soft/60" : "hover:bg-cream-alt"
            }`}
            aria-expanded={openPanel === "dates"}
          >
            <FieldLabel>Check-in  Check-out</FieldLabel>
            <span className={`text-sm ${checkIn ? "font-semibold text-ink" : "text-stone"}`}>
              {checkIn && checkOut
                ? `${formatLong(checkIn)}  ${formatLong(checkOut)}`
                : checkIn
                ? `${formatLong(checkIn)}  + nights`
                : "Add dates"}
            </span>
          </button>

          <AnimatePresence>
            {openPanel === "dates" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-full z-30 mt-2 w-[320px] rounded-base border border-line bg-cream shadow-card sm:w-[560px]"
              >
                <Calendar
                  double
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onSelect={({ checkIn: ci, checkOut: co }) => {
                    setCheckIn(ci);
                    setCheckOut(co);
                    if (ci && co) closePanels();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Guests */}
        <div className="relative flex-1 border-b border-line lg:border-b-0 lg:border-r">
          <button
            type="button"
            onClick={() => togglePanel("guests")}
            className={`flex w-full flex-col px-5 py-4 text-left transition-colors duration-200 ${
              openPanel === "guests" ? "bg-iris-soft/60" : "hover:bg-cream-alt"
            }`}
            aria-expanded={openPanel === "guests"}
          >
            <FieldLabel>Guests</FieldLabel>
            <span className={`text-sm ${guestsTotal > 0 ? "font-semibold text-ink" : "text-stone"}`}>
              {guestsTotal} {guestsTotal === 1 ? "guest" : "guests"}
              {children > 0 && <span className="text-stone"> · {children} child</span>}
            </span>
          </button>

          <AnimatePresence>
            {openPanel === "guests" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-full z-30 mt-2 w-full rounded-base border border-line bg-cream p-4 shadow-card lg:w-72"
              >
                <GuestRow
                  label="Adults"
                  sub="Ages 13+"
                  value={adults}
                  onDec={() => changeGuests(setAdults, adults, 1, 12, -1)}
                  onInc={() => changeGuests(setAdults, adults, 1, 12, 1)}
                />
                <div className="my-3 border-t border-line" />
                <GuestRow
                  label="Children"
                  sub="Ages 2–12"
                  value={children}
                  onDec={() => changeGuests(setChildren, children, 0, 6, -1)}
                  onInc={() => changeGuests(setChildren, children, 0, 6, 1)}
                />
                <button
                  type="button"
                  onClick={closePanels}
                  className="btn-primary mt-4 w-full !py-2.5"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search CTA */}
        <div className="flex items-center rounded-b-lg p-3 lg:rounded-b-none lg:rounded-r-lg">
          <button
            type="submit"
            className="btn-light flex w-full flex-1 items-center justify-center gap-2 bg-plum !px-8 !py-4 text-cream hover:bg-plum-deep lg:w-auto"
          >
            <i className="fas fa-search text-sm" aria-hidden="true"></i>
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

const GuestRow = ({ label, sub, value, onDec, onInc }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold text-ink">{label}</p>
      <p className="text-xs text-stone">{sub}</p>
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDec}
        aria-label={`Decrease ${label}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
      >
        <i className="fas fa-minus text-xs" aria-hidden="true"></i>
      </button>
      <span className="min-w-5 text-center font-semibold text-ink">{value}</span>
      <button
        type="button"
        onClick={onInc}
        aria-label={`Increase ${label}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-plum text-plum transition-colors hover:bg-iris-soft"
      >
        <i className="fas fa-plus text-xs" aria-hidden="true"></i>
      </button>
    </div>
  </div>
);

export default SearchBar;

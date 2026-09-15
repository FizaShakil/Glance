import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HotelCard from "../Hotel/HotelCard";
import SearchBar from "../Search/SearchBar";
import { getDestinationBySlug } from "../../data/destinations";
import { hotels } from "../../data/hotels";
import { categories } from "../../data/categories";
import { nightsBetween } from "../../utils/dates";

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Guest rating" },
];

const Stays = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const where = searchParams.get("where") || "";
  const mood = searchParams.get("mood") || "";
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const adults = parseInt(searchParams.get("adults"), 10) || 0;

  const [sortBy, setSortBy] = useState("recommended");
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  const destination = getDestinationBySlug(where);

  useEffect(() => {
    setApplied(true);
    const t = window.setTimeout(() => setApplied(false), 700);
    return () => window.clearTimeout(t);
  }, [where, mood, checkin, checkout, adults]);

  const results = useMemo(() => {
    let pool = [...hotels];

    if (destination) {
      pool = pool.filter((h) => h.destinationId === destination.id);
    }

    if (mood) {
      pool = pool.filter((h) => h.categories.includes(mood));
    }

    if (minRating > 0) {
      pool = pool.filter((h) => h.reviewScore >= minRating);
    }

    switch (sortBy) {
      case "price-asc":
        pool.sort(
          (a, b) => bestPrice(a) - bestPrice(b)
        );
        break;
      case "price-desc":
        pool.sort(
          (a, b) => bestPrice(b) - bestPrice(a)
        );
        break;
      case "rating":
        pool.sort((a, b) => b.reviewScore - a.reviewScore);
        break;
      default:
        pool.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return pool;
  }, [mood, minRating, sortBy, destination]);

  const nights = nightsBetween(checkin, checkout);
  const empty = results.length === 0;

  return (
    <div className="min-h-screen bg-cream-alt pb-20">
      {/* Banner */}
      <div className="bg-ink py-16 text-cream sm:py-20">
        <div className="container-page">
          <p className="eyebrow !text-cream/60">Stays</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            {destination ? `${destination.destName} stays` : mood ? "Mood-matched stays" : "All stays"}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75 sm:text-base">
            {destination
              ? `${destination.description.split(".")[0]}.`
              : "Hand-picked hotels across eight destinations — filter by mood, rating, and price."}
          </p>
        </div>
      </div>

      <div className="container-page -mt-8">
        <SearchBar compact />

        {/* Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone">
            <span className="font-semibold text-ink">{results.length}</span>{" "}
            {results.length === 1 ? "stay" : "stays"}
            {where && destination ? ` in ${destination.destName}` : ""}
            {mood && <> · <span className="capitalize">{mood.replace(/-/g, " ")}</span></>}
            {nights > 0 && <> · {nights} {nights === 1 ? "night" : "nights"}</>}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className="btn-ghost !px-4 !py-2.5 text-sm lg:hidden"
              aria-expanded={filtersOpen}
            >
              <i className="fas fa-sliders text-xs" aria-hidden="true"></i>
              Filters
            </button>

            <label className="sr-only" htmlFor="sort">Sort stays</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-sm border border-line bg-cream px-3 py-2.5 text-sm font-medium text-ink focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris-soft"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Filters */}
          <aside className="hidden lg:block">
            <FilterPanel
              mood={mood}
              minRating={minRating}
              onMood={(m) => {
                const next = new URLSearchParams(searchParams);
                if (m) next.set("mood", m); else next.delete("mood");
                setSearchParams(next);
              }}
              onMinRating={setMinRating}
              clearRating={() => setMinRating(0)}
            />
          </aside>

          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden lg:hidden"
              >
                <FilterPanel
                  mood={mood}
                  minRating={minRating}
                  onMood={(m) => {
                    const next = new URLSearchParams(searchParams);
                    if (m) next.set("mood", m); else next.delete("mood");
                    setSearchParams(next);
                  }}
                  onMinRating={setMinRating}
                  clearRating={() => setMinRating(0)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className={applied ? "animate-fade-in" : ""}>
            {empty ? (
              <div className="rounded-base border border-dashed border-line bg-cream p-16 text-center">
                <i className="fas fa-map-pin mb-4 text-3xl text-taupe" aria-hidden="true"></i>
                <h2 className="font-display text-2xl font-semibold text-ink">No stays match yet</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-stone">
                  Try clearing filters or a different mood, or browse the full catalogue.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMinRating(0);
                    setSearchParams({});
                  }}
                  className="btn-primary mt-6 !px-6 !py-3 text-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {results.map((hotel, i) => (
                  <HotelCard key={hotel.id} hotel={hotel} index={i % 3} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const bestPrice = (hotel) => hotel.rooms.reduce((a, b) => Math.min(a, b.pricePerNight), Infinity);

const FilterPanel = ({ mood, minRating, onMood, onMinRating, clearRating }) => {
  const ratingOptions = [0, 8, 8.5, 9];

  return (
    <div className="rounded-base border border-line bg-cream p-5">
      <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">Filters</h2>

      <div className="mt-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-taupe">Mood</h3>
        <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
          <button
            type="button"
            onClick={() => onMood("")}
            className={`rounded-sm px-3 py-1.5 text-left text-sm transition-colors ${
              !mood ? "bg-iris-soft font-semibold text-iris-deep" : "text-stone hover:text-ink"
            }`}
          >
            All moods
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onMood(cat.slug)}
              className={`rounded-sm px-3 py-1.5 text-left text-sm transition-colors ${
                mood === cat.slug
                  ? "bg-iris-soft font-semibold text-iris-deep"
                  : "text-stone hover:text-ink"
              }`}
            >
              {cat.short}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-taupe">Guest rating</h3>
        <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
          {ratingOptions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onMinRating(r)}
              className={`rounded-sm px-3 py-1.5 text-left text-sm transition-colors ${
                minRating === r
                  ? "bg-iris-soft font-semibold text-iris-deep"
                  : "text-stone hover:text-ink"
              }`}
            >
              {r === 0 ? "Any rating" : `${r}+ stars`}
            </button>
          ))}
        </div>
        {minRating > 0 && (
          <button
            type="button"
            onClick={clearRating}
            className="mt-3 text-xs font-semibold text-iris hover:text-iris-deep"
          >
            Clear rating
          </button>
        )}
      </div>
    </div>
  );
};

export default Stays;
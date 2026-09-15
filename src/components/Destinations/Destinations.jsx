import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { destinations } from "../../data/destinations";
import { hotels, getHotelsByDestination } from "../../data/hotels";
import Img from "../Reusable-components/Img";

const CONTROL_INPUT =
  "w-full rounded-sm border !border-line bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-stone/70 transition-all duration-200 focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris-soft";

const DestinationCard = ({ dest, index, stayCount }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/destpage/${dest.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-base border border-line bg-cream shadow-soft transition-all duration-500 ease-out-quart hover:-translate-y-1 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Img
            src={dest.image}
            alt={dest.destName}
            fallbacks={dest.gallery}
            wrapperClassName="block h-full w-full"
            imgClassName="block h-full w-full object-cover transition-transform duration-[1400ms] ease-out-quart group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <span className="absolute left-3 top-3 rounded-pill border border-white/20 bg-ink/55 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur-md">
            {dest.region}
          </span>
          <span className="absolute right-3 top-3 rounded-pill bg-cream/95 px-3 py-1 text-[11px] font-semibold text-ink backdrop-blur-md">
            {stayCount} {stayCount === 1 ? "stay" : "stays"}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-plum">{dest.country}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            {dest.destName}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone">{dest.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-2 pt-1 text-sm font-semibold text-iris transition-colors group-hover:text-iris-deep">
            Explore {dest.destName}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const Destinations = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const [sort, setSort] = useState("featured");

  const surpriseMe = () => {
    const pick = destinations[Math.floor(Math.random() * destinations.length)];
    navigate(`/destpage/${pick.id}`);
  };

  const regions = useMemo(
    () => ["All regions", ...new Set(destinations.map((d) => d.region))],
    []
  );

  const stayCounts = useMemo(
    () =>
      new Map(destinations.map((d) => [d.id, getHotelsByDestination(d.id).length])),
    []
  );

  const filtered = useMemo(() => {
    let list = destinations.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchRegion = region === "All regions" || d.region === region;
      const matchQuery =
        !q ||
        d.destName.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q);
      return matchRegion && matchQuery;
    });

    if (sort === "az") list = [...list].sort((a, b) => a.destName.localeCompare(b.destName));
    if (sort === "stays") list = [...list].sort((a, b) => stayCounts.get(b.id) - stayCounts.get(a.id));

    return list;
  }, [query, region, sort, stayCounts]);

  const totalStays = hotels.length;

  return (
    <div className="bg-cream pb-20">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-plum/30 blur-[100px]" />
        <div className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-iris/25 blur-[110px]" />

        <div className="container-page relative py-20 text-center text-cream sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow !text-cream/70">
              <i className="fas fa-globe mr-1.5" aria-hidden="true"></i>
              Find your place
            </p>
            <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              {destinations.length} destinations worth a slow look
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Each one hand-written and honestly presented — pick a mood, a region,
              or follow your curiosity.
            </p>

            <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">
              <span className="rounded-pill border border-cream/15 bg-cream/5 px-4 py-2 text-sm font-semibold text-cream/85 backdrop-blur-md">
                {destinations.length} destinations
              </span>
              <span className="rounded-pill border border-cream/15 bg-cream/5 px-4 py-2 text-sm font-semibold text-cream/85 backdrop-blur-md">
                {totalStays} hand-picked stays
              </span>
              <span className="rounded-pill border border-cream/15 bg-cream/5 px-4 py-2 text-sm font-semibold text-cream/85 backdrop-blur-md">
                {regions.length - 1} regions
              </span>
              <button
                type="button"
                onClick={surpriseMe}
                className="inline-flex items-center gap-2 rounded-pill border border-sage/40 bg-sage/15 px-4 py-2 text-sm font-semibold text-cream backdrop-blur-md transition-colors duration-300 hover:bg-sage/25"
              >
                <i className="fas fa-shuffle text-xs" aria-hidden="true"></i>
                Surprise me
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="container-page sticky top-16 z-20 -mt-16">
        <div className="rounded-base border border-line bg-cream p-4 shadow-card sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <i className="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-taupe" aria-hidden="true"></i>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, countries…"
                aria-label="Search destinations"
                className={`${CONTROL_INPUT} !pl-9`}
              />
            </div>

            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                aria-label="Filter by region"
                className={`${CONTROL_INPUT} appearance-none pr-9`}
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-taupe" aria-hidden="true"></i>
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort destinations"
                className={`${CONTROL_INPUT} appearance-none pr-9`}
              >
                <option value="featured">Featured</option>
                <option value="az">Name A–Z</option>
                <option value="stays">Most stays</option>
              </select>
              <i className="fas fa-arrow-down-short-wide pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-taupe" aria-hidden="true"></i>
            </div>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                aria-pressed={region === r}
                className={`whitespace-nowrap rounded-pill border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                  region === r
                    ? "border-plum bg-plum text-cream"
                    : "border-line bg-cream-alt text-stone hover:border-plum/40 hover:text-ink"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-page mt-10">
        <p className="text-sm text-stone" role="status">
          {filtered.length} {filtered.length === 1 ? "destination" : "destinations"}
        </p>

        <motion.div layout className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((d, i) => (
              <DestinationCard key={d.id} dest={d} index={i} stayCount={stayCounts.get(d.id)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-base border border-dashed border-line bg-cream-alt px-6 py-16 text-center">
            <i className="fas fa-map text-3xl text-taupe" aria-hidden="true"></i>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink">Nothing matches that</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-stone">
              Try a different word or clear the region filter to see the full
              catalogue again.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setRegion("All regions");
              }}
              className="btn-primary mt-6 !px-6 !py-3 text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="container-page mt-16">
        <div className="rounded-xl border border-line bg-ink px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
            Can&apos;t pick? Start with the stays.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/75">
            Every card below is already searchable — filter by mood, dates, and
            guests from the stays page.
          </p>
          <Link to="/stays" className="btn-light mt-7 !px-7 !py-3.5">
            Browse all stays
            <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
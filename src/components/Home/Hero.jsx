import React from "react";
import { motion } from "framer-motion";
import SearchBar from "../Search/SearchBar";
import { destinations } from "../../data/destinations";
import { hotels } from "../../data/hotels";
import landscape from "../../assets/landscape.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 * i },
  }),
};

const Hero = () => {
  const avgScore =
    hotels.reduce((sum, h) => sum + h.reviewScore, 0) / hotels.length;

  const stats = [
    { value: destinations.length, label: "Curated destinations" },
    { value: hotels.length, label: "Hand-picked stays" },
    { value: avgScore.toFixed(1), label: "Average guest rating" },
  ];

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <img
          src={landscape}
          alt=""
          aria-hidden="true"
          className="h-full w-full animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-24 pt-28 sm:pt-40 lg:pt-44">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-pill border border-cream/20 bg-ink/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cream/80 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            Discover · Compare · Book
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 px-1 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:px-0 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] xl:leading-[1.02]"
          >
            Find a stay worth
            <em className="text-cream"> travelling for.</em>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg"
          >
            Glance pairs beautiful destinations with hand-picked hotels — so
            you can compare with clarity and book with confidence.
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex justify-center sm:mt-12"
        >
          <div className="w-full max-w-4xl">
            <SearchBar />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-10 flex flex-wrap items-start justify-center gap-x-6 gap-y-5 px-2 sm:mt-14 sm:items-center sm:gap-x-10 sm:px-0"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="font-display text-3xl font-semibold text-white">
                {s.value}
              </span>
              <span className="max-w-[110px] text-left text-xs leading-snug text-cream/65">
                {s.label}
              </span>
              {s !== stats[stats.length - 1] && (
                <span className="ml-10 hidden h-10 w-px bg-cream/15 sm:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into cream */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
};

export default Hero;
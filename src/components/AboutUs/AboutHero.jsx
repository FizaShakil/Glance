import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { destinations } from "../../data/destinations";
import { hotels } from "../../data/hotels";
import Img from "../Reusable-components/Img";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.12 * i },
  }),
};

const CountUp = ({ value, decimals = 0 }) => {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        started.current = true;
        const start = performance.now();
        const duration = 1200;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-display text-3xl font-semibold text-white">
      {display.toFixed(decimals)}
    </span>
  );
};

const AboutHero = () => {
  const regions = new Set(destinations.map((d) => d.country)).size;
  const avgScore =
    Math.round((hotels.reduce((a, h) => a + h.reviewScore, 0) / hotels.length) * 10) / 10;

  const stats = [
    { value: destinations.length, label: "Curated destinations" },
    { value: hotels.length, label: "Hand-picked stays" },
    { value: avgScore, decimals: 1, label: "Average stay rating" },
    { value: regions, label: "Countries covered" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Img
          src={destinations[0].image}
          alt=""
          eager
          fallbacks={destinations[0].gallery}
          wrapperClassName="absolute inset-0 block h-full w-full"
          imgClassName="absolute inset-0 block h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/65 to-ink" />
      </div>

      <div className="container-page relative py-24 text-center text-cream sm:py-32">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <p className="eyebrow !text-cream/70">
            <i className="far fa-compass mr-1.5" aria-hidden="true"></i>
            The story so far
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Travel planning, minus the noise.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Glance is a demo of a simpler way to pick a trip: watch a place,
            understand a stay, and see the honest total before you book  no
            spreadsheet required.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/destination" className="btn-light !px-7 !py-3.5">
              Explore destinations
              <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
            </Link>
            <Link
              to="/stays"
              className="btn btn-ghost !border-cream/25 !px-7 !py-3.5 !text-cream hover:!bg-cream/10"
            >
              Browse all stays
            </Link>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-base border border-cream/15 bg-cream/5 px-5 py-5 backdrop-blur-md"
            >
              <CountUp value={s.value} decimals={s.decimals || 0} />
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/60">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
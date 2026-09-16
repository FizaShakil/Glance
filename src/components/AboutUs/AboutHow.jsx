import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../Reusable-components/SectionHeading";

const steps = [
  {
    icon: "fa-solid fa-location-dot",
    title: "Find a destination",
    text: "Twenty-something places worth a slow look, each with honest copy instead of marketing fluff.",
    to: "/destination",
    label: "View destinations",
  },
  {
    icon: "fa-solid fa-building",
    title: "Understand the stay",
    text: "Hotel cards compare rooms, ratings, and what you actually get  one consistent layout everywhere.",
    to: "/stays",
    label: "Browse stays",
  },
  {
    icon: "fa-solid fa-scale-balanced",
    title: "See the real total",
    text: "Room rate, taxes, and savings shown line by line before you ever reach checkout.",
    to: "/stays",
    label: "Compare pricing",
  },
  {
    icon: "fa-solid fa-circle-check",
    title: "Book in one flow",
    text: "A single focused checkout, a clear confirmation, and a receipt you can find again later.",
    to: "/stays",
    label: "Try the flow",
  },
];

const AboutHow = () => {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, no hairpin turns"
          subtitle="The whole trip from daydream to booked, in a calm straight line."
        />
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute inset-x-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-base border border-line bg-cream-alt p-6 shadow-soft transition-all duration-500 ease-out-quart hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-pill bg-ink text-cream shadow-soft">
                <i className={`${s.icon} text-lg`} aria-hidden="true"></i>
                <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-plum text-xs font-bold text-cream">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{s.text}</p>
              <Link
                to={s.to}
                className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-iris transition-colors hover:text-iris-deep"
              >
                {s.label}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHow;
import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "Transparent pricing",
    text: "Taxes and totals are shown up front  in the card, the panel, and the receipt.",
  },
  {
    icon: "fa-solid fa-table-list",
    title: "One consistent layout",
    text: "Every destination and every stay reads the same way, so comparing is effortless.",
  },
  {
    icon: "fa-solid fa-bullhorn",
    title: "Quiet, not noisy",
    text: "No email drip campaigns pushing you toward a decision you haven't made.",
  },
  {
    icon: "fa-solid fa-pen-ruler",
    title: "A focused catalogue",
    text: "A small, hand-picked set of stays  not an endless, exhausting list of options.",
  },
];

const AboutDifference = () => {
  return (
    <section className="border-y border-line bg-cream-alt py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">The Glance difference</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Less hunting. More deciding.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone sm:text-lg">
            Small choices, made consistently, add up to a very different booking
            experience.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 rounded-base border border-line bg-cream p-6 shadow-soft"
            >
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-iris-soft text-plum">
                <i className={`${f.icon} text-base`} aria-hidden="true"></i>
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-taupe">
          Glance is a design demo  catalogue, prices, and ratings are illustrative
          and no payments are processed.
        </p>
      </div>
    </section>
  );
};

export default AboutDifference;
import React from "react";
import { motion } from "framer-motion";
import Img from "../Reusable-components/Img";
import { destinations } from "../../data/destinations";

const blocks = [
  {
    icon: "fa-solid fa-table-columns",
    title: "The modern problem",
    paragraphs: [
      "Planning a trip today usually means spreadsheets, screenshots, and an exhausting loop of opinion pages. By the time you have price comparisons for one destination, the weekend is gone.",
      "Hotels are scattered across scores of websites, each with its own rules, its own fine print, and a total that never quite matches the headline price.",
    ],
  },
  {
    icon: "fa-solid fa-compass-drafting",
    title: "The Glance take",
    paragraphs: [
      "Glance collapses that research marathon into a calm, focused sequence: discover a destination, scan genuinely useful hotel cards, understand the real cost, and book without surprises.",
      "It is a working demo of that idea  a small catalogue, presented the way a careful traveller would want it.",
    ],
  },
];

const AboutStory = () => {
  const featured = destinations[7];

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-lg shadow-lift">
            <Img
              src={featured.image}
              alt={featured.destName}
              fallbacks={featured.gallery}
              wrapperClassName="block aspect-[4/5] w-full sm:aspect-[5/6]"
              imgClassName="block aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
            />
          </div>
          <div className="absolute -bottom-6 -right-3 hidden rounded-base border border-line bg-cream p-5 shadow-card sm:block lg:-right-8">
            <p className="font-display text-3xl font-semibold text-plum">{featured.destName}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone">
              {featured.country} · {featured.region}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {blocks.map((b) => (
            <div key={b.title} className="mb-10 last:mb-0">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-pill bg-iris-soft text-plum">
                  <i className={`${b.icon} text-base`} aria-hidden="true"></i>
                </span>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {b.title}
                </h2>
              </div>
              {b.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-base leading-relaxed text-stone sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStory;
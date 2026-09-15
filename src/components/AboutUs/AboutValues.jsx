import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../Reusable-components/SectionHeading";

const values = [
  {
    icon: "fa-solid fa-eye",
    title: "Clarity",
    text: "Every stay is presented the same way — location, rating, what makes it special, and the total before you click anything.",
  },
  {
    icon: "fa-solid fa-hand-holding-heart",
    title: "Honesty",
    text: "No hidden fees discovered at checkout. What you see in the breakdown is what you book.",
  },
  {
    icon: "fa-solid fa-feather-pointed",
    title: "Calm",
    text: "Research should feel like window-shopping, not an audit. Slow pacing is a feature, not a bug.",
  },
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Craft",
    text: "A living demo that keeps getting better — every stay we add sharpens how the product works.",
  },
];

const AboutValues = () => {
  return (
    <section className="border-y border-line bg-cream-alt py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we stand for"
          title="Four pillars, one simple pitch"
          subtitle="The principles behind every card, screen, and page in Glance."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-base border border-line bg-cream p-6 shadow-soft transition-all duration-500 ease-out-quart hover:-translate-y-1 hover:shadow-card"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-pill bg-iris-soft text-plum">
                <i className={`${v.icon} text-lg`} aria-hidden="true"></i>
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
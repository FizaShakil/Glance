import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../Reusable-components/SectionHeading";

const features = [
  {
    icon: "fa-solid fa-hand-holding-heart",
    title: "Curated, not crowded",
    text: "Every destination and stay is chosen by a person  not an algorithm. You'll never wade through a thousand lookalike listings.",
  },
  {
    icon: "fa-solid fa-compass",
    title: "Compare with clarity",
    text: "Room rates, reviews, and details side by side. No surprise 'resort fees' buried at checkout.",
  },
  {
    icon: "fa-solid fa-leaf",
    title: "Calm by design",
    text: "An editorial, low-noise layout with honest demo data  so you can judge a stay on its merits.",
  },
  {
    icon: "fa-solid fa-lock",
    title: "Book with confidence",
    text: "Clear dates, clear pricing, transparent policies. If it's not right, easy to change.",
  },
];

const WhyGlance = () => {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Glance"
          title="The Glance difference"
          subtitle="We built Glance for travellers who would rather feel something than swipe through hundreds of tiles."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-base border border-line bg-cream-alt p-6 transition-colors duration-300 hover:border-plum/30"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-iris text-cream">
                <i className={`${f.icon} text-lg`} aria-hidden="true"></i>
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGlance;
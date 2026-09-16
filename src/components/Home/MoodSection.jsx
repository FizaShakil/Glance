import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../Reusable-components/SectionHeading";
import Img from "../Reusable-components/Img";
import { categories } from "../../data/categories";
import { hotels } from "../../data/hotels";

const MoodSection = () => {
  return (
    <section className="bg-ink py-20 text-cream sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Travel by mood"
          title="What kind of trip feels right?"
          subtitle="Beach days, big cities, slow mornings in the mountains  pick a mood and we'll show you stays that fit it."
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6">
          {categories.map((cat, i) => {
            const count = hotels.filter((h) =>
              h.categories.includes(cat.slug)
            ).length;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/stays?mood=${cat.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-base sm:aspect-[4/5]"
                >
                  <Img
                    src={cat.image}
                    alt={cat.label}
                    wrapperClassName="absolute inset-0 block h-full w-full"
                    imgClassName="absolute inset-0 block h-full w-full object-cover opacity-80 transition-all duration-[1200ms] ease-out-quart group-hover:scale-110 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <i className={`${cat.icon} mb-2 block text-lg text-sage`} aria-hidden="true"></i>
                    <h3 className="text-sm font-semibold leading-tight text-white">
                      {cat.label}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-cream/60">
                      {count} {count === 1 ? "stay" : "stays"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoodSection;
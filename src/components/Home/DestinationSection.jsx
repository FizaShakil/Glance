import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../Reusable-components/SectionHeading";
import Img from "../Reusable-components/Img";
import { destinations } from "../../data/destinations";
import { hotels } from "../../data/hotels";

const DestinationSection = () => {
  const withHotelCount = destinations
    .map((d) => ({
      ...d,
      stayCount: hotels.filter((h) => h.destinationId === d.id).length,
    }))
    .slice(0, 8);

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Where to next"
          title="Destinations waiting for you"
          subtitle="From coastlines to cloud forests, each place is chosen by hand. Start with one that moves you  we'll find the stay."
          action={{ to: "/destination", label: "Explore all destinations" }}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {withHotelCount.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                to={`/destpage/${dest.id}`}
                className={`group relative block h-full overflow-hidden rounded-lg shadow-soft transition-shadow duration-500 hover:shadow-lift ${
                  i === 0 ? "min-h-[420px]" : "min-h-[220px]"
                }`}
              >
                <Img
                  src={dest.image}
                  alt={dest.destName}
                  fallbacks={dest.gallery}
                  wrapperClassName="absolute inset-0 block h-full w-full"
                  imgClassName="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1300ms] ease-out-quart group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/70">
                    {dest.country} · {dest.stayCount} stays
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
                    {dest.destName}
                  </h3>
                  <p className="mt-1 max-w-md text-sm text-cream/75 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {dest.tagline}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-cream">
                    Discover stays
                    <i className="fas fa-arrow-right text-[10px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"></i>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;
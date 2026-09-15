import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="bg-cream px-4 py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-xl bg-ink px-6 py-16 text-center sm:px-16 sm:py-24"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-plum/40 blur-[90px]" />
          <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-iris/30 blur-[90px]" />

          <div className="relative">
            <p className="eyebrow !text-cream/60">Your next stay</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-6xl">
              The trip starts the moment you decide.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              Browse hand-picked destinations and stays. When one catches your eye,
              locking it in takes a couple of calm steps.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/destination" className="btn-light !px-8 !py-4 text-base">
                Explore destinations
                <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
              </Link>
              <Link to="/stays" className="btn-ghost !border-cream/25 !px-8 !py-4 text-base !text-cream hover:!bg-cream/10">
                Browse all stays
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
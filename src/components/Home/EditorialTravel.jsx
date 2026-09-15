import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import purpleHotel from "../../assets/purpleHotelImage.jpg";

const EditorialTravel = () => {
  return (
    <section className="bg-cream-alt py-20 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image + floating card */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-lg shadow-lift">
              <img
                src={purpleHotel}
                alt="An intimate boutique hotel at dusk"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] ease-out-quart hover:scale-105 sm:aspect-[5/6]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -right-3 max-w-[240px] rounded-base border border-line bg-cream p-5 shadow-lift sm:-right-6"
            >
              <p className="font-display text-3xl font-semibold text-plum">24</p>
              <p className="mt-1 text-xs leading-relaxed text-stone">
                stays, each one chosen by hand and written about like a place — not a product ID.
              </p>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">The Glance Journal</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Travel, but make it <em className="text-plum">cinematic</em>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-stone sm:text-lg">
              We think a booking page can feel like a travel magazine. Glance pairs
              rich destination notes with hand-picked stays, so you arrive knowing
              the story of the place — not just the price of the night.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone">
              Browse by mood, open a destination, and fall into its rooms. When a
              place catches you, locking it in is a couple of calm steps away.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/destination" className="btn-primary !px-7 !py-3.5">
                Start exploring
                <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
              </Link>
              <Link to="/aboutus" className="btn-ghost !px-7 !py-3.5">
                Our story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EditorialTravel;
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HotelCard from "../Hotel/HotelCard";
import { useWishlist } from "../../context/WishlistContext";
import { hotels } from "../../data/hotels";

const Favorites = () => {
  const { wishlist } = useWishlist();
  const saved = hotels.filter((h) => wishlist.includes(h.id));

  return (
    <div className="min-h-screen bg-cream-alt pb-20">
      <div className="bg-ink py-16 text-cream sm:py-20">
        <div className="container-page">
          <p className="eyebrow !text-cream/60">Saved stays</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            Your favourites
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75 sm:text-base">
            {saved.length
              ? `${saved.length} ${saved.length === 1 ? "stay" : "stays"} saved for later — ready when you are.`
              : "Stays you save will show up here, waiting on every device."}
          </p>
        </div>
      </div>

      <div className="container-page mt-10">
        {saved.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-base border border-dashed border-line bg-cream p-16 text-center"
          >
            <i className="fa-regular fa-heart mb-4 text-4xl text-taupe" aria-hidden="true"></i>
            <h2 className="font-display text-2xl font-semibold text-ink">Nothing saved yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone">
              Tap the heart on any stay to keep it here — your shortlist syncs to this browser.
            </p>
            <Link to="/stays" className="btn-primary mt-6 !px-6 !py-3 text-sm">
              Browse stays
              <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((hotel, i) => (
              <HotelCard key={hotel.id} hotel={hotel} index={i % 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../../context/WishlistContext";
import { getDestinationById } from "../../data/destinations";
import FavoriteButton from "../Reusable-components/FavoriteButton";
import RatingBadge from "../Reusable-components/RatingBadge";
import Img from "../Reusable-components/Img";

const amenityIcons = {
  "Free Wi-Fi": "fa-solid fa-wifi",
  "Infinity Pool": "fa-solid fa-water",
  "Private Pool": "fa-solid fa-water",
  "Outdoor Pool": "fa-solid fa-water",
  "Spa & Wellness": "fa-solid fa-spa",
  "Breakfast Included": "fa-solid fa-mug-hot",
  "Restaurant & Bar": "fa-solid fa-utensils",
  "Private Beach": "fa-solid fa-umbrella-beach",
  Beachfront: "fa-solid fa-umbrella-beach",
  "Airport Transfer": "fa-solid fa-plane",
  "Kids Club": "fa-solid fa-children",
  Parking: "fa-solid fa-square-parking",
  "Pet Friendly": "fa-solid fa-paw",
  Gym: "fa-solid fa-dumbbell",
};

const defaultIcon = "fa-solid fa-circle-check";

const HotelCard = ({ hotel, index = 0 }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const destination = getDestinationById(hotel.destinationId);
  const isFavorite = wishlist.includes(hotel.id);
  const bestRoom = hotel.rooms.reduce((a, b) =>
    a.pricePerNight <= b.pricePerNight ? a : b
  );
  const discountPct =
    bestRoom.originalPrice > bestRoom.pricePerNight
      ? Math.round(
          (1 - bestRoom.pricePerNight / bestRoom.originalPrice) * 100
        )
      : null;
  const amenities = hotel.amenities.slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-base border border-line bg-cream shadow-soft transition-shadow duration-500 hover:shadow-card"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/hotel/${hotel.id}`} aria-label={`View ${hotel.name}`}>
          <Img
            src={hotel.image}
            alt={hotel.name}
            fallbacks={[destination?.image]}
            wrapperClassName="aspect-[4/3] block w-full"
            imgClassName="aspect-[4/3] block w-full object-cover transition-transform duration-[1200ms] ease-out-quart group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex items-center">
          {discountPct && (
            <span className="rounded-full bg-sage px-2.5 py-1 text-xs font-bold text-white">
              Save {discountPct}%
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3">
          <FavoriteButton
            active={isFavorite}
            onClick={() => toggleWishlist(hotel.id)}
            label={`Save ${hotel.name} to favourites`}
          />
        </div>

        {hotel.discountLabel && (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-medium text-cream backdrop-blur-sm">
            <i className="fas fa-star mr-1 text-amber-300" aria-hidden="true"></i>
            {hotel.discountLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Hotel identity */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/hotel/${hotel.id}`}>
              <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-ink transition-colors hover:text-plum">
                {hotel.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-stone">
              <i className="fas fa-location-dot mr-1.5 text-taupe" aria-hidden="true"></i>
              {hotel.location}
              {destination ? `, ${destination.country}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-1 text-amber-500" aria-label={`${hotel.starRating} star hotel`}>
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <i key={i} className="fas fa-star text-xs" aria-hidden="true"></i>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mt-3">
          <RatingBadge score={hotel.reviewScore} count={hotel.reviewCount} size="sm" />
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone">
          {hotel.tagline}
        </p>

        {/* Amenities */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {amenities.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream-alt px-2.5 py-1 text-[11px] font-medium text-stone"
              title={a}
            >
              <i className={`${amenityIcons[a] || defaultIcon} text-plum`} aria-hidden="true"></i>
              {a}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="leading-none">
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              ${bestRoom.pricePerNight}
              <span className="ml-1.5 text-sm font-normal text-stone">/ night</span>
            </p>
            {bestRoom.originalPrice > bestRoom.pricePerNight && (
              <p className="mt-1 text-xs text-taupe">
                <span className="line-through">${bestRoom.originalPrice}</span>
                <span className="ml-1.5 font-semibold text-sage">
                  {discountPct ? `save ${discountPct}%` : "discounted"}
                </span>
              </p>
            )}
          </div>
          <Link
            to={`/hotel/${hotel.id}`}
            className="btn-ink !px-5 !py-2.5 text-sm"
          >
            View stay
            <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default HotelCard;
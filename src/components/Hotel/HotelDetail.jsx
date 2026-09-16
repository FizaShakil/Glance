import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHotelById } from "../../data/hotels";
import { getDestinationById } from "../../data/destinations";
import { useWishlist } from "../../context/WishlistContext";
import FavoriteButton from "../Reusable-components/FavoriteButton";
import RatingBadge from "../Reusable-components/RatingBadge";
import Calendar from "../Search/Calendar";
import SearchBar from "../Search/SearchBar";
import Img from "../Reusable-components/Img";
import { formatShort, nightsBetween } from "../../utils/dates";
import { hotels } from "../../data/hotels";
import HotelCard from "./HotelCard";

const HotelDetail = () => {
  const { id } = useParams();
  const hotel = getHotelById(id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const { wishlist, toggleWishlist } = useWishlist();

  const gallery = useMemo(
    () => [hotel?.image, ...(hotel?.gallery || [])].filter(Boolean),
    [hotel]
  );

  if (!hotel) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-cream-alt px-4 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Hotel not found</h1>
        <p className="mt-2 text-sm text-stone">This stay may have been removed from the catalogue.</p>
        <Link to="/stays" className="btn-primary mt-6 !px-6 !py-3 text-sm">Browse all stays</Link>
      </div>
    );
  }

  const destination = getDestinationById(hotel.destinationId);
  const isFavorite = wishlist.includes(hotel.id);
  const room = hotel.rooms[Math.min(selectedRoom, hotel.rooms.length - 1)];
  const nights = nightsBetween(checkIn, checkOut) || 1;
  const subtotal = room.pricePerNight * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;
  const similar = hotels
    .filter((h) => h.destinationId === hotel.destinationId && h.id !== hotel.id)
    .slice(0, 3);

  const bookQuery = new URLSearchParams();
  bookQuery.set("stay", hotel.id);
  if (checkIn) bookQuery.set("checkin", checkIn);
  if (checkOut) bookQuery.set("checkout", checkOut);

  const prevPhoto = () => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
  const nextPhoto = () => setActiveImage((i) => (i + 1) % gallery.length);

  const onGalleryKey = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevPhoto();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextPhoto();
    }
  };

  return (
    <div className="min-h-screen bg-cream-alt pb-20">
      {/* Header gallery */}
      <div className="bg-ink">
        <div className="container-page py-6 sm:py-8">
          <div className="grid min-h-0 gap-3 lg:h-[400px] lg:grid-cols-[1.5fr_1fr] xl:h-[430px]">
            {/* Main image */}
            <div
              className="relative min-h-0 overflow-hidden rounded-base"
              role="group"
              aria-label="Photo gallery"
              tabIndex={0}
              onKeyDown={onGalleryKey}
            >
              <Img
                src={gallery[activeImage]}
                alt={hotel.name}
                eager
                fallbacks={[hotel.image]}
                wrapperClassName="block aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-auto lg:h-full"
                imgClassName="block aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-auto lg:h-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/45 text-cream backdrop-blur-md transition-all duration-300 hover:bg-ink/70 focus-visible:outline-2 focus-visible:outline-iris sm:left-4"
                  >
                    <i className="fas fa-chevron-left text-sm" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink/45 text-cream backdrop-blur-md transition-all duration-300 hover:bg-ink/70 focus-visible:outline-2 focus-visible:outline-iris sm:right-4"
                  >
                    <i className="fas fa-chevron-right text-sm" aria-hidden="true"></i>
                  </button>
                </>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                <div className="text-cream">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/75">
                    {destination ? (
                      <Link
                        to={`/destpage/${destination.id}`}
                        className="transition-colors hover:text-cream"
                      >
                        {destination.destName} · {destination.country}
                      </Link>
                    ) : (
                      hotel.location
                    )}
                  </p>
                  <h1 className="mt-1 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2.5rem]">
                    {hotel.name}
                  </h1>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-cream/85">
                    <span className="flex items-center gap-1">
                      {Array.from({ length: hotel.starRating }).map((_, i) => (
                        <i key={i} className="fas fa-star text-xs text-amber-400" aria-hidden="true"></i>
                      ))}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-location-dot text-xs" aria-hidden="true"></i>
                      {hotel.location}
                    </span>
                    <RatingBadge score={hotel.reviewScore} count={hotel.reviewCount} size="sm" variant="dark" />
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <FavoriteButton
                    active={isFavorite}
                    onClick={() => toggleWishlist(hotel.id)}
                    label={`Save ${hotel.name} to favourites`}
                  />
                  <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/15 bg-ink/50 px-3 py-1 text-[11px] font-semibold text-cream backdrop-blur-md">
                    <i className="fas fa-images text-[10px]" aria-hidden="true"></i>
                    {activeImage + 1} / {gallery.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Side thumbnails (desktop) */}
            {gallery.length > 1 && (
              <div className="hidden min-h-0 flex-col gap-3 lg:flex">
                {gallery.slice(1, 3).map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setActiveImage(i + 1)}
                    className={`relative min-h-0 flex-1 overflow-hidden rounded-sm transition-opacity duration-300 ${
                      activeImage === i + 1 ? "ring-2 ring-iris" : "opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`View image ${i + 2}`}
                    aria-pressed={activeImage === i + 1}
                  >
                    <Img
                      src={img}
                      alt=""
                      fallbacks={[hotel.image]}
                      wrapperClassName="block h-full w-full"
                      imgClassName="block h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip (mobile) */}
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {gallery.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm transition-opacity duration-300 ${
                    activeImage === i ? "ring-2 ring-iris" : "opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImage === i}
                >
                  <Img
                    src={img}
                    alt=""
                    fallbacks={[hotel.image]}
                    wrapperClassName="block h-full w-full"
                    imgClassName="block h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-page mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Main column */}
        <div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone sm:text-lg">
            {hotel.description}
          </p>

          {/* Highlights */}
          {hotel.highlights?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">Highlights</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {hotel.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-stone">
                    <i className="fas fa-circle-check text-sage" aria-hidden="true"></i>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Amenities */}
          <div className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {hotel.amenities.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-cream px-3 py-1.5 text-sm text-stone"
                >
                  <i className="fas fa-circle-check text-xs text-plum" aria-hidden="true"></i>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">Rooms &amp; rates</h2>
            <div className="mt-4 space-y-3">
              {hotel.rooms.map((r, i) => {
                const discounted = r.originalPrice > r.pricePerNight;
                const selected = i === selectedRoom;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRoom(i)}
                    className={`w-full rounded-base border p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-plum bg-iris-soft/50 shadow-soft"
                        : "border-line bg-cream hover:border-plum/40"
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-ink">{r.name}</h3>
                        <p className="mt-1 text-sm text-stone">
                          {r.bedType} · {r.maxGuests} {r.maxGuests === 1 ? "guest" : "guests"} · {r.sizeSqm} m²
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl font-semibold text-ink">${r.pricePerNight}</p>
                        {discounted && (
                          <p className="text-xs text-taupe">
                            <span className="line-through">${r.originalPrice}</span>
                            <span className="ml-1.5 font-semibold text-sage">save ${r.originalPrice - r.pricePerNight}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    {r.description && (
                      <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-stone">
                        {r.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Booking panel */}
        <aside className="relative z-20 lg:sticky lg:top-24 lg:-mt-44 lg:self-start">
          <div className="rounded-base border border-line bg-cream p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-3xl font-semibold text-ink">${room.pricePerNight}</p>
                <p className="text-xs text-stone">per night · {formatShort(checkIn) || "select dates"}</p>
              </div>
              <RatingBadge score={hotel.reviewScore} size="sm" />
            </div>

            <div className="mt-5 border-t border-line pt-5">
              <Calendar checkIn={checkIn} checkOut={checkOut} onSelect={({ checkIn: ci, checkOut: co }) => {
                setCheckIn(ci);
                setCheckOut(co);
              }} />
            </div>

            {/* Summary */}
            <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
              <p className="flex justify-between text-stone">
                <span>${room.pricePerNight} × {nights} {nights === 1 ? "night" : "nights"}</span>
                <span>${subtotal}</span>
              </p>
              <p className="flex justify-between text-stone">
                <span>Taxes &amp; fees (est.)</span>
                <span>${taxes}</span>
              </p>
              <p className="flex justify-between border-t border-line pt-2 text-base font-bold text-ink">
                <span>Total</span>
                <span>${total}</span>
              </p>
              <p className="text-right text-[11px] text-taupe">Demo rates · no real charge</p>
            </div>

            <Link
              to={`/checkout/${hotel.id}?${bookQuery.toString()}`}
              className="btn-primary mt-5 !w-full !py-4"
            >
              Reserve
              <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
            </Link>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-stone">
              <i className="fas fa-shield-halved text-plum" aria-hidden="true"></i>
              Free cancellation on select stays
            </p>
          </div>

          {/* Similar stays */}
          {similar.length > 0 && (
            <div className="mt-8 hidden lg:block">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">
                More in {destination?.destName ?? "the area"}
              </h2>
              <div className="mt-4 space-y-4">
                {similar.map((h) => (
                  <Link key={h.id} to={`/hotel/${h.id}`} className="group flex items-center gap-3">
                    <Img
                      src={h.image}
                      alt={h.name}
                      fallbacks={[destination?.image]}
                      wrapperClassName="block h-14 w-14 shrink-0"
                      imgClassName="block h-14 w-14 shrink-0 rounded-sm object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-plum">{h.name}</p>
                      <p className="text-xs text-stone">from ${h.rooms.reduce((a, b) => Math.min(a, b.pricePerNight), Infinity)}/night</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile mobile search strip */}
      <div className="mt-14">
        <div className="container-page">
          <SearchBar compact />
        </div>
      </div>

      {/* Similar grid on mobile */}
      {similar.length > 0 && (
        <div className="mt-14">
          <div className="container-page">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-ink lg:hidden">
              More in {destination?.destName ?? "the area"}
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:hidden">
              {similar.map((h, i) => (
                <HotelCard key={h.id} hotel={h} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetail;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { formatLong } from "../../utils/dates";
import Img from "../Reusable-components/Img";

const BookingConfirmation = () => {
  const { ref } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem("glance-bookings");
        const items = raw ? JSON.parse(raw) : [];
        setBooking(items.find((b) => b.ref === ref) || null);
      } catch {
        setBooking(null);
      }
      setLoading(false);
    }, 500);
  }, [ref]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-cream-alt">
        <div className="flex items-center gap-3 text-stone">
          <i className="fas fa-circle-notch animate-spin text-plum" aria-hidden="true"></i>
          Loading your booking…
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream-alt px-4 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-pill bg-sand text-ink">
          <i className="fa-regular fa-folder-open text-2xl" aria-hidden="true"></i>
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold text-ink">Booking not found</h1>
        <p className="mt-2 max-w-md text-sm text-stone">
          We couldn&apos;t find a booking with reference <span className="font-semibold text-ink">{ref}</span> on this device.
        </p>
        <Link to="/destination" className="btn-primary mt-6 !px-6 !py-3 text-sm">Back to explore</Link>
      </div>
    );
  }

  const firstName = booking.guest.fullName ? booking.guest.fullName.split(" ")[0] : "there";

  return (
    <div className="min-h-screen bg-cream-alt pb-20">
      <div className="border-b border-line bg-ink py-14 text-center text-cream sm:py-20">
        <div className="container-page">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-pill bg-sage text-white shadow-lift"
          >
            <i className="fas fa-check text-3xl" aria-hidden="true"></i>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            Your stay is booked.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 max-w-xl text-base text-cream/80"
          >
            {firstName}, your reservation at {booking.hotelName} is confirmed
            for {formatLong(booking.checkIn)} to {formatLong(booking.checkOut)}.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cream/60">Reference</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-wide text-white">{booking.ref}</p>
          </motion.div>
        </div>
      </div>

      <div className="container-page mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Receipt */}
        <motion.div
          id="receipt"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-24 rounded-base border border-line bg-cream p-6 shadow-card sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
            <div className="sm:flex sm:items-center sm:gap-4">
              <Img
                src={booking.hotelImage}
                alt={booking.hotelName}
                wrapperClassName="block h-16 w-16"
                imgClassName="block h-16 w-16 rounded-sm object-cover"
              />
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{booking.hotelName}</h2>
                <p className="text-sm text-stone">
                  <i className="fas fa-location-dot mr-1.5 text-taupe" aria-hidden="true"></i>
                  {booking.destName}{booking.destCountry ? `, ${booking.destCountry}` : ""}
                </p>
              </div>
            </div>
            <span className="rounded-pill bg-sage/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sage">Confirmed</span>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-taupe">Check-in</dt>
              <dd className="mt-0.5 font-semibold text-ink">{formatLong(booking.checkIn)}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-taupe">Check-out</dt>
              <dd className="mt-0.5 font-semibold text-ink">{formatLong(booking.checkOut)}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-taupe">Nights</dt>
              <dd className="mt-0.5 font-semibold text-ink">{booking.nights} {booking.nights === 1 ? "night" : "nights"}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-taupe">Guests</dt>
              <dd className="mt-0.5 font-semibold text-ink">{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-taupe">Room</dt>
              <dd className="mt-0.5 font-semibold text-ink">{booking.roomName}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-line pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-taupe">Guest details</p>
            <div className="mt-3 grid gap-3 text-sm text-stone sm:grid-cols-3">
              <p><span className="block text-xs text-taupe">Name</span>{booking.guest.fullName}</p>
              <p><span className="block text-xs text-taupe">Email</span>{booking.guest.email}</p>
              <p><span className="block text-xs text-taupe">Phone</span>{booking.guest.phone}</p>
            </div>
            {booking.guest.notes && (
              <p className="mt-3 text-sm text-stone"><span className="block text-xs text-taupe">Special requests</span>{booking.guest.notes}</p>
            )}
          </div>

          <div className="mt-6 rounded-base bg-cream-alt p-5">
            <div className="flex justify-between text-sm">
              <span className="text-stone">{booking.roomName} · ${booking.roomPricePerNight} × {booking.nights}</span>
              <span className="font-semibold text-ink">${booking.roomTotal}</span>
            </div>
            {booking.savings > 0 && (
              <div className="mt-1.5 flex justify-between text-sm text-sage">
                <span>Early-rate savings applied</span>
                <span className="font-semibold">-${booking.savings}</span>
              </div>
            )}
            <div className="mt-1.5 flex justify-between text-sm">
              <span className="text-stone">Taxes &amp; fees (est.)</span>
              <span className="font-semibold text-ink">${booking.taxes}</span>
            </div>
            <div className="mt-3 flex items-end justify-between border-t border-line pt-3">
              <span className="text-sm font-semibold text-ink">Total paid</span>
              <span className="font-display text-3xl font-semibold tracking-tight text-ink">${booking.total}</span>
            </div>
            <p className="mt-2 text-right text-xs text-taupe">Demo booking  no payment was processed.</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 lg:sticky lg:top-24 lg:self-start"
        >
          <div className="rounded-base border border-line bg-cream p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-ink">What happens next</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope mt-0.5 text-plum" aria-hidden="true"></i>
                A confirmation summary ships to {booking.guest.email}.
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-calendar-check mt-0.5 text-plum" aria-hidden="true"></i>
                Your dates are held: {formatLong(booking.checkIn)} → {formatLong(booking.checkOut)}.
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-shield-halved mt-0.5 text-plum" aria-hidden="true"></i>
                Free cancellation on select stays  check before the date.
              </li>
            </ul>
          </div>

          <a href="#receipt" className="btn-ink !w-full !justify-center !py-4">
            View booking
            <i className="fas fa-arrow-down text-xs" aria-hidden="true"></i>
          </a>
          <Link to="/destination" className="btn-ghost !w-full !justify-center !py-4">
            Back to explore
          </Link>
          <Link to="/stays" className="btn-ghost !w-full !justify-center !py-4">
            Browse more stays
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
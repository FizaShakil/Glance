import React, { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getHotelById } from "../../data/hotels";
import { getDestinationById } from "../../data/destinations";
import { formatLong, nightsBetween, toISODate, addDays } from "../../utils/dates";
import RatingBadge from "../Reusable-components/RatingBadge";
import Img from "../Reusable-components/Img";

const TAX_RATE = 0.12;

const Field = ({ id, label, optional = false, error, hint, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
      {label}
      {optional && <span className="ml-1 font-normal text-taupe">(optional)</span>}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700" role="alert">
        <i className="fas fa-circle-exclamation text-xs" aria-hidden="true"></i>
        {error}
      </p>
    ) : hint ? (
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-taupe">{hint}</p>
    ) : null}
  </div>
);

const inputClass = (invalid) =>
  invalid
    ? "w-full rounded-sm border border-red-400 bg-cream px-3.5 py-3 text-base text-ink transition-colors duration-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
    : "w-full rounded-sm border border-line bg-cream px-3.5 py-3 text-base text-ink transition-colors duration-300 focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris-soft";

const Stepper = ({ label, value, min, max, onChange, sub }) => (
  <div className="flex items-center justify-between rounded-sm border border-line bg-cream px-3.5 py-3">
    <div>
      <p className="text-sm font-semibold text-ink">{label}</p>
      {sub && <p className="text-xs text-taupe">{sub}</p>}
    </div>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40"
      >
        <i className="fas fa-minus text-xs" aria-hidden="true"></i>
      </button>
      <span className="min-w-5 text-center font-semibold text-ink">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-plum text-plum transition-colors duration-200 hover:bg-iris-soft disabled:cursor-not-allowed disabled:opacity-40"
      >
        <i className="fas fa-plus text-xs" aria-hidden="true"></i>
      </button>
    </div>
  </div>
);

const BookingCheckout = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hotel = getHotelById(hotelId);
  const destination = hotel ? getDestinationById(hotel.destinationId) : null;

  const today = new Date();
  const [checkIn, setCheckIn] = useState(() => searchParams.get("checkin") || toISODate(today));
  const [checkOut, setCheckOut] = useState(() => searchParams.get("checkout") || toISODate(addDays(today, 1)));
  const [adults, setAdults] = useState(() => parseInt(searchParams.get("adults"), 10) || 2);
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState(() => hotel?.rooms?.[0]?.id || null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const submittingRef = useRef(false);

  const nights = nightsBetween(checkIn, checkOut) || 1;
  const guests = adults + children;

  const room = useMemo(() => hotel?.rooms.find((r) => r.id === roomId) || hotel?.rooms?.[0], [hotel, roomId]);

  if (!hotel) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream-alt px-4 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">We couldn&apos;t find that stay</h1>
        <p className="mt-2 text-sm text-stone">It may have been removed from the catalogue.</p>
        <Link to="/stays" className="btn-primary mt-6 !px-6 !py-3 text-sm">Browse all stays</Link>
      </div>
    );
  }

  const roomTotal = room.pricePerNight * nights;
  const savings = room.originalPrice > room.pricePerNight ? (room.originalPrice - room.pricePerNight) * nights : 0;
  const taxes = Math.round(roomTotal * TAX_RATE);
  const total = roomTotal + taxes;

  const validate = () => {
    const e = {};
    if (!fullName.trim() || fullName.trim().length < 2) e.fullName = "Please enter the lead guest's full name.";
    if (!email.trim()) e.email = "We need an email to send your confirmation.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "That email doesn't look right  please check it.";
    if (!phone.trim()) e.phone = "A contact number helps us reach you about your stay.";
    else if (!/^[+\d][\d\s().-]{6,}$/.test(phone.trim())) e.phone = "Enter a valid phone number, e.g. +1 555 000 1234.";
    if (!checkIn) e.checkIn = "Choose a check-in date.";
    if (!checkOut) e.checkOut = "Choose a check-out date.";
    else if (checkIn && nightsBetween(checkIn, checkOut) <= 0) {
      e.checkOut = "Check-out must be after check-in.";
    }
    return e;
  };

  const handleBlur = (field) => {
    if (!submitAttempted) return;
    setErrors((prev) => ({ ...prev, ...{ [field]: validate()[field] } }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (submittingRef.current || status === "submitting") return;

    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitAttempted(true);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");

    window.setTimeout(() => {
      const ref = `GLN-${hotel.id}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
      const booking = {
        ref,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.image,
        destName: hotel.location,
        destCountry: destination?.country || "",
        starRating: hotel.starRating,
        reviewScore: hotel.reviewScore,
        checkIn,
        checkOut,
        nights,
        adults,
        children,
        guests,
        roomName: room.name,
        roomPricePerNight: room.pricePerNight,
        roomOriginalPrice: room.originalPrice || room.pricePerNight,
        roomTotal,
        savings,
        taxes,
        total,
        guest: { fullName: fullName.trim(), email: email.trim(), phone: phone.trim(), notes: notes.trim() },
        createdAt: new Date().toISOString(),
      };
      try {
        const raw = window.localStorage.getItem("glance-bookings");
        const items = raw ? JSON.parse(raw) : [];
        window.localStorage.setItem("glance-bookings", JSON.stringify([booking, ...items]));
      } catch {
        /* storage unavailable - ignore */
      }
      submittingRef.current = false;
      navigate(`/booking/${ref}`, { replace: true });
    }, 1400);
  };

  const disabled = status === "submitting";

  return (
    <div className="min-h-screen bg-cream-alt pb-28 lg:pb-16">
      <form id="booking-form" onSubmit={handleConfirm} noValidate>
        <div className="border-b border-line bg-ink py-12 text-cream sm:py-16">
          <div className="container-page">
            <Link to={`/hotel/${hotel.id}`} className="text-sm font-semibold text-cream/70 hover:text-cream">
              <i className="fas fa-arrow-left mr-1.5 text-xs" aria-hidden="true"></i>
              Back to stay
            </Link>
            <p className="eyebrow mt-5 !text-cream/60">Secure booking</p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Confirm your stay
            </h1>
            <p className="mt-3 max-w-xl text-sm text-cream/75 sm:text-base">
              Review your details, then confirm. No hidden charges  the total below is what you&apos;ll pay.
            </p>
          </div>
        </div>

        <div className="container-page mt-8 grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
          {/* LEFT: stay + guest info */}
          <div className="space-y-10">
            {/* Stay details */}
            <section aria-labelledby="stay-details-heading">
              <SectionTitle step="1" id="stay-details-heading" title="Stay details" subtitle="Adjust dates, guests, or room without losing your place." />

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field id="checkin" label="Check-in" error={submitAttempted ? errors.checkIn : null}>
                  <input
                    type="date"
                    id="checkin"
                    name="checkin"
                    value={checkIn}
                    min={toISODate(today)}
                    onChange={(e) => { setCheckIn(e.target.value); setErrors((p) => ({ ...p, checkIn: null })); }}
                    disabled={disabled}
                    className={inputClass(submitAttempted && errors.checkIn)}
                    aria-invalid={Boolean(submitAttempted && errors.checkIn)}
                  />
                </Field>
                <Field id="checkout" label="Check-out" error={submitAttempted ? errors.checkOut : null}>
                  <input
                    type="date"
                    id="checkout"
                    name="checkout"
                    value={checkOut}
                    min={checkIn || toISODate(today)}
                    onChange={(e) => { setCheckOut(e.target.value); setErrors((p) => ({ ...p, checkOut: null })); }}
                    disabled={disabled}
                    className={inputClass(submitAttempted && errors.checkOut)}
                    aria-invalid={Boolean(submitAttempted && errors.checkOut)}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Stepper label="Adults" sub="Ages 13+" value={adults} min={1} max={12} onChange={setAdults} />
                <Stepper label="Children" sub="Ages 2-12" value={children} min={0} max={6} onChange={setChildren} />
              </div>
            </section>

            {/* Room picker */}
            <section aria-labelledby="room-heading">
              <SectionTitle step="2" id="room-heading" title="Choose your room" subtitle="Rates shown are per night." />
              <div className="mt-5 space-y-3" role="radiogroup" aria-labelledby="room-heading">
                {hotel.rooms.map((r) => {
                  const selected = room.id === r.id;
                  const discounted = r.originalPrice > r.pricePerNight;
                  return (
                    <label
                      key={r.id}
                      className={`flex cursor-pointer items-start justify-between gap-4 rounded-base border p-4 transition-colors duration-200 ${
                        selected ? "border-plum bg-iris-soft/50 shadow-soft" : "border-line bg-cream hover:border-plum/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="room"
                        value={r.id}
                        checked={selected}
                        onChange={() => { setRoomId(r.id); setErrors((p) => ({ ...p, room: null })); }}
                        disabled={disabled}
                        className="sr-only"
                      />
                      <span>
                        <span className="block font-display text-lg font-semibold text-ink">{r.name}</span>
                        <span className="mt-1 block text-sm text-stone">
                          {r.bedType} · {r.maxGuests} {r.maxGuests === 1 ? "guest" : "guests"} · {r.sizeSqm} m²
                        </span>
                        {discounted && (
                          <span className="mt-1 block text-sm font-semibold text-sage">
                            You save ${r.originalPrice - r.pricePerNight}/night
                          </span>
                        )}
                      </span>
                      <span className="text-right">
                        <span className="block font-display text-xl font-semibold text-ink">${r.pricePerNight}</span>
                        <span className="block text-xs text-taupe">per night</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Guest info */}
            <section aria-labelledby="guest-heading">
              <SectionTitle step="3" id="guest-heading" title="Guest information" subtitle="Who should we hold the stay for?" />
              <div className="mt-5 space-y-4">
                <Field id="fullName" label="Full name" error={submitAttempted ? errors.fullName : null}>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); if (submitAttempted) setErrors((p) => ({ ...p, fullName: validate().fullName })); }}
                    onBlur={() => handleBlur("fullName")}
                    disabled={disabled}
                    placeholder="e.g. Maya Chen"
                    className={inputClass(submitAttempted && errors.fullName)}
                    aria-invalid={Boolean(submitAttempted && errors.fullName)}
                    aria-describedby={submitAttempted && errors.fullName ? "fullName-error" : undefined}
                    required
                  />
                </Field>

                <Field id="email" label="Email address" error={submitAttempted ? errors.email : null} hint="Your confirmation goes here.">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (submitAttempted) setErrors((p) => ({ ...p, email: validate().email })); }}
                    onBlur={() => handleBlur("email")}
                    disabled={disabled}
                    placeholder="maya@example.com"
                    className={inputClass(submitAttempted && errors.email)}
                    aria-invalid={Boolean(submitAttempted && errors.email)}
                    aria-describedby={submitAttempted && errors.email ? "email-error" : "email-hint"}
                    required
                  />
                </Field>

                <Field id="phone" label="Phone number" error={submitAttempted ? errors.phone : null} hint="For last-minute updates about your stay.">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); if (submitAttempted) setErrors((p) => ({ ...p, phone: validate().phone })); }}
                    onBlur={() => handleBlur("phone")}
                    disabled={disabled}
                    placeholder="+1 555 000 1234"
                    className={inputClass(submitAttempted && errors.phone)}
                    aria-invalid={Boolean(submitAttempted && errors.phone)}
                    aria-describedby={submitAttempted && errors.phone ? "phone-error" : "phone-hint"}
                    required
                  />
                </Field>

                <Field id="notes" label="Special requests" optional error={submitAttempted ? errors.notes : null} hint="Allergies, late arrival, ground floor  nice-to-have, not required.">
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={disabled}
                    className={inputClass(false)}
                  />
                </Field>
              </div>
            </section>

            {/* Failure state */}
            {status === "error" && (
              <div className="rounded-base border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                <p className="flex items-center gap-2 font-semibold">
                  <i className="fas fa-triangle-exclamation" aria-hidden="true"></i>
                  Almost there  a few details need attention.
                </p>
                <p className="mt-1 text-red-700">
                  {Object.keys(errors).length > 0
                    ? "Please review the highlighted fields above."
                    : "Something went wrong. Please try confirming again."}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: sticky summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-base border border-line bg-cream p-6 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="sm:flex sm:items-center sm:gap-4">
                  <Img
                    src={hotel.image}
                    alt={hotel.name}
                    fallbacks={[destination?.image]}
                    wrapperClassName="hidden h-16 w-16 sm:block"
                    imgClassName="hidden h-16 w-16 rounded-sm object-cover sm:block"
                  />
                  <div>
                    <Link to={`/hotel/${hotel.id}`} className="font-display text-xl font-semibold leading-snug text-ink hover:text-plum">
                      {hotel.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-stone">
                      <i className="fas fa-location-dot mr-1.5 text-taupe" aria-hidden="true"></i>
                      {hotel.location}{destination ? `, ${destination.country}` : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <RatingBadge score={hotel.reviewScore} count={hotel.reviewCount} size="sm" />
              </div>

              <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
                {checkIn && checkOut && (
                  <div className="flex justify-between">
                    <dt className="text-taupe">Dates</dt>
                    <dd className="font-semibold text-ink">
                      {formatLong(checkIn)} → {formatLong(checkOut)}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-taupe">Guests</dt>
                  <dd className="font-semibold text-ink">
                    {guests} {guests === 1 ? "guest" : "guests"}
                    <span className="text-taupe"> · {nights} {nights === 1 ? "night" : "nights"}</span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-taupe">Room</dt>
                  <dd className="text-right font-semibold text-ink">{room.name}</dd>
                </div>
              </dl>

              {/* Price breakdown */}
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-taupe">Price breakdown</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-stone">{room.name} · ${room.pricePerNight} × {nights}</dt>
                    <dd className="font-semibold text-ink">${roomTotal}</dd>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sage">
                      <dt>Early-rate savings applied</dt>
                      <dd className="font-semibold">-${savings}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-stone">Taxes &amp; fees (est.)</dt>
                    <dd className="font-semibold text-ink">${taxes}</dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-end justify-between border-t border-line pt-4" role="status">
                  <div>
                    <p className="text-xs text-taupe">Total for {nights} {nights === 1 ? "night" : "nights"}</p>
                    <p className="font-display text-4xl font-semibold tracking-tight text-ink">${total}</p>
                  </div>
                  <p className="text-right text-xs text-stone">
                    ${room.pricePerNight}/night
                    <span className="block">incl. taxes</span>
                  </p>
                </div>

                <p className="mt-3 flex items-center gap-1.5 text-xs text-taupe">
                  <i className="fas fa-circle-info" aria-hidden="true"></i>
                  Demo rates  no payment is processed.
                </p>
              </div>

              <button
                type="submit"
                form="booking-form"
                disabled={disabled}
                className="btn-primary mt-6 !w-full !py-4 !text-base"
              >
                {disabled ? (
                  <>
                    <i className="fas fa-circle-notch mr-2 animate-spin" aria-hidden="true"></i>
                    Confirming…
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock mr-2 text-sm" aria-hidden="true"></i>
                    Confirm booking
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-stone">
                <i className="fas fa-shield-halved mr-1 text-plum" aria-hidden="true"></i>
                Free cancellation on select stays.
              </p>
            </div>
          </aside>
        </div>
      </form>

      {/* Mobile: sticky bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-taupe">Total for {nights} {nights === 1 ? "night" : "nights"}</p>
            <p className="font-display text-2xl font-semibold text-ink">${total}</p>
          </div>
          <button
            type="submit"
            form="booking-form"
            disabled={disabled}
            className="btn-primary flex-1 !py-4"
          >
            {disabled ? (
              <>
                <i className="fas fa-circle-notch mr-2 animate-spin" aria-hidden="true"></i>
                Confirming…
              </>
            ) : (
              "Confirm booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const StepPill = ({ step }) => (
  <span className="inline-flex h-9 w-9 items-center justify-center rounded-pill bg-ink font-display text-base font-semibold text-cream">{step}</span>
);

const SectionTitle = ({ step, id, title, subtitle }) => (
  <div className="flex items-start gap-3.5">
    <StepPill step={step} />
    <div>
      <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <p className="text-sm text-stone">{subtitle}</p>
    </div>
  </div>
);

export default BookingCheckout;
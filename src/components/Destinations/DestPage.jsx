import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { destinations, getDestinationById } from "../../data/destinations";
import { getHotelsByDestination } from "../../data/hotels";
import SectionHeading from "../Reusable-components/SectionHeading";
import HotelCard from "../Hotel/HotelCard";
import Img from "../Reusable-components/Img";

const sections = [
  { id: "about", label: "About" },
  { id: "highlights", label: "Why visit" },
  { id: "history", label: "History" },
  { id: "goodtoknow", label: "Good to know" },
  { id: "stays", label: "Stays" },
];

const eye = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } };

const DestPage = () => {
  const { id } = useParams();
  const dest = getDestinationById(Number(id));
  const [active, setActive] = useState("about");

  const stays = useMemo(() => (dest ? getHotelsByDestination(dest.id) : []), [dest]);
  const related = useMemo(
    () => (dest ? destinations.filter((d) => d.id !== dest.id).slice(0, 3) : []),
    [dest]
  );

  const avgRating = stays.length
    ? (stays.reduce((sum, h) => sum + h.reviewScore, 0) / stays.length).toFixed(1)
    : null;

  useEffect(() => {
    if (!dest) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(({ id: sid }) => {
      const el = document.getElementById(sid);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [dest]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dest]);

  if (!dest) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-cream-alt px-4 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">Destination not found</h1>
        <p className="mt-2 text-sm text-stone">It may have moved from our catalogue.</p>
        <Link to="/destination" className="btn-primary mt-6 !px-6 !py-3 text-sm">Explore destinations</Link>
      </div>
    );
  }

  const scrollTo = (sid) => document.getElementById(sid)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="bg-cream pb-20">
      {/* ===== Hero ===== */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <Img
            src={dest.image}
            alt=""
            eager
            fallbacks={dest.gallery}
            wrapperClassName="absolute inset-0 block h-full w-full"
            imgClassName="absolute inset-0 block h-full w-full animate-ken-burns object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/55" />
        </div>

        <div className="container-page relative py-24 text-cream sm:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p className="eyebrow !text-cream/70">
              <i className="fas fa-location-dot mr-1.5" aria-hidden="true"></i>
              {dest.region} · {dest.country}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {dest.destName}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">{dest.tagline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={`/stays?where=${dest.slug}`} className="btn-light !px-7 !py-3.5">
                <i className="fas fa-bed mr-2 text-sm" aria-hidden="true"></i>
                View {stays.length} {stays.length === 1 ? "stay" : "stays"}
              </Link>
              <a href="#stays" className="btn-ghost !border-cream/25 !px-7 !py-3.5 !text-cream hover:!bg-cream/10">
                Plan a stay
              </a>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { label: "Region", value: dest.region },
                { label: "Curated stays", value: `${stays.length}` },
                { label: "Avg. guest rating", value: avgRating ?? "" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/60">{s.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ===== Sticky sub-nav ===== */}
      <nav className="sticky top-[76px] z-40 border-b border-line bg-cream/90 backdrop-blur-md" aria-label="On this page">
        <div className="container-page flex gap-1 overflow-x-auto py-2.5">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`whitespace-nowrap rounded-pill px-4 py-1.5 text-sm transition-colors duration-300 ${
                active === s.id ? "bg-ink text-cream" : "text-stone hover:bg-sand hover:text-ink"
              }`}
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="container-page">
        {/* ===== About ===== */}
        <section id="about" className="scroll-mt-32 py-16 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <motion.div {...eye} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="eyebrow">About the place</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                More than a postcard
              </h2>
              <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">{dest.description}</p>
              <p className="mt-4 text-base leading-relaxed text-stone sm:text-lg">{dest.about}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {dest.knownFor.map((k) => (
                  <span key={k} className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-cream-alt px-3 py-1.5 text-sm text-stone">
                    <i className="fas fa-tag text-plum" aria-hidden="true"></i>
                    {k}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div {...eye} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="grid gap-3 sm:grid-cols-3 lg:grid-cols-2">
              {dest.gallery.slice(0, 4).map((img, i) => (
                <div key={img + i} className={`group relative overflow-hidden rounded-base shadow-soft ${i === 0 ? "sm:col-span-2 lg:col-span-2" : ""} ${i === 0 ? "aspect-[16/10]" : "aspect-square"}`}>
                  <Img
                    src={img}
                    alt={`${dest.destName}  view ${i + 1}`}
                    fallbacks={Array.from({ length: 4 }, (_, j) => dest.gallery[j === i ? 0 : j])}
                    wrapperClassName="block h-full w-full"
                    imgClassName="block h-full w-full object-cover transition-transform duration-[1300ms] ease-out-quart group-hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== Highlights / Why visit ===== */}
        <section id="highlights" className="scroll-mt-32 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Why visit"
            title={`Reasons to choose ${dest.destName}`}
            subtitle="Not a list of features  a sense of what makes this place stick with you."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dest.whyChoose.map((reason, i) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-base border border-line bg-cream-alt p-6 transition-colors duration-300 hover:border-plum/30"
              >
                <span className="font-display text-4xl font-semibold text-plum/35 transition-colors duration-300 group-hover:text-plum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-base font-semibold leading-snug text-ink">{reason}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== History ===== */}
        <section id="history" className="scroll-mt-32 py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-xl bg-ink px-6 py-14 text-cream sm:px-14 sm:py-20">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-plum/40 blur-[100px]" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-iris/25 blur-[100px]" />
            <motion.div {...eye} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative max-w-3xl">
              <p className="eyebrow !text-cream/60">
                <i className="fas fa-scroll mr-2" aria-hidden="true"></i>
                A little history
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                How {dest.destName} came to look this way
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream/80 sm:text-lg">{dest.history}</p>
            </motion.div>
          </div>
        </section>

        {/* ===== Good to know ===== */}
        <section id="goodtoknow" className="scroll-mt-32 py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <p className="eyebrow">Planning notes</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Good to know
              </h2>
              <p className="mt-4 text-base leading-relaxed text-stone">
                Small, practical things that make the first visit smoother  the kind of notes we wish every listing came with.
              </p>
            </div>
            <ul className="space-y-3">
              {dest.goodToKnow.map((tip, i) => (
                <motion.li
                  key={tip}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 rounded-base border border-line bg-cream-alt p-5"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-iris-soft text-plum">
                    <i className="fas fa-circle-info text-sm" aria-hidden="true"></i>
                  </span>
                  <p className="text-sm leading-relaxed text-stone sm:text-base">{tip}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== Stays ===== */}
        <section id="stays" className="scroll-mt-32 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Where to stay"
            title={`Stays in ${dest.destName}`}
            subtitle="Hotels we've shortlisted in this destination, with clear rates and honest demo reviews."
            action={{ to: `/stays?where=${dest.slug}`, label: "View all stays in destination" }}
          />
          {stays.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stays.map((hotel, i) => (
                <HotelCard key={hotel.id} hotel={hotel} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-base border border-dashed border-line bg-cream-alt p-14 text-center">
              <p className="text-sm text-stone">We&apos;re still curating stays here. Check back soon.</p>
            </div>
          )}
        </section>

        {/* ===== Related ===== */}
        <section className="py-16 sm:py-20">
          <SectionHeading eyebrow="Keep exploring" title="Other destinations" />
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/destpage/${d.id}`} className="group relative block h-52 overflow-hidden rounded-base shadow-soft transition-shadow duration-500 hover:shadow-card">
                  <Img
                    src={d.image}
                    alt={d.destName}
                    fallbacks={d.gallery}
                    wrapperClassName="block h-full w-full"
                    imgClassName="block h-full w-full object-cover transition-transform duration-[1300ms] ease-out-quart group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/70">{d.country}</p>
                    <h3 className="font-display text-xl font-semibold text-white">{d.destName}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DestPage;
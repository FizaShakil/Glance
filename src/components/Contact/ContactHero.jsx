import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 * i },
  }),
};

const chips = [
  { icon: "fa-solid fa-envelope", value: "hello@glance.travel" },
  { icon: "fa-solid fa-phone", value: "+1 212 555 0148" },
  { icon: "fa-solid fa-clock", value: "Mon–Fri, 9:00–18:00" },
];

const ContactHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-plum/30 blur-[100px]" />
      <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-iris/25 blur-[100px]" />

      <div className="container-page relative py-20 text-center text-cream sm:py-28">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <p className="eyebrow !text-cream/70">
            <i className="fa-solid fa-paper-plane mr-1.5" aria-hidden="true"></i>
            Contact us
          </p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Say hello — we answer.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            A question about a stay, the demo, or where it&apos;s all headed?
            Pick a channel and we&apos;ll get back to you within a day.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          {chips.map((c) => (
            <span
              key={c.value}
              className="inline-flex items-center gap-2 rounded-pill border border-cream/15 bg-cream/5 px-4 py-2 text-sm text-cream/85 backdrop-blur-md"
            >
              <i className={`${c.icon} text-xs text-sage`} aria-hidden="true"></i>
              {c.value}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
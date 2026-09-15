import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is this a real booking service?",
    a: "No — Glance is a design demo. Prices, ratings, and the booking flow are illustrative, and no payments are processed or charged.",
  },
  {
    q: "How are stays chosen for the catalogue?",
    a: "Each stay is hand-picked for a destination and presented with the same consistent layout — location, rating, what makes it special, and a clear price breakdown.",
  },
  {
    q: "Can I actually reserve a room through the site?",
    a: "You can walk the entire experience — search, checkout, and confirmation — but it's a simulated booking stored only in your browser. Nothing is sent anywhere.",
  },
  {
    q: "What makes Glance different from the big booking sites?",
    a: "Fewer, better-chosen options, honest totals shown before checkout, and a calm, focused flow from discovery to confirmation.",
  },
];

const ContactFaq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-cream-alt py-20 sm:py-28">
      <div className="container-page mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow mb-3">Common questions</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Before you write to us
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`overflow-hidden rounded-base border transition-colors duration-300 ${
                  active ? "border-plum/40 bg-cream shadow-soft" : "border-line bg-cream"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(active ? null : i)}
                  aria-expanded={active}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-lg font-semibold text-ink">{f.q}</span>
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      active ? "bg-plum text-cream" : "bg-iris-soft text-plum"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${active ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-stone">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactFaq;
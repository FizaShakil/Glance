import React from "react";
import { motion } from "framer-motion";

const channels = [
  {
    icon: "fa-solid fa-envelope",
    title: "Email",
    value: "hello@glance.travel",
    note: "Best for detailed questions",
    href: "mailto:hello@glance.travel",
  },
  {
    icon: "fa-solid fa-phone",
    title: "Phone",
    value: "+1 212 555 0148",
    note: "Mon–Fri, 9:00–18:00",
    href: "tel:+12125550148",
  },
  {
    icon: "fa-solid fa-comments",
    title: "Live chat",
    value: "In the corner, when online",
    note: "Average reply: a few minutes",
    href: null,
  },
  {
    icon: "fa-solid fa-location-dot",
    title: "Studio",
    value: "123 Developer Street, Code City",
    note: "By appointment only",
    href: null,
  },
];

const ContactCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {channels.map((c, i) => (
        <motion.a
          key={c.title}
          href={c.href ?? undefined}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className={`group rounded-base border border-line bg-cream p-6 shadow-soft transition-all duration-500 ease-out-quart hover:-translate-y-1 hover:shadow-card ${
            c.href ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-pill bg-iris-soft text-plum transition-colors duration-300 group-hover:bg-plum group-hover:text-cream">
            <i className={`${c.icon} text-base`} aria-hidden="true"></i>
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{c.title}</h3>
          <p className="mt-1 text-sm font-medium text-ink/80">{c.value}</p>
          <p className="mt-1 text-xs text-stone">{c.note}</p>
        </motion.a>
      ))}
    </div>
  );
};

export default ContactCards;
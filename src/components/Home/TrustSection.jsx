import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "Secure booking flow",
    text: "Checkout keeps your details private. (This demo doesn't take real payments.)",
  },
  {
    icon: "fa-solid fa-rotate-left",
    title: "Flexible before you go",
    text: "Change your mind up to your check-in on select stays.",
  },
  {
    icon: "fa-solid fa-wrench",
    title: "Support that answers",
    text: "Human help by email and social, before and during your trip.",
  },
];

const TrustSection = () => {
  return (
    <section className="border-y border-line bg-cream py-14">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4"
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-iris-soft text-plum">
                <i className={`${item.icon} text-base`} aria-hidden="true"></i>
              </span>
              <div>
                <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
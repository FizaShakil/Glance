import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

const quickLinks = [
  { label: "View destinations", to: "/destination", icon: "fa-solid fa-location-dot" },
  { label: "Browse all stays", to: "/stays", icon: "fa-solid fa-building" },
  { label: "About Glance", to: "/aboutus", icon: "fa-solid fa-compass" },
];

const ContactSection = () => {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-3">
            <i className="fa-solid fa-paper-plane mr-1.5" aria-hidden="true"></i>
            Contact
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            A question about a stay? Say hello.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-stone sm:text-lg">
            Whether it&apos;s a detail we missed or an idea for a destination,
            we read everything and reply within a working day.
          </p>
          <div className="mt-8 space-y-3">
            {quickLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group flex items-center gap-3 text-sm font-semibold text-ink transition-colors hover:text-plum"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-pill bg-iris-soft text-plum transition-colors duration-300 group-hover:bg-plum group-hover:text-cream">
                  <i className={`${l.icon} text-xs`} aria-hidden="true"></i>
                </span>
                {l.label}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <i className="fa-solid fa-arrow-right text-xs text-taupe" aria-hidden="true"></i>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-stone">
            Prefer email? {" "}
            <a href="mailto:hello@glance.travel" className="font-semibold text-iris hover:text-iris-deep">
              hello@glance.travel
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-base border border-line bg-cream-alt p-6 shadow-soft sm:p-8">
            <ContactForm compact />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
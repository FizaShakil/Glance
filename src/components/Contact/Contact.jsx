import React from "react";
import { motion } from "framer-motion";
import ContactHero from "./ContactHero";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import ContactFaq from "./ContactFaq";

const Contact = () => {
  return (
    <div className="bg-cream">
      <ContactHero />

      <section className="container-page py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <p className="eyebrow mb-3">The details</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Pick the channel that suits you
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-stone">
              We reply fastest by email, and we read everything. If it&apos;s a bug
              or a design gripe, even better  that&apos;s how demos improve.
            </p>
            <div className="mt-8">
              <ContactCards />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="rounded-base border border-line bg-cream-alt p-6 shadow-soft sm:p-8">
              <div className="mb-6">
                <p className="eyebrow mb-2">Write to us</p>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  Start a conversation
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  Fill in the form and we&apos;ll come back to you within a working
                  day.
                </p>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      <ContactFaq />
    </div>
  );
};

export default Contact;
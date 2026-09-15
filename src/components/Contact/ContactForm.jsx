import React, { useState } from "react";

const initial = { name: "", email: "", topic: "Stays & booking", message: "" };

const FIELD_STYLES =
  "w-full rounded-sm border border-line bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-stone/70 transition-all duration-200 focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris-soft";
const LABEL_STYLES =
  "mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-taupe";

const validate = (values) => {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "A message helps us point you in the right direction.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Give us a touch more detail (at least 10 characters).";
  }
  return errors;
};

const ContactForm = ({ compact = false }) => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors(validate({ ...values, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1200);
  };

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-base border border-sage/40 bg-cream-alt p-10 text-center shadow-soft">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
          <i className="fa-solid fa-check text-2xl" aria-hidden="true"></i>
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
          Message delivered
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone">
          Thanks {values.name.trim().split(" ")[0] || "for writing in"} — we&apos;ll
          reply to {values.email.trim()} within one working day.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initial);
            setErrors({});
            setTouched({});
            setStatus("idle");
          }}
          className="btn-ghost mt-6"
        >
          Send another message
          <i className="fas fa-rotate-left text-xs" aria-hidden="true"></i>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={LABEL_STYLES} htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={`${FIELD_STYLES} ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 text-xs font-medium text-red-500">
                <i className="fa-solid fa-circle-exclamation mr-1" aria-hidden="true"></i>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className={LABEL_STYLES} htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={`${FIELD_STYLES} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 text-xs font-medium text-red-500">
                <i className="fa-solid fa-circle-exclamation mr-1" aria-hidden="true"></i>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className={LABEL_STYLES} htmlFor="contact-topic">
            Topic
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={values.topic}
            onChange={handleChange}
            className={FIELD_STYLES}
          >
            <option>Stays &amp; booking</option>
            <option>Suggested destinations</option>
            <option>Partnerships</option>
            <option>Something else</option>
          </select>
        </div>

        <div>
          <label className={LABEL_STYLES} htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Write your message here…"
            rows={compact ? 4 : 6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${FIELD_STYLES} resize-none ${errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
          ></textarea>
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-xs font-medium text-red-500">
              <i className="fa-solid fa-circle-exclamation mr-1" aria-hidden="true"></i>
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary !w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" aria-hidden="true"></span>
              Sending…
            </>
          ) : (
            <>
              Send message
              <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true"></i>
            </>
          )}
        </button>

        <p className="text-center text-xs text-taupe">
          Demo form — nothing is actually emailed to anyone.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
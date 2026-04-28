import React, { useState, useEffect, useCallback } from 'react';
import '@fontsource/krona-one';
import '@fontsource/montserrat';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
  FaWarehouse,
  FaIndustry,
  FaFlag,
  FaCalendarCheck,
  FaTimes,
  FaCheckCircle,
  FaUser,
  FaCommentAlt,
} from 'react-icons/fa';

/* ─── DATA ───────────────────────────────────────────────── */
const presenceCards = [
  {
    title: 'Company in Lithuania',
    icon: FaFlag,
    gradient: 'from-[#1b4d96] to-[#2e73ca]',
    shadow: 'shadow-blue-400/40',
  },
  {
    title: 'Warehouse in Netherlands',
    icon: FaWarehouse,
    gradient: 'from-[#c16a2d] to-[#e39255]',
    shadow: 'shadow-orange-400/40',
  },
  {
    title: 'Manufacturing Base in India',
    icon: FaIndustry,
    gradient: 'from-[#2f7b4a] to-[#4ba86b]',
    shadow: 'shadow-green-400/40',
  },
];

/* ─── APPOINTMENT MODAL ──────────────────────────────────── */
const AppointmentModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use dev backend in development, prod in production; allow override via VITE_BACKEND_API_URL
  const BACKEND_URL = (import.meta.env.VITE_BACKEND_API_URL && import.meta.env.VITE_BACKEND_API_URL.trim())
    ? import.meta.env.VITE_BACKEND_API_URL.replace(/\/+$/, '')
    : (import.meta.env.DEV ? 'http://localhost:5000' : 'https://konnect-be.vercel.app');

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Contact number is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    return errs;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          handleReset();
        }, 2500);
      } else {
        const errorData = await res.json();
        setErrors({ submit: errorData.error || 'Failed to submit appointment' });
      }
    } catch (err) {
      console.error('Appointment submission error:', err);
      setErrors({ submit: 'Failed to submit appointment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', phone: '', email: '', message: '' });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(8,20,50,0.70)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Card */}
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl"
        style={{
          background: 'linear-gradient(158deg, #fff 0%, #fdf6e8 60%, #f5e4c0 100%)',
          border: '1px solid rgba(210,175,90,0.5)',
          boxShadow: '0 32px 80px rgba(8,20,50,0.55)',
          animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Modal Header */}
        <div
          className="relative px-7 pb-5 pt-6"
          style={{
            background: 'linear-gradient(135deg,#0c1e40 0%,#163b75 100%)',
            borderBottom: '2px solid #c9933a',
          }}
        >
          {/* Gold top bar */}
          <div
            className="absolute left-0 right-0 top-0 h-[3px]"
            style={{ background: 'linear-gradient(90deg,#c9933a,#f6cf6b,#c9933a)' }}
          />

          <div className="mb-1.5 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#c9933a]" />
            <span
              className="text-[10px] font-bold tracking-[0.2em] text-[#f0d080]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              INTERPACK 2026 · STAND 7aC10
            </span>
          </div>

          <h2
            id="modal-title"
            className="text-xl font-normal text-white md:text-2xl"
            style={{ fontFamily: "'Krona One', sans-serif" }}
          >
            Schedule an Appointment
          </h2>
          <p
            className="mt-1 text-xs text-[#a8c0dc]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            We'll confirm your slot within 24 hours.
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-7 py-6">
          {!submitted ? (
            <>
              {/* Name */}
              <Field
                label="Full Name"
                required
                icon={<FaUser size={12} className="text-[#12478b]" />}
                error={errors.name}
              >
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="field-input"
                  style={inputStyle(errors.name)}
                />
              </Field>

              {/* Phone */}
              <Field
                label="Contact Number"
                required
                icon={<FaPhoneAlt size={12} className="text-[#12478b]" />}
                error={errors.phone}
              >
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  style={inputStyle(errors.phone)}
                />
              </Field>

              {/* Email */}
              <Field
                label="Email Address"
                required
                icon={<FaEnvelope size={12} className="text-[#12478b]" />}
                error={errors.email}
              >
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  style={inputStyle(errors.email)}
                />
              </Field>

              {/* Message */}
              <Field
                label="Message"
                optional
                icon={<FaCommentAlt size={12} className="text-[#12478b]" />}
              >
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what you'd like to discuss…"
                  rows={3}
                  style={{ ...inputStyle(), resize: 'vertical' }}
                />
              </Field>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full py-3.5 text-sm font-bold tracking-[0.12em] text-[#0c1e40] transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(90deg,#c8882a 0%,#f4d060 50%,#c8882a 100%)',
                  backgroundSize: '200% 100%',
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: '0 6px 24px rgba(150,90,0,0.30)',
                }}
              >
                {isSubmitting ? 'SUBMITTING...' : 'CONFIRM APPOINTMENT →'}
              </button>
              {errors.submit && (
                <p className="mt-3 text-center text-sm text-red-600" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {errors.submit}
                </p>
              )}
            </>
          ) : (
            /* Success State */
            <div className="flex flex-col items-center py-6 text-center">
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full text-white"
                style={{ background: 'linear-gradient(135deg,#2f7b4a,#4ba86b)', boxShadow: '0 8px 24px rgba(47,123,74,0.35)' }}
              >
                <FaCheckCircle size={30} />
              </div>
              <h3
                className="mb-2 text-xl text-[#0c1e40]"
                style={{ fontFamily: "'Krona One', sans-serif" }}
              >
                Appointment Requested!
              </h3>
              <p
                className="mb-6 text-sm leading-relaxed text-[#5a4a2a]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Thank you, <strong>{form.name}</strong>. Our team will reach out to{' '}
                <strong>{form.email}</strong> within 24 hours to confirm your meeting at{' '}
                <strong>Stand 7aC10</strong>.
              </p>
              <button
                onClick={handleReset}
                className="rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg,#0c1e40,#163b75)',
                  fontFamily: "'Montserrat', sans-serif",
                  boxShadow: '0 4px 16px rgba(8,20,50,0.30)',
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        input, textarea {
          width: 100%;
          background: rgba(255,255,255,0.9);
          border-radius: 12px;
          padding: 10px 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: #1a2035;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        input::placeholder, textarea::placeholder { color: #a8997a; }
        input:focus, textarea:focus {
          border-color: #c9933a !important;
          box-shadow: 0 0 0 3px rgba(201,147,58,0.18) !important;
        }
      `}</style>
    </div>
  );
};

/* ─── FIELD WRAPPER ──────────────────────────────────────── */
const Field = ({ label, required, optional, icon, error, children }) => (
  <div className="mb-4">
    <label
      className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#12478b]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {icon}
      {label}
      {required && <span className="text-[#c9933a]">*</span>}
      {optional && <span className="font-normal normal-case tracking-normal text-[#a8997a]">(optional)</span>}
    </label>
    {children}
    {error && (
      <p className="mt-1 text-[11px] text-red-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {error}
      </p>
    )}
  </div>
);

/* ─── INPUT STYLE HELPER ─────────────────────────────────── */
const inputStyle = (error) => ({
  border: `1.5px solid ${error ? '#ef4444' : '#dcc98a'}`,
});

/* ─── DIAMOND DIVIDER ────────────────────────────────────── */
const DiamondDivider = () => (
  <div className="my-7 flex items-center gap-3">
    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,#d4b87a,transparent)' }} />
    <div className="h-2 w-2 rotate-45 bg-[#c9933a]" />
    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,#d4b87a,transparent)' }} />
  </div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const InterpackEvent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      {/* ── PAGE ── */}
      <main
        className="flex min-h-screen items-start justify-center px-4 pb-12 pt-10 md:pt-14"
        style={{
          background: 'radial-gradient(ellipse at 30% 0%, #f5dfa0 0%, #e8c96a 30%, #8a6010 65%, #0c1e40 100%)',
        }}
      >
        {/* ── CARD ── */}
        <section
          className="w-full max-w-3xl overflow-hidden rounded-[28px]"
          style={{
            background: 'linear-gradient(158deg, rgba(255,255,255,0.97) 0%, rgba(253,246,232,0.95) 55%, rgba(240,220,170,0.93) 100%)',
            border: '1px solid rgba(210,175,100,0.6)',
            boxShadow: '0 32px 80px rgba(8,20,50,0.45), 0 2px 0 rgba(255,255,255,0.9) inset',
            position: 'relative',
          }}
        >
          {/* Gold top bar */}
          <div
            className="h-1 w-full"
            style={{ background: 'linear-gradient(90deg,#c9933a 0%,#f6cf6b 40%,#e8a830 70%,#c9933a 100%)' }}
          />

          <div className="px-5 pb-8 pt-8 md:px-10 md:pb-10 lg:px-14">

            {/* ── HEADER ── */}
            <header className="text-center">
              {/* Badge */}
              <div className="mb-2.5 flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,transparent,#c9933a)' }} />
                <span
                  className="text-[11px] font-bold tracking-[0.22em] text-[#12478b]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  KONNECT PACKAGING
                </span>
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#c9933a,transparent)' }} />
              </div>

              <h1
                className="text-2xl leading-tight text-[#0c1e40] md:text-[2.1rem]"
                style={{ fontFamily: "'Krona One', sans-serif" }}
              >
                International UAB – Lithuania
              </h1>

              <p
                className="mt-5 text-base text-[#5a4a2a] md:text-lg"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, letterSpacing: '0.04em' }}
              >
                We are proud to participate at
              </p>

              {/* Interpack pill */}
              <div className="mt-3 flex justify-center">
                <div
                  className="inline-flex items-center rounded-full px-8 py-3 md:px-12 md:py-4"
                  style={{
                    background: 'linear-gradient(135deg,#fff8e6 0%,#fdf0cc 100%)',
                    border: '1.5px solid #d4a83a',
                    boxShadow: '0 4px 24px rgba(180,130,20,0.18), 0 1px 0 rgba(255,255,255,0.8) inset',
                  }}
                >
                  <span
                    className="text-2xl text-[#0c1e40] md:text-4xl"
                    style={{ fontFamily: "'Krona One', sans-serif", letterSpacing: '-0.01em' }}
                  >
                    interpack 2026
                  </span>
                </div>
              </div>

              {/* Meta pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {[
                  { icon: <FaCalendarAlt className="text-[#12478b]" />, text: '07 – 13 May 2026' },
                  { icon: <FaMapMarkerAlt className="text-[#12478b]" />, text: 'Messe Düsseldorf, Germany' },
                ].map(({ icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      border: '1px solid #e5cc94',
                      boxShadow: '0 2px 10px rgba(140,100,20,0.10)',
                    }}
                  >
                    {icon}
                    <span
                      className="text-sm font-semibold text-[#22283a] md:text-base"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </header>

            <DiamondDivider />

            {/* ── GLOBAL PRESENCE ── */}
            <section
              className="relative overflow-hidden rounded-2xl p-5 md:p-7"
              style={{
                background: 'linear-gradient(180deg,rgba(255,255,255,0.65) 0%,rgba(240,220,165,0.55) 100%)',
                border: '1px solid #e4cd9a',
              }}
            >
              {/* dot texture */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, #d4b060 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                  opacity: 0.07,
                }}
              />

              <h2
                className="mb-5 text-center text-xl text-[#0c1e40] md:text-2xl"
                style={{ fontFamily: "'Krona One', sans-serif" }}
              >
                Global Presence
              </h2>

              <div className="grid gap-4 sm:grid-cols-3">
                {presenceCards.map(({ title, icon: Icon, gradient, shadow }) => (
                  <article
                    key={title}
                    className="group flex flex-col items-center rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,252,240,0.97)',
                      border: '1px solid #e4cc90',
                      boxShadow: '0 4px 16px rgba(100,70,10,0.10)',
                    }}
                  >
                    {/* On mobile, lay out horizontally */}
                    <div className="flex flex-row items-center gap-4 sm:flex-col sm:gap-0">
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white shadow-lg ${shadow} sm:mb-3`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <p
                        className="text-sm font-semibold leading-snug text-[#1f2530] md:text-[15px]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {title}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <DiamondDivider />

            {/* ── STAND BANNER ── */}
            <div className="flex justify-center">
              <div
                className="relative w-full max-w-xl overflow-hidden rounded-full px-8 py-4 text-center"
                style={{
                  background: 'linear-gradient(90deg,#c8882a 0%,#f4d060 35%,#f6c83a 55%,#e4a020 80%,#c8882a 100%)',
                  boxShadow: '0 8px 32px rgba(140,80,0,0.35), 0 1px 0 rgba(255,255,255,0.4) inset',
                }}
              >
                {/* Shimmer */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.28) 50%,transparent 100%)',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
                <span
                  className="relative text-xl font-normal tracking-wide text-[#0c1e40] md:text-2xl"
                  style={{ fontFamily: "'Krona One', sans-serif" }}
                >
                  VISIT US AT STAND 7aC10
                </span>
              </div>
            </div>

            {/* ── CONTACT ROW ── */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {[
                { href: 'https://www.konnectpackaging.com', icon: <FaGlobe />, label: 'www.konnectpackaging.com' },
                { href: 'tel:+37069912345', icon: <FaPhoneAlt />, label: '+370 699 12345' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#10274d] transition-colors hover:text-[#c9933a] md:text-base"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="text-[#12478b]">{icon}</span>
                  {label}
                </a>
              ))}
            </div>

            {/* ── SCHEDULE BUTTON ── */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={openModal}
                className="flex w-full max-w-xl items-center justify-center gap-3 rounded-full px-8 py-4 font-bold tracking-[0.1em] text-[#f6e2a8] transition-all hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9933a]"
                style={{
                  background: 'linear-gradient(135deg,#0c1e40 0%,#1b4580 100%)',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '14px',
                  boxShadow: '0 6px 24px rgba(8,20,50,0.35)',
                }}
              >
                <FaCalendarCheck size={18} aria-hidden="true" />
                SCHEDULE AN APPOINTMENT
              </button>
            </div>

            {/* ── FOOTER ── */}
            <footer
              className="mt-7 rounded-2xl px-5 py-5 text-center"
              style={{
                background: 'linear-gradient(135deg,#0c1e40 0%,#132c57 100%)',
                border: '1px solid rgba(200,170,80,0.22)',
              }}
            >
              <p
                className="text-xs font-semibold tracking-[0.07em] text-[#f0d89a] md:text-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Global Anti-Corrosion Packaging Solutions &nbsp;|&nbsp; VCI &nbsp;|&nbsp; Sustainable Export Ready
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-2">
                {[
                  { href: 'mailto:info@konnectpackaging.com', icon: <FaEnvelope />, label: 'info@konnectpackaging.com' },
                  { href: 'tel:+37069912345', icon: <FaPhoneAlt />, label: '+370 699 12345' },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="inline-flex items-center gap-2 text-xs text-[#c8daee] transition-colors hover:text-[#f6cf6b] md:text-sm"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="text-[#7a9ec0]">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </footer>

          </div>
        </section>
      </main>

      {/* ── MODAL ── */}
      <AppointmentModal isOpen={modalOpen} onClose={closeModal} />

      {/* Global shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  );
};

export default InterpackEvent;
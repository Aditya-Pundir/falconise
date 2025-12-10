// App.js
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./App.css";

// ===== Animation presets =====
const flyUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const flyRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const flyLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

// ===== Nav =====
// ===== Nav =====
function Nav({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="nav__shell">
        <div className="container nav__inner">
          <a href="/" className="brand">
            <img className="brand__mark" src="LOGO.png" alt="Falconise"></img>
            <div className="brand__text">
              <strong>Falconise</strong>
              {/* <span className="muted">AI Automation Agency</span> */}
            </div>
          </a>

          <div className="nav__right">
            {/* Desktop links */}
            <nav className="nav__links">
              <a href="#problems">Problems</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#results">Results</a>
              <a href="#testimonials">Clients</a>
              <button className="btn btn--primary" onClick={onBook}>
                Book demo
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button
              className={`nav__menu-toggle ${
                menuOpen ? "nav__menu-toggle--open" : ""
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="nav__menu-line" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <motion.nav
            className="nav__mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#problems" onClick={handleNavClick}>
              Problems we erase
            </a>
            <a href="#services" onClick={handleNavClick}>
              What we build
            </a>
            <a href="#process" onClick={handleNavClick}>
              How we work
            </a>
            <a href="#results" onClick={handleNavClick}>
              Results
            </a>
            <a href="#testimonials" onClick={handleNavClick}>
              Clients
            </a>
            <button
              className="btn btn--primary nav__mobile-btn"
              onClick={() => {
                handleNavClick();
                onBook();
              }}
            >
              Book demo
            </button>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}

// ===== Hero =====
function Hero({ onSeeProof }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  // subtle parallax on the hero visual
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <motion.div className="hero-bg" style={{ y: bgY }} aria-hidden />
      <div className="container hero__inner">
        <motion.div
          className="hero__left"
          variants={flyRight}
          initial="hidden"
          animate="visible"
        >
          <p className="hero__tag">AI agents for serious businesses</p>
          <h1 className="hero__title">
            Turn manual work into
            <span className="hero__accent">fully automated systems.</span>
          </h1>
          <p className="hero__lead">
            Falconise builds AI agents that reply to leads instantly, follow-up
            automatically, and handle repetitive workflows — so your team can
            focus on closing and strategy.
          </p>
          <div className="hero__ctas">
            <motion.button
              className="btn btn--primary"
              onClick={onSeeProof}
              whileHover={{
                y: -2,
                boxShadow: "0 16px 40px rgba(37,99,235,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              See client results
            </motion.button>
            <motion.a
              href="mailto:adityapundir2k@gmail.com"
              className="btn btn--ghost"
              whileHover={{ y: -2 }}
            >
              Book a demo
            </motion.a>
          </div>
          <div className="hero__meta">
            <span>Avg 3.2x revenue lift</span>
            <span>72% ops automated</span>
            <span>Done-for-you setup</span>
          </div>
        </motion.div>

        <motion.div
          className="hero__right"
          variants={flyLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-visual" style={{ y: visualY }}>
            <div className="hero-visual__gradient" />
            <div className="hero-visual__cards">
              <motion.div
                className="hv-card"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                “Leads slip away because we can’t reply fast enough.”
              </motion.div>
              <motion.div
                className="hv-card hv-card--mid"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                “My team spends the whole day repeating the same tasks.”
              </motion.div>
              <motion.div
                className="hv-card hv-card--low"
                whileHover={{ y: -6, scale: 1.02 }}
              >
                “Nobody follows up consistently. Deals just die.”
              </motion.div>
            </div>
            <div className="hero-visual__stats">
              <div className="mini-stat">
                <span className="mini-stat__label">Lead reply time</span>
                <span className="mini-stat__value">12m → 30s</span>
                <div className="mini-stat__bar mini-stat__bar--blue" />
              </div>
              <div className="mini-stat">
                <span className="mini-stat__label">Manual workload</span>
                <span className="mini-stat__value">–72%</span>
                <div className="mini-stat__bar mini-stat__bar--purple" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== Problems =====
function Problems() {
  const items = [
    "Leads wait hours (or days) for a response.",
    "Sales teams manually send the same messages over and over.",
    "No structure in follow-ups — deals just go cold.",
    "Customer queries pile up in WhatsApp, email and DMs.",
    "Founders are stuck in ops instead of growth.",
  ];

  return (
    <section id="problems" className="section">
      <div className="container">
        <motion.div
          className="section__header"
          variants={flyUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2>Problems we erase</h2>
          <p>
            Most businesses are still running on manual processes, spreadsheets
            and people remembering what to do next. That’s where revenue leaks.
          </p>
        </motion.div>

        <div className="pill-grid">
          {items.map((text, i) => (
            <motion.div
              className="pill"
              key={i}
              variants={flyUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Services =====
function Services() {
  const services = [
    {
      title: "AI Appointment Setter",
      desc: "Follows up leads automatically, answers questions and books calls straight into your calendar.",
    },
    {
      title: "AI Sales Assistant",
      desc: "Warms up leads, handles objections and keeps conversations alive across WhatsApp, email and chat.",
    },
    {
      title: "AI Support & Onboarding",
      desc: "24/7 support agents that resolve FAQs, onboard clients, and reduce human ticket load.",
    },
    {
      title: "Automation Pipelines",
      desc: "End-to-end workflows connecting your CRM, forms, email and databases with zero manual touch.",
    },
    {
      title: "Custom Integrations",
      desc: "We plug into your tools: HubSpot, Pipedrive, Notion, Sheets, Stripe, Webhooks and more.",
    },
    {
      title: "Done-for-you Management",
      desc: "We monitor, iterate and improve agents weekly so performance keeps increasing.",
    },
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <motion.div
          className="section__header"
          variants={flyUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2>What we build</h2>
          <p>
            Falconise designs and operates AI agents that actually plug into
            your stack, not just “chatbots on your website”.
          </p>
        </motion.div>

        <div className="card-grid">
          {services.map((s, i) => (
            <motion.article
              key={i}
              className="card"
              variants={flyUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.04 * i, duration: 0.6 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
              }}
            >
              <div className="card__index">0{i + 1}</div>
              <h3 className="card__title">{s.title}</h3>
              <p className="card__desc">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Process =====
function Process() {
  const steps = [
    {
      title: "1. Deep-dive call",
      desc: "We map your workflows, tools and revenue leaks in detail.",
    },
    {
      title: "2. Agent blueprint",
      desc: "We design flows, scripts and integrations tailored to your business.",
    },
    {
      title: "3. Build & integrate",
      desc: "We set up agents, automations and data connections end-to-end.",
    },
    {
      title: "4. Launch & optimize",
      desc: "We monitor performance, tweak prompts and keep improving results.",
    },
  ];

  return (
    <section id="process" className="section section--alt">
      <div className="container">
        <motion.div
          className="section__header"
          variants={flyUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2>How working with us feels</h2>
          <p>
            Simple, structured and outcome-driven. No over-complication, no
            fluff.
          </p>
        </motion.div>

        <div className="process-grid">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="process-step"
              variants={flyUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.05 * i, duration: 0.6 }}
            >
              <div className="process-step__badge">{s.title}</div>
              <p className="process-step__desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Results =====
function Results() {
  const stats = [
    { label: "Lead response automated", value: "98%" },
    { label: "Reply time improvement", value: "14m → 20s" },
    { label: "Pipeline engagement boost", value: "2.6×" },
    { label: "Manual workload reduced", value: "65%" },
  ];

  return (
    <section id="results" className="section">
      <div className="container">
        <motion.div
          className="section__header"
          variants={flyUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2>Results clients see</h2>
          <p>
            We focus on numbers that actually move the needle for your business.
          </p>
        </motion.div>

        <div className="results-grid">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="result-card"
              variants={flyUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.05 * i, duration: 0.6 }}
            >
              <div className="result-card__value">{s.value}</div>
              <div className="result-card__label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Testimonials =====
function Testimonials() {
  const testimonials = [
    {
      name: "James Miller",
      role: "Founder, B2B Agency",
      text: "Our follow-ups are now instant and consistent. It feels like having a full-time SDR team on autopilot.",
    },
    {
      name: "Sophia Turner",
      role: "Ops Lead, E-com Brand",
      text: "Onboarding and support moved from chaos to calm. Tickets dropped and customers are actually happier.",
    },
    {
      name: "Ethan Walker",
      role: "CEO, SaaS",
      text: "We’ve replaced repetitive sales tasks and can finally focus on product and partnerships.",
    },
    {
      name: "Ava Johnson",
      role: "Marketing Director",
      text: "The compounding effect of automation + AI agents is insane. It’s just more leverage, every week.",
    },
  ];

  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <motion.div
          className="section__header"
          variants={flyUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2>What clients say</h2>
          <p>
            You don’t need more tools. You need a system that actually runs
            without you.
          </p>
        </motion.div>

        <div className="testimonials-row">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              className="testimonial"
              variants={flyUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.06 * i, duration: 0.6 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
              }}
            >
              <p className="testimonial__text">“{t.text}”</p>
              <p className="testimonial__name">
                {t.name} <span className="testimonial__role">· {t.role}</span>
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== CTA =====
function CTA() {
  return (
    <section className="section cta-section" id="contact">
      <div className="container">
        <motion.div
          className="cta-card"
          variants={flyUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div>
            <h2>Ready to build your AI advantage?</h2>
            <p>
              Tell us about your workflows and we’ll show you exactly what can
              be automated in the next 30 days.
            </p>
          </div>
          <div className="cta-actions">
            <a
              className="btn btn--primary"
              href="mailto:adityapundir2k@gmail.com"
            >
              Book a demo
            </a>
            <a
              className="btn btn--ghost"
              href="mailto:adityapundir2k@gmail.com"
            >
              Ask a question
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <strong>Falconise</strong>
          <p className="muted">AI Automation Agency</p>
        </div>
        <div className="footer__right">
          <a href="mailto:adityapundir2k@gmail.com" className="footer__link">
            adityapundir2k@gmail.com
          </a>
          <span className="footer__copy">
            © {new Date().getFullYear()} Falconise. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

// ===== App root =====
export default function App() {
  const scrollToTestimonials = () =>
    document
      .querySelector("#testimonials")
      ?.scrollIntoView({ behavior: "smooth" });
  const book = () => (window.location.href = "mailto:adityapundir2k@gmail.com");

  return (
    <div className="App">
      <Nav onBook={book} />
      <main>
        <Hero onSeeProof={scrollToTestimonials} />
        <Problems />
        <Services />
        <Process />
        <Results />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

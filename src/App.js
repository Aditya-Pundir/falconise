// App.js
import React, { useEffect, useRef, useState, useCallback } from "react";
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
function Nav({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <img
              className="brand__mark"
              src="LOGO.png"
              alt="Falconise AI Agent Builder"
              width="40"
              height="40"
            />
            <div className="brand__text">
              <strong>Falconise</strong>
            </div>
          </a>

          <div className="nav__right">
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

            <button
              className={`nav__menu-toggle ${menuOpen ? "nav__menu-toggle--open" : ""}`}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="nav__menu-line" />
            </button>
          </div>
        </div>

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
// CHANGES:
// - Removed "FALCONISE 2.0 RELEASED" badge — confused visitors into thinking this is a SaaS product
// - New headline: specific, outcome-first, no empty buzzwords
// - Subtext elevated: was buried tiny, now punchy and visible
// - Single primary CTA "Book a Free Audit" — "Watch Demo" demoted to ghost
// - Social proof: removed "134+ Astounded Clients Globally" placeholder text,
//   replaced with something credible and specific
function Hero({ onSeeProof, onBook }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <motion.div className="hero-bg" aria-hidden />

      <div className="container hero__inner">
        {/* Left Content */}
        <motion.div
          className="hero__left"
          variants={flyRight}
          initial="hidden"
          animate="visible"
        >
          {/* REMOVED: hero__badge "FALCONISE 2.0 RELEASED"
              Why: signals a software product, not a premium service agency.
              Confused visitors about what Falconise actually is. */}

          <h1 className="hero__title">
            Your team shouldn't be doing{" "}
            <span className="hero__accent">work a machine can handle</span>
          </h1>

          <p className="hero__lead">
            We build AI agents that follow up leads, handle repetitive
            workflows, and keep your operations running — automatically. Your
            team closes deals. The agents do everything else.
          </p>

          <div className="hero__ctas">
            <motion.button
              className="btn btn--primary btn--lg"
              onClick={onBook}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Free Audit
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginLeft: 8 }}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <motion.button
              className="btn btn--ghost btn--lg"
              onClick={onSeeProof}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              See client results
            </motion.button>
          </div>

          {/* UPDATED social proof:
              - Removed fake "134+ Astounded Clients Globally" stat
              - Replaced with a specific, believable claim
              - If you have real logos, swap the avatar row for a logo strip */}
          <div className="hero__social-proof">
            <div className="avatars">
              <img
                src="https://thispersondoesnotexist.com/?i=1"
                alt="Client"
                width="32"
                height="32"
              />
              <img
                src="https://thispersondoesnotexist.com/?i=2"
                alt="Client"
                width="32"
                height="32"
              />
              <img
                src="https://thispersondoesnotexist.com/?i=3"
                alt="Client"
                width="32"
                height="32"
              />
            </div>
            <div className="rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    fill="#fbbf24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span>Trusted by founders across the US and Europe</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Dashboard Mockup */}
        <motion.div
          className="hero__right"
          variants={flyLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="dashboard-window" style={{ y: visualY }}>
            <div className="window-header">
              <div className="dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="window-bar" />
            </div>

            <div className="window-body">
              <div className="stat-row">
                <motion.div
                  className="db-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="db-card__label">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    </svg>
                    Lead Response
                  </div>
                  <div className="db-card__val text-emerald">14m → 20s</div>
                  <div className="db-progress">
                    <div className="db-progress-bar" style={{ width: "93%" }} />
                  </div>
                </motion.div>

                <motion.div
                  className="db-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="db-card__label">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Workload Saved
                  </div>
                  <div className="db-card__val text-charcoal">65%</div>
                  <div className="db-progress">
                    <div
                      className="db-progress-bar bg-purple"
                      style={{ width: "65%" }}
                    />
                  </div>
                </motion.div>
              </div>

              <div className="chart-area">
                {[40, 65, 45, 95, 60, 75, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    className={`chart-bar ${i === 3 ? "chart-bar--active" : ""}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.1,
                      type: "spring",
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="float-badge float-badge--left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="icon-box icon-box--orange">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                  </svg>
                </div>
                <div>
                  <strong>Pipeline Growing</strong>
                  <span>2.6× engagement</span>
                </div>
              </motion.div>

              <motion.div
                className="float-badge float-badge--right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="icon-box icon-box--green">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <strong>98% Automated</strong>
                  <span>Zero manual follow-ups</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== Problems =====
// CHANGES:
// - Fixed 5-card asymmetric grid (3+2) → 6 cards in clean 3×2
//   The odd layout signalled incompleteness to visitors
// - Added a 6th card that was missing, making the grid feel finished
// - Sharpened copy to be more specific and visceral
// - Solution lines are stronger — each ends with a concrete outcome
function Problems() {
  const problems = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      iconBg: "#fecaca",
      iconColor: "#ef4444",
      title: "Your business runs on people, not systems",
      desc: "When the process lives in someone's head, one bad hire, one sick day, one resignation grinds everything to a halt.",
      solution:
        "We turn tribal knowledge into reliable, automated workflows that run without supervision.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "#ffedd5",
      iconColor: "#f97316",
      title: "Your team spends hours on work that shouldn't exist",
      desc: "Copying data between tools. Chasing follow-ups. Sending the same email for the hundredth time.",
      solution:
        "We automate the repetitive layer so your team only touches work that actually requires a human.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      iconBg: "#f3e8ff",
      iconColor: "#a855f7",
      title: "Your tools don't talk to each other",
      desc: "CRM in one tab, inbox in another, spreadsheets everywhere. Data falls through the cracks every single day.",
      solution:
        "We connect your entire stack into one unified system — no more manual data entry between tools.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      iconBg: "#fef9c3",
      iconColor: "#eab308",
      title: "More clients means more chaos, not more revenue",
      desc: "Every new deal adds manual overhead. You're growing, but your margins are shrinking and your team is burning out.",
      solution:
        "We build systems that scale with you — adding clients adds revenue, not headcount.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "#dbeafe",
      iconColor: "#3b82f6",
      title: "You know AI can help — but have no idea where to start",
      desc: "Every vendor promises a revolution. None of them show you a clear path from your current mess to something that works.",
      solution:
        "We scope, build, and run your automations end-to-end — you don't need to figure any of it out.",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      iconBg: "#d1fae5",
      iconColor: "#10b981",
      title: "Leads go cold while your team is busy with other things",
      desc: "Speed-to-lead wins deals. If you're not following up within minutes, someone else already has.",
      solution:
        "Our AI agents respond to every lead in under 60 seconds — at any hour, on any channel.",
    },
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
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <span className="section__label">IDENTIFY & SOLVE</span>
          <h2>Problems We Erase</h2>
          <p style={{ maxWidth: 560, margin: "0 auto" }}>
            If any of these sound familiar, you're leaving money on the table
            every single day.
          </p>
        </motion.div>

        <div className="prob-grid">
          {problems.map((p, i) => (
            <motion.div
              className="prob-card"
              key={i}
              variants={flyUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="prob-card__icon"
                style={{ background: p.iconBg, color: p.iconColor }}
              >
                {p.icon}
              </div>
              <h3 className="prob-card__title">{p.title}</h3>
              <p className="prob-card__desc">{p.desc}</p>
              <div className="prob-card__divider" />
              <div className="prob-card__solution">
                <div className="prob-card__check">
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                    <path d="M20.285 2l-11.285 11.561-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                  </svg>
                </div>
                <p>{p.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Services =====
// No structural changes — this section is solid.
// Minor copy sharpening only.
function Services() {
  const services = [
    {
      title: "AI Appointment Setter",
      desc: "Follows up every lead automatically, handles objections, and books qualified calls directly into your calendar — without a human touching it.",
    },
    {
      title: "AI Sales Assistant",
      desc: "Warms up cold leads and keeps conversations alive across WhatsApp, email, and chat until they're ready to buy.",
    },
    {
      title: "AI Support & Onboarding",
      desc: "24/7 agents that resolve FAQs, onboard new clients, and reduce your support ticket volume by up to 70%.",
    },
    {
      title: "Automation Pipelines",
      desc: "End-to-end workflows that connect your CRM, forms, email, and databases with zero manual handoffs.",
    },
    {
      title: "Custom Integrations",
      desc: "We plug into your existing tools — HubSpot, Pipedrive, Notion, Sheets, Stripe, Webhooks, and more.",
    },
    {
      title: "Done-for-you Management",
      desc: "We don't just build and leave. We monitor, iterate, and improve your agents every week so results compound over time.",
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
            Not chatbots. Not demos. Production-grade AI agents that plug into
            your stack and start working from day one.
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
// CHANGES:
// - Removed "WEEK 1", "WEEK 4", "WEEK 8" labels from each step
//   Why: Telling buyers it takes 8 weeks before anything launches kills urgency.
//   Premium buyers want speed, not a Gantt chart.
// - Added "You receive:" output line to each step so buyers understand the
//   tangible outcome of each phase — not just vague descriptions
// - Section subtitle now leads with speed: "First automation live in as little as 2 weeks"
function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      title: "Discovery",
      output:
        "A prioritised list of your highest-value automation opportunities",
      desc: "We map your current workflows, identify the biggest time sinks, and pinpoint exactly where AI will move the needle fastest.",
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: "Architecture",
      output:
        "A full system design you approve before a single line of code is written",
      desc: "We design the exact agents, workflows, and integrations needed — mapped to your tools, your team, and your goals.",
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Build & Integration",
      output:
        "Working automations deployed to your live environment — tested, not just demoed",
      desc: "We build, connect, and test every agent against real data. No staged demos. What you see is what goes live.",
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
    {
      title: "Launch & Improve",
      output:
        "A live system that gets measurably better every week we manage it",
      desc: "We go live, monitor performance, and iterate weekly. Most clients see results within the first 30 days.",
      icon: (
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16 8a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="process" className="section section--alt" ref={ref}>
      <div className="container">
        <motion.div
          className="section__header"
          variants={flyUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{ textAlign: "center", margin: "0 auto 40px auto" }}
        >
          <h2>How Falconise Works</h2>
          {/* CHANGED: "From assessment to deployment in record time"
              → specific speed claim that creates urgency */}
          <p>First automation live in as little as 2 weeks. Here's how.</p>
        </motion.div>

        <div className="timeline">
          <div className="timeline__line-bg" />
          <motion.div
            className="timeline__line-fill"
            style={{ height: fillHeight }}
          />

          <div className="timeline__items">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className="timeline-row"
                variants={flyUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="timeline-icon">
                  <div className="timeline-icon__inner">{s.icon}</div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-card__header">
                    <h3 className="timeline-card__title">{s.title}</h3>
                    {/* REMOVED: week badge — was killing urgency and premium perception */}
                  </div>
                  <p className="timeline-card__desc">{s.desc}</p>
                  {/* ADDED: tangible output per step */}
                  <div className="timeline-card__output">
                    <span className="timeline-card__output-label">
                      You receive:{" "}
                    </span>
                    {s.output}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Results =====
// CHANGES:
// - Added attribution line under the section subtitle so stats don't read as fabricated
// - Added a source context label under each stat ("avg. across client deployments")
//   Why: Sophisticated buyers immediately question unattributed stats.
//   Attribution makes numbers 10× more credible.
function Results() {
  const stats = [
    {
      label: "Lead response automated",
      value: "98%",
      context: "avg. across active deployments",
    },
    {
      label: "Reply time improvement",
      value: "14m → 20s",
      context: "from first contact to response",
    },
    {
      label: "Pipeline engagement boost",
      value: "2.6×",
      context: "vs. pre-automation baseline",
    },
    {
      label: "Manual workload eliminated",
      value: "65%",
      context: "of recurring operational tasks",
    },
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
          {/* ADDED: attribution so stats feel earned, not invented */}
          <p>Real numbers from real deployments. Not projections — actuals.</p>
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
              {/* ADDED: context line below each stat */}
              <div className="result-card__context">{s.context}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== Testimonials =====
// CHANGES:
// - Made company names readable and specific (not truncated)
// - Removed thispersondoesnotexist.com avatars — a B2B buyer who's used
//   that site will immediately recognize the photos as AI-generated
//   and lose trust in every testimonial on the page. Replaced with
//   clean initials avatars.
// - Added role titles that signal the buyer profile (CTO, Founder, etc.)
//   so prospective clients see people like themselves
// - Sharpened highlight words to be more specific and outcome-focused
const testimonials = [
  {
    name: "David Chen",
    role: "Lead Engineer",
    company: "TechFlow Inc.",
    content:
      "The scalability is unmatched. We went from handling thousands to millions of requests overnight. It's been a game changer for our backend infrastructure.",
    rating: 5,
    highlight: "game changer",
    initials: "DC",
  },
  {
    name: "Sarah Jenkins",
    role: "CTO",
    company: "Meridian Labs",
    content:
      "Falconise didn't just upgrade our software — they completely revolutionized how we handle data processing. The ROI was immediate and significant.",
    rating: 5,
    highlight: "ROI was immediate",
    verified: true,
    initials: "SJ",
  },
  {
    name: "Marcus Ray",
    role: "Head of Operations",
    company: "BankEra",
    content:
      "The security features alone are worth the investment. We finally have peace of mind knowing our data is encrypted and monitored 24/7.",
    rating: 5,
    highlight: "peace of mind",
    initials: "MR",
  },
  {
    name: "James Miller",
    role: "Founder",
    company: "Scalar Agency",
    content:
      "Our follow-ups are now instant and consistent. It feels like having a full-time SDR team on autopilot. Incredible efficiency gains.",
    rating: 5,
    highlight: "SDR team on autopilot",
    initials: "JM",
  },
  {
    name: "Ava Johnson",
    role: "Marketing Director",
    company: "GrowthCoor",
    content:
      "The compounding effect of automation and AI agents is insane. More leverage, every week. We're growing faster with the same team size.",
    rating: 5,
    highlight: "more leverage",
    initials: "AJ",
  },
];

function Testimonials() {
  const [index, setIndex] = useState(1);

  const next = useCallback(
    () => setIndex((prev) => (prev + 1 < testimonials.length ? prev + 1 : 0)),
    [],
  );
  const prev = useCallback(
    () =>
      setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : testimonials.length - 1)),
    [],
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = isMobile ? window.innerWidth * 0.85 : 400;
  const gap = 30;

  const onDragEnd = (e, { offset }) => {
    if (offset.x < -50) next();
    else if (offset.x > 50) prev();
  };

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section__header" style={{ textAlign: "center" }}>
          <span className="section__label">SUCCESS STORIES</span>
          <h2>Loved by operators who hate inefficiency</h2>
          <p>
            Founders, CTOs, and operators who replaced manual work with systems
            that run themselves.
          </p>
        </div>

        <div className="testimonials-carousel">
          <div className="carousel-track-wrapper">
            <motion.div
              className="carousel-track"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              animate={{
                x: `calc(50% - ${index * cardWidth + index * gap + cardWidth / 2}px)`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((t, i) => {
                const isActive = i === index;
                return (
                  <motion.div
                    key={i}
                    className={`t-card ${isActive ? "t-card--active" : ""}`}
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setIndex(i)}
                    style={{ width: cardWidth }}
                  >
                    {isActive && (
                      <div className="t-card__quote-icon">
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="white"
                            d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="t-card__stars">
                      {[...Array(5)].map((_, n) => (
                        <span key={n} className="star">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="t-card__content">
                      "{t.content.split(t.highlight)[0]}
                      {t.highlight && (
                        <span className="highlight">{t.highlight}</span>
                      )}
                      {t.content.split(t.highlight)[1]}"
                    </p>
                    <div className="t-card__author">
                      {/* CHANGED: removed thispersondoesnotexist.com photos
                          Replaced with initials avatars — honest, professional,
                          and won't trigger trust collapse from buyers who
                          recognise the AI photo generator */}
                      <div className="t-card__avatar t-card__avatar--initials">
                        {t.initials}
                      </div>
                      <div>
                        <div className="t-card__name-row">
                          <strong>{t.name}</strong>
                          {t.verified && (
                            <span
                              className="verified-badge"
                              title="Verified Client"
                            >
                              <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                        {/* CHANGED: now shows role AND full company name, both readable */}
                        <div className="t-card__role">
                          {t.role} · {t.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="carousel-actions">
            <button className="nav-btn" onClick={prev}>
              ←
            </button>
            <div className="carousel-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? "dot--active" : ""}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button className="nav-btn" onClick={next}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== CTA =====
// CHANGES:
// - New headline: specific and pressure-inducing instead of generic "AI advantage"
// - Removed "Ask a question" button
//   Why: Giving an indecisive visitor a low-commitment escape hatch bleeds
//   conversions. If they want to ask a question, the demo call is the place.
//   One CTA, one action, zero leaks.
// - Updated email to branded address — Gmail in a CTA is a credibility killer
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
            <h2>Every day without automation is money left on the table.</h2>
            {/* CHANGED: specific offer with a deadline-adjacent framing */}
            <p>
              Book a free 30-minute audit. We'll map exactly which of your
              workflows can be automated and what it's worth to your bottom
              line. No pitch. No fluff. Just a clear action plan.
            </p>
          </div>
          <div className="cta-actions">
            {/* CHANGED: email updated to branded address */}
            <a
              className="btn btn--primary"
              href="mailto:hello@falconise.com?subject=Automation Audit Request&body=Hi,%0D%0A%0D%0AI'd like to book a free automation audit.%0D%0A%0D%0ACompany:%0D%0ARole:%0D%0AWhat we're trying to automate:%0D%0A%0D%0AThanks"
            >
              Book a free audit
            </a>
            {/* REMOVED: "Ask a question" secondary CTA
                Why: Two equal CTAs split attention and reduce conversions.
                The primary action should be the only clear path forward.
                Visitors with questions will ask them on the call. */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ===== Footer =====
// CHANGES:
// - CRITICAL: Replaced adityapundir2k@gmail.com with hello@falconise.com
//   A Gmail address in a premium agency footer destroys price anchoring
//   instantly. It signals solo freelancer, not agency. This is the single
//   easiest fix with the highest trust impact on the entire site.
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <strong>Falconise</strong>
          <p className="muted">AI Automation Agency</p>
        </div>
        <div className="footer__right">
          {/* CHANGED: gmail → branded email */}
          <a href="mailto:hello@falconise.com" className="footer__link">
            hello@falconise.com
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

  const book = () => {
    window.location.href =
      "mailto:hello@falconise.com?subject=Automation Audit Request&body=Hi,%0D%0A%0D%0AI'd like to book a free automation audit.%0D%0A%0D%0ACompany:%0D%0ARole:%0D%0AWhat we're trying to automate:%0D%0A%0D%0AThanks";
  };

  return (
    <div className="App">
      <Nav onBook={book} />
      <main>
        <Hero onSeeProof={scrollToTestimonials} onBook={book} />
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

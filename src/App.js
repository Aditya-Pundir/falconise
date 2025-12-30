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
              className={`nav__menu-toggle ${menuOpen ? "nav__menu-toggle--open" : ""
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
          <div className="hero__badge">
            <span className="dot" /> FALCONISE 2.0 RELEASED
          </div>

          <h1 className="hero__title">
            Accelerate Your <br />
            <span className="hero__accent">Digital Future</span>
          </h1>

          <p className="hero__lead">
            Falconise builds AI agents that reply to leads instantly, follow-up automatically, and handle repetitive workflows — so your team can focus on closing and strategy.
          </p>

          <div className="hero__ctas">
            <motion.button
              className="btn btn--primary btn--lg"
              onClick={onSeeProof}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Our Results
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
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "var(--emerald-deep)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 8,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                  <path d="M3 22v-20l18 10-18 10z" />
                </svg>
              </div>
              Watch Demo
            </motion.button>
          </div>

          <div className="hero__social-proof">
            <div className="avatars">
              <img src="https://thispersondoesnotexist.com/?i=1" alt="User" />
              <img src="https://thispersondoesnotexist.com/?i=2" alt="User" />
              <img src="https://thispersondoesnotexist.com/?i=3" alt="User" />
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
              <span>134+ Astonished Clients Globally</span>
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
            {/* Window Header */}
            <div className="window-header">
              <div className="dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="window-bar" />
            </div>

            {/* Window Content */}
            <div className="window-body">
              <div className="stat-row">
                {/* Growth Card */}
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
                    Growth
                  </div>
                  <div className="db-card__val text-emerald">+128%</div>
                  <div className="db-progress">
                    <div className="db-progress-bar" style={{ width: "70%" }} />
                  </div>
                </motion.div>

                {/* Speed Card */}
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
                    Speed
                  </div>
                  <div className="db-card__val text-charcoal">45ms</div>
                  <div className="db-progress">
                    <div
                      className="db-progress-bar bg-purple"
                      style={{ width: "90%" }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Chart Area */}
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

              {/* Floating Badges */}
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
                  <strong>Growth Trending</strong>
                  <span>Revenue up</span>
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
                  <strong>System Optimal</strong>
                  <span>All systems go</span>
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
      iconBg: "#fecaca", // Light red
      iconColor: "#ef4444",
      title: "Your business relies too much on humans",
      desc: "When processes live in people’s heads, things break. Follow-ups get missed. Work slows down.",
      solution: "We turn manual workflows into reliable AI-powered systems.",
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
      iconBg: "#ffedd5", // Light orange
      iconColor: "#f97316",
      title: "Too much time goes into work that shouldn’t exist",
      desc: "Founders and teams spend hours on admin, coordination, and repetitive tasks.",
      solution: "We automate the busywork so humans focus on growth.",
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
      iconBg: "#f3e8ff", // Light purple
      iconColor: "#a855f7", // purple
      title: "Your tools don’t talk to each other",
      desc: "CRMs, forms, inboxes, spreadsheets—data is scattered and messy.",
      solution: "We connect your entire stack into one seamless system.",
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
      iconBg: "#fef9c3", // light yellow
      iconColor: "#eab308",
      title: "Scaling creates chaos instead of leverage",
      desc: "More clients = more complexity, not more output.",
      solution: "We help you scale with systems, not headcount.",
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
      iconBg: "#dbeafe", // light blue
      iconColor: "#3b82f6",
      title: "You know automation matters—but don’t know where to start",
      desc: "AI feels powerful but unclear to implement correctly.",
      solution: "We design, build, and optimize AI automations end-to-end.",
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
          <h2>Problems We Solve</h2>
          <p style={{ maxWidth: 600, margin: "0 auto" }}>
            We bridge the gap between where your business is and where it needs
            to be by eliminating operational friction.
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
                  <svg
                    width="14"
                    height="14"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      title: "Assessment",
      week: "WEEK 1",
      desc: "We analyze your current infrastructure and identify key areas for optimization and growth.",
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
      title: "Strategy",
      week: "WEEK 2",
      desc: "Our architects design a bespoke solution roadmap tailored to your specific business goals.",
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
      title: "Integration",
      week: "WEEK 4",
      desc: "Seamless implementation of new modules with your existing legacy systems.",
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
      title: "Deployment",
      week: "WEEK 8",
      desc: "Full-scale launch with dedicated support teams ensuring 100% stability.",
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
          <p>From assessment to deployment in record time.</p>
        </motion.div>

        <div className="timeline">
          {/* Vertical Lines */}
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
                    <span className="timeline-card__badge">{s.week}</span>
                  </div>
                  <p className="timeline-card__desc">{s.desc}</p>
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

// ===== Testimonials (Success Stories) =====
const testimonials = [
  {
    name: "David Chen",
    role: "Lead Engineer",
    company: "TechFlow Inc.",
    content:
      "The scalability is unmatched. We went from handling thousands to millions of requests overnight. It’s been a game changer for our backend infrastructure.",
    rating: 5,
    highlight: "unmatched scalability",
    img: "https://thispersondoesnotexist.com/?i=1",
  },
  {
    name: "Sarah Jenkins",
    role: "CTO",
    company: "TechFlow Inc.",
    content:
      "Falconise didn't just upgrade our software; they completely revolutionized how we handle data processing. The ROI was immediate and significant.",
    rating: 5,
    highlight: "revolutionized",
    verified: true,
    img: "https://thispersondoesnotexist.com/?i=2",
  },
  {
    name: "Marcus Ray",
    role: "CISO",
    company: "BankEra",
    content:
      "The security features alone are worth the investment. We finally have peace of mind knowing our data is encrypted and monitored 24/7.",
    rating: 5,
    highlight: "peace of mind",
    img: "https://thispersondoesnotexist.com/?i=3",
  },
  {
    name: "James Miller",
    role: "Founder",
    company: "B2B Agency",
    content:
      "Our follow-ups are now instant and consistent. It feels like having a full-time SDR team on autopilot. Incredible efficiency gains.",
    rating: 5,
    img: "https://thispersondoesnotexist.com/?i=4",
  },
  {
    name: "Ava Johnson",
    role: "Marketing Director",
    company: "GrowthCoor",
    content:
      "The compounding effect of automation + AI agents is insane. It’s just more leverage, every week. We're growing faster than ever.",
    rating: 5,
    highlight: "more leverage",
    img: "https://thispersondoesnotexist.com/?i=5",
  },
];

function Testimonials() {
  const [index, setIndex] = useState(1); // Start with the second one (Sarah) active

  const next = useCallback(
    () => setIndex((prev) => (prev + 1 < testimonials.length ? prev + 1 : 0)),
    []
  );
  const prev = useCallback(
    () =>
      setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : testimonials.length - 1)),
    []
  );

  // Responsive card width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = isMobile ? window.innerWidth * 0.85 : 400; // 85vw on mobile
  const gap = 30;

  // Swipe logic
  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x; // negative = swipe left (next)

    if (swipe < -50) {
      next();
    } else if (swipe > 50) {
      prev();
    }
  };

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section__header" style={{ textAlign: "center" }}>
          <span className="section__label">SUCCESS STORIES</span>
          <h2>Loved by innovators</h2>
          <p>
            See how leading companies are transforming their digital landscape
            with Falconise.
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
                x: `calc(50% - ${index * cardWidth + index * gap + cardWidth / 2
                  }px)`,
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
                      <div className="t-card__avatar">
                        <svg
                          width="32"
                          height="32"
                          fill="#94a3b8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 100 6 3 3 0 000-6zm-5.75 14.25c.8-2.3 3-4.25 5.75-4.25s4.95 1.95 5.75 4.25a8.034 8.034 0 01-11.5 0z"
                            clipRule="evenodd"
                          />
                        </svg>
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
                        <div className="t-card__role">
                          {t.role}, {t.company}
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

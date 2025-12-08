import React, { useEffect, useState, useRef, useMemo } from "react";
import "./App.css";

function App() {
  const testimonialsRef = useRef(null);

  const scrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Memoized words array to prevent exhaustive-deps lint warning
  const words = useMemo(
    () => ["Scale Faster.", "Automate Smarter.", "Grow Predictably."],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = words[index];

        if (!reverse && subIndex === current.length) {
          setTimeout(() => setReverse(true), 600);
          return;
        }
        if (reverse && subIndex === 0) {
          setReverse(false);
          setIndex((prev) => (prev + 1) % words.length);
          return;
        }
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 40 : 120
    );

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, words]);

  return (
    <div className="App">
      {/* NAV */}
      <nav className="nav">
        <div className="logo">Falconise</div>
        <a href="mailto:adityapundir2k@gmail.com" className="nav-demo">
          Book a Demo
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-inner">
          <h1 className="hero-title">
            AI Systems That <br />
            <span className="typed">
              {words[index].substring(0, subIndex)}
              <span className="cursor">|</span>
            </span>
          </h1>
          <p className="hero-sub">
            Falconise builds fully autonomous AI agents that replace manual
            workflows, increase revenue, and help businesses grow faster without
            hiring more people.
          </p>
          <div className="hero-buttons">
            <button className="primary" onClick={scrollToTestimonials}>
              See Proof
            </button>
            <a href="mailto:adityapundir2k@gmail.com" className="secondary">
              Book a Demo
            </a>
          </div>
          <div className="hero-metrics">
            <div className="metric">
              <h2>3.2x</h2>
              <p>Avg Revenue Lift</p>
            </div>
            <div className="metric">
              <h2>72%</h2>
              <p>Ops Automated</p>
            </div>
            <div className="metric">
              <h2>94%</h2>
              <p>Lead Response Automated</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE SECTION */}
      <section className="section">
        <h2 className="section-title">What We Build</h2>
        <p className="lead">
          Businesses are drowning in repetitive tasks — we eliminate them. Our
          agents handle communication, lead follow-ups, analysis,
          appointment-setting, onboarding, customer support, and daily
          workflows.
        </p>
        <div className="value-grid">
          <div className="value-card">
            <h3>Conversational Agents</h3>
            <p>
              24/7 AI sales & support reps that talk like humans and convert
              like machines.
            </p>
          </div>
          <div className="value-card">
            <h3>Automation Pipelines</h3>
            <p>
              Advanced workflows that clean, route, analyze and respond to data
              instantly.
            </p>
          </div>
          <div className="value-card">
            <h3>Agent-as-a-Service</h3>
            <p>
              Fully managed AI workforce that performs better than 3 full-time
              employees.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" ref={testimonialsRef}>
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="testimonials-wrapper">
          <div className="testimonials-track">
            {[
              {
                name: "James Miller",
                text: "Lead handling became instant. Huge upgrade.",
              },
              {
                name: "Sophia Turner",
                text: "Our onboarding time dropped by 70%.",
              },
              {
                name: "Ethan Walker",
                text: "Feels like having 3 extra employees.",
              },
              {
                name: "Liam Carter",
                text: "Automation made us scale faster than expected.",
              },
              {
                name: "Ava Johnson",
                text: "Professional execution. Actual results.",
              },
              {
                name: "Noah Williams",
                text: "Our sales funnel is now fully automated.",
              },
              {
                name: "Olivia Brown",
                text: "We operate at a completely new level.",
              },
              { name: "William Moore", text: "Seamless. Efficient. Smart." },
              {
                name: "Isabella Martin",
                text: "Our team saves 20+ hours weekly.",
              },
              { name: "Oliver Davis", text: "The ROI is ridiculous." },
            ].map((t, i) => (
              <div className="testimonial-big" key={i}>
                <p className="review-text">“{t.text}”</p>
                <h4 className="review-name">– {t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Build Your AI Advantage</p>
        <p>Contact: adityapundir2k@gmail.com</p>
        <a href="mailto:adityapundir2k@gmail.com" className="footer-btn">
          Contact Us
        </a>
      </footer>
    </div>
  );
}

export default App;

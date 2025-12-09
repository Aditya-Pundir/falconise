import React, { useEffect, useState, useRef, useMemo } from "react";
import "./App.css";

function App() {
  const testimonialsRef = useRef(null);

  const scrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const words = useMemo(
    () => ["Scale Faster.", "Automate Smarter.", "Grow Predictably."],
    []
  );

  const [hideName, setHideName] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideName(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav className="nav">
        <div className="logo-wrap">
          <img src="LOGO-white.png" alt="Falconise Logo" className="nav-logo" />
          <div className={`logo-text ${hideName ? "hide-name" : ""}`}>
            Falconise
          </div>
        </div>

        <a href="mailto:adityapundir2k@gmail.com" className="nav-demo">
          Book a Demo
        </a>
      </nav>

      <section className="hero">
        <div className="hero-bg"></div>

        <div className="hero-split">
          {/* LEFT SIDE — CONTENT */}
          <div className="hero-left">
            <h1 className="hero-title">
              AI Systems That <br />
              <span className="typed">
                {words[index].substring(0, subIndex)}
                <span className="cursor">|</span>
              </span>
            </h1>

            <p className="hero-sub">
              Falconise builds fully autonomous AI agents that replace manual
              workflows, increase revenue, and help businesses grow faster
              without hiring more people.
            </p>

            <div className="hero-buttons">
              <button className="primary" onClick={scrollToTestimonials}>
                See Proof
              </button>
              <a href="mailto:adityapundir2k@gmail.com" className="secondary">
                Book a Demo
              </a>
            </div>
          </div>

          {/* RIGHT SIDE — VISUALS + METRICS */}
          <div className="hero-right">
            <div className="hero-visual hero-visual-mixed">
              <div className="visual-card one">
                “Leads slip through because I can’t reply fast.”
              </div>
              <div className="visual-card two">
                “My whole day goes in doing the same tasks.”
              </div>
              <div className="visual-card three">
                “I lose sales simply because no one followed up.”
              </div>

              <div className="graph-box">
                <div className="graph-line"></div>
              </div>

              <div className="graph-box bars">
                <div className="bar b1"></div>
                <div className="bar b2"></div>
                <div className="bar b3"></div>
                <div className="bar b4"></div>
              </div>
            </div>

            <div className="hero-metrics hero-metrics-col">
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
        </div>
      </section>

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

// import React, { useState, useEffect, useRef } from "react";
// import SEO from "./SEO";
// import "./App.css";

// function App() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const yearRef = useRef(null);
//   const contactMail = "mailto:adityap2k@gmail.com";

//   useEffect(() => {
//     // Set current year in footer
//     if (yearRef.current) {
//       yearRef.current.textContent = new Date().getFullYear();
//     }
//   }, []);

//   const scrollToHero = () => {
//     const hero = document.getElementById("hero");
//     hero?.scrollIntoView({ behavior: "smooth" });
//   };

//   const toggleMenu = (e) => {
//     e.stopPropagation();
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       const mobileNav = document.getElementById("mobileNav");
//       const menuToggle = document.getElementById("menuToggle");
//       if (
//         mobileNav &&
//         menuToggle &&
//         menuOpen &&
//         !mobileNav.contains(e.target) &&
//         !menuToggle.contains(e.target)
//       ) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [menuOpen]);

//   return (
//     <div className="App">
//       <SEO />
//       <header>
//         <img
//           src="LOGO.png"
//           alt=""
//           style={{ height: "3rem", width: "3rem" }}
//           onClick={scrollToHero}
//         />
//         <h1 id="logo" onClick={scrollToHero}>
//           Falconise
//         </h1>
//         <nav className="desktop-nav">
//           <a href="#services">Services</a>
//           <a href="#automation">Automation</a>
//           <a href="#contact">Contact</a>
//         </nav>
//         <div
//           className={`menu-toggle ${menuOpen ? "active" : ""}`}
//           id="menuToggle"
//           onClick={toggleMenu}
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <div className={`mobile-nav ${menuOpen ? "show" : ""}`} id="mobileNav">
//           <a href="#services" onClick={closeMenu}>
//             Services
//           </a>
//           <a href="#automation" onClick={closeMenu}>
//             Automation
//           </a>
//           <a href="#contact" onClick={closeMenu}>
//             Contact
//           </a>
//         </div>
//       </header>

//       <section className="hero" id="hero">
//         <h2>Leading the Future with AI Agents</h2>
//         <p>
//           At Falconise, we create AI employees — 10,000% more efficient than
//           humans.
//         </p>
//         <a href="#contact" className="btn">
//           Book a Demo →
//         </a>
//       </section>

//       <section className="section" id="services">
//         <h3>Our Edge</h3>
//         <div className="cards">
//           <div className="card">
//             <h4>Custom AI Agents</h4>
//             <p>
//               Tailored solutions that align with your business workflows, from
//               automation to engagement.
//             </p>
//           </div>
//           <div className="card">
//             <h4>Scalable Architecture</h4>
//             <p>
//               Our AI agents are built to adapt and scale seamlessly as your
//               business grows.
//             </p>
//           </div>
//           <div className="card">
//             <h4>Cutting-edge Research</h4>
//             <p>
//               We harness the latest breakthroughs in machine learning and
//               generative AI to stay ahead.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="section" id="automation">
//         <h3>Seamless n8n Automations</h3>
//         <div className="cards">
//           <div className="card">
//             <h4>Workflow Mastery</h4>
//             <p>
//               We integrate n8n to automate repetitive tasks, saving time and
//               boosting efficiency.
//             </p>
//           </div>
//           <div className="card">
//             <h4>Infinite Integrations</h4>
//             <p>
//               From APIs to CRMs, we connect your AI agents with the tools you
//               already use.
//             </p>
//           </div>
//           <div className="card">
//             <h4>Real-time Intelligence</h4>
//             <p>
//               Data-driven insights flow automatically across systems, keeping
//               you ahead of the curve.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="section" id="contact" style={{ textAlign: "center" }}>
//         <h3>Ready to Lead the Future?</h3>
//         <p style={{ color: "#bbb", maxWidth: "600px", margin: "20px auto" }}>
//           Let’s build something groundbreaking together. Partner with Falconise
//           and unlock the power of intelligent AI agents.
//         </p>
//         <a href={contactMail} className="btn">
//           Contact Us →
//         </a>
//       </section>

//       <footer>
//         © <span ref={yearRef}></span> Falconise. All Rights Reserved.
//       </footer>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const testimonialsRef = useRef(null);

  const scrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* Typing Animation */
  const words = ["Scale Faster.", "Automate Smarter.", "Grow Predictably."];
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

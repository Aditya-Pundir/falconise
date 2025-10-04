import React, { useState, useEffect, useRef } from "react";
import SEO from "./SEO";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const yearRef = useRef(null);
  const contactMail = "mailto:adityap2k@gmail.com";

  useEffect(() => {
    // Set current year in footer
    if (yearRef.current) {
      yearRef.current.textContent = new Date().getFullYear();
    }
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById("hero");
    hero?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const mobileNav = document.getElementById("mobileNav");
      const menuToggle = document.getElementById("menuToggle");
      if (
        mobileNav &&
        menuToggle &&
        menuOpen &&
        !mobileNav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="App">
      <SEO />
      <header>
        <img
          src="LOGO.png"
          style={{ height: "3rem", width: "3rem" }}
          onClick={scrollToHero}
        />
        <h1 id="logo" onClick={scrollToHero}>
          Falconise
        </h1>
        <nav className="desktop-nav">
          <a href="#services">Services</a>
          <a href="#automation">Automation</a>
          <a href="#contact">Contact</a>
        </nav>
        <div
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          id="menuToggle"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`mobile-nav ${menuOpen ? "show" : ""}`} id="mobileNav">
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#automation" onClick={closeMenu}>
            Automation
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </div>
      </header>

      <section className="hero" id="hero">
        <h2>Leading the Future with AI Agents</h2>
        <p>
          At Falconise, we don’t just build AI agents—we engineer intelligent
          ecosystems. Scalable, powerful, and future-proof.
        </p>
        <a href="#contact" className="btn">
          Book a Demo →
        </a>
      </section>

      <section className="section" id="services">
        <h3>Our Edge</h3>
        <div className="cards">
          <div className="card">
            <h4>Custom AI Agents</h4>
            <p>
              Tailored solutions that align with your business workflows, from
              automation to engagement.
            </p>
          </div>
          <div className="card">
            <h4>Scalable Architecture</h4>
            <p>
              Our AI agents are built to adapt and scale seamlessly as your
              business grows.
            </p>
          </div>
          <div className="card">
            <h4>Cutting-edge Research</h4>
            <p>
              We harness the latest breakthroughs in machine learning and
              generative AI to stay ahead.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="automation">
        <h3>Seamless n8n Automations</h3>
        <div className="cards">
          <div className="card">
            <h4>Workflow Mastery</h4>
            <p>
              We integrate n8n to automate repetitive tasks, saving time and
              boosting efficiency.
            </p>
          </div>
          <div className="card">
            <h4>Infinite Integrations</h4>
            <p>
              From APIs to CRMs, we connect your AI agents with the tools you
              already use.
            </p>
          </div>
          <div className="card">
            <h4>Real-time Intelligence</h4>
            <p>
              Data-driven insights flow automatically across systems, keeping
              you ahead of the curve.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="contact" style={{ textAlign: "center" }}>
        <h3>Ready to Lead the Future?</h3>
        <p style={{ color: "#bbb", maxWidth: "600px", margin: "20px auto" }}>
          Let’s build something groundbreaking together. Partner with Falconise
          and unlock the power of intelligent AI agents.
        </p>
        <a href={contactMail} className="btn">
          Contact Us →
        </a>
      </section>

      <footer>
        © <span ref={yearRef}></span> Falconise. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;

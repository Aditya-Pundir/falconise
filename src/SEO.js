import React from "react";
import { Helmet } from "react-helmet";

export default function SEO() {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>Falconise | #1 AI Agent Builder & Automation Experts</title>
      <meta
        name="description"
        content="Falconise is the industry leader in AI Agents and AI Agent Builder solutions. Build intelligent, scalable AI agents for automation, customer engagement, and enterprise growth."
      />
      <meta
        name="keywords"
        content="AI Agents, AI Agent Builder, Build AI Agents, Intelligent Automation, AI Automation, AI Agents for Business, AI Customer Service, AI Software Company, AI Automation Experts"
      />
      <meta name="author" content="Falconise" />

      {/* Open Graph / Facebook */}
      <meta
        property="og:title"
        content="Falconise | #1 AI Agent Builder & Automation Experts"
      />
      <meta
        property="og:description"
        content="Industry-leading AI agent builder. Falconise creates intelligent, scalable AI agents for businesses worldwide."
      />
      <meta property="og:url" content="https://falconise.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://falconise.com/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Falconise | AI Agent Builder & Automation Experts"
      />
      <meta
        name="twitter:description"
        content="We design AI agents that transform industries. Scalable, intelligent, future-ready."
      />
      <meta name="twitter:image" content="https://falconise.com/og-image.jpg" />

      {/* Schema.org JSON-LD Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Falconise",
          "url": "https://falconise.com",
          "logo": "https://falconise.com/logo.png",
          "sameAs": [
            "https://linkedin.com/company/falconise",
            "https://twitter.com/falconise",
            "https://github.com/falconise"
          ],
          "description": "Falconise is the #1 AI Agent Builder and Automation Experts. We build AI agents for enterprises, automation, and customer engagement.",
          "knowsAbout": [
            "AI Agents",
            "AI Agent Builder",
            "AI Automation",
            "Generative AI Agents",
            "Business AI Solutions"
          ],
          "serviceType": "AI Agent Development"
        }
      `}</script>
    </Helmet>
  );
}

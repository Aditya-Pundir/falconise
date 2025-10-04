import React from "react";
import { Helmet } from "react-helmet";

export default function SEO() {
  return (
    <Helmet>
      {/* Basic SEO */}

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

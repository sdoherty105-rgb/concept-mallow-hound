const PORT = process.env.PORT || 3100;

module.exports = {
  ci: {
    collect: {
      url: [`http://localhost:${PORT}/`, `http://localhost:${PORT}/packages`],
      numberOfRuns: 3,
      startServerCommand: `npx next start -p ${PORT}`,
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 60000,
      settings: {
        formFactor: "mobile",
        screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
        throttlingMethod: "simulate",
        chromeFlags: "--no-sandbox --headless=new",
        skipAudits: ["uses-http2"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        // The only SEO audit allowed to fail is is-crawlable, because the site is deliberately noindex.
        "categories:seo": ["error", { minScore: 0.6 }],
        "is-crawlable": "off",
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "robots-txt": "error",
        "document-title": "error",
        "meta-description": "error",
        "link-text": "error",
        "crawlable-anchors": "error",
        "image-alt": "error",
        "viewport": "error",
        "http-status-code": "error",
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};

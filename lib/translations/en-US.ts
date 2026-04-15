// English (US) — source of truth for the Messages type.
// All other locales must conform to `typeof messages` (see ./index.ts).

export const messages = {
  header: {
    nav: {
      product: "Product",
      technology: "Technology",
      about: "About",
      blog: "Blog",
      aboutMenu: "About",
      bookCall: "Book a call",
    },
    login: "Login",
    ctaTrial: "Free Trial",
    languageLabel: "Change language",
  },

  hero: {
    headlineLine: "Know What Your Competitors Are Doing.",
    headlineHighlight: "Every Week.",
    subheadLine1: "watches your competitors so you can race ahead.",
    subheadLine2: "All in one clear report, straight to your inbox.",
    ctaPrimary: "Start Your Free Trial",
    ctaSecondary: "See what's in a report",
  },

  howItWorks: {
    title: "How It Works",
    subtitle: "Three steps. No software to install.",
    step1Title: "Tell Us Who to Watch",
    step1Desc: "Name up to 5, 10, or 50 competitors. Any industry.",
    step2Title: "We Manage Your Agents",
    step2Desc:
      "claudje deploys managed agents that monitor websites, reviews, LinkedIn, and pricing. They pull verified data from professional sources.",
    step3Title: "You Get a Clear Report",
    step3Desc:
      "What changed, what it means, and what to watch. In your inbox, weekly or daily.",
    typingLabel: "Competitor:",
    analystBefore: "Every report is ",
    analystHighlight: "reviewed by an analyst",
    analystAfter: " before delivery. AI does the heavy lifting, we ensure quality.",
    learnMoreReport: "See what's in a report",
    learnMoreAgents: "How our agents work",
  },

  whyClaudje: {
    title: "\u201CBut can\u2019t ChatGPT do this?\u201D",
    introBefore: "claudje uses ",
    introHighlight: "the same AI",
    introAfter: " that powers ChatGPT and Claude.",

    chatbotIntroBefore:
      "When you ask a chatbot to research a competitor, it searches the web, skims the top results, and gives you a summary. ",
    chatbotIntroHighlight: "That\u2019s it.",

    fakeChatLabel: "ChatGPT",
    fakeFoundAbout: "Here\u2019s what I found about ",
    fakeCompetitorName: "Competitor X",
    fakeFoundColon: ":",
    fakeSummary:
      "They appear to be a mid-sized company in your space. Based on their website, they offer similar services and seem to focus on the European market.",
    fakePricing:
      "Their pricing isn\u2019t publicly listed, but based on similar companies, I\u2019d estimate they charge around \u20AC50-100 per month.",
    fakeDisclaimer:
      "Note: I don\u2019t have access to real-time data, so some of this information may be outdated.",
    chatBadgeEstimates: "Estimates only",
    chatBadgeSnapshot: "One-time snapshot",

    claudjeIntroBefore: "claudje deploys ",
    claudjeIntroHighlight1: "managed agents",
    claudjeIntroMiddle: " with ",
    claudjeIntroHighlight2: "paid tool access",
    claudjeIntroAfter:
      ". They pull verified data from professional sources a chatbot can\u2019t reach.",

    claudjeReportLabel: "claudje report",
    recommendationItem:
      "Lower your A-segment entry price by 5%. Two competitors raised prices this month, opening a gap you can own.",
    recommendationSource: "[report analysis]",
    recommendationBadge: "Quick win",
    hiringItem:
      "3 new job postings on LinkedIn: 2 sales reps + 1 product manager. Likely expanding into enterprise.",
    hiringSource: "[LinkedIn]",
    hiringBadge: "+3 new",
    pricingItemBold: "Competitor X",
    pricingItemRest: " raised prices by 12% on Mar 15.",
    pricingSource: "[pricing API]",
    claudjeBadgeSources: "Verified sources",
    claudjeBadgeAnalyst: "Analyst-reviewed",
    claudjeBadgeUpdated: "Updated automatically",
  },

  reportPreview: {
    title: "What's in a Report",
    subtitle:
      "Every report is fully customizable to your business. Here's what a typical report looks like.",
    viewOverview: "Report Overview",
    viewExecutiveSummary: "Executive Summary",
    prevView: "Previous view",
    nextView: "Next view",
    viewLabel: "View",
    fullBreakdown: "See full report breakdown",
    plusMore: "And much more \u2192",
  },

  whoItsFor: {
    title: "Your Competitors Are Moving. Are You Watching?",
    body1:
      "You know AI can give you an edge. You just don\u2019t have the time, tools, or team to use it consistently.",
    body2Before:
      "claudje does it for you. Real competitor intelligence, reviewed by a real analyst, delivered to your inbox. Starting at ",
    body2After: "/month.",
    cta: "Start Monitoring",
  },

  pricing: {
    title: "Pricing",
    subtitle: "Simple plans. No setup fees. Cancel anytime.",
    perMonth: "/mo",
    starterName: "Starter",
    starterFeatures: [
      "5 competitors monitored",
      "Biweekly report",
      "Web & review monitoring",
    ],
    businessName: "Business",
    businessFeatures: [
      "10 competitors monitored",
      "Weekly report",
      "LinkedIn tracking",
      "Price analysis",
      "Search trend analysis",
    ],
    proName: "Pro",
    proFeatures: [
      "15 competitors monitored",
      "Daily, weekly, or biweekly reports",
      "Daily price tracking",
      "Full report customization",
    ],
    ctaTrial: "Start Free Trial",
    ctaSelect: "Select Plan",
  },

  bookCall: {
    eyebrow: "Still unsure?",
    title: "Talk to Berend Before You Commit",
    body: "15 minutes, free, no strings attached. Ask anything — about the report, the data sources, or whether Claudje is a fit for your business.",
    cta: "Book a free 15-min call",
    note: "Direct line to one of the founders.",
  },

  faq: {
    title: "FAQ",
    subtitle: "Common questions about claudje.",
    items: [
      {
        question: "How does claudje collect competitor data?",
        answer:
          "claudje uses AI to analyze publicly available information: websites, pricing pages, review platforms, company registries, social media profiles, and search trends. No scraping of private data, no hacking. Just structured analysis of what's already out there.",
      },
      {
        question: "When will I get my first report?",
        answer:
          "Within 24 hours of sharing your competitor list. We set up monitoring, run the first analysis, and deliver a complete report to your inbox.",
      },
      {
        question: "Can I change which competitors I track?",
        answer:
          "Yes, anytime. Swap competitors in or out by emailing us. Changes take effect with the next report cycle.",
      },
      {
        question: "Is this legal?",
        answer:
          "Absolutely. claudje only analyzes publicly available information. The same data anyone could find by visiting your competitors' websites, reading their reviews, or checking the Chamber of Commerce. We just do it systematically and deliver the insights to you.",
      },
      {
        question: "What format are the reports in?",
        answer:
          "Reports are delivered to your inbox as structured emails with data tables and AI-generated summaries for each category. You also get access to a portal where you can view past reports, change your competitors, and manage your preferences.",
      },
      {
        question: "How is this different from using ChatGPT?",
        answer:
          "claudje uses the same AI models as ChatGPT and Claude, but deploys a team of specialized sub-agents with their own skills and paid tool access. Each agent handles a different part of the research: Google Maps reviews, Chamber of Commerce filings, LinkedIn activity, and more. A chatbot summarizes the first page of Google.\n\nclaudje cross-references real data from multiple sources into one complete report.",
      },
      {
        question: "How do I cancel?",
        answer:
          "Email us anytime. No contracts, no lock-in. Monitoring stops at the end of your current billing period.",
      },
    ],
  },

  footer: {
    ctaTitle: "Ready to Know What Your Competitors Are Up To?",
    ctaSubtitle: "Start getting competitor reports in your inbox this week.",
    ctaButton: "Start Your Free Trial",
    nav: {
      product: "Product",
      technology: "Technology",
      pricing: "Pricing",
      about: "About",
      blog: "Blog",
      contact: "Contact",
    },
  },

  reportCarousel: {
    coverTitle: "Market Report",
    coverSubtitle: "Pricing Intelligence & Competitor Analysis",
    coverPreparedFor: "Prepared for",
    coverCompany: "Your Company",
    coverDate: "March 2026 | Week 13",
    coverMeta: "5 competitors analysed | 48 data points",

    summaryEyebrow: "Summary",
    keyFigures: "Key Figures",
    statCompetitors: "Competitors",
    statDataPoints: "Data points",
    statPriceChanges: "Price changes",
    statMarketPosition: "Market position",
    keyFindings: "Key Findings",
    finding1: "Top competitor raised prices by 8%",
    finding2: "New entrant detected in your area",

    pricingEyebrow: "Pricing Intelligence",
    columnCompetitor: "Competitor",
    columnPrice: "Price",
    columnChange: "Change",
    yourCompany: "Your Company",

    activityEyebrow: "Web & Review Monitoring",
    activityWebsiteTitle: "Website Changes",
    activityWebsiteDetail: "Competitor A launched a new promotions page.",
    activityReviewsTitle: "Review Alerts",
    activityReviewsDetail: "Competitor B dropped to 3.9 stars (slow service).",
    activitySearchTitle: "Search Trends",
    activitySearchDetail: "Competitor C brand searches up 22%.",

    prevPage: "Previous page",
    nextPage: "Next page",
    pageLabel: "Page",
  },

  product: {
    heroTitle: "Competitor Intelligence, Managed For You",
    heroBody:
      "Every week, your AI agents research your competitors across the web, public records, and professional data sources. An analyst reviews the findings. You get a clear report in your inbox.",
    heroCta: "Start Your Free Trial",
  },

  technology: {
    heroTitle: "How Your Agents Work",
    heroBody:
      "Behind every report is a team of specialized AI agents. Each one trained for a specific research task. Supervised by a human analyst.",
    humanLoopTitle: "AI Does the Heavy Lifting. Humans Ensure Quality.",
    humanLoopBody:
      "Every report passes through a human analyst before it reaches your inbox. They verify accuracy, add context, and highlight what matters most for your specific business.",
    humanLoopAiLabel: "AI generates",
    humanLoopAiSub: "Data + narrative",
    humanLoopAnalystLabel: "Analyst reviews",
    humanLoopAnalystSub: "Verify + refine",
    humanLoopReceiveLabel: "You receive",
    humanLoopReceiveSub: "Trusted report",
  },

  about: {
    heroTitle: "About claudje",
    berendRole: "Co-founder",
    berendBio:
      "BBA from the University of Amsterdam. Currently pursuing a Master\u2019s in Innovation, Technology and Entrepreneurship at Bocconi. Actively building AI products and the mastermind behind claudje.",
    berendLinkedinLabel: "Berend Harms on LinkedIn",
    mission:
      "Agentic AI took the world by storm at the end of 2025. That same technology is now rapidly expanding into everyday business processes. claudje is built to capitalize on this shift, delivering managed competitor intelligence powered by the best AI agents available.",
    cta: "Get Started",
    orReachAt: "Or reach out at",
  },

  blog: {
    heroTitle: "Blog",
    heroSubtitle: "Practical guides on competitor intelligence for SMBs",
    allPosts: "\u2190 All posts",
    postCtaTitle: "Want automated competitor intelligence?",
    postCtaButton: "Try claudje free for 14 days",
  },

  comparisonTable: {
    eyebrow: "Why Claudje",
    title: "Why Not Just Use ChatGPT?",
    body: "Claudje uses the same foundation models \u2014 but wraps them in managed agents, paid data tools, and a human review. Here\u2019s what that changes in practice.",
    columnCapability: "Capability",
    columnChatbot: "ChatGPT alone",
    columnClaudje: "Claudje",
    footer:
      "Same models, different job. ChatGPT answers questions. Claudje runs your intelligence.",
    rows: {
      freshness: {
        feature: "Data freshness",
        chatbot: "Stale \u2014 months old at best",
        claudje: "Refreshed every week",
      },
      sources: {
        feature: "Sources",
        chatbot: "Public web search",
        claudje: "KvK, Trustpilot, Meta Ads, Firecrawl",
      },
      verification: {
        feature: "Verification",
        chatbot: "None \u2014 will hallucinate",
        claudje: "Reviewed by a human analyst",
      },
      pricing: {
        feature: "Pricing data",
        chatbot: "Guessed from memory",
        claudje: "Live-scraped from source",
      },
      tracking: {
        feature: "Tracking",
        chatbot: "One-off answer",
        claudje: "Continuous, week-over-week",
      },
      count: {
        feature: "Competitor count",
        chatbot: "One at a time",
        claudje: "Up to 15 in parallel",
      },
      delivery: {
        feature: "Delivery",
        chatbot: "You have to ask",
        claudje: "Lands in your inbox",
      },
    },
  },

  dataSources: {
    title: "Professional Data Sources",
    subtitle:
      "Your agents pull verified data from professional tools and platforms. Not web scraping. Real API access.",
    sources: {
      googleMaps: {
        name: "Google Maps",
        description: "Ratings, reviews, response patterns, and location data.",
      },
      linkedin: {
        name: "LinkedIn",
        description: "Job postings, headcount growth, and company updates.",
      },
      trustpilot: {
        name: "Trustpilot",
        description:
          "Customer sentiment, rating trends, and complaint themes.",
      },
      coc: {
        name: "Chamber of Commerce",
        description:
          "Registration changes, director updates, and legal filings.",
      },
      similarweb: {
        name: "SimilarWeb",
        description: "Traffic estimates, top sources, and engagement metrics.",
      },
      googleReviews: {
        name: "Google Reviews",
        description: "Local ratings, review velocity, and owner responses.",
      },
      g2: {
        name: "G2",
        description:
          "Software ratings, feature comparisons, and buyer sentiment.",
      },
      glassdoor: {
        name: "Glassdoor",
        description:
          "Employee ratings, hiring trends, and company culture signals.",
      },
      seo: {
        name: "SEO tools",
        description:
          "Keyword rankings, backlink changes, and organic visibility.",
      },
    },
  },

  useCases: {
    title: "Built for Local and Regional Businesses",
    subtitle:
      "Whether you run one location or fifty, claudje tracks the competitors that matter to your market.",
    verticals: {
      retail: {
        name: "Retail & E-commerce",
        description:
          "Track competitor pricing, promotions, and product launches across online and local stores.",
      },
      hospitality: {
        name: "Restaurants & Hospitality",
        description:
          "Monitor Google Maps reviews, menu pricing, and local reputation across locations.",
      },
      services: {
        name: "Professional Services",
        description:
          "Watch how competitors position their services, pricing models, and client testimonials.",
      },
      health: {
        name: "Healthcare & Dental",
        description:
          "Track patient reviews, practice reputation, and how competitors market their services.",
      },
      auto: {
        name: "Automotive & Leasing",
        description:
          "Compare vehicle pricing, lease offers, and dealership reviews across your market.",
      },
      trades: {
        name: "Home & Trade Services",
        description:
          "Monitor competitor reviews, pricing, and how they show up in local search results.",
      },
    },
  },

  reportPreviewDetailed: {
    eyebrow: "What You Get",
    title: "Five signals, one report",
    subtitle:
      "Every weekly report covers the five categories below. Each one is drawn from real data we track \u2014 pricing tables, review sentiment, ad activity, AI visibility, and the actions that follow from it.",
    navLabel: "Report sections",
    tabs: {
      pricing: {
        label: "Pricing Intelligence",
        description: "Track every price move, automatically.",
      },
      reviews: {
        label: "Reviews & Reputation",
        description: "See where trust is won and lost.",
      },
      advertising: {
        label: "Advertising Intelligence",
        description: "Who is paying for attention \u2014 and who isn\u2019t.",
      },
      ai: {
        label: "AI Discoverability",
        description: "Your market ranking inside ChatGPT answers.",
      },
      recommendations: {
        label: "Strategic Recommendations",
        description: "What to actually do about it, this week.",
      },
    },
  },

  reportFragments: {
    keyInsight: "Key insight",
    youLabel: "You",
    pricing: {
      eyebrow: "Pricing snapshot \u00B7 week 16",
      title: "A-segment entry prices",
      subtitle: "Tracked weekly across 10 competitors",
      insight:
        "Two competitors raised prices this fortnight \u2014 you are now the cheapest in the A-segment.",
      colCompetitor: "Competitor",
      colEntry: "Entry / mo",
      colChange: "\u0394 (2w)",
    },
    reviews: {
      eyebrow: "Review tracking \u00B7 week 16",
      title: "Where competitors lose trust",
      subtitle: "2,344 reviews scanned across Google & Trustpilot",
      insight:
        "End-of-contract surprises are the #1 complaint in your sector \u2014 a transparency page would differentiate you immediately.",
      painCompetitor01: "Hidden end-of-contract costs",
      painCompetitor02: "High repair fees for minor damage",
      painCompetitor03: "Disputed deposit withholdings",
      painCompetitor04: "Unreachable after sign-up",
    },
    ads: {
      eyebrow: "Ad activity \u00B7 Meta Ad Library",
      title: "Who\u2019s buying attention",
      subtitle: "Active ad count per competitor, last 7 days",
      insight:
        "7 of 10 competitors run zero paid ads. The field is nearly empty \u2014 each euro of your ad-spend stretches exceptionally far.",
    },
    ai: {
      eyebrow: "AI visibility \u00B7 GEO score",
      title: "Who ChatGPT recommends",
      subtitle: "Mention rate across 12 AI-search queries",
      insight:
        "You rank #2 in your market on AI search \u2014 one technical change (an llms.txt file) could put you at #1.",
    },
    recommendations: {
      eyebrow: "Recommended actions \u00B7 week 16",
      title: "What to do this week",
      subtitle: "Drawn from the findings above, ranked by impact",
      insight:
        "Every report closes with 2\u20134 concrete actions, prioritized by cost and timing.",
      quickWinKind: "Quick win",
      quickWinTitle: "Launch a Meta ad on your entry price",
      quickWinBody:
        "Your A-segment is now the cheapest in the market. A single campaign targeting that gap costs under \u20AC200/week and capitalizes on Competitor 01\u2019s recent price hike.",
      strategicKind: "Strategic",
      strategicTitle: "Publish an end-of-contract transparency page",
      strategicBody:
        "The #1 complaint across 4 competitors is end-of-contract surprises. One FAQ page on depots, inspections and final pricing would target the biggest trust gap in your sector.",
    },
  },

  agentArchitecture: {
    title: "From Competitors to Report",
    subtitle:
      "One pipeline. Fully automated, with a human check before anything reaches your inbox.",
    competitorsLabel: "Competitors",
    competitorsSub: "Your list",
    agentLabel: "claudje Agent",
    agentSub: "Scouts the internet",
    dataSourcesLabel: "Data Sources",
    dataSourcesSub: "Paid professional tools",
    webAiLabel: "Web + AI",
    webAiSub: "Public data analysis",
    reportLabel: "Report",
    reportSub: "AI synthesizes",
    reportSynthesisLabel: "Report Synthesis",
    humanReviewLabel: "Human Review",
    humanReviewSub: "Analyst verifies",
    finalReportLabel: "Final Report",
    finalReportSub: "In your inbox",
  },

  agentRoster: {
    title: "Meet Your Agents",
    subtitle:
      "Eight specialized agents, each trained for a specific research task. They work in parallel, covering every angle of your competitive landscape.",
    agents: {
      website: {
        name: "Website Monitor",
        description:
          "Tracks changes to competitor websites, product pages, and pricing pages.",
      },
      reviews: {
        name: "Review Tracker",
        description:
          "Monitors Google Maps, Trustpilot, G2, and Glassdoor for rating changes and new reviews.",
      },
      price: {
        name: "Price Scout",
        description:
          "Captures competitor pricing and flags changes across products and services.",
      },
      news: {
        name: "News & Media",
        description:
          "Finds press releases, news mentions, and media coverage about your competitors.",
      },
      social: {
        name: "Social & Content",
        description:
          "Watches LinkedIn activity, blog posts, and content strategy shifts.",
      },
      ads: {
        name: "Ad Intelligence",
        description:
          "Tracks Meta and Instagram ad campaigns, creative changes, and spend patterns.",
      },
      filings: {
        name: "Public Filings",
        description:
          "Pulls Chamber of Commerce registrations and flags legal or director changes.",
      },
      search: {
        name: "Search Visibility",
        description:
          "Measures SEO performance and how often competitors appear in AI answers.",
      },
    },
  },
};

export type Messages = typeof messages;

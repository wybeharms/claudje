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
};

export type Messages = typeof messages;

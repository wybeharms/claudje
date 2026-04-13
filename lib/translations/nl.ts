import type { Messages } from "./en-US";

export const messages: Messages = {
  header: {
    nav: {
      product: "Product",
      technology: "Technologie",
      about: "Over ons",
      blog: "Blog",
      aboutMenu: "Over",
    },
    login: "Inloggen",
    ctaTrial: "Gratis proberen",
    languageLabel: "Taal wijzigen",
  },

  hero: {
    headlineLine: "Weet wat je concurrenten doen.",
    headlineHighlight: "Elke week.",
    subheadLine1: "houdt je concurrenten in de gaten zodat jij vooruit kunt.",
    subheadLine2: "Alles in \u00E9\u00E9n helder rapport, rechtstreeks in je inbox.",
    ctaPrimary: "Start je gratis proefperiode",
    ctaSecondary: "Bekijk wat er in een rapport staat",
  },

  howItWorks: {
    title: "Hoe het werkt",
    subtitle: "Drie stappen. Geen software te installeren.",
    step1Title: "Vertel ons wie je in de gaten wilt houden",
    step1Desc: "Noem tot 5, 10 of 50 concurrenten. Elke branche.",
    step2Title: "Wij beheren je agents",
    step2Desc:
      "claudje zet managed agents in die websites, reviews, LinkedIn en prijzen volgen. Ze halen geverifieerde data op uit professionele bronnen.",
    step3Title: "Jij krijgt een helder rapport",
    step3Desc:
      "Wat veranderde, wat het betekent en waar je op moet letten. In je inbox, wekelijks of dagelijks.",
    typingLabel: "Concurrent:",
    analystBefore: "Elk rapport wordt ",
    analystHighlight: "nagekeken door een analist",
    analystAfter: " voor levering. AI doet het zware werk, wij borgen de kwaliteit.",
    learnMoreReport: "Bekijk wat er in een rapport staat",
    learnMoreAgents: "Hoe onze agents werken",
  },

  whyClaudje: {
    title: "\u201CMaar kan ChatGPT dit niet ook?\u201D",
    introBefore: "claudje gebruikt ",
    introHighlight: "dezelfde AI",
    introAfter: " als ChatGPT en Claude.",

    chatbotIntroBefore:
      "Als je een chatbot vraagt om een concurrent te onderzoeken, doorzoekt hij het web, scant de eerste resultaten en geeft je een samenvatting. ",
    chatbotIntroHighlight: "Meer niet.",

    fakeChatLabel: "ChatGPT",
    fakeFoundAbout: "Dit heb ik gevonden over ",
    fakeCompetitorName: "Concurrent X",
    fakeFoundColon: ":",
    fakeSummary:
      "Het lijkt een middelgroot bedrijf in jouw markt. Op basis van hun website bieden ze vergelijkbare diensten en richten ze zich op de Europese markt.",
    fakePricing:
      "Hun prijzen staan niet openbaar online, maar op basis van vergelijkbare bedrijven schat ik dat ze rond \u20AC50-100 per maand rekenen.",
    fakeDisclaimer:
      "Let op: ik heb geen toegang tot realtime data, dus deze informatie kan verouderd zijn.",
    chatBadgeEstimates: "Alleen schattingen",
    chatBadgeSnapshot: "Eenmalige momentopname",

    claudjeIntroBefore: "claudje zet ",
    claudjeIntroHighlight1: "managed agents",
    claudjeIntroMiddle: " in met ",
    claudjeIntroHighlight2: "betaalde tool-toegang",
    claudjeIntroAfter:
      ". Ze halen geverifieerde data op uit professionele bronnen waar een chatbot niet bij kan.",

    claudjeReportLabel: "claudje rapport",
    pricingItemBold: "Concurrent X",
    pricingItemRest: " heeft de prijzen op 15 maart met 12% verhoogd.",
    pricingSource: "[prijs-API]",
    hiringItem:
      "3 nieuwe vacatures op LinkedIn: 2 sales reps + 1 product manager. Waarschijnlijk uitbreiding richting enterprise.",
    hiringSource: "[LinkedIn]",
    hiringBadge: "+3 nieuw",
    trafficItem:
      "Websiteverkeer +23% MoM. Belangrijkste bron verschoof van organisch naar betaalde Meta-ads.",
    trafficSource: "[SimilarWeb]",
    claudjeBadgeSources: "Geverifieerde bronnen",
    claudjeBadgeAnalyst: "Door analist gecontroleerd",
    claudjeBadgeUpdated: "Automatisch bijgewerkt",
  },

  reportPreview: {
    title: "Wat staat er in een rapport",
    subtitle:
      "Elk rapport is volledig op jouw bedrijf afgestemd. Zo ziet een typisch rapport eruit.",
    viewOverview: "Rapportoverzicht",
    viewExecutiveSummary: "Managementsamenvatting",
    prevView: "Vorige weergave",
    nextView: "Volgende weergave",
    viewLabel: "Weergave",
    fullBreakdown: "Bekijk volledige rapportopbouw",
  },

  whoItsFor: {
    title: "Je concurrenten bewegen. Kijk jij mee?",
    body1:
      "Je weet dat AI je een voorsprong kan geven. Je hebt alleen niet de tijd, tools of het team om het structureel in te zetten.",
    body2Before:
      "claudje doet het voor je. Echte concurrentie-inzichten, gecontroleerd door een echte analist, in je inbox. Vanaf ",
    body2After: "/maand.",
    cta: "Begin met monitoren",
  },

  pricing: {
    title: "Prijzen",
    subtitle: "Eenvoudige plannen. Geen setup-kosten. Stop wanneer je wilt.",
    perMonth: "/mnd",
    starterName: "Starter",
    starterFeatures: [
      "5 concurrenten gevolgd",
      "Tweewekelijks rapport",
      "Web- en reviewmonitoring",
    ],
    businessName: "Business",
    businessFeatures: [
      "10 concurrenten gevolgd",
      "Wekelijks rapport",
      "LinkedIn-tracking",
      "Prijsanalyse",
      "Analyse zoektrends",
    ],
    proName: "Pro",
    proFeatures: [
      "15 concurrenten gevolgd",
      "Dagelijks, wekelijks of tweewekelijks",
      "Dagelijkse prijstracking",
      "Volledige rapportcustomisatie",
    ],
    ctaTrial: "Start gratis proefperiode",
    ctaSelect: "Kies dit plan",
  },

  faq: {
    title: "FAQ",
    subtitle: "Veelgestelde vragen over claudje.",
    items: [
      {
        question: "Hoe verzamelt claudje data over concurrenten?",
        answer:
          "claudje gebruikt AI om openbaar beschikbare informatie te analyseren: websites, prijspagina\u2019s, reviewplatforms, KvK-gegevens, social media en zoektrends. Geen scraping van priv\u00E9-data, geen hacking. Gewoon gestructureerde analyse van wat al openbaar is.",
      },
      {
        question: "Wanneer krijg ik mijn eerste rapport?",
        answer:
          "Binnen 24 uur nadat je je concurrentenlijst hebt gedeeld. We zetten de monitoring op, draaien de eerste analyse en leveren een compleet rapport in je inbox.",
      },
      {
        question: "Kan ik de concurrenten die ik volg wijzigen?",
        answer:
          "Ja, op elk moment. Mail ons en we wisselen ze uit. Wijzigingen gaan in vanaf het volgende rapport.",
      },
      {
        question: "Is dit legaal?",
        answer:
          "Absoluut. claudje analyseert alleen openbaar beschikbare informatie. Dezelfde data die iedereen kan vinden door de website van je concurrent te bezoeken, hun reviews te lezen of de KvK te raadplegen. Wij doen het alleen systematisch en leveren de inzichten bij jou aan.",
      },
      {
        question: "In welk formaat krijg ik de rapporten?",
        answer:
          "Rapporten worden in je inbox geleverd als gestructureerde e-mails met datatabellen en AI-samenvattingen per categorie. Je krijgt ook toegang tot een portaal waar je eerdere rapporten kunt bekijken, je concurrenten kunt aanpassen en je voorkeuren kunt beheren.",
      },
      {
        question: "Hoe verschilt dit van zelf ChatGPT gebruiken?",
        answer:
          "claudje gebruikt dezelfde AI-modellen als ChatGPT en Claude, maar zet een team van gespecialiseerde sub-agents in met eigen skills en betaalde tool-toegang. Elke agent doet een ander stuk: Google Maps-reviews, KvK-deponeringen, LinkedIn-activiteit en meer. Een chatbot vat alleen de eerste pagina van Google samen.\n\nclaudje legt echte data uit meerdere bronnen naast elkaar in \u00E9\u00E9n compleet rapport.",
      },
      {
        question: "Hoe zeg ik op?",
        answer:
          "Mail ons wanneer je wilt. Geen contracten, geen lock-in. Monitoring stopt aan het einde van je huidige factuurperiode.",
      },
    ],
  },

  footer: {
    ctaTitle: "Klaar om te weten wat je concurrenten uitspoken?",
    ctaSubtitle: "Krijg deze week nog concurrentie-rapporten in je inbox.",
    ctaButton: "Start je gratis proefperiode",
    nav: {
      product: "Product",
      technology: "Technologie",
      pricing: "Prijzen",
      about: "Over ons",
      blog: "Blog",
      contact: "Contact",
    },
  },

  reportCarousel: {
    coverTitle: "Marktrapport",
    coverSubtitle: "Prijsintelligentie & concurrentieanalyse",
    coverPreparedFor: "Opgesteld voor",
    coverCompany: "Jouw bedrijf",
    coverDate: "Maart 2026 | Week 13",
    coverMeta: "5 concurrenten geanalyseerd | 48 datapunten",

    summaryEyebrow: "Samenvatting",
    keyFigures: "Kerncijfers",
    statCompetitors: "Concurrenten",
    statDataPoints: "Datapunten",
    statPriceChanges: "Prijswijzigingen",
    statMarketPosition: "Marktpositie",
    keyFindings: "Belangrijkste bevindingen",
    finding1: "Grootste concurrent verhoogde prijzen met 8%",
    finding2: "Nieuwe speler gesignaleerd in jouw regio",

    pricingEyebrow: "Prijsintelligentie",
    columnCompetitor: "Concurrent",
    columnPrice: "Prijs",
    columnChange: "Verandering",
    yourCompany: "Jouw bedrijf",

    activityEyebrow: "Web- & reviewmonitoring",
    activityWebsiteTitle: "Websitewijzigingen",
    activityWebsiteDetail: "Concurrent A lanceerde een nieuwe actiepagina.",
    activityReviewsTitle: "Review-alerts",
    activityReviewsDetail: "Concurrent B zakte naar 3,9 sterren (trage service).",
    activitySearchTitle: "Zoektrends",
    activitySearchDetail: "Merkzoekopdrachten Concurrent C +22%.",

    prevPage: "Vorige pagina",
    nextPage: "Volgende pagina",
    pageLabel: "Pagina",
  },
};

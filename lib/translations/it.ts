import type { Messages } from "./en-US";

export const messages: Messages = {
  header: {
    nav: {
      product: "Prodotto",
      technology: "Tecnologia",
      about: "Chi siamo",
      blog: "Blog",
      aboutMenu: "Info",
      bookCall: "Prenota una call",
    },
    login: "Accedi",
    ctaTrial: "Prova gratis",
    languageLabel: "Cambia lingua",
  },

  hero: {
    headlineLine: "Sappi cosa stanno facendo i tuoi concorrenti.",
    headlineHighlight: "Ogni settimana.",
    subheadLine1: "tiene d\u2019occhio i tuoi concorrenti, cos\u00EC tu puoi correre avanti.",
    subheadLine2: "Tutto in un report chiaro, direttamente nella tua casella.",
    ctaPrimary: "Inizia la prova gratuita",
    ctaSecondary: "Scopri cosa contiene un report",
  },

  howItWorks: {
    title: "Come funziona",
    subtitle: "Tre passaggi. Nessun software da installare.",
    step1Title: "Dicci chi monitorare",
    step1Desc: "Indica fino a 5, 10 o 50 concorrenti. Qualsiasi settore.",
    step2Title: "Gestiamo noi i tuoi agenti",
    step2Desc:
      "claudje schiera agenti gestiti che monitorano siti web, recensioni, LinkedIn e prezzi. Recuperano dati verificati da fonti professionali.",
    step3Title: "Ricevi un report chiaro",
    step3Desc:
      "Cosa \u00E8 cambiato, cosa significa e cosa monitorare. Nella tua casella, ogni settimana o ogni giorno.",
    typingLabel: "Concorrente:",
    analystBefore: "Ogni report viene ",
    analystHighlight: "rivisto da un analista",
    analystAfter: " prima della consegna. L\u2019AI fa il lavoro pesante, noi garantiamo la qualit\u00E0.",
    learnMoreReport: "Scopri cosa contiene un report",
    learnMoreAgents: "Come funzionano i nostri agenti",
  },

  whyClaudje: {
    title: "\u201CMa ChatGPT non lo fa gi\u00E0?\u201D",
    introBefore: "claudje usa ",
    introHighlight: "la stessa AI",
    introAfter: " che alimenta ChatGPT e Claude.",

    chatbotIntroBefore:
      "Quando chiedi a un chatbot di analizzare un concorrente, cerca sul web, scorre i primi risultati e ti d\u00E0 un riassunto. ",
    chatbotIntroHighlight: "Tutto qui.",

    fakeChatLabel: "ChatGPT",
    fakeFoundAbout: "Ecco cosa ho trovato su ",
    fakeCompetitorName: "Concorrente X",
    fakeFoundColon: ":",
    fakeSummary:
      "Sembra essere un\u2019azienda di medie dimensioni nel tuo settore. In base al loro sito, offrono servizi simili e sembrano focalizzati sul mercato europeo.",
    fakePricing:
      "I loro prezzi non sono pubblici, ma in base ad aziende simili stimo che facciano pagare circa \u20AC50-100 al mese.",
    fakeDisclaimer:
      "Nota: non ho accesso a dati in tempo reale, quindi alcune di queste informazioni potrebbero essere obsolete.",
    chatBadgeEstimates: "Solo stime",
    chatBadgeSnapshot: "Una sola istantanea",

    claudjeIntroBefore: "claudje schiera ",
    claudjeIntroHighlight1: "agenti gestiti",
    claudjeIntroMiddle: " con ",
    claudjeIntroHighlight2: "accesso a strumenti a pagamento",
    claudjeIntroAfter:
      ". Recuperano dati verificati da fonti professionali che un chatbot non pu\u00F2 raggiungere.",

    claudjeReportLabel: "report claudje",
    recommendationItem:
      "Riduci il prezzo d'ingresso del segmento A del 5%. Due concorrenti hanno alzato i prezzi questo mese, aprendo un varco che puoi sfruttare.",
    recommendationSource: "[analisi del report]",
    recommendationBadge: "Quick win",
    hiringItem:
      "3 nuove offerte di lavoro su LinkedIn: 2 sales + 1 product manager. Probabile espansione verso l\u2019enterprise.",
    hiringSource: "[LinkedIn]",
    hiringBadge: "+3 nuovi",
    pricingItemBold: "Concorrente X",
    pricingItemRest: " ha aumentato i prezzi del 12% il 15 marzo.",
    pricingSource: "[API prezzi]",
    claudjeBadgeSources: "Fonti verificate",
    claudjeBadgeAnalyst: "Revisionato da analista",
    claudjeBadgeUpdated: "Aggiornato automaticamente",
  },

  reportPreview: {
    title: "Cosa contiene un report",
    subtitle:
      "Ogni report \u00E8 completamente personalizzabile sulla tua attivit\u00E0. Ecco com\u2019\u00E8 un report tipico.",
    viewOverview: "Panoramica report",
    viewExecutiveSummary: "Sintesi esecutiva",
    prevView: "Vista precedente",
    nextView: "Vista successiva",
    viewLabel: "Vista",
    fullBreakdown: "Vedi la struttura completa del report",
    plusMore: "E molto altro \u2192",
  },

  whoItsFor: {
    title: "I tuoi concorrenti si muovono. Tu li stai guardando?",
    body1:
      "Sai che l\u2019AI pu\u00F2 darti un vantaggio. Semplicemente non hai il tempo, gli strumenti o il team per usarla in modo costante.",
    body2Before:
      "claudje lo fa per te. Vera intelligence sui concorrenti, rivista da un analista vero, consegnata nella tua casella. A partire da ",
    body2After: "/mese.",
    cta: "Inizia a monitorare",
  },

  pricing: {
    title: "Prezzi",
    subtitle: "Piani semplici. Nessun costo di attivazione. Disdici quando vuoi.",
    perMonth: "/mese",
    starterName: "Starter",
    starterFeatures: [
      "5 concorrenti monitorati",
      "Report bisettimanale",
      "Monitoraggio web e recensioni",
    ],
    businessName: "Business",
    businessFeatures: [
      "10 concorrenti monitorati",
      "Report settimanale",
      "Tracciamento LinkedIn",
      "Analisi prezzi",
      "Analisi trend di ricerca",
    ],
    proName: "Pro",
    proFeatures: [
      "15 concorrenti monitorati",
      "Report giornalieri, settimanali o bisettimanali",
      "Tracciamento prezzi quotidiano",
      "Personalizzazione completa del report",
    ],
    ctaTrial: "Inizia la prova gratuita",
    ctaSelect: "Scegli il piano",
  },

  bookCall: {
    eyebrow: "Ancora dubbi?",
    title: "Parla con Berend prima di decidere",
    body: "15 minuti, gratis, senza impegno. Chiedi qualsiasi cosa \u2014 sul report, sulle fonti dati o se Claudje \u00E8 adatto alla tua azienda.",
    cta: "Prenota una call gratuita di 15 min",
    note: "Linea diretta con uno dei fondatori.",
  },

  faq: {
    title: "FAQ",
    subtitle: "Domande comuni su claudje.",
    items: [
      {
        question: "Come raccoglie claudje i dati sui concorrenti?",
        answer:
          "claudje usa l\u2019AI per analizzare informazioni pubblicamente disponibili: siti web, pagine prezzi, piattaforme di recensioni, registri imprese, profili social e trend di ricerca. Nessuno scraping di dati privati, nessun hacking. Solo analisi strutturata di ci\u00F2 che \u00E8 gi\u00E0 pubblico.",
      },
      {
        question: "Quando ricever\u00F2 il primo report?",
        answer:
          "Entro 24 ore dalla condivisione della tua lista di concorrenti. Configuriamo il monitoraggio, eseguiamo la prima analisi e consegniamo un report completo nella tua casella.",
      },
      {
        question: "Posso cambiare i concorrenti che monitoro?",
        answer:
          "S\u00EC, in qualsiasi momento. Scrivici per sostituire i concorrenti. Le modifiche entrano in vigore con il ciclo di report successivo.",
      },
      {
        question: "\u00C8 legale?",
        answer:
          "Assolutamente. claudje analizza solo informazioni pubblicamente disponibili. Gli stessi dati che chiunque potrebbe trovare visitando i siti dei tuoi concorrenti, leggendo le loro recensioni o consultando il registro imprese. Noi lo facciamo sistematicamente e ti consegniamo gli insight.",
      },
      {
        question: "In che formato sono i report?",
        answer:
          "I report vengono consegnati nella tua casella come email strutturate con tabelle dati e riassunti generati dall\u2019AI per ogni categoria. Hai anche accesso a un portale dove puoi vedere i report passati, cambiare i concorrenti e gestire le tue preferenze.",
      },
      {
        question: "In cosa \u00E8 diverso dall\u2019usare ChatGPT?",
        answer:
          "claudje usa gli stessi modelli AI di ChatGPT e Claude, ma schiera un team di sub-agenti specializzati con skill proprie e accesso a strumenti a pagamento. Ogni agente gestisce una parte diversa della ricerca: recensioni Google Maps, depositi del registro imprese, attivit\u00E0 LinkedIn e altro. Un chatbot riassume la prima pagina di Google.\n\nclaudje incrocia dati reali da pi\u00F9 fonti in un unico report completo.",
      },
      {
        question: "Come disdico?",
        answer:
          "Scrivici quando vuoi. Nessun contratto, nessun vincolo. Il monitoraggio si ferma alla fine del periodo di fatturazione corrente.",
      },
    ],
  },

  footer: {
    ctaTitle: "Pronto a sapere cosa stanno combinando i tuoi concorrenti?",
    ctaSubtitle: "Inizia a ricevere report sui concorrenti nella tua casella questa settimana.",
    ctaButton: "Inizia la prova gratuita",
    nav: {
      product: "Prodotto",
      technology: "Tecnologia",
      pricing: "Prezzi",
      about: "Chi siamo",
      blog: "Blog",
      contact: "Contatti",
    },
  },

  reportCarousel: {
    coverTitle: "Report di mercato",
    coverSubtitle: "Intelligence sui prezzi & analisi della concorrenza",
    coverPreparedFor: "Preparato per",
    coverCompany: "La tua azienda",
    coverDate: "Marzo 2026 | Settimana 13",
    coverMeta: "5 concorrenti analizzati | 48 datapoint",

    summaryEyebrow: "Sintesi",
    keyFigures: "Numeri chiave",
    statCompetitors: "Concorrenti",
    statDataPoints: "Datapoint",
    statPriceChanges: "Variazioni di prezzo",
    statMarketPosition: "Posizione di mercato",
    keyFindings: "Risultati principali",
    finding1: "Il principale concorrente ha alzato i prezzi dell\u20198%",
    finding2: "Nuovo concorrente rilevato nella tua zona",

    pricingEyebrow: "Intelligence sui prezzi",
    columnCompetitor: "Concorrente",
    columnPrice: "Prezzo",
    columnChange: "Variazione",
    yourCompany: "La tua azienda",

    activityEyebrow: "Monitoraggio web e recensioni",
    activityWebsiteTitle: "Modifiche al sito",
    activityWebsiteDetail: "Concorrente A ha lanciato una nuova pagina promozioni.",
    activityReviewsTitle: "Avvisi recensioni",
    activityReviewsDetail: "Concorrente B \u00E8 sceso a 3,9 stelle (servizio lento).",
    activitySearchTitle: "Trend di ricerca",
    activitySearchDetail: "Ricerche brand di Concorrente C +22%.",

    prevPage: "Pagina precedente",
    nextPage: "Pagina successiva",
    pageLabel: "Pagina",
  },
};

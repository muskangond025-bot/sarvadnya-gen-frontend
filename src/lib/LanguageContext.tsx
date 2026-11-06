"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "mr";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.menu": "MENU",
    "nav.close": "CLOSE",
    "nav.requestQuote": "Request Quote",
    "nav.phone": "+91 62626 29944",
    "nav.directDispatch": "Direct Fleet Dispatch",
    "nav.home": "Home",
    "nav.fleet": "Fleet & Rentals",
    "nav.services": "Services & Industries",
    "nav.insights": "Rental Insights",
    "nav.about": "About Sarvadnya",
    "nav.contact": "Contact & Logistics",
    "nav.linkFleet": "Fleet",
    "nav.linkServices": "Services",
    "nav.linkAbout": "About",
    "nav.linkContact": "Contact",
    "nav.langSwitch": "Language",

    // Hero
    "hero.title1": "Reliable Power.",
    "hero.title2": "When It Matters Most.",
    "hero.desc":
      "Specialized silent generator rental solutions for weddings, grand events, and industrial projects. Explore rental requirements across a 5 kVA–250 kVA capacity range and enquire about a solution suited to your application.",
    "hero.ctaPrimary": "Request a Quote",
    "hero.ctaSecondary": "Explore Rental Solutions",
    "hero.fact1Title": "5 – 250 kVA",
    "hero.fact1Desc": "Capacity fleet for events & industry",
    "hero.fact2Title": "Acoustic Silent",
    "hero.fact2Desc": "CPCB-II soundproof enclosures",
    "hero.fact3Title": "Nashik & Across MH",
    "hero.fact3Desc": "Dedicated delivery & setup team",

    // Trusted By
    "trusted.heading": "Engine Technology & Fleet Partners",

    // Industries / Assurances
    "industries.title": "Plan Your Power Requirements with Confidence",
    "industries.desc":
      "Dependable temporary power delivered with complete electrical accessories, verified load safety, and dedicated on-site support across Nashik.",

    // Services
    "services.title": "Power Solutions for Events and Industry",
    "services.desc":
      "Tailored silent generator setups configured for venue acoustic requirements, continuous industrial loads, and temporary project timelines.",
    "services.tab1": "Weddings & Banquets",
    "services.tab2": "Grand Events & Festivals",
    "services.tab3": "Industrial & Projects",
    "services.dispatchFleet": "AUTONOMOUS DISPATCH FLEET",
    "services.guide": "Full Capacity Guide",

    // Generator Range
    "range.title": "Generator Fleet from 5 kVA to 250+ kVA",
    "range.desc":
      "Sized for your venue starting currents and continuous operation. Select any capacity below to view verified electrical ratings, acoustic standards, and application fit.",
    "range.quickShortcuts": "Quick Sizing Shortcuts:",
    "range.powers": "Powers: ",
    "range.bestFor": "Best For: ",
    "range.enquire": "Enquire for",
    "range.fleetSuffix": "Fleet",

    // Process / Solutions
    "solutions.title": "From Requirements to Rental Enquiry",
    "solutions.desc":
      "A clear, transparent workflow to ensure your generator rental is perfectly matched, delivered on time, and professionally supported.",
    "solutions.step1Title": "Share Your Requirements",
    "solutions.step1Desc":
      "Tell us about your wedding, event, or industrial project—including site location, required operational dates, and key machinery to power.",
    "solutions.step2Title": "Discuss Power Load Sizing",
    "solutions.step2Desc":
      "Our technical team reviews starting inrush currents and continuous running requirements to recommend the exact generator capacity (5–250 kVA).",
    "solutions.step3Title": "Confirm Availability & Quotation",
    "solutions.step3Desc":
      "Receive a transparent rental quote including delivery logistics, soundproof canopy setup, and on-site operator assistance before booking.",

    // Testimonials
    "faq.title": "Frequently Asked Questions",
    "faq.desc":
      "Clear answers to generator rental logistics, load sizing, fuel autonomy, and technical operations.",

    // CTA
    "cta.title": "Power Your Next Project with Complete Peace of Mind",
    "cta.desc":
      "Whether you need a quiet soundproof generator for a wedding or continuous multi-megawatt prime power for an industrial plant, Sarvadnya delivers on time.",
    "cta.button": "Book a Generator Now",

    // Technology
    "tech.title": "Generator Rental in Nashik & Across Maharashtra",
    "tech.desc":
      "Prompt fleet mobilization, on-site cable rigging, and qualified operator attendance from our central Nashik depot.",
    "tech.availability": "Check Service Availability",
  },
  hi: {
    // Navbar
    "nav.menu": "मेनू",
    "nav.close": "बंद करें",
    "nav.requestQuote": "कोटेशन प्राप्त करें",
    "nav.phone": "+91 62626 29944",
    "nav.directDispatch": "सीधी फ्लीट बुकिंग",
    "nav.home": "होम",
    "nav.fleet": "जनरेटर फ्लीट व रेंटल",
    "nav.services": "सेवाएं और उद्योग",
    "nav.insights": "रेंटल इनसाइट्स",
    "nav.about": "सर्वज्ञ के बारे में",
    "nav.contact": "संपर्क और लॉजिस्टिक्स",
    "nav.linkFleet": "फ्लीट",
    "nav.linkServices": "सेवाएं",
    "nav.linkAbout": "परिचय",
    "nav.linkContact": "संपर्क",
    "nav.langSwitch": "भाषा",

    // Hero
    "hero.title1": "भरोसेमंद बिजली।",
    "hero.title2": "जब सबसे ज्यादा जरूरत हो।",
    "hero.desc":
      "शादियों, भव्य आयोजनों और औद्योगिक परियोजनाओं के लिए विशेष साइलेंट जनरेटर रेंटल समाधान। 5 kVA से 250 kVA क्षमता रेंज में अपनी आवश्यकता के अनुसार जनरेटर तुरंत बुक करें।",
    "hero.ctaPrimary": "कोटेशन प्राप्त करें",
    "hero.ctaSecondary": "रेंटल समाधान देखें",
    "hero.fact1Title": "5 – 250 kVA",
    "hero.fact1Desc": "इवेंट्स और उद्योग के लिए फ्लीट",
    "hero.fact2Title": "ध्वनिरहित साइलेंट",
    "hero.fact2Desc": "CPCB-II साउंडप्रूफ कैनोपी",
    "hero.fact3Title": "नासिक और पूरे महाराष्ट्र में",
    "hero.fact3Desc": "समर्पित डिलीवरी और सेटअप टीम",

    // Trusted By
    "trusted.heading": "इंजन तकनीक और फ्लीट पार्टनर्स",

    // Industries / Assurances
    "industries.title": "आत्मविश्वास के साथ अपनी बिजली आवश्यकताओं की योजना बनाएं",
    "industries.desc":
      "नासिक में पूर्ण विद्युत उपकरणों, सत्यापित लोड सुरक्षा और समर्पित ऑन-साइट सहायता के साथ विश्वसनीय अस्थायी बिजली उपलब्ध कराई जाती है।",

    // Services
    "services.title": "इवेंट्स और उद्योगों के लिए पावर समाधान",
    "services.desc":
      "वेन्यू की ध्वनि आवश्यकताओं, निरंतर औद्योगिक लोड और प्रोजेक्ट टाइमलाइन के लिए विशेष रूप से कॉन्फ़िगर किए गए साइलेंट जनरेटर सेटअप।",
    "services.tab1": "विवाह और बैंक्वेट्स",
    "services.tab2": "भव्य उत्सव और कार्यक्रम",
    "services.tab3": "औद्योगिक और प्रोजेक्ट्स",
    "services.dispatchFleet": "तत्काल डिस्पैच फ्लीट उपलब्ध",
    "services.guide": "पूरी क्षमता गाइड",

    // Generator Range
    "range.title": "5 kVA से 250+ kVA जनरेटर फ्लीट",
    "range.desc":
      "आपके वेन्यू के शुरुआती करंट और निरंतर संचालन के अनुसार अनुकूलित। प्रमाणित रेटिंग और ध्वनिरहित मानक देखने के लिए नीचे दी गई क्षमता चुनें।",
    "range.quickShortcuts": "त्वरित साइजिंग शॉर्टकट:",
    "range.powers": "संचालित करता है: ",
    "range.bestFor": "सर्वश्रेष्ठ उपयोग: ",
    "range.enquire": "पूछताछ करें:",
    "range.fleetSuffix": "फ्लीट",

    // Process / Solutions
    "solutions.title": "आवश्यकता से रेंटल पूछताछ तक",
    "solutions.desc":
      "एक स्पष्ट और पारदर्शी प्रक्रिया जो यह सुनिश्चित करती है कि आपका जनरेटर सही मेल खाता हो, समय पर पहुंचे और पेशेवर रूप से समर्थित हो।",
    "solutions.step1Title": "अपनी आवश्यकताएं साझा करें",
    "solutions.step1Desc":
      "हमें अपनी शादी, इवेंट या औद्योगिक प्रोजेक्ट के बारे में बताएं—स्थान, आवश्यक तारीखें और मुख्य मशीनरी का विवरण दें।",
    "solutions.step2Title": "पावर लोड साइजिंग तय करें",
    "solutions.step2Desc":
      "हमारी तकनीकी टीम सटीक जनरेटर क्षमता (5-250 kVA) की सिफारिश करने के लिए इनरश करंट और निरंतर भार की समीक्षा करती है।",
    "solutions.step3Title": "उपलब्धता और कोटेशन कन्फर्म करें",
    "solutions.step3Desc":
      "बुकिंग से पहले डिलीवरी लॉजिस्टिक्स, साउंडप्रूफ कैनोपी सेटअप और ऑन-साइट ऑपरेटर सहायता सहित पारदर्शी कोटेशन प्राप्त करें।",

    // Testimonials
    "faq.title": "अक्सर पूछे जाने वाले सवाल",
    "faq.desc":
      "जनरेटर रेंटल लॉजिस्टिक्स, लोड साइजिंग, ईंधन और तकनीकी संचालन के स्पष्ट उत्तर।",

    // CTA
    "cta.title": "अपने अगले प्रोजेक्ट को पूरी निश्चिंतता के साथ पावर करें",
    "cta.desc":
      "चाहे शादी के लिए शांत साउंडप्रूफ जनरेटर चाहिए या औद्योगिक संयंत्र के लिए निरंतर प्राइम पावर, सर्वज्ञ समय पर सेवा देता है।",
    "cta.button": "अभी जनरेटर बुक करें",

    // Technology
    "tech.title": "नासिक और पूरे महाराष्ट्र में जनरेटर रेंटल",
    "tech.desc":
      "हमारे केंद्रीय नासिक डिपो से त्वरित फ्लीट डिस्पैच, केबल रिगिंग और योग्य ऑपरेटर सेवा।",
    "tech.availability": "सेवा उपलब्धता जांचें",
  },
  mr: {
    // Navbar
    "nav.menu": "मेनू",
    "nav.close": "बंद करा",
    "nav.requestQuote": "कोटेशन मिळवा",
    "nav.phone": "+91 62626 29944",
    "nav.directDispatch": "थेट फ्लीट बुकिंग",
    "nav.home": "मुख्यपृष्ठ",
    "nav.fleet": "जनरेटर फ्लीट व रेंटल",
    "nav.services": "सेवा आणि उद्योग",
    "nav.insights": "रेंटल माहिती",
    "nav.about": "सर्वज्ञ बद्दल",
    "nav.contact": "संपर्क आणि वाहतूक",
    "nav.linkFleet": "फ्लीट",
    "nav.linkServices": "सेवा",
    "nav.linkAbout": "परिचय",
    "nav.linkContact": "संपर्क",
    "nav.langSwitch": "भाषा",

    // Hero
    "hero.title1": "विश्वासार्ह वीज पुरवठा.",
    "hero.title2": "जेव्हा सर्वात जास्त गरज असते.",
    "hero.desc":
      "लग्नसमारंभ, भव्य कार्यक्रम आणि औद्योगिक प्रकल्पांसाठी विशेष सायलेंट जनरेटर भाडेतत्त्वावर. 5 kVA ते 250 kVA क्षमतेमध्ये आपल्या गरजेनुसार जनरेटर आजच बुक करा.",
    "hero.ctaPrimary": "कोटेशन मिळवा",
    "hero.ctaSecondary": "रेंटल सोल्यूशन्स पहा",
    "hero.fact1Title": "5 – 250 kVA",
    "hero.fact1Desc": "कार्यक्रम आणि उद्योगांसाठी फ्लीट",
    "hero.fact2Title": "ध्वनिरहित सायलेंट",
    "hero.fact2Desc": "CPCB-II साऊंडप्रूफ कॅनोपी",
    "hero.fact3Title": "नाशिक आणि संपूर्ण महाराष्ट्रात",
    "hero.fact3Desc": "समर्पित डिलिव्हरी आणि सेटअप टीम",

    // Trusted By
    "trusted.heading": "इंजिन तंत्रज्ञान आणि फ्लीट पार्टनर्स",

    // Industries / Assurances
    "industries.title": "आत्मविश्वासाने आपल्या वीज गरजांचे नियोजन करा",
    "industries.desc":
      "नाशिकमध्ये संपूर्ण विद्युत उपकरणे, तपासलेली लोड सुरक्षा आणि समर्पित ऑन-साइट सपोर्टसह विश्वासार्ह तात्पुरती वीज उपलब्ध केली जाते.",

    // Services
    "services.title": "कार्यक्रम आणि उद्योगांसाठी वीज पुरवठा सोल्यूशन्स",
    "services.desc":
      "स्थळाच्या आवाजाच्या गरजा, निरंतर औद्योगिक लोड आणि तात्पुरत्या प्रकल्पांच्या वेळेनुसार अनुकूल सायलेंट जनरेटर सोल्यूशन्स.",
    "services.tab1": "लग्नसमारंभ आणि बँक्वेट्स",
    "services.tab2": "भव्य उत्सव आणि कार्यक्रम",
    "services.tab3": "औद्योगिक आणि प्रकल्प",
    "services.dispatchFleet": "तातडीची डिस्पॅच फ्लीट सज्ज",
    "services.guide": "संपूर्ण क्षमता मार्गदर्शक",

    // Generator Range
    "range.title": "5 kVA ते 250+ kVA जनरेटर फ्लीट",
    "range.desc":
      "आपल्या ठिकाणच्या सुरुवातीच्या करंट आणि सतत वापरासाठी अचूक क्षमता. सत्यापित रेटिंग्ज आणि सायलेंट मानके पाहण्यासाठी खालील क्षमता निवडा.",
    "range.quickShortcuts": "त्वरित साइजिंग शॉर्टकट्स:",
    "range.powers": "सक्षम चालवते: ",
    "range.bestFor": "यासाठी सर्वोत्तम: ",
    "range.enquire": "चौकशी करा:",
    "range.fleetSuffix": "फ्लीट",

    // Process / Solutions
    "solutions.title": "गरजेपासून ते भाडेतत्त्वावरील चौकशीपर्यंत",
    "solutions.desc":
      "एक स्पष्ट आणि पारदर्शक कार्यपद्धती जी आपला जनरेटर वेळेवर मिळण्याची आणि अचूक जुळण्याची खात्री देते.",
    "solutions.step1Title": "आपल्या गरजा सांगा",
    "solutions.step1Desc":
      "आम्हाला तुमच्या लग्नाबद्दल, कार्यक्रमाबद्दल किंवा औद्योगिक प्रकल्पाबद्दल सांगा—ठिकाण, तारखा आणि आवश्यक मशिनरी.",
    "solutions.step2Title": "पॉवर लोड साइजिंग निश्चित करा",
    "solutions.step2Desc":
      "आमची तांत्रिक टीम अचूक जनरेटर क्षमतेची (5–250 kVA) शिफारस करण्यासाठी इनरश करंट आणि चालू असलेल्या लोडचा आढावा घेते.",
    "solutions.step3Title": "उपलब्धता आणि कोटेशन निश्चित करा",
    "solutions.step3Desc":
      "बुकिंग करण्यापूर्वी वाहतूक, साऊंडप्रूफ कॅनोपी सेटअप आणि ऑपरेटर सेवेसह पारदर्शक भाडे कोटेशन मिळवा.",

    // Testimonials
    "faq.title": "नेहमी विचारले जाणारे प्रश्न",
    "faq.desc":
      "जनरेटर भाडेतत्त्व, लोड साइजिंग, इंधन आणि तांत्रिक कामकाजाची स्पष्ट उत्तरे.",

    // CTA
    "cta.title": "आपल्या पुढील प्रकल्पाला पूर्ण विश्वासाने वीज पुरवठा करा",
    "cta.desc":
      "लग्नासाठी शांत साऊंडप्रूफ जनरेटर असो किंवा कारखान्यासाठी अखंडित वीज पुरवठा, सर्वज्ञ वेळेवर सेवा पुरवते.",
    "cta.button": "आत्ताच जनरेटर बुक करा",

    // Technology
    "tech.title": "नाशिक आणि संपूर्ण महाराष्ट्रात जनरेटर भाडेतत्त्वावर",
    "tech.desc":
      "आमच्या मध्यवर्ती नाशिक डेपोतून तातडीने जनरेटर पाठवणे, केबल जोडणी आणि तंत्रज्ञ सेवा.",
    "tech.availability": "सेवा उपलब्धता तपासा",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sarvadnya_lang") as Language;
    if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("sarvadnya_lang", lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict[key]) {
      return langDict[key];
    }
    const defaultDict = TRANSLATIONS.en;
    return defaultDict[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}


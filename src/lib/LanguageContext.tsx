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
    // Navbar & Header
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
    "trusted.kirloskarSpec": "CPCB Silent DG Sets",
    "trusted.cumminsSpec": "Heavy Industrial Prime Power",
    "trusted.mahindraSpec": "Fuel-Efficient Event Sets",
    "trusted.perkinsSpec": "High-Stability Synchronized Power",

    // Services We Offer
    "services.title": "Power Solutions for Events and Industry",
    "services.desc":
      "Tailored silent generator setups configured for venue acoustic requirements, continuous industrial loads, and temporary project timelines.",
    "services.dispatchFleet": "AUTONOMOUS DISPATCH FLEET",
    "services.tab1": "Weddings & Banquets",
    "services.tab2": "Grand Events & Festivals",
    "services.tab3": "Industrial & Projects",
    "services.v1.tagline": "ACOUSTIC SOUNDPROOF FLEET",
    "services.v1.subtitle": "Zero Noise Disruption for Lifelong Celebrations",
    "services.v1.desc":
      "Ultra-silent CPCB-II compliant diesel generators engineered specifically for marriage lawns, farmhouse celebrations, and luxury banquet halls. Clean sine wave voltage safeguards sensitive stage acoustics, LED video walls, and decorative chandeliers.",
    "services.v1.cta": "Reserve Wedding Power",
    "services.v2.tagline": "SYNCHRONIZED DUAL REDUNDANCY",
    "services.v2.subtitle": "Flawless Execution for High-Capacity Gatherings",
    "services.v2.desc":
      "High-output multi-generator synchronized power stations built for music festivals, cultural celebrations, sports expos, and public gatherings. Dual DG synchronization ensures automatic, millisecond failover with zero stage blackout risk.",
    "services.v2.cta": "Plan Event Power Supply",
    "services.v3.tagline": "PRIME CONTINUOUS INDUSTRIAL FLEET",
    "services.v3.subtitle": "Rugged Reliability for Uncompromising Production",
    "services.v3.desc":
      "Heavy-duty continuous-rated diesel generator sets built for manufacturing shutdowns, plant maintenance, and critical infrastructure construction sites. Heavy-gauge industrial enclosures withstand extreme outdoor conditions and heavy motor loads.",
    "services.v3.cta": "Request Industrial Fleet",

    // Industries / Assurances
    "industries.title": "Plan Your Power Requirements with Confidence",
    "industries.desc":
      "Dependable temporary power delivered with complete electrical accessories, verified load safety, and dedicated on-site support across Nashik.",
    "industries.item1.cat": "Electrical Load Engineering",
    "industries.item1.title": "Engineered Load Assessment",
    "industries.item1.desc":
      "We evaluate your peak motor starting currents and continuous load demands before dispatch to ensure zero tripping during live operations.",
    "industries.item2.cat": "Acoustic Attenuation",
    "industries.item2.title": "CPCB-II Acoustic Compliance",
    "industries.item2.desc":
      "Enclosed canopy silencers engineered to meet strict urban decibel standards, keeping celebrations and sound recordings disturbance-free.",
    "industries.item3.cat": "Distribution Infrastructure",
    "industries.item3.title": "Turnkey Cabling & Switchgear",
    "industries.item3.desc":
      "Complete power distribution logistics including heavy-gauge copper cabling, main changeover switches, and safety earth pits.",
    "industries.item4.cat": "Operational Assistance",
    "industries.item4.title": "On-Site Operator Support",
    "industries.item4.desc":
      "Trained DG technicians remain on-site through the duration of your event or industrial shift to manage refueling and continuous monitoring.",

    // Generator Range
    "range.title": "Generator Fleet from 5 kVA to 250+ kVA",
    "range.desc":
      "Sized for your venue starting currents and continuous operation. Select any capacity below to view verified electrical ratings, acoustic standards, and application fit.",
    "range.quickShortcuts": "Quick Sizing Shortcuts:",
    "range.powers": "Powers: ",
    "range.bestFor": "Best For: ",
    "range.enquire": "Enquire for",
    "range.fleetSuffix": "Fleet",
    "range.soundproofFleet": "SOUNDPROOF DIESEL FLEET",
    "range.entrySeries": "Entry Series",
    "range.midSeries": "Mid-Range Series",
    "range.heavySeries": "Heavy Industrial Series",
    "range.gen5.title": "5 kVA Silent Generator",
    "range.gen5.app": "Homes, Boutiques & Private Functions",
    "range.gen5.desc":
      "Compact soundproof power unit designed for residential backup, small retail shops, and private functions requiring clean single-phase power with minimal space footprint.",
    "range.gen5.loads": "Lighting rigs, sound gear, refrigeration & essential circuits",
    "range.gen30.title": "30 kVA Silent Generator",
    "range.gen30.app": "Clinics, Restaurants & Medium Gatherings",
    "range.gen30.desc":
      "Workhorse unit for healthcare clinics, retail restaurants, and medium outdoor celebrations. Provides stable 3-phase voltage with integrated automatic safety cutoffs.",
    "range.gen30.loads": "Commercial AC units, kitchen appliances & stage lighting",
    "range.gen65.title": "65 kVA Silent Generator",
    "range.gen65.app": "Marriage Lawns & Grand Banquets",
    "range.gen65.desc":
      "The gold standard for wedding lawns and reception banquets across Nashik. High motor starting reserve handles multiple central air conditioners and heavy catering loads effortlessly.",
    "range.gen65.loads": "Central chillers, stage LED walls, food counters & banquet lighting",
    "range.gen125.title": "125 kVA Silent Generator",
    "range.gen125.app": "Major Festivals & Factory Production",
    "range.gen125.desc":
      "Heavy-capacity power unit for major public expos, concerts, and continuous manufacturing runs. Features dual fuel filters and high ambient cooling package for non-stop performance.",
    "range.gen125.loads": "High-wattage sound rigs, industrial motors, factory production lines",
    "range.gen250.title": "250 kVA Silent Generator",
    "range.gen250.app": "Heavy Manufacturing & Mega Concerts",
    "range.gen250.desc":
      "Flagship prime power generation for mega industrial plants, construction projects, and large-scale public festivals. Delivers massive starting kVA with computer-controlled governor stability.",
    "range.gen250.loads": "Cranes, heavy inductive plant machinery, mega concerts & multi-stage festivals",

    // Solutions / Process
    "solutions.title": "From Requirements to Rental Enquiry",
    "solutions.desc":
      "A clear, transparent workflow to ensure your generator rental is perfectly matched, delivered on time, and professionally supported.",
    "solutions.step1Title": "Share Your Requirements",
    "solutions.step1Desc":
      "Tell us about your wedding, event, or industrial project—including site location, required operational dates, and key machinery to power.",
    "solutions.step1Action": "Provide Details",
    "solutions.step1Metric": "Stage 01 • Intake",
    "solutions.step2Title": "Discuss Power Load Sizing",
    "solutions.step2Desc":
      "Our technical team reviews starting inrush currents and continuous running requirements to recommend the exact generator capacity (5–250 kVA).",
    "solutions.step2Action": "Capacity Sizing",
    "solutions.step2Metric": "Stage 02 • Sizing",
    "solutions.step3Title": "Confirm Availability & Quotation",
    "solutions.step3Desc":
      "Receive a transparent rental quote including delivery logistics, soundproof canopy setup, and on-site operator assistance before booking.",
    "solutions.step3Action": "Dispatch Confirmation",
    "solutions.step3Metric": "Stage 03 • Dispatch",
    "solutions.startEnquiry": "Start Your Rental Enquiry",

    // Marquee
    "marquee.line1.0": "SILENT GENERATOR FLEET",
    "marquee.line1.1": "5 TO 250 kVA CAPACITY",
    "marquee.line1.2": "24/7 EMERGENCY DISPATCH",
    "marquee.line1.3": "CPCB-II ACOUSTIC ENCLOSURES",
    "marquee.line1.4": "NASHIK & MAHARASHTRA",
    "marquee.line1.5": "100% UNINTERRUPTED POWER",
    "marquee.line2.0": "WEDDINGS & LUXURY BANQUETS",
    "marquee.line2.1": "PRIME CONTINUOUS INDUSTRIAL",
    "marquee.line2.2": "GRAND CONCERTS & FESTIVALS",
    "marquee.line2.3": "TURNKEY CABLING & OPERATORS",
    "marquee.line2.4": "ZERO SOUND DISRUPTION",
    "marquee.line2.5": "DUAL DG SYNCHRONIZATION",

    // FAQ / Testimonials
    "faq.title": "Frequently Asked Questions",
    "faq.desc":
      "Clear answers to generator rental logistics, load sizing, fuel autonomy, and technical operations.",

    // CTA
    "cta.title": "Power Your Next Project with Complete Peace of Mind",
    "cta.desc":
      "Whether you need a quiet soundproof generator for a wedding or continuous multi-megawatt prime power for an industrial plant, Sarvadnya delivers on time.",
    "cta.button": "Book a Generator Now",
    "cta.callUs": "Call +91 62626 29944",

    // Blog / Rental Insights
    "blog.title": "Rental Insights & Electrical Advice",
    "blog.desc":
      "Practical sizing guidance and technical advice for event coordinators, wedding planners, and plant engineers.",
    "blog.readGuide": "Read Sizing Guide",
    "blog.allInsights": "Explore All Rental Insights",
    "blog.post1.cat": "Event Power Sizing",
    "blog.post1.title": "How to Calculate kVA Requirements for Outdoor Weddings & Banquets",
    "blog.post1.desc":
      "A practical engineering guide to summing continuous lighting loads, audio amplifiers, and catering equipment to prevent voltage dips during your ceremony.",
    "blog.post2.cat": "Acoustic Standards",
    "blog.post2.title": "Why CPCB-II Soundproof Canopies are Mandatory for Urban Venues",
    "blog.post2.desc":
      "Understanding ambient decibel limits, residential event restrictions, and how silent generator attenuation keeps functions disturbance-free.",
    "blog.post3.cat": "Industrial Power",
    "blog.post3.title": "Prime Continuous vs. Standby DG Sets: Selecting Industrial Capacity",
    "blog.post3.desc":
      "Key electrical considerations for factory shutdowns, temporary maintenance overhauls, and construction sites across Maharashtra.",

    // Technology / Service Area
    "tech.title": "Generator Rental in Nashik & Across Maharashtra",
    "tech.desc":
      "Prompt fleet mobilization, on-site cable rigging, and qualified operator attendance from our central Nashik depot.",
    "tech.availability": "Check Service Availability",
    "tech.zone1.region": "Nashik Urban & Banquet Hub",
    "tech.zone1.coverage": "Indira Nagar, Gangapur Road, Pathardi, Trambak Road, Deolali Camp",
    "tech.zone1.highlight": "Immediate 2-to-4 Hour Dispatch for Wedding & Event Venues",
    "tech.zone2.region": "Industrial MIDC Hubs",
    "tech.zone2.coverage": "Ambad MIDC, Satpur MIDC, Sinnar MIDC, Vinchur Industrial Area",
    "tech.zone2.highlight": "Heavy-Duty Prime Power with Automatic Changeover Systems",
    "tech.zone3.region": "Statewide Maharashtra Coverage",
    "tech.zone3.coverage": "Pune, Chakan MIDC, Mumbai MMR, Chhatrapati Sambhajinagar, Jalgaon",
    "tech.zone3.highlight": "Long-Term Project Hire & Major Multi-Day Event Power",

    // Footer
    "footer.brandDesc":
      "Specialized silent generator rental solutions for weddings, grand events, and industrial projects across Nashik and Maharashtra. Dependable power from 5 kVA to 250 kVA.",
    "footer.dispatchHotline": "Direct Dispatch: +91 62626 29944",
    "footer.connect": "Connect:",
    "footer.rentalSolutions": "Rental Solutions",
    "footer.weddingRentals": "Wedding Generator Rentals",
    "footer.grandEvents": "Grand Event & Festival Power",
    "footer.industrialDG": "Industrial Continuous DG Sets",
    "footer.silentFleet": "Silent Fleet (5–250 kVA)",
    "footer.requestQuote": "Request a Rental Quote",
    "footer.cpcbCompliance": "CPCB-II Acoustic Compliance",
    "footer.operatingDepots": "Operating Depots",
    "footer.nashikDepot": "Nashik Central Depot:",
    "footer.nashikAddress": "Wadala - Pathardi Rd, Indira Nagar, Nashik, Maharashtra 422009",
    "footer.mobilizing": "Mobilizing to MIDC Ambad, Satpur, Sinnar & Statewide Maharashtra",
    "footer.about": "About",
    "footer.sizingGuides": "Sizing Guides",
    "footer.contact": "Contact",
    "footer.account": "Account",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfRental": "Terms of Rental",
    "footer.coverageTag": "Nashik & Across Maharashtra",
    "footer.rightsReserved": "Sarvadnya Generators. All rights reserved.",
  },

  hi: {
    // Navbar & Header
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
    "trusted.kirloskarSpec": "CPCB साइलेंट DG सेट्स",
    "trusted.cumminsSpec": "भारी औद्योगिक प्राइम पावर",
    "trusted.mahindraSpec": "ईंधन-कुशल इवेंट सेट्स",
    "trusted.perkinsSpec": "उच्च-स्थिरता सिंक्रोनाइज़्ड पावर",

    // Services We Offer
    "services.title": "इवेंट्स और उद्योगों के लिए पावर समाधान",
    "services.desc":
      "वेन्यू की ध्वनि आवश्यकताओं, निरंतर औद्योगिक लोड और प्रोजेक्ट टाइमलाइन के लिए विशेष रूप से कॉन्फ़िगर किए गए साइलेंट जनरेटर सेटअप।",
    "services.dispatchFleet": "तत्काल डिस्पैच फ्लीट उपलब्ध",
    "services.tab1": "विवाह और बैंक्वेट्स",
    "services.tab2": "भव्य उत्सव और कार्यक्रम",
    "services.tab3": "औद्योगिक और प्रोजेक्ट्स",
    "services.v1.tagline": "CPCB-II ध्वनिरहित फ्लीट",
    "services.v1.subtitle": "जीवनभर के उत्सवों के लिए शून्य ध्वनि व्यवधान",
    "services.v1.desc":
      "अल्ट्रा-साइलेंट CPCB-II अनुरूप डीजल जनरेटर विशेष रूप से विवाह लॉन, फार्महाउस आयोजनों और बैंक्वेट हॉलों के लिए तैयार किए गए हैं। स्वच्छ साइन वेव वोल्टेज संवेदनशील साउंड सिस्टम, एलईडी स्क्रीन और सजावटी झूमरों की पूर्ण सुरक्षा करता है।",
    "services.v1.cta": "विवाह के लिए जनरेटर बुक करें",
    "services.v2.tagline": "सिंक्रोनाइज़्ड डुअल बैकअप",
    "services.v2.subtitle": "बड़े आयोजनों के लिए निर्बाध और सुरक्षित बिजली",
    "services.v2.desc":
      "संगीत समारोहों, सांस्कृतिक कार्यक्रमों और बड़े सम्मेलनों के लिए बहु-जनरेटर सिंक्रोनाइज़्ड पावर स्टेशन। दोहरी DG प्रणाली बिना किसी रुकावट के मिलीसेकंड में बैकअप सुनिश्चित करती है।",
    "services.v2.cta": "इवेंट पावर सप्लाई प्लान करें",
    "services.v3.tagline": "निरंतर प्राइम औद्योगिक फ्लीट",
    "services.v3.subtitle": "औद्योगिक उत्पादन के लिए मजबूत और निरंतर शक्ति",
    "services.v3.desc":
      "फैक्ट्री मेंटनेंस, शटडाउन और निर्माण स्थलों के लिए हेवी-ड्यूटी प्राइम-रेटेड डीजल जनरेटर सेट्स। मौसम-प्रतिरोधी स्टील कैनोपी कठिन वातावरण और भारी मोटर लोड को आसानी से संभालती है।",
    "services.v3.cta": "औद्योगिक जनरेटर बुक करें",

    // Industries / Assurances
    "industries.title": "आत्मविश्वास के साथ अपनी बिजली आवश्यकताओं की योजना बनाएं",
    "industries.desc":
      "नासिक में पूर्ण विद्युत उपकरणों, सत्यापित लोड सुरक्षा और समर्पित ऑन-साइट सहायता के साथ विश्वसनीय अस्थायी बिजली उपलब्ध कराई जाती है।",
    "industries.item1.cat": "इलेक्ट्रिकल लोड इंजीनियरिंग",
    "industries.item1.title": "इंजीनियर्ड लोड मूल्यांकन",
    "industries.item1.desc":
      "हम डिस्पैच से पहले आपकी मोटरों के स्टार्टिंग करंट और निरंतर लोड की पूरी जांच करते हैं ताकि संचालन के दौरान कोई ट्रिपिंग न हो।",
    "industries.item2.cat": "ध्वनिरहित तकनीक",
    "industries.item2.title": "CPCB-II ध्वनि अनुपालन",
    "industries.item2.desc":
      "कठोर शहरी डेसिबल मानकों को पूरा करने वाले साउंडप्रूफ साइलेंसर, जिससे आपके उत्सव और रिकॉर्डिंग बिना किसी शोर के सम्पन्न हों।",
    "industries.item3.cat": "वितरण ढांचा",
    "industries.item3.title": "टर्नकी केबलिंग और स्विचगियर",
    "industries.item3.desc":
      "भारी तांबे की केबल, मुख्य चेंजओवर स्विच और सुरक्षित अर्थिंग सहित संपूर्ण बिजली वितरण लॉजिस्टिक्स।",
    "industries.item4.cat": "ऑन-साइट संचालन सहायता",
    "industries.item4.title": "ऑन-साइट ऑपरेटर सहायता",
    "industries.item4.desc":
      "प्रशिक्षित DG तकनीशियन आपके पूरे कार्यक्रम या शिफ्ट के दौरान ऑन-साइट मौजूद रहकर ईंधन भरने और सतत निगरानी का प्रबंधन करते हैं।",

    // Generator Range
    "range.title": "5 kVA से 250+ kVA जनरेटर फ्लीट",
    "range.desc":
      "आपके वेन्यू के शुरुआती करंट और निरंतर संचालन के अनुसार अनुकूलित। प्रमाणित रेटिंग और ध्वनिरहित मानक देखने के लिए नीचे दी गई क्षमता चुनें।",
    "range.quickShortcuts": "त्वरित साइजिंग शॉर्टकट:",
    "range.powers": "संचालित करता है: ",
    "range.bestFor": "सर्वश्रेष्ठ उपयोग: ",
    "range.enquire": "पूछताछ करें:",
    "range.fleetSuffix": "फ्लीट",
    "range.soundproofFleet": "ध्वनिरहित डीजल फ्लीट",
    "range.entrySeries": "एंट्री सीरीज",
    "range.midSeries": "मिड-रेंज सीरीज",
    "range.heavySeries": "हेवी इंडस्ट्रियल सीरीज",
    "range.gen5.title": "5 kVA साइलेंट जनरेटर",
    "range.gen5.app": "घर, बुटीक और छोटे निजी समारोह",
    "range.gen5.desc":
      "आवासीय बैकअप, छोटी दुकानों और निजी समारोहों के लिए डिज़ाइन किया गया कॉम्पैक्ट साउंडप्रूफ पावर यूनिट जिसे न्यूनतम जगह की आवश्यकता होती है।",
    "range.gen5.loads": "लाइटिंग, साउंड सिस्टम, रेफ्रिजरेशन और आवश्यक उपकरण",
    "range.gen30.title": "30 kVA साइलेंट जनरेटर",
    "range.gen30.app": "क्लिनिक, रेस्टोरेंट और मध्यम आयोजन",
    "range.gen30.desc":
      "हेल्थकेयर क्लिनिकों, रेस्टोरेंटों और मध्यम आउटडोर समारोहों के लिए विश्वसनीय जनरेटर। ऑटोमैटिक सेफ्टी कटऑफ के साथ स्थिर 3-फेज वोल्टेज प्रदान करता है।",
    "range.gen30.loads": "कमर्शियल एसी, किचन उपकरण और स्टेज लाइटिंग",
    "range.gen65.title": "65 kVA साइलेंट जनरेटर",
    "range.gen65.app": "विवाह लॉन और भव्य बैंक्वेट्स",
    "range.gen65.desc":
      "नासिक में विवाह लॉन और रिसेप्शन बैंक्वेट्स के लिए सबसे पसंदीदा जनरेटर। उच्च स्टार्टिंग रिजर्व कई एसी और कैटरिंग लोड को आसानी से संभालता है।",
    "range.gen65.loads": "सेंट्रल चिलर्स, स्टेज एलईडी स्क्रीन, कैटरिंग और हॉल लाइटिंग",
    "range.gen125.title": "125 kVA साइलेंट जनरेटर",
    "range.gen125.app": "बड़े उत्सव और फैक्ट्री उत्पादन",
    "range.gen125.desc":
      "सार्वजनिक प्रदर्शनियों, संगीत समारोहों और निरंतर विनिर्माण के लिए उच्च क्षमता वाला पावर यूनिट। बिना रुके चलने के लिए डुअल फ्यूल फिल्टर से लैस।",
    "range.gen125.loads": "हाई-वॉट साउंड रिग, इंडस्ट्रियल मोटर, फैक्ट्री मशीनरी",
    "range.gen250.title": "250 kVA साइलेंट जनरेटर",
    "range.gen250.app": "भारी विनिर्माण और मेगा कॉन्सर्ट्स",
    "range.gen250.desc":
      "बड़े औद्योगिक संयंत्रों, इंफ्रास्ट्रक्चर प्रोजेक्ट्स और विशाल सार्वजनिक उत्सवों के लिए हमारा सबसे शक्तिशाली प्राइम जनरेटर।",
    "range.gen250.loads": "क्रेन, भारी प्लांट मशीनरी, मेगा कॉन्सर्ट और मल्टी-स्टेज उत्सव",

    // Solutions / Process
    "solutions.title": "आवश्यकता से रेंटल पूछताछ तक",
    "solutions.desc":
      "एक स्पष्ट और पारदर्शी प्रक्रिया जो यह सुनिश्चित करती है कि आपका जनरेटर सही मेल खाता हो, समय पर पहुंचे और पेशेवर रूप से समर्थित हो।",
    "solutions.step1Title": "अपनी आवश्यकताएं साझा करें",
    "solutions.step1Desc":
      "हमें अपनी शादी, इवेंट या औद्योगिक प्रोजेक्ट के बारे में बताएं—स्थान, आवश्यक तारीखें और मुख्य मशीनरी का विवरण दें।",
    "solutions.step1Action": "विवरण साझा करें",
    "solutions.step1Metric": "चरण 01 • विवरण",
    "solutions.step2Title": "पावर लोड साइजिंग तय करें",
    "solutions.step2Desc":
      "हमारी तकनीकी टीम सटीक जनरेटर क्षमता (5-250 kVA) की सिफारिश करने के लिए इनरश करंट और निरंतर भार की समीक्षा करती है।",
    "solutions.step2Action": "क्षमता निर्धारण",
    "solutions.step2Metric": "चरण 02 • साइजिंग",
    "solutions.step3Title": "उपलब्धता और कोटेशन कन्फर्म करें",
    "solutions.step3Desc":
      "बुकिंग से पहले डिलीवरी लॉजिस्टिक्स, साउंडप्रूफ कैनोपी सेटअप और ऑन-साइट ऑपरेटर सहायता सहित पारदर्शी कोटेशन प्राप्त करें।",
    "solutions.step3Action": "डिस्पैच पुष्टि",
    "solutions.step3Metric": "चरण 03 • डिस्पैच",
    "solutions.startEnquiry": "अपनी रेंटल पूछताछ शुरू करें",

    // Marquee
    "marquee.line1.0": "साइलेंट जनरेटर फ्लीट",
    "marquee.line1.1": "5 से 250 kVA क्षमता",
    "marquee.line1.2": "24/7 आपातकालीन डिस्पैच",
    "marquee.line1.3": "CPCB-II ध्वनिरहित एनक्लोजर",
    "marquee.line1.4": "नासिक और पूरे महाराष्ट्र में",
    "marquee.line1.5": "100% निर्बाध बिजली",
    "marquee.line2.0": "विवाह और भव्य बैंक्वेट्स",
    "marquee.line2.1": "प्राइम निरंतर औद्योगिक पावर",
    "marquee.line2.2": "भव्य संगीत समारोह और उत्सव",
    "marquee.line2.3": "टर्नकी केबलिंग और ऑपरेटर",
    "marquee.line2.4": "शून्य ध्वनि व्यवधान",
    "marquee.line2.5": "डुअल DG सिंक्रोनाइजेशन",

    // FAQ / Testimonials
    "faq.title": "अक्सर पूछे जाने वाले सवाल",
    "faq.desc":
      "जनरेटर रेंटल लॉजिस्टिक्स, लोड साइजिंग, ईंधन और तकनीकी संचालन के स्पष्ट उत्तर।",

    // CTA
    "cta.title": "अपने अगले प्रोजेक्ट को पूरी निश्चिंतता के साथ पावर करें",
    "cta.desc":
      "चाहे शादी के लिए शांत साउंडप्रूफ जनरेटर चाहिए या औद्योगिक संयंत्र के लिए निरंतर प्राइम पावर, सर्वज्ञ समय पर सेवा देता है।",
    "cta.button": "अभी जनरेटर बुक करें",
    "cta.callUs": "कॉल करें: +91 62626 29944",

    // Blog / Rental Insights
    "blog.title": "रेंटल इनसाइट्स और इलेक्ट्रिकल सलाह",
    "blog.desc":
      "इवेंट समन्वयकों, विवाह आयोजकों और प्लांट इंजीनियरों के लिए व्यावहारिक साइजिंग मार्गदर्शन।",
    "blog.readGuide": "साइजिंग गाइड पढ़ें",
    "blog.allInsights": "सभी इनसाइट्स देखें",
    "blog.post1.cat": "इवेंट पावर साइजिंग",
    "blog.post1.title": "आउटडोर विवाह और बैंक्वेट्स के लिए kVA आवश्यकताओं की गणना कैसे करें",
    "blog.post1.desc":
      "समारोह के दौरान वोल्टेज में गिरावट को रोकने के लिए लाइटिंग, ऑडियो एम्पलीफायरों और कैटरिंग उपकरण के कुल भार का व्यावहारिक गाइड।",
    "blog.post2.cat": "ध्वनि मानक",
    "blog.post2.title": "शहरी वेन्यू के लिए CPCB-II साउंडप्रूफ कैनोपी क्यों अनिवार्य हैं",
    "blog.post2.desc":
      "शहरी डेसिबल सीमाओं और आवासीय प्रतिबंधों को समझें, और जानें कि कैसे साइलेंट जनरेटर आयोजनों को निर्विघ्न रखते हैं।",
    "blog.post3.cat": "औद्योगिक पावर",
    "blog.post3.title": "प्राइम कंटीन्यूअस बनाम स्टैंडबाय DG सेट्स: औद्योगिक क्षमता का चयन",
    "blog.post3.desc":
      "फैक्ट्री शटडाउन, अस्थायी रखरखाव और महाराष्ट्र भर में निर्माण स्थलों के लिए आवश्यक इलेक्ट्रिकल विचार।",

    // Technology / Service Area
    "tech.title": "नासिक और पूरे महाराष्ट्र में जनरेटर रेंटल",
    "tech.desc":
      "हमारे केंद्रीय नासिक डिपो से त्वरित फ्लीट डिस्पैच, केबल रिगिंग और योग्य ऑपरेटर सेवा।",
    "tech.availability": "सेवा उपलब्धता जांचें",
    "tech.zone1.region": "नासिक शहरी व बैंक्वेट क्षेत्र",
    "tech.zone1.coverage": "इंदिरा नगर, गंगापुर रोड, पाथर्डी, त्र्यंबक रोड, देवळाली कॅम्प",
    "tech.zone1.highlight": "विवाह और इवेंट वेन्यू के लिए तत्काल 2 से 4 घंटे में डिस्पैच",
    "tech.zone2.region": "औद्योगिक MIDC क्षेत्र",
    "tech.zone2.coverage": "अंबड MIDC, सातपुर MIDC, सिन्नर MIDC, विंचूर औद्योगिक क्षेत्र",
    "tech.zone2.highlight": "ऑटोमैटिक चेंजओवर सिस्टम के साथ हेवी-ड्यूटी प्राइम पावर",
    "tech.zone3.region": "संपूर्ण महाराष्ट्र व्याप्ती",
    "tech.zone3.coverage": "पुणे, चाकण MIDC, मुंबई MMR, छत्रपती संभाजीनगर, जळगाव",
    "tech.zone3.highlight": "दीर्घकालिक प्रोजेक्ट और बड़े बहु-दिवसीय आयोजनों के लिए बिजली",

    // Footer
    "footer.brandDesc":
      "नासिक और महाराष्ट्र में शादियों, बड़े आयोजनों और औद्योगिक परियोजनाओं के लिए विशेष साइलेंट जनरेटर रेंटल समाधान। 5 kVA से 250 kVA तक भरोसेमंद बिजली।",
    "footer.dispatchHotline": "सीधी बुकिंग: +91 62626 29944",
    "footer.connect": "जुड़ें:",
    "footer.rentalSolutions": "रेंटल समाधान",
    "footer.weddingRentals": "विवाह जनरेटर रेंटल",
    "footer.grandEvents": "भव्य उत्सव व इवेंट पावर",
    "footer.industrialDG": "औद्योगिक कंटीन्यूअस DG सेट्स",
    "footer.silentFleet": "साइलेंट फ्लीट (5–250 kVA)",
    "footer.requestQuote": "रेंटल कोटेशन प्राप्त करें",
    "footer.cpcbCompliance": "CPCB-II ध्वनि अनुपालन",
    "footer.operatingDepots": "ऑपरेटिंग डिपो",
    "footer.nashikDepot": "नासिक सेंट्रल डिपो:",
    "footer.nashikAddress": "वडाळा - पाथर्डी रोड, इंदिरा नगर, नासिक, महाराष्ट्र 422009",
    "footer.mobilizing": "MIDC अंबड, सातपुर, सिन्नर और पूरे महाराष्ट्र में त्वरित सेवा",
    "footer.about": "परिचय",
    "footer.sizingGuides": "साइजिंग गाइड्स",
    "footer.contact": "संपर्क",
    "footer.account": "अकाउंट",
    "footer.privacyPolicy": "गोपनीयता नीति",
    "footer.termsOfRental": "रेंटल नियम व शर्तें",
    "footer.coverageTag": "नासिक व पूरे महाराष्ट्र में",
    "footer.rightsReserved": "सर्वज्ञ जनरेटर्स. सर्वाधिकार सुरक्षित।",
  },

  mr: {
    // Navbar & Header
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
    "trusted.kirloskarSpec": "CPCB सायलेंट DG सेट्स",
    "trusted.cumminsSpec": "हेव्ही इंडस्ट्रियल प्राइम पॉवर",
    "trusted.mahindraSpec": "कमी इंधनात चालणारे इव्हेंट सेट्स",
    "trusted.perkinsSpec": "उच्च-स्थिरता सिंक्रोनाइज्ड पॉवर",

    // Services We Offer
    "services.title": "कार्यक्रम आणि उद्योगांसाठी वीज पुरवठा सोल्यूशन्स",
    "services.desc":
      "स्थळाच्या आवाजाच्या गरजा, निरंतर औद्योगिक लोड आणि तात्पुरत्या प्रकल्पांच्या वेळेनुसार अनुकूल सायलेंट जनरेटर सोल्यूशन्स.",
    "services.dispatchFleet": "तातडीची डिस्पॅच फ्लीट सज्ज",
    "services.tab1": "लग्नसमारंभ आणि बँक्वेट्स",
    "services.tab2": "भव्य उत्सव आणि कार्यक्रम",
    "services.tab3": "औद्योगिक आणि प्रकल्प",
    "services.v1.tagline": "CPCB-II साऊंडप्रूफ फ्लीट",
    "services.v1.subtitle": "आयुष्यातील आनंदाच्या क्षणांसाठी शांत वीज पुरवठा",
    "services.v1.desc":
      "लॉन्स, फार्महाऊस आणि बँक्वेट हॉल्ससाठी खास तयार केलेले ध्वनिरहित CPCB-II डिझेल जनरेटर. स्थिर व्होल्टेजमुळे स्टेज लाइटिंग, साऊंड सिस्टीम आणि सजावटीचे पूर्ण संरक्षण होते.",
    "services.v1.cta": "लग्नासाठी जनरेटर बुक करा",
    "services.v2.tagline": "सिंक्रोनाइज्ड दुहेरी बॅकअप",
    "services.v2.subtitle": "मोठ्या कार्यक्रमांसाठी अखंडित वीज पुरवठा",
    "services.v2.desc":
      "संगीत महोत्सव, सांस्कृतिक उत्सव आणि सार्वजनिक सभांसाठी बहु-जनरेटर सिंक्रोनाइज्ड पॉवर स्टेशन. दुहेरी DG यंत्रणेमुळे क्षणार्धात बॅकअप मिळतो आणि वीज जाण्याचा धोका टळतो.",
    "services.v2.cta": "कार्यक्रमासाठी वीज नियोजन करा",
    "services.v3.tagline": "अखंड प्राइम औद्योगिक फ्लीट",
    "services.v3.subtitle": "कारखान्यांच्या अखंड उत्पादनासाठी मजबूत वीज",
    "services.v3.desc":
      "कारखान्यांचे शटडाउन, मेंटेनन्स आणि बांधकाम प्रकल्पांसाठी हेव्ही-ड्युटी डिझेल जनरेटर. कडक हवामानात आणि जड मोटर लोडवर सातत्याने चालण्याची पूर्ण क्षमता.",
    "services.v3.cta": "औद्योगिक जनरेटरची मागणी करा",

    // Industries / Assurances
    "industries.title": "आत्मविश्वासाने आपल्या वीज गरजांचे नियोजन करा",
    "industries.desc":
      "नाशिकमध्ये संपूर्ण विद्युत उपकरणे, तपासलेली लोड सुरक्षा आणि समर्पित ऑन-साइट सपोर्टसह विश्वासार्ह तात्पुरती वीज उपलब्ध केली जाते.",
    "industries.item1.cat": "इलेक्ट्रिकल लोड अभियांत्रिकी",
    "industries.item1.title": "अचूक लोड मूल्यांकन",
    "industries.item1.desc":
      "कामकाज सुरू असताना ट्रिपिंग होऊ नये म्हणून जनरेटर पाठवण्यापूर्वी आम्ही तुमच्या मोटरांच्या सुरुवातीच्या व चालू लोडची अचूक तपासणी करतो.",
    "industries.item2.cat": "आवाज नियंत्रण तंत्रज्ञान",
    "industries.item2.title": "CPCB-II साऊंडप्रूफ मानके",
    "industries.item2.desc":
      "शहरी आवाजाचे कडक नियम पाळणारे साऊंडप्रूफ सायलेन्सर्स, ज्यामुळे लग्न किंवा शूटिंगमध्ये कसलाही गोंधळ होत नाही.",
    "industries.item3.cat": "वीज वितरण व्यवस्था",
    "industries.item3.title": "टर्नकी केबल आणि स्विचगिअर",
    "industries.item3.desc":
      "जाड तांब्याची मुख्य केबल, चेंजओव्हर स्विचेस आणि सुरक्षित अर्थिंगसह संपूर्ण वीज जोडणीची व्यवस्था.",
    "industries.item4.cat": "ऑन-साइट ऑपरेटर मदत",
    "industries.item4.title": "प्रशिक्षित ऑपरेटर सेवा",
    "industries.item4.desc":
      "तुमच्या संपूर्ण कार्यक्रमात किंवा कामाच्या पाळीत प्रशिक्षित तंत्रज्ञ उपस्थित राहून जनरेटर चालवणे व इंधन तपासणीचे काम पाहतात.",

    // Generator Range
    "range.title": "5 kVA ते 250+ kVA जनरेटर फ्लीट",
    "range.desc":
      "आपल्या ठिकाणच्या सुरुवातीच्या करंट आणि सतत वापरासाठी अचूक क्षमता. सत्यापित रेटिंग्ज आणि सायलेंट मानके पाहण्यासाठी खालील क्षमता निवडा.",
    "range.quickShortcuts": "त्वरित साइजिंग शॉर्टकट्स:",
    "range.powers": "सक्षम चालवते: ",
    "range.bestFor": "यासाठी सर्वोत्तम: ",
    "range.enquire": "चौकशी करा:",
    "range.fleetSuffix": "फ्लीट",
    "range.soundproofFleet": "साऊंडप्रूफ डिझेल फ्लीट",
    "range.entrySeries": "एंट्री सिरीज",
    "range.midSeries": "मिड-रेंज सिरीज",
    "range.heavySeries": "हेव्ही इंडस्ट्रियल सिरीज",
    "range.gen5.title": "5 kVA सायलेंट जनरेटर",
    "range.gen5.app": "घरे, दुकाने आणि छोटे खाजगी कार्यक्रम",
    "range.gen5.desc":
      "घरातील बॅकअप, लहान दुकाने आणि खाजगी कार्यक्रमांसाठी कमी जागेत बसणारे कॉम्पॅक्ट साऊंडप्रूफ जनरेटर.",
    "range.gen5.loads": "लाइटिंग, साउंड सिस्टीम, फ्रिज आणि आवश्यक उपकरणे",
    "range.gen30.title": "30 kVA सायलेंट जनरेटर",
    "range.gen30.app": "दवाखाने, हॉटेल्स आणि मध्यम कार्यक्रम",
    "range.gen30.desc":
      "दवाखाने, रेस्टॉरंट्स आणि मध्यम बाहेरील कार्यक्रमांसाठी भरवशाचा जनरेटर. स्वयंचलित सुरक्षा यंत्रणेसह स्थिर 3-फेज वीज देतो.",
    "range.gen30.loads": "कमर्शियल एसी, स्वयंपाकघरातील उपकरणे आणि स्टेज लाइटिंग",
    "range.gen65.title": "65 kVA सायलेंट जनरेटर",
    "range.gen65.app": "लॉन्स, मंगल कार्यालये आणि भव्य बँक्वेट्स",
    "range.gen65.desc":
      "नाशिकमधील विवाह लॉन्स आणि स्वागत समारंभांसाठी सर्वाधिक लोकप्रिय जनरेटर. अनेक एसी आणि केटरिंगचा भार सहज पेलतो.",
    "range.gen65.loads": "सेंट्रल एसी, स्टेज एलईडी वॉल्स, केटरिंग आणि हॉल लाइटिंग",
    "range.gen125.title": "125 kVA सायलेंट जनरेटर",
    "range.gen125.app": "मोठे सण-उत्सव आणि कारखाना उत्पादन",
    "range.gen125.desc":
      "मोठी प्रदर्शने, संगीत कार्यक्रम आणि अखंड कारखान्यांसाठी उच्च क्षमतेचा जनरेटर. सलग चालण्यासाठी ड्युअल फ्युएल फिल्टरसह सुसज्ज.",
    "range.gen125.loads": "मोठे साउंड सिस्टीम, इंडस्ट्रियल मोटर्स आणि फॅक्टरी मशिनरी",
    "range.gen250.title": "250 kVA सायलेंट जनरेटर",
    "range.gen250.app": "मोठे कारखाने आणि भव्य संगीत महोत्सव",
    "range.gen250.desc":
      "मोठे उद्योग, पायाभूत सुविधा प्रकल्प आणि भव्य सार्वजनिक उत्सवांसाठी आमचा सर्वात शक्तिशाली प्राइम जनरेटर.",
    "range.gen250.loads": "क्रेन, जड फॅक्टरी मशिनरी आणि भव्य संगीत महोत्सव",

    // Solutions / Process
    "solutions.title": "गरजेपासून ते भाडेतत्त्वावरील चौकशीपर्यंत",
    "solutions.desc":
      "एक स्पष्ट आणि पारदर्शक कार्यपद्धती जी आपला जनरेटर वेळेवर मिळण्याची आणि अचूक जुळण्याची खात्री देते.",
    "solutions.step1Title": "आपल्या गरजा सांगा",
    "solutions.step1Desc":
      "आम्हाला तुमच्या लग्नाबद्दल, कार्यक्रमाबद्दल किंवा औद्योगिक प्रकल्पाबद्दल सांगा—ठिकाण, तारखा आणि आवश्यक मशिनरी.",
    "solutions.step1Action": "माहिती द्या",
    "solutions.step1Metric": "टप्पा 01 • माहिती",
    "solutions.step2Title": "पॉवर लोड साइजिंग निश्चित करा",
    "solutions.step2Desc":
      "आमची तांत्रिक टीम अचूक जनरेटर क्षमतेची (5–250 kVA) शिफारस करण्यासाठी इनरश करंट आणि चालू असलेल्या लोडचा आढावा घेते.",
    "solutions.step2Action": "क्षमता निश्चिती",
    "solutions.step2Metric": "टप्पा 02 • साइजिंग",
    "solutions.step3Title": "उपलब्धता आणि कोटेशन निश्चित करा",
    "solutions.step3Desc":
      "बुकिंग करण्यापूर्वी वाहतूक, साऊंडप्रूफ कॅनोपी सेटअप आणि ऑपरेटर सेवेसह पारदर्शक भाडे कोटेशन मिळवा.",
    "solutions.step3Action": "डिस्पॅच निश्चिती",
    "solutions.step3Metric": "टप्पा 03 • डिस्पॅच",
    "solutions.startEnquiry": "आपली भाडे चौकशी सुरू करा",

    // Marquee
    "marquee.line1.0": "सायलेंट जनरेटर फ्लीट",
    "marquee.line1.1": "5 ते 250 kVA क्षमता",
    "marquee.line1.2": "24/7 तातडीची सेवा",
    "marquee.line1.3": "CPCB-II साऊंडप्रूफ कॅनोपी",
    "marquee.line1.4": "नाशिक आणि संपूर्ण महाराष्ट्रात",
    "marquee.line1.5": "100% अखंडित वीज पुरवठा",
    "marquee.line2.0": "लग्नसमारंभ आणि भव्य बँक्वेट्स",
    "marquee.line2.1": "अखंड प्राइम औद्योगिक वीज",
    "marquee.line2.2": "भव्य संगीत महोत्सव आणि उत्सव",
    "marquee.line2.3": "टर्नकी केबलिंग आणि तंत्रज्ञ",
    "marquee.line2.4": "शांत ध्वनिरहित कामकाज",
    "marquee.line2.5": "दुहेरी DG सिंक्रोनायझेशन",

    // FAQ / Testimonials
    "faq.title": "नेहमी विचारले जाणारे प्रश्न",
    "faq.desc":
      "जनरेटर भाडेतत्त्व, लोड साइजिंग, इंधन आणि तांत्रिक कामकाजाची स्पष्ट उत्तरे.",

    // CTA
    "cta.title": "आपल्या पुढील प्रकल्पाला पूर्ण विश्वासाने वीज पुरवठा करा",
    "cta.desc":
      "लग्नासाठी शांत साऊंडप्रूफ जनरेटर असो किंवा कारखान्यासाठी अखंडित वीज पुरवठा, सर्वज्ञ वेळेवर सेवा पुरवते.",
    "cta.button": "आत्ताच जनरेटर बुक करा",
    "cta.callUs": "कॉल करा: +91 62626 29944",

    // Blog / Rental Insights
    "blog.title": "रेंटल माहिती आणि तांत्रिक सल्ला",
    "blog.desc":
      "इव्हेंट समन्वयक, विवाह आयोजक आणि अभियंत्यांसाठी व्यावहारिक मार्गदर्शन.",
    "blog.readGuide": "मार्गदर्शक वाचा",
    "blog.allInsights": "सर्व माहिती मार्गदर्शक पहा",
    "blog.post1.cat": "इव्हेंट पॉवर साइजिंग",
    "blog.post1.title": "आउटडोअर लग्न आणि बँक्वेट्ससाठी kVA गरजांची गणना कशी करावी",
    "blog.post1.desc":
      "समारंभात व्होल्टेज कमी होऊ नये म्हणून लाइटिंग, ऑडिओ आणि केटरिंगच्या एकूण भाराची अचूक गणना करण्याचे मार्गदर्शन.",
    "blog.post2.cat": "आवाज मानके",
    "blog.post2.title": "शहरी ठिकाणांसाठी CPCB-II साऊंडप्रूफ कॅनोपी का आवश्यक आहेत",
    "blog.post2.desc":
      "शहरी आवाजाचे नियम समजून घ्या आणि सायलेंट जनरेटर कसे कसलाही अडथळा न येता कार्यक्रम सुरळीत पार पाडतात ते पाहा.",
    "blog.post3.cat": "औद्योगिक वीज",
    "blog.post3.title": "प्राइम कंटिन्यूअस वि. स्टँडबाय DG सेट्स: औद्योगिक क्षमतेची निवड",
    "blog.post3.desc":
      "फॅक्टरी शटडाउन, तात्पुरती दुरुस्ती आणि बांधकाम प्रकल्पांसाठी आवश्यक इलेक्ट्रिकल बाबी.",

    // Technology / Service Area
    "tech.title": "नाशिक आणि संपूर्ण महाराष्ट्रात जनरेटर भाडेतत्त्वावर",
    "tech.desc":
      "आमच्या मध्यवर्ती नाशिक डेपोतून तातडीने जनरेटर पाठवणे, केबल जोडणी आणि तंत्रज्ञ सेवा.",
    "tech.availability": "सेवा उपलब्धता तपासा",
    "tech.zone1.region": "नाशिक शहर आणि बँक्वेट परिसर",
    "tech.zone1.coverage": "इंदिरा नगर, गंगापूर रोड, पाथर्डी, त्र्यंबक रोड, देवळाली कॅम्प",
    "tech.zone1.highlight": "लग्न आणि इव्हेंटसाठी तातडीने 2 ते 4 तासांत जनरेटर हजर",
    "tech.zone2.region": "औद्योगिक एमआयडीसी परिसर",
    "tech.zone2.coverage": "अंबड एमआयडीसी, सातपूर एमआयडीसी, सिन्नर एमआयडीसी, विंचूर औद्योगिक वसाहत",
    "tech.zone2.highlight": "ऑटोमॅटिक चेंजओव्हर सिस्टीमसह अखंड हेव्ही-ड्युटी प्राइम वीज",
    "tech.zone3.region": "संपूर्ण महाराष्ट्र कार्यक्षेत्र",
    "tech.zone3.coverage": "पुणे, चाकण एमआयडीसी, मुंबई एमएमआर, छत्रपती संभाजीनगर, जळगाव",
    "tech.zone3.highlight": "दीर्घकालीन प्रकल्प आणि मोठ्या बहु-दिवसीय कार्यक्रमांसाठी वीज",

    // Footer
    "footer.brandDesc":
      "नाशिक आणि संपूर्ण महाराष्ट्रात लग्न, भव्य कार्यक्रम आणि औद्योगिक प्रकल्पांसाठी विश्वासार्ह सायलेंट जनरेटर भाडेतत्त्वावर. 5 kVA ते 250 kVA अखंड वीज पुरवठा.",
    "footer.dispatchHotline": "थेट बुकिंग: +91 62626 29944",
    "footer.connect": "संपर्क:",
    "footer.rentalSolutions": "रेंटल सोल्यूशन्स",
    "footer.weddingRentals": "लग्नासाठी जनरेटर भाड्याने",
    "footer.grandEvents": "भव्य उत्सव व इव्हेंट वीज",
    "footer.industrialDG": "औद्योगिक अखंड DG सेट्स",
    "footer.silentFleet": "सायलेंट फ्लीट (5–250 kVA)",
    "footer.requestQuote": "भाडे कोटेशन मिळवा",
    "footer.cpcbCompliance": "CPCB-II साऊंडप्रूफ मानके",
    "footer.operatingDepots": "कार्यरत डेपो",
    "footer.nashikDepot": "नाशिक मध्यवर्ती डेपो:",
    "footer.nashikAddress": "वडाळा - पाथर्डी रोड, इंदिरा नगर, नाशिक, महाराष्ट्र 422009",
    "footer.mobilizing": "एमआयडीसी अंबड, सातपूर, सिन्नर आणि संपूर्ण महाराष्ट्रात तत्पर सेवा",
    "footer.about": "परिचय",
    "footer.sizingGuides": "मार्गदर्शक",
    "footer.contact": "संपर्क",
    "footer.account": "खाते",
    "footer.privacyPolicy": "गोपनीयता धोरण",
    "footer.termsOfRental": "भाडेतत्त्वावरील अटी",
    "footer.coverageTag": "नाशिक आणि संपूर्ण महाराष्ट्रात",
    "footer.rightsReserved": "सर्वज्ञ जनरेटर्स. सर्व हक्क राखीव.",
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

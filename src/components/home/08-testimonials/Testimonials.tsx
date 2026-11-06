"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { TestimonialsClient, FAQItem } from "./TestimonialsClient";

const FAQS_BY_LANG: Record<string, FAQItem[]> = {
  en: [
    {
      question: "How do I choose between 5 kVA and 250 kVA for my application?",
      answer:
        "Capacity depends on total wattage plus starting surges of motors, air conditioners, sound rigs, or industrial pumps. Our team calculates your combined starting and running loads to recommend the optimal kVA rating so your event runs seamlessly without overpaying.",
      category: "Load Sizing & kVA",
    },
    {
      question: "Are your silent generators allowed in residential wedding venues?",
      answer:
        "Yes. All our event generators are housed in CPCB-II compliant acoustic canopies designed to maintain minimal sound levels, making them fully compliant with residential and banquet noise regulations in Nashik and Maharashtra.",
      category: "Acoustic Compliance",
    },
    {
      question: "Do you supply connecting cables and on-site operators?",
      answer:
        "Yes. Every rental package can include heavy-duty copper main cables, distribution switchgear, and a trained DG technician who remains on-site to handle startup, continuous load balancing, and refueling.",
      category: "Technical Logistics",
    },
    {
      question: "What locations are covered for generator rental?",
      answer:
        "We are headquartered in Nashik, Maharashtra, and regularly dispatch rental units across Nashik district, MIDC industrial zones (Ambad, Satpur, Sinnar), and surrounding districts across Maharashtra based on project timeline.",
      category: "Regional Coverage",
    },
  ],
  hi: [
    {
      question: "मैं अपने उपयोग के लिए 5 kVA और 250 kVA के बीच सही क्षमता कैसे चुनूं?",
      answer:
        "क्षमता आपके कुल वॉट और मोटरों, एयर कंडीशनरों या साउंड सिस्टम के शुरुआती सर्ज पर निर्भर करती है। हमारी टीम आपके कुल भार की गणना करके सही kVA क्षमता सुझाती है ताकि बिना किसी रुकावट के आपका आयोजन चले।",
      category: "लोड साइजिंग",
    },
    {
      question: "क्या आपके साइलेंट जनरेटर आवासीय विवाह स्थलों में अनुमत हैं?",
      answer:
        "हाँ। हमारे सभी इवेंट जनरेटर CPCB-II अनुरूप ध्वनिरहित कैनोपी में हैं, जो नासिक और महाराष्ट्र में आवासीय शोर मानकों का पूर्ण पालन करते हैं।",
      category: "ध्वनि अनुपालन",
    },
    {
      question: "क्या आप कनेक्टिंग केबल और ऑन-साइट ऑपरेटर भी प्रदान करते हैं?",
      answer:
        "हाँ। प्रत्येक रेंटल पैकेज में भारी तांबे के मुख्य केबल, वितरण स्विचगियर और एक प्रशिक्षित तकनीशियन शामिल हो सकते हैं जो ऑन-साइट देखरेख करता है।",
      category: "लॉजिस्टिक्स",
    },
    {
      question: "जनरेटर रेंटल के लिए कौन से क्षेत्र कवर किए जाते हैं?",
      answer:
        "हम नासिक में स्थित हैं और पूरे नासिक जिले, MIDC औद्योगिक क्षेत्रों (अंबड, सातपुर, सिन्नर) और पूरे महाराष्ट्र में जनरेटर समय पर भेजते हैं।",
      category: "कवरेज क्षेत्र",
    },
  ],
  mr: [
    {
      question: "मी माझ्या वापरासाठी 5 kVA ते 250 kVA दरम्यान योग्य क्षमता कशी निवडावी?",
      answer:
        "क्षमता आपल्या एकूण वॅटेज आणि मोटर्स, एसी किंवा साउंड सिस्टिमच्या सुरुवातीच्या करंटवर अवलंबून असते. आमची टीम अचूक kVA रेटिंगची शिफारस करते जेणेकरून अतिरिक्त खर्च न होता कार्यक्रम सुरळीत पार पडेल.",
      category: "लोड साइजिंग",
    },
    {
      question: "तुमचे सायलेंट जनरेटर निवासी विवाह स्थळांमध्ये चालतात का?",
      answer:
        "होय. आमचे सर्व जनरेटर CPCB-II साऊंडप्रूफ कॅनोपीमध्ये असतात, जे नाशिक आणि महाराष्ट्रातील ध्वनी नियमांचे पूर्णपणे पालन करतात.",
      category: "आवाज नियम",
    },
    {
      question: "तुम्ही केबल्स आणि ऑपरेटर देखील पुरवता का?",
      answer:
        "होय. प्रत्येक रेंटल पॅकेजमध्ये हेवी-ड्युटी कॉपर केबल्स, स्विचगिअर आणि ऑपरेटर तंत्रज्ञ समाविष्ट असतो.",
      category: "तांत्रिक सेवा",
    },
    {
      question: "जनरेटर भाड्याने देण्यासाठी कोणती ठिकाणे उपलब्ध आहेत?",
      answer:
        "आम्ही नाशिकमध्ये आहोत आणि नाशिक जिल्हा, एमआयडीसी औद्योगिक क्षेत्रे (अंबड, सातपूर, सिन्नर) आणि संपूर्ण महाराष्ट्रात जनरेटर वेळेवर पुरवतो.",
      category: "कार्यक्षेत्र",
    },
  ],
};

/**
 * Testimonials Component (Client Component with Multi-Language Support)
 */
export function Testimonials() {
  const { language } = useLanguage();
  const currentFaqs = FAQS_BY_LANG[language] || FAQS_BY_LANG.en;

  return <TestimonialsClient faqs={currentFaqs} />;
}

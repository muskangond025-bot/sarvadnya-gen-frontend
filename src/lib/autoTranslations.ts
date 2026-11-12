import type { Language } from "./LanguageContext";
import { MR_PHRASES, MR_TERM_REPLACEMENTS } from "./mrTranslations";

/**
 * Comprehensive site-wide Hindi dictionary covering all pages, sections,
 * Server Components, modals, forms, legal documents, navigation, and footer.
 */
export const HI_PHRASES: Record<string, string> = {
  // Common UI, Actions & Navigation
  "My": "मेरा",
  "Home": "होम",
  "MENU": "मेनू",
  "CLOSE": "बंद करें",
  "Services": "सेवाएँ",
  "Generator": "जनरेटर",
  "Generators": "जनरेटर",
  "Blog": "ब्लॉग",
  "About": "परिचय",
  "About Us": "हमारे बारे में",
  "Contact": "संपर्क",
  "Contact Us": "संपर्क करें",
  "Fleet": "फ्लीट",
  "Book": "बुक करें",
  "Bulk": "बल्क",
  "Cart": "कार्ट",
  "Order": "ऑर्डर",
  "Guides": "मार्गदर्शिका",
  "Privacy": "गोपनीयता",
  "Cookie": "कुकी",
  "Policy": "नीति",
  "Terms &": "नियम और",
  "Conditions": "शर्तें",
  "Terms of Service": "सेवा की शर्तें",
  "Privacy Policy": "गोपनीयता नीति",
  "Cookie Policy": "कुकी नीति",
  "Login": "लॉगिन",
  "Sign In": "साइन इन",
  "Signing In...": "साइन इन हो रहा है...",
  "Signing up...": "साइन अप हो रहा है...",
  "Logout": "लॉगआउट",
  "Profile": "प्रोफ़ाइल",
  "My Account": "मेरा खाता",
  "User Account": "उपयोगकर्ता खाता",
  "Dashboard": "डैशबोर्ड",
  "Settings": "सेटिंग्स",
  "Continue": "जारी रखें",
  "Back": "पीछे",
  "Confirm": "पुष्टि करें",
  "Remove": "हटाएँ",
  "Change": "बदलें",
  "Compare": "तुलना करें",
  "Comparing": "तुलना",
  "Subscribe": "सदस्यता लें",
  "Send Message": "संदेश भेजें",
  "Call Now": "अभी कॉल करें",
  "Call Support": "कॉल सहायता",
  "Email Us": "ईमेल करें",
  "Visit Us": "हमसे मिलें",
  "Follow Us": "हमें फॉलो करें",
  "Live Chat": "लाइव चैट",
  "Start Chat": "चैट शुरू करें",
  "Learn More": "और जानें",
  "Read Article": "लेख पढ़ें",
  "Read Full Guide": "पूरी गाइड पढ़ें",
  "Browse All": "सभी देखें",
  "All Articles": "सभी लेख",
  "Back to Home": "होम पर वापस जाएँ",
  "Home page": "होम पेज",
  "Not found": "नहीं मिला",
  "404 Not Found": "404 पृष्ठ नहीं मिला",
  "Get Started": "शुरू करें",
  "Get a Quote": "कोटेशन प्राप्त करें",
  "Get Instant Quote": "तुरंत कोटेशन पाएं",
  "Request Quote": "कोटेशन का अनुरोध करें",
  "Request a Quote": "कोटेशन माँगें",
  "Request Custom Quote": "कस्टम कोटेशन माँगें",
  "Request Consultation": "परामर्श का अनुरोध करें",
  "Book Now": "अभी बुक करें",
  "Book a Generator Now": "अभी जनरेटर बुक करें",
  "Browse Generators": "जनरेटर देखें",
  "Explore Fleet": "फ्लीट देखें",
  "Explore Products": "उत्पाद देखें",
  "View Details": "विवरण देखें",
  "View Fleet Models": "फ्लीट मॉडल देखें",
  "Click to View": "देखने के लिए क्लिक करें",
  "Clear All": "सभी साफ़ करें",
  "Clear All Items": "सभी आइटम हटाएँ",
  "Clear search": "खोज साफ़ करें",
  "Reset Filters": "फ़िल्टर रीसेट करें",
  "Proceed to Checkout": "चेकआउट पर जाएँ",
  "Proceed to Pay": "भुगतान के लिए आगे बढ़ें",
  "Review Order": "ऑर्डर की समीक्षा करें",
  "Checkout": "चेकआउट",
  "Submit Order & Proceed to Payment": "ऑर्डर सबमिट करें और भुगतान पर जाएँ",
  "Confirm Availability & Quotation": "उपलब्धता और कोटेशन की पुष्टि करें",
  "Quick Actions": "त्वरित कार्रवाई",
  "Quick Links": "त्वरित लिंक",
  "Contact Info": "संपर्क जानकारी",
  "Contact Information": "संपर्क विवरण",
  "Newsletter": "न्यूज़लेटर",
  "Main Navigation": "मुख्य नेविगेशन",
  "Mega menu navigation": "मेगा मेनू नेविगेशन",
  "Navigation menu": "नेविगेशन मेनू",
  "Main Points": "मुख्य बिंदु",
  "Related Documents": "संबंधित दस्तावेज़",
  "Need Help?": "सहायता चाहिए?",
  "Need help": "सहायता चाहिए",
  "Cookie Help?": "कुकी सहायता?",
  "Questions?": "प्रश्न हैं?",
  "Questions": "प्रश्न",
  "Contact Support": "सहायता से संपर्क करें",
  "contact support": "सहायता से संपर्क करें",
  "Talk to an Expert": "विशेषज्ञ से बात करें",
  "Contact Our Experts": "हमारे विशेषज्ञों से संपर्क करें",
  "Help Center": "सहायता केंद्र",
  "Visit Help Center": "सहायता केंद्र पर जाएँ",
  "Open Calendar": "कैलेंडर खोलें",
  "Back to Dates": "तारीखों पर वापस जाएँ",
  "Back to Configure": "कॉन्फ़िगरेशन पर वापस जाएँ",
  "Close selector": "चयनकर्ता बंद करें",
  "Close confirmation": "पुष्टि बंद करें",
  "Close date confirmation modal": "तिथि पुष्टि विंडो बंद करें",
  "Select Language": "भाषा चुनें",
  "Previous month": "पिछला महीना",
  "Next month": "अगला महीना",
  "Previous Capacity": "पिछली क्षमता",
  "Next Capacity": "अगली क्षमता",
  "Decrease shifts": "शिफ़्ट घटाएँ",
  "Increase shifts": "शिफ़्ट बढ़ाएँ",
  "Decrease quantity": "मात्रा घटाएँ",
  "Increase quantity": "मात्रा बढ़ाएँ",
  "+ Add Generator": "+ जनरेटर जोड़ें",
  "Add Another Generator to This Range": "इस श्रेणी में एक और जनरेटर जोड़ें",
  "Add to Comparison": "तुलना में जोड़ें",
  "Highlight Differences": "अंतर हाइलाइट करें",
  "Side-by-Side Specs": "आमने-सामने स्पेसिफिकेशन",
  "Scroll to compare": "तुलना करने के लिए स्क्रॉल करें",
  "Swipe to explore": "देखने के लिए स्वाइप करें",
  "Swipe units →": "यूनिट्स स्वाइप करें →",
  "Restore 3 Units": "3 यूनिट्स पुनर्स्थापित करें",
  "Select Replacement": "विकल्प चुनें",
  "Remove date": "तारीख़ हटाएँ",
  "Remove range": "श्रेणी हटाएँ",
  "Remove from wishlist": "विशलिस्ट से हटाएँ",

  // Days & Months
  "Mon": "सोम",
  "Tue": "मंगल",
  "Wed": "बुध",
  "Thu": "गुरु",
  "Fri": "शुक्र",
  "Sat": "शनि",
  "Sun": "रवि",
  "November": "नवंबर",
  "Mar 2024": "मार्च 2024",
  "15 Jan 2026": "15 जन 2026",
  "April 25, 2026": "25 अप्रैल, 2026",
  "April 28, 2026": "28 अप्रैल, 2026",
  "May 01, 2026": "01 मई, 2026",
  "May 05, 2026": "05 मई, 2026",
  "May 08, 2026": "08 मई, 2026",
  "May 10, 2026": "10 मई, 2026",
  "Last Updated: May 15, 2026": "अंतिम अपडेट: 15 मई, 2026",
  "Version 2.4 | May 2026": "संस्करण 2.4 | मई 2026",

  // Header & Footer
  "Call Direct Fleet Dispatch": "डायरेक्ट फ्लीट डिस्पैच पर कॉल करें",
  "Direct Fleet Dispatch: +91 62626 29944": "डायरेक्ट फ्लीट डिस्पैच: +91 62626 29944",
  "Direct Dispatch: +91 62626 29944": "डायरेक्ट डिस्पैच: +91 62626 29944",
  "Call +91 62626 29944": "कॉल करें +91 62626 29944",
  "Wishlist & Inquiries": "कार्ट और पूछताछ",
  "Saved Fleet Inquiries": "सहेजी गई फ्लीट पूछताछ",
  "Sarvadnya Generator Home": "सर्वज्ञ जनरेटर होम",
  "Sarvadnya Generator": "सर्वज्ञ जनरेटर",
  "Sarvadnya Generators": "सर्वज्ञ जनरेटर्स",
  "Powering businesses across Maharashtra": "पूरे महाराष्ट्र में व्यवसायों को ऊर्जा प्रदान करना",
  "Powering Nashik since 2009 with dependable solutions.": "2009 से भरोसेमंद समाधानों के साथ नासिक को ऊर्जा दे रहा है।",
  "Providing reliable power solutions across India since 2010. We specialize in high-performance generator rentals and maintenance for industrial and residential needs.":
    "2010 से पूरे भारत में विश्वसनीय पावर समाधान प्रदान कर रहे हैं। हम औद्योगिक और आवासीय आवश्यकताओं के लिए उच्च-प्रदर्शन जनरेटर किराए और रखरखाव में विशेषज्ञ हैं।",
  "Our Location": "हमारा स्थान",
  "Wadala - Pathardi Rd, Indira Nagar, Nashik": "वडाला - पाथर्डी रोड, इंदिरा नगर, नासिक",
  "Wadala - Pathardi Rd, behind Sudarshan Lawns, Indira Nagar, Nashik 422009":
    "वडाला - पाथर्डी रोड, सुदर्शन लॉन्स के पीछे, इंदिरा नगर, नासिक 422009",
  "Open address in Google Maps": "Google मैप्स में पता खोलें",
  "Subscribe to get the latest updates on power management and generator maintenance tips.":
    "पावर प्रबंधन और जनरेटर रखरखाव सुझावों पर नवीनतम अपडेट प्राप्त करने के लिए सदस्यता लें।",
  "Your email address": "आपका ईमेल पता",
  "Enter your email address": "अपना ईमेल पता दर्ज करें",
  "Email address for newsletter": "न्यूज़लेटर के लिए ईमेल पता",
  "Subscribe to newsletter": "न्यूज़लेटर की सदस्यता लें",
  "Subscribed successfully!": "सफलतापूर्वक सदस्यता ली गई!",
  "Secure & Encrypted": "सुरक्षित और एन्क्रिप्टेड",
  "We respect your privacy. Unsubscribe at any time.":
    "हम आपकी गोपनीयता का सम्मान करते हैं। किसी भी समय अनसब्सक्राइब करें।",
  "© 2026 Sarvadnya Generators. All rights reserved.":
    "© 2026 सर्वज्ञ जनरेटर्स। सर्वाधिकार सुरक्षित।",

  // Auth: /login & /signup
  "Welcome Back": "वापसी पर स्वागत है",
  "Manage your generator rentals easily": "अपने जनरेटर किराए आसानी से प्रबंधित करें",
  "Sign in to manage your generator rentals and bookings":
    "अपने जनरेटर किराए और बुकिंग प्रबंधित करने के लिए साइन इन करें",
  "Email Address": "ईमेल पता",
  "Email Address *": "ईमेल पता *",
  "Password": "पासवर्ड",
  "or email": "या ईमेल",
  "Continue with Google": "Google के साथ जारी रखें",
  "Create Account": "खाता बनाएँ",
  "Forgot your password?": "पासवर्ड भूल गए?",
  "Generator support?": "जनरेटर सहायता?",
  "Business Profile": "व्यावसायिक प्रोफ़ाइल",
  "Create your personal secure account": "अपना व्यक्तिगत सुरक्षित खाता बनाएँ",
  "Add details for generator management": "जनरेटर प्रबंधन के लिए विवरण जोड़ें",
  "Full Name": "पूरा नाम",
  "Full Name *": "पूरा नाम *",
  "Email": "ईमेल",
  "Mobile": "मोबाइल",
  "Location": "स्थान",
  "Continue to Step 2": "चरण 2 पर जाएँ",
  "Signup with Google": "Google से साइन अप करें",
  "Company": "कंपनी",
  "Industry": "उद्योग",
  "GST Number": "GST नंबर",
  "Alt Mobile": "वैकल्पिक मोबाइल",
  "Delivery Address": "डिलीवरी पता",
  "Complete Signup": "साइन अप पूरा करें",
  "Member?": "सदस्य हैं?",
  "Login here": "यहाँ लॉगिन करें",
  "Already have an account?": "क्या आपका पहले से खाता है?",
  "Construction": "निर्माण",
  "Events & Weddings": "कार्यक्रम और विवाह",
  "Manufacturing": "विनिर्माण",
  "Agriculture": "कृषि",
  "Hospital": "अस्पताल",
  "Telecom": "टेलीकॉम",
  "Other": "अन्य",
  "Create your account to manage rentals, invoices, and support from one premium dashboard.":
    "एक ही प्रीमियम डैशबोर्ड से किराए, चालान और सहायता प्रबंधित करने के लिए अपना खाता बनाएँ।",
  "Join thousands of customers powering their world with premium generator rentals":
    "प्रीमियम जनरेटर किराए के साथ अपनी दुनिया को रोशन करने वाले हजारों ग्राहकों से जुड़ें",

  // Cart & Wishlist (/wishlist, /cart)
  "Generator Wishlist | Shortlisted DG Sets | Sarvadnya Generators":
    "जनरेटर कार्ट | शॉर्टलिस्ट किए गए DG सेट | सर्वज्ञ जनरेटर्स",
  "Generator Cart | Shortlisted DG Sets | Sarvadnya Generators":
    "जनरेटर कार्ट | शॉर्टलिस्ट किए गए DG सेट | सर्वज्ञ जनरेटर्स",
  "Generator Cart": "जनरेटर कार्ट",
  "Generator Wishlist": "जनरेटर विशलिस्ट",
  "Compare your shortlisted silent DG sets, review power specifications, and quickly request bulk or single deployment quotes.":
    "अपने शॉर्टलिस्ट किए गए साइलेंट DG सेट की तुलना करें, पावर स्पेसिफिकेशन देखें और तुरंत बल्क या सिंगल डिप्लॉयमेंट कोटेशन माँगें।",
  "Shortlisted Units": "शॉर्टलिस्ट की गई यूनिट्स",
  "Your Cart is Empty": "आपका कार्ट खाली है",
  "Your Wishlist is Empty": "आपका कार्ट खाली है",
  "Your cart has no generator sets yet. Head straight to our fleet to add silent DG sets for your project.":
    "आपके कार्ट में अभी कोई जनरेटर सेट नहीं है। अपने प्रोजेक्ट के लिए साइलेंट DG सेट जोड़ने के लिए सीधे हमारे फ्लीट पर जाएँ।",
  "Sign in to manage your shortlisted silent DG sets or add generators from our fleet.":
    "अपने शॉर्टलिस्ट किए गए साइलेंट DG सेट प्रबंधित करने या हमारे फ्लीट से जनरेटर जोड़ने के लिए साइन इन करें।",
  "You haven't saved any silent DG sets yet. Explore our fleet from 5kVA to 250kVA and shortlist the best fit for your project.":
    "आपने अभी तक कोई साइलेंट DG सेट सहेजा नहीं है। 5kVA से 250kVA तक का हमारा फ्लीट देखें और अपने प्रोजेक्ट के लिए उपयुक्त सेट चुनें।",
  "Most Requested Generator Capacities": "सबसे अधिक माँगी जाने वाली जनरेटर क्षमताएँ",
  "Commercial Standard": "कमर्शियल स्टैंडर्ड",
  "Restaurants, banks, and corporate branches in Nashik.":
    "नासिक में रेस्तरां, बैंक और कॉर्पोरेट शाखाएँ।",
  "Wedding & Grand Event": "विवाह और भव्य कार्यक्रम",
  "Acoustic silent enclosure ideal for lawn marriages & banquets.":
    "लॉन विवाह और बैंक्वेट के लिए आदर्श ध्वनिरहित साइलेंट एन्क्लोज़र।",
  "Industrial Heavyweight": "औद्योगिक हेवीवेट",
  "Heavy manufacturing plants & infrastructure projects.":
    "भारी विनिर्माण संयंत्र और बुनियादी ढाँचा परियोजनाएँ।",
  "Daily Rental": "दैनिक किराया",
  "/day": "/दिन",
  "/ day": "/ दिन",
  "/day)": "/दिन)",

  // Home & Shared Sections (supplementing existing TRANSLATIONS)
  "Powering Nashik": "नासिक को ऊर्जा",
  "Since 2009.": "2009 से।",
  "Uninterrupted Power,": "निरंतर बिजली,",
  "When It Matters Most.": "जब यह सबसे ज़्यादा ज़रूरी हो।",
  "From continuous industrial manufacturing and critical healthcare facilities to grand weddings and high-profile festivals, Sarvadnya delivers 24/7 turnkey silent generator rentals, fuel logistics, and rapid 60-minute emergency dispatch across Nashik and Maharashtra.":
    "निरंतर औद्योगिक विनिर्माण और महत्वपूर्ण स्वास्थ्य सेवाओं से लेकर भव्य विवाहों और बड़े समारोहों तक, सर्वज्ञ पूरे नासिक और महाराष्ट्र में 24/7 टर्नकी साइलेंट जनरेटर किराया, ईंधन लॉजिस्टिक्स और तेज़ 60-मिनट आपातकालीन डिस्पैच प्रदान करता है।",
  "Interactive Generator Delivery Stage": "इंटरैक्टिव जनरेटर डिलीवरी स्टेज",
  "Sarvadnya Power Initializing": "सर्वज्ञ पावर प्रारंभ हो रहा है",
  "Ask me something...": "मुझसे कुछ पूछें...",
  "Online | Ready to Help": "ऑनलाइन | सहायता के लिए तैयार",
  "Power Assistant": "पावर सहायक",
  "3D White Question Mark Model": "3D प्रश्न चिह्न मॉडल",
  "3D Empty Shopping Cart Illustration": "3D खाली शॉपिंग कार्ट",
  "Sarvadnya 3D Location Map Pointer": "सर्वज्ञ 3D लोकेशन मैप पॉइंटर",
  "Sarvadnya Generators Location": "सर्वज्ञ जनरेटर्स का स्थान",

  // Legal Pages (/privacy, /cookies, /terms)
  "Information We Collect": "हम जो जानकारी एकत्र करते हैं",
  "1. Information We Collect": "1. हम जो जानकारी एकत्र करते हैं",
  "How We Use Data": "हम डेटा का उपयोग कैसे करते हैं",
  "How We Use Your Data": "हम आपके डेटा का उपयोग कैसे करते हैं",
  "Data Security": "डेटा सुरक्षा",
  "Contact Our Privacy Team": "हमारी गोपनीयता टीम से संपर्क करें",
  "At Sarvadnya Generators, we collect information that is essential for providing you with high-performance power solutions. This includes:":
    "सर्वज्ञ जनरेटर्स में हम केवल वही जानकारी एकत्र करते हैं जो आपको उच्च-प्रदर्शन पावर समाधान प्रदान करने के लिए आवश्यक है। इसमें शामिल हैं:",
  "Contact details (Name, Email, Mobile Number)":
    "संपर्क विवरण (नाम, ईमेल, मोबाइल नंबर)",
  "Business Information (Company Name, GST details)":
    "व्यावसायिक जानकारी (कंपनी का नाम, GST विवरण)",
  "Logistics Data (Site address for generator delivery)":
    "लॉजिस्टिक्स डेटा (जनरेटर डिलीवरी के लिए साइट का पता)",
  "Usage Data (Power consumption logs for maintenance)":
    "उपयोग डेटा (रखरखाव के लिए बिजली खपत लॉग)",
  "Your data is primarily used to facilitate reliable generator rentals and maintain the safety of our equipment.":
    "आपके डेटा का उपयोग मुख्य रूप से विश्वसनीय जनरेटर किराए की सुविधा और हमारे उपकरणों की सुरक्षा बनाए रखने के लिए किया जाता है।",
  "Service Delivery": "सेवा वितरण",
  "Processing bookings, delivering equipment to your specific site, and managing rental durations.":
    "बुकिंग की प्रक्रिया करना, आपकी निर्धारित साइट पर उपकरण पहुँचाना और किराए की अवधि का प्रबंधन करना।",
  "Technical Support": "तकनीकी सहायता",
  "Coordinating technician visits and fuel refills based on your operational schedule.":
    "आपके संचालन कार्यक्रम के अनुसार तकनीशियन विज़िट और ईंधन रीफ़िल का समन्वय करना।",
  "We employ military-grade encryption and secure database protocols to ensure your business data remains confidential. We do not sell or share your information with third-party marketing firms.":
    "यह सुनिश्चित करने के लिए कि आपका व्यावसायिक डेटा गोपनीय रहे, हम उच्च-स्तरीय एन्क्रिप्शन और सुरक्षित डेटाबेस प्रोटोकॉल का उपयोग करते हैं। हम आपकी जानकारी किसी तीसरे पक्ष की मार्केटिंग कंपनियों को बेचते या साझा नहीं करते।",
  "If you have any questions regarding your data, please contact our transparency officer at:":
    "यदि आपके डेटा के संबंध में कोई प्रश्न हैं, तो कृपया हमारे पारदर्शिता अधिकारी से संपर्क करें:",
  "Our support team is available 24/7 for any legal or service queries.":
    "हमारी सहायता टीम किसी भी कानूनी या सेवा संबंधी प्रश्न के लिए 24/7 उपलब्ध है।",

  "Enhanced User Experience Protocols": "बेहतर उपयोगकर्ता अनुभव प्रोटोकॉल",
  "What are Cookies?": "कुकीज़ क्या हैं?",
  "How We Use Them": "हम उनका उपयोग कैसे करते हैं",
  "Managing Preferences": "प्राथमिकताएँ प्रबंधित करना",
  "Cookies are small text files placed on your device to help our platform remember your preferences, such as your kVA requirements or your recent generator searches.":
    "कुकीज़ आपके डिवाइस पर सहेजी जाने वाली छोटी टेक्स्ट फ़ाइलें हैं जो हमारे प्लेटफ़ॉर्म को आपकी प्राथमिकताएँ, जैसे आपकी kVA आवश्यकताएँ या हाल की जनरेटर खोजें, याद रखने में मदद करती हैं।",
  "Essential Cookies": "आवश्यक कुकीज़",
  "Required for secure login, cart persistence, and real-time availability tracking.":
    "सुरक्षित लॉगिन, कार्ट सेविंग और रीयल-टाइम उपलब्धता ट्रैकिंग के लिए आवश्यक।",
  "Performance Cookies": "प्रदर्शन कुकीज़",
  "Help us understand which generator models are most popular to optimize our fleet management.":
    "हमें यह समझने में मदद करती हैं कि फ्लीट प्रबंधन को बेहतर बनाने के लिए कौन से जनरेटर मॉडल सबसे लोकप्रिय हैं।",
  "You can choose to disable cookies through your browser settings. However, please note that certain features of the Sarvadnya portal (like active rental tracking) may not function correctly without them.":
    "आप अपनी ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को अक्षम कर सकते हैं। हालाँकि, कृपया ध्यान दें कि उनके बिना सर्वज्ञ पोर्टल की कुछ सुविधाएँ (जैसे सक्रिय रेंटल ट्रैकिंग) ठीक से काम नहीं कर सकती हैं।",
  "Need assistance managing your data preferences?":
    "क्या आपको अपनी डेटा प्राथमिकताओं को प्रबंधित करने में सहायता चाहिए?",

  "Rental Eligibility": "किराए की पात्रता",
  "Equipment Maintenance": "उपकरण रखरखाव",
  "Equipment Maintenance & Safety": "उपकरण रखरखाव और सुरक्षा",
  "Payment & Cancellation": "भुगतान और रद्दीकरण",
  "Payment & Cancellations": "भुगतान और रद्दीकरण",
  "Liability Limitation": "दायित्व सीमा",
  "By accessing our services, you confirm that you are at least 18 years old or are a legally registered business entity. Customers must provide valid identification and site details prior to equipment dispatch.":
    "हमारी सेवाओं का उपयोग करके आप पुष्टि करते हैं कि आपकी आयु कम से कम 18 वर्ष है या आप एक कानूनी रूप से पंजीकृत व्यावसायिक इकाई हैं। ग्राहकों को उपकरण भेजने से पहले वैध पहचान और साइट विवरण देना होगा।",
  "Sarvadnya Generators maintains all equipment to industrial standards. However, once on-site:":
    "सर्वज्ञ जनरेटर्स सभी उपकरणों का औद्योगिक मानकों के अनुरूप रखरखाव करता है। हालाँकि, साइट पर पहुँचने के बाद:",
  "The customer is responsible for the physical safety of the generator.":
    "जनरेटर की भौतिक सुरक्षा की जिम्मेदारी ग्राहक की होती है।",
  "Only authorized Sarvadnya technicians may perform repairs.":
    "केवल अधिकृत सर्वज्ञ तकनीशियन ही मरम्मत कार्य कर सकते हैं।",
  "The customer must ensure a stable, level surface for installation.":
    "ग्राहक को स्थापना के लिए एक स्थिर और समतल सतह सुनिश्चित करनी होगी।",
  "Fuel quality must be maintained if self-refilling (standard Diesel only).":
    "स्वयं ईंधन भरने की स्थिति में ईंधन की गुणवत्ता बनाए रखनी होगी (केवल मानक डीज़ल)।",
  "Rental fees are calculated on a daily (24-hour) basis.":
    "किराया शुल्क की गणना दैनिक (24-घंटे) आधार पर की जाती है।",
  "Refund Policy": "रिफंड नीति",
  "Cancellations made 48 hours prior to dispatch are eligible for a full refund. Same-day cancellations may incur a logistics handling fee of ₹1,500.":
    "डिस्पैच से 48 घंटे पहले किए गए रद्दीकरण पूर्ण रिफंड के पात्र हैं। उसी दिन रद्द करने पर ₹1,500 का लॉजिस्टिक्स हैंडलिंग शुल्क लग सकता है।",
  "While we strive for 99.9% uptime, Sarvadnya Generators is not liable for indirect losses, data loss, or business interruption caused by power failure beyond our immediate control (e.g., natural disasters, grid fluctuations).":
    "यद्यपि हम 99.9% अपटाइम के लिए प्रयासरत हैं, फिर भी हमारे तत्काल नियंत्रण से बाहर की बिजली विफलताओं (जैसे प्राकृतिक आपदाएँ, ग्रिड उतार-चढ़ाव) से होने वाले अप्रत्यक्ष नुकसान, डेटा हानि या व्यवसाय में रुकावट के लिए सर्वज्ञ जनरेटर्स उत्तरदायी नहीं है।",
  "Need clarification on our service agreement? We're here to help.":
    "क्या आपको हमारे सेवा अनुबंध पर स्पष्टीकरण चाहिए? हम मदद के लिए यहाँ हैं।",

  // 404 Page
  "Page Not Found": "पृष्ठ नहीं मिला",
  "There's nothing at this address.": "इस पते पर कोई पृष्ठ उपलब्ध नहीं है।",
  "The page may have moved, or the link had a typo. If you need help finding a generator,":
    "हो सकता है यह पृष्ठ हटा दिया गया हो या लिंक में कोई त्रुटि हो। यदि आपको जनरेटर खोजने में सहायता चाहिए,",
  "The shapes are still worth a throw.": "आप 3D आकार उछालकर देख सकते हैं।",

  // About Page (/about)
  "OUR STORY": "हमारी कहानी",
  "OUR JOURNEY": "हमारी यात्रा",
  "OUR IMPACT": "हमारा प्रभाव",
  "THE FUTURE": "भविष्य",
  "A Journey of": "एक यात्रा",
  "Building Trust": "विश्वास निर्माण की",
  "Expanding Horizons for": "व्यापक विस्तार",
  "Our Legacy of Power": "हमारी ऊर्जा की विरासत",
  "How We Are Powering Nashik": "हम नासिक को कैसे ऊर्जा दे रहे हैं",
  "How Sarvadnya Generators is Powering Nashik":
    "सर्वज्ञ जनरेटर्स कैसे नासिक को ऊर्जा दे रहा है",
  "The Beginning": "शुरुआत",
  "Future Vision": "भविष्य की दृष्टि",
  "Milestones of": "प्रमुख पड़ाव",
  "Excellence": "उत्कृष्टता के",
  "Powering Innovations": "नवाचारों को शक्ति",
  "Industrial Units Served": "सेवित औद्योगिक इकाइयाँ",
  "Satisfied Clients": "संतुष्ट ग्राहक",
  "Successful Projects": "सफल परियोजनाएँ",
  "Average improvement in first 6 months": "पहले 6 महीनों में औसत सुधार",
  "Based on 500+ verified customer reviews": "500+ सत्यापित ग्राहक समीक्षाओं पर आधारित",
  "Service verified by Sarvadnya Field Engineering team.":
    "सर्वज्ञ फ़ील्ड इंजीनियरिंग टीम द्वारा सत्यापित सेवा।",
  "Founded with a mission to provide dependable power backup. Started with just one diesel generator serving local needs.":
    "भरोसेमंद पावर बैकअप प्रदान करने के मिशन के साथ स्थापित। स्थानीय आवश्यकताओं के लिए सिर्फ एक डीज़ल जनरेटर से शुरुआत हुई।",
  "Expanded our fleet and started serving major construction sites and events across Nashik.":
    "अपने फ्लीट का विस्तार किया और नासिक भर में प्रमुख निर्माण स्थलों व कार्यक्रमों को सेवा देना शुरू किया।",
  "Established 24/7 emergency technical support and reached a milestone of 1000+ satisfied clients.":
    "24/7 आपातकालीन तकनीकी सहायता स्थापित की और 1000+ संतुष्ट ग्राहकों का मील का पत्थर हासिल किया।",
  "Managing 10,000+ successful projects with a diverse fleet ranging from 5 kVA to 125 kVA.":
    "5 kVA से 125 kVA तक के विविध फ्लीट के साथ 10,000+ सफल परियोजनाओं का प्रबंधन।",
  "Expanding fleet capacity across Maharashtra and introducing advanced, fuel-efficient power systems.":
    "पूरे महाराष्ट्र में फ्लीट क्षमता का विस्तार और उन्नत, ईंधन-कुशल पावर सिस्टम की शुरुआत।",
  "Sarvadnya Generators was founded in 2009 with a clear mission: to provide dependable and affordable power backup solutions for businesses, events, construction sites, and industrial operations across Nashik and nearby regions.":
    "सर्वज्ञ जनरेटर्स की स्थापना 2009 में एक स्पष्ट मिशन के साथ हुई: नासिक और आसपास के क्षेत्रों में व्यवसायों, कार्यक्रमों, निर्माण स्थलों और औद्योगिक इकाइयों के लिए विश्वसनीय और किफायती पावर बैकअप समाधान प्रदान करना।",
  "What started with a small fleet of just one diesel generator has now grown into a trusted generator rental company. We are known for our reliability, quick service, and customer-focused support, ensuring that our clients never face power interruptions.":
    "सिर्फ एक डीज़ल जनरेटर के छोटे बेड़े से जो शुरुआत हुई थी, वह आज एक भरोसेमंद जनरेटर रेंटल कंपनी बन चुकी है। हम अपनी विश्वसनीयता, त्वरित सेवा और ग्राहक-केंद्रित सहायता के लिए जाने जाते हैं ताकि हमारे ग्राहकों को कभी बिजली बाधा का सामना न करना पड़े।",
  "Over the next five years, Sarvadnya Generators aims to expand fleet capacity across Maharashtra, introducing advanced fuel-efficient systems and becoming the primary partner for industrial and event power solutions.":
    "अगले पाँच वर्षों में सर्वज्ञ जनरेटर्स का लक्ष्य पूरे महाराष्ट्र में फ्लीट क्षमता बढ़ाना, उन्नत ईंधन-कुशल सिस्टम लाना और औद्योगिक व इवेंट पावर समाधानों के लिए प्रमुख भागीदार बनना है।",
  "\"Our commitment to reliability, transparent pricing, and 24/7 assistance makes us a trusted choice for temporary and long-term power requirements.\"":
    "\"विश्वसनीयता, पारदर्शी मूल्य निर्धारण और 24/7 सहायता के प्रति हमारी प्रतिबद्धता हमें अस्थायी और दीर्घकालिक बिजली आवश्यकताओं के लिए एक भरोसेमंद विकल्प बनाती है।\"",

  // Services Page (/services)
  "Our Services": "हमारी सेवाएँ",
  "Service Verticals": "सेवा क्षेत्र",
  "Service Excellence": "सेवा उत्कृष्टता",
  "Specialized Power": "विशिष्ट पावर",
  "Empower Your": "सशक्त बनाएँ अपने",
  "Power Your Projects": "अपनी परियोजनाओं को ऊर्जा दें",
  "Power Your Next Project with Complete Peace of Mind":
    "पूर्ण मानसिक शांति के साथ अपने अगले प्रोजेक्ट को ऊर्जा दें",
  "Get Reliable Silent Power for Your Event or Site":
    "अपने कार्यक्रम या साइट के लिए भरोसेमंद साइलेंट पावर पाएँ",
  "AMC & Maintenance": "AMC और रखरखाव",
  "Turnkey Cabling": "टर्नकी केबलिंग",
  "Turnkey Cabling & On-Site Technician": "टर्नकी केबलिंग और ऑन-साइट तकनीशियन",
  "On-Site Operator": "ऑन-साइट ऑपरेटर",
  "24/7 Turnkey Assurance": "24/7 टर्नकी भरोसा",
  "24/7 EMERGENCY DISPATCH": "24/7 आपातकालीन डिस्पैच",
  "24/7 Rapid Emergency Dispatch": "24/7 तेज़ आपातकालीन डिस्पैच",
  "Emergency Dispatch": "आपातकालीन डिस्पैच",
  "Emergency Response": "आपातकालीन प्रतिक्रिया",
  "Emergency Backup": "आपातकालीन बैकअप",
  "Emergency Rental": "आपातकालीन किराया",
  "Emergency Support": "आपातकालीन सहायता",
  "Mobile DG Vans": "मोबाइल DG वैन",
  "Synchronized Dual Redundancy": "सिंक्रोनाइज़्ड डुअल रिडंडेंसी",
  "SYNCHRONIZED DUAL REDUNDANCY": "सिंक्रोनाइज़्ड डुअल रिडंडेंसी",
  "DUAL DG SYNCHRONIZATION": "डुअल DG सिंक्रोनाइज़ेशन",
  "Multiple DG Synchronized Fleet": "मल्टीपल DG सिंक्रोनाइज़्ड फ्लीट",
  "PRIME CONTINUOUS INDUSTRIAL": "प्राइम निरंतर औद्योगिक",
  "WEDDINGS & LUXURY BANQUETS": "विवाह और लग्ज़री बैंक्वेट्स",
  "GRAND CONCERTS & FESTIVALS": "भव्य कॉन्सर्ट और उत्सव",
  "ZERO SOUND DISRUPTION": "शून्य ध्वनि व्यवधान",
  "100% UNINTERRUPTED POWER": "100% निर्बाध बिजली",
  "CPCB-II ACOUSTIC ENCLOSURES": "CPCB-II ध्वनिरहित एन्क्लोज़र",
  "TURNKEY CABLING & OPERATORS": "टर्नकी केबलिंग और ऑपरेटर",
  "SILENT GENERATOR FLEET": "साइलेंट जनरेटर फ्लीट",
  "Event Silent Power": "इवेंट साइलेंट पावर",
  "Industrial Rentals": "औद्योगिक किराया",
  "Industrial & Project Rentals": "औद्योगिक और प्रोजेक्ट किराया",
  "Industrial & Infra": "औद्योगिक और इंफ्रास्ट्रक्चर",
  "Commercial & Retail": "कमर्शियल और रिटेल",
  "Events & Hospitality": "इवेंट्स और हॉस्पिटैलिटी",
  "Factories & Manufacturing": "फ़ैक्टरी और विनिर्माण",
  "Construction & Road Projects": "निर्माण और सड़क परियोजनाएँ",
  "Hospitals & Cold Storage": "अस्पताल और कोल्ड स्टोरेज",
  "Hotels & Resorts": "होटल और रिसॉर्ट्स",
  "Malls & Retail Shops": "मॉल और रिटेल दुकानें",
  "Exhibitions & Concerts": "प्रदर्शनियाँ और कॉन्सर्ट",
  "Weddings & Banquet Halls": "विवाह और बैंक्वेट हॉल",
  "Government & Water Projects": "सरकारी और जल परियोजनाएँ",
  "Film & Media Production": "फ़िल्म और मीडिया प्रोडक्शन",
  "Rentals Across Maharashtra": "पूरे महाराष्ट्र में किराया सेवा",
  "Statewide Maharashtra Coverage": "पूरे महाराष्ट्र में कवरेज",
  "Regional Coverage": "क्षेत्रीय कवरेज",
  "Uptime Guarantee": "अपटाइम गारंटी",
  "Acoustic Standards": "ध्वनि मानक",
  "Acoustic Standard": "ध्वनि मानक",
  "Acoustic Compliance": "ध्वनि अनुपालन",
  "Protection Standard": "सुरक्षा मानक",
  "Technical Logistics": "तकनीकी लॉजिस्टिक्स",
  "Concierge & Logistics": "कंसीर्ज और लॉजिस्टिक्स",
  "Delivery & crane handling": "डिलीवरी और क्रेन हैंडलिंग",
  "Full tank diesel service": "फ़ुल टैंक डीज़ल सेवा",
  "Extended runtime support": "विस्तारित रनटाइम सहायता",
  "Backup unit on-site": "साइट पर बैकअप यूनिट",
  "Turnkey Setup": "टर्नकी सेटअप",
  "Distribution Kit": "वितरण किट",
  "Support Coverage": "सहायता कवरेज",
  "Remote Monitoring": "रिमोट मॉनिटरिंग",
  "Load Balancing": "लोड बैलेंसिंग",
  "Custom Fleet Matching": "कस्टम फ्लीट मिलान",
  "Engineered for Zero Downtime": "शून्य डाउनटाइम के लिए निर्मित",
  "Comprehensive Annual Maintenance Contracts, automated fuel logistics, and 24/7 dedicated certified engineers on site.":
    "व्यापक वार्षिक रखरखाव अनुबंध (AMC), स्वचालित ईंधन लॉजिस्टिक्स और साइट पर 24/7 समर्पित प्रमाणित इंजीनियर।",
  "Every rental package includes on-site logistics, professional commissioning, cable distribution, load testing, automated fuel support, and 24/7 technical operator coverage.":
    "प्रत्येक रेंटल पैकेज में ऑन-साइट लॉजिस्टिक्स, प्रोफ़ेशनल कमीशनिंग, केबल वितरण, लोड टेस्टिंग, स्वचालित ईंधन सहायता और 24/7 तकनीकी ऑपरेटर सेवा शामिल है।",
  "Turnkey silent generator rentals and mission-critical power solutions engineered for zero downtime across Nashik and Maharashtra.":
    "नासिक और महाराष्ट्र में शून्य डाउनटाइम के लिए निर्मित टर्नकी साइलेंट जनरेटर किराया और मिशन-क्रिटिकल पावर समाधान।",

  // Generators Catalogue & Specs (/generators)
  "Generator Fleet": "जनरेटर फ्लीट",
  "All Capacities": "सभी क्षमताएँ",
  "All Types": "सभी प्रकार",
  "All Usage": "सभी उपयोग",
  "By Generator Type": "जनरेटर के प्रकार के अनुसार",
  "By Power Capacity": "पावर क्षमता के अनुसार",
  "By Usage / Industry": "उपयोग / उद्योग के अनुसार",
  "Portable": "पोर्टेबल",
  "Standby": "स्टैंडबाय",
  "Standby Generator": "स्टैंडबाय जनरेटर",
  "Industrial": "औद्योगिक",
  "Industrial Generator": "औद्योगिक जनरेटर",
  "Commercial": "कमर्शियल",
  "Residential": "आवासीय",
  "Inverter": "इन्वॉर्टर",
  "Silent Generators": "साइलेंट जनरेटर",
  "Diesel Generators": "डीज़ल जनरेटर",
  "Diesel": "डीज़ल",
  "Petrol": "पेट्रोल",
  "Fuel": "ईंधन",
  "Fuel Type": "ईंधन प्रकार",
  "FUEL TYPE": "ईंधन प्रकार",
  "Fuel System": "ईंधन प्रणाली",
  "FUEL CAPACITY": "ईंधन क्षमता",
  "Fuel Cons.": "ईंधन खपत",
  "Fuel Efficient": "ईंधन कुशल",
  "Noise Level": "शोर स्तर",
  "NOISE LEVEL": "शोर स्तर",
  "Power": "पावर",
  "POWER": "पावर",
  "Power Rating": "पावर रेटिंग",
  "Rated Capacity": "रेटेड क्षमता",
  "Phase": "फ़ेज़",
  "PHASE": "फ़ेज़",
  "ENGINE": "इंजन",
  "WEIGHT": "वज़न",
  "RUNTIME": "रनटाइम",
  "Max Runtime": "अधिकतम रनटाइम",
  "DIMENSIONS": "आयाम",
  "OUTPUT": "आउटपुट",
  "COMPLIANCE": "अनुपालन",
  "Output Voltage": "आउटपुट वोल्टेज",
  "Specifications": "स्पेसिफिकेशन",
  "Technical Matrix": "तकनीकी मैट्रिक्स",
  "Ideal For": "उपयुक्त उपयोग",
  "Price/Day": "दैनिक किराया",
  "Loading generators...": "जनरेटर लोड हो रहे हैं...",
  "Search kVA, model or brand...": "kVA, मॉडल या ब्रांड खोजें...",
  "Find Available Generators": "उपलब्ध जनरेटर खोजें",
  "Find Your Perfect Match": "अपना सही विकल्प खोजें",
  "Find the right": "सही विकल्प खोजें",
  "generator for you": "आपके लिए जनरेटर",
  "Best Seller": "बेस्ट सेलर",
  "Most Popular": "सबसे लोकप्रिय",
  "Premium Choice": "प्रीमियम विकल्प",
  "Available Generators": "उपलब्ध जनरेटर",
  "Compare our generators side by side. We've simplified the specs so you can easily choose what fits your needs.":
    "हमारे जनरेटरों की आमने-सामने तुलना करें। हमने स्पेसिफिकेशन सरल बनाए हैं ताकि आप अपनी ज़रूरत के अनुसार आसानी से चुन सकें।",
  "Explore our complete range of generators. Click on any generator to view detailed specifications and pricing.":
    "जनरेटरों की हमारी पूरी श्रृंखला देखें। विस्तृत स्पेसिफिकेशन और कीमत देखने के लिए किसी भी जनरेटर पर क्लिक करें।",
  "Browse our wide range of Kirloskar, Cummins, and Mahindra generators. Silent DG sets from 5kVA to 250kVA available for rent in Nashik and Maharashtra.":
    "किर्लोस्कर, कमिंस और महिंद्रा जनरेटरों की हमारी विस्तृत श्रृंखला देखें। नासिक और महाराष्ट्र में 5kVA से 250kVA तक साइलेंट DG सेट किराए पर उपलब्ध हैं।",
  "Explore Fleet (5–250 kVA)": "फ्लीट देखें (5–250 kVA)",
  "Silent DG Sets from": "साइलेंट DG सेट",
  "5 TO 250 kVA CAPACITY": "5 से 250 kVA क्षमता",
  "Need Help Choosing?": "चुनने में सहायता चाहिए?",
  "Need Fleet Sizing Help?": "फ्लीट साइज़िंग में सहायता चाहिए?",
  "How to Select": "कैसे चुनें",
  "Load Sizing & kVA": "लोड साइज़िंग और kVA",
  "Load Calculator": "लोड कैलकुलेटर",
  "Auto Start": "ऑटो स्टार्ट",
  "Auto Start/Stop": "ऑटो स्टार्ट/स्टॉप",
  "Auto Mains Failure": "ऑटो मेन्स फ़ेल्योर (AMF)",
  "Automatic Mains Failure (AMF)": "ऑटोमैटिक मेन्स फ़ेल्योर (AMF)",
  "Automatic Transfer Switch (ATS)": "ऑटोमैटिक ट्रांसफर स्विच (ATS)",
  "Digital Controller": "डिजिटल कंट्रोलर",
  "Digital Control Panel": "डिजिटल कंट्रोल पैनल",
  "Digital Control Module": "डिजिटल कंट्रोल मॉड्यूल",
  "Weatherproof Steel": "वेदरप्रूफ स्टील",
  "Weather-Proof Canopy": "वेदर-प्रूफ कैनोपी",
  "Trailer Mounted": "ट्रेलर माउंटेड",
  "Compact & Portable": "कॉम्पैक्ट और पोर्टेबल",
  "Low Noise Operation": "कम शोर संचालन",
  "Large Capacity Tank": "बड़ी क्षमता का टैंक",
  "Clean Sine Wave": "क्लीन साइन वेव",
  "Prime Power Rated": "प्राइम पावर रेटेड",
  "Synchronization Ready": "सिंक्रोनाइज़ेशन तैयार",
  "100% Prime Continuous": "100% प्राइम निरंतर",
  "Heavy Commercial Duty": "हेवी कमर्शियल ड्यूटी",
  "16 hours": "16 घंटे",
  "16.5 hours": "16.5 घंटे",
  "17.8 hours": "17.8 घंटे",
  "16 hours runtime on full tank": "फ़ुल टैंक पर 16 घंटे रनटाइम",

  // Booking & Bulk Order (/book, /bulk-order, /payments)
  "Book Your": "बुक करें अपना",
  "Pick Your Dates": "अपनी तारीखें चुनें",
  "Select Dates": "तारीखें चुनें",
  "Start Date": "प्रारंभ तिथि",
  "End Date": "समाप्ति तिथि",
  "Select start time": "प्रारंभ समय चुनें",
  "Select Capacity": "क्षमता चुनें",
  "Select kVA": "kVA चुनें",
  "Select Duration": "अवधि चुनें",
  "Select Industry": "उद्योग चुनें",
  "Select Generator": "जनरेटर चुनें",
  "Select Payment": "भुगतान चुनें",
  "Select generator capacity...": "जनरेटर क्षमता चुनें...",
  "Rental Duration": "किराए की अवधि",
  "Rental Days": "किराए के दिन",
  "Rental Summary": "किराए का सारांश",
  "Rental Starts From": "किराया शुरू होता है",
  "Estimated Cost": "अनुमानित लागत",
  "Delivery Cost": "डिलीवरी शुल्क",
  "Transport Extra": "परिवहन अतिरिक्त",
  "Include Transport": "परिवहन शामिल करें",
  "Include Fuel": "ईंधन शामिल करें",
  "Standard Shift": "मानक शिफ़्ट",
  "6 Hours / Shift": "6 घंटे / शिफ़्ट",
  "6 operating hours": "6 संचालन घंटे",
  "Weekly": "साप्ताहिक",
  "Monthly": "मासिक",
  "Daily": "दैनिक",
  "DAILY": "दैनिक",
  "MONTHLY": "मासिक",
  "YEARLY": "वार्षिक",
  "Long Term": "दीर्घकालिक",
  "Fast Booking": "तेज़ बुकिंग",
  "Define Your Specification": "अपनी आवश्यकता निर्धारित करें",
  "Provide Details": "विवरण प्रदान करें",
  "Configure Generators": "जनरेटर कॉन्फ़िगर करें",
  "Power Needed": "आवश्यक पावर",
  "Power Requirement": "पावर आवश्यकता",
  "Required Capacity (kVA)": "आवश्यक क्षमता (kVA)",
  "Power requirement in kVA": "kVA में पावर आवश्यकता",
  "Site Location / Pincode": "साइट स्थान / पिनकोड",
  "Landmark or pin location": "लैंडमार्क या पिन लोकेशन",
  "Deployment Site": "तैनाती स्थल",
  "Application / Industry": "उपयोग / उद्योग",
  "Industry Type": "उद्योग का प्रकार",
  "Business Name": "व्यवसाय का नाम",
  "Scheduling Notes": "शेड्यूलिंग नोट्स",
  "Selected Windows": "चयनित समय स्लॉट",
  "Take Bulk Order": "बल्क ऑर्डर दें",
  "Total Units": "कुल यूनिट्स",
  "selected unit": "चयनित यूनिट",
  "Not selected": "चयनित नहीं",
  "Payment method": "भुगतान विधि",
  "Online Payment": "ऑनलाइन भुगतान",
  "Cash Payment": "नकद भुगतान",
  "Pay cash upon delivery or pickup": "डिलीवरी या पिकअप पर नकद भुगतान करें",
  "Secure payment via UPI, Cards, or Net Banking":
    "UPI, कार्ड या नेट बैंकिंग के माध्यम से सुरक्षित भुगतान",
  "Select at least one rental date range to continue.":
    "आगे बढ़ने के लिए कम से कम एक रेंटल तिथि सीमा चुनें।",
  "Or click start date, then click your end date":
    "या प्रारंभ तिथि पर क्लिक करें, फिर समाप्ति तिथि चुनें",
  "Past dates cannot be selected for new rentals":
    "नई बुकिंग के लिए पिछली तारीखें नहीं चुनी जा सकतीं",
  "Click and drag across calendar dates for a range":
    "श्रेणी चुनने के लिए कैलेंडर तिथियों पर क्लिक कर ड्रैग करें",
  "Add multiple non-contiguous ranges as needed":
    "आवश्यकतानुसार एक से अधिक अलग-अलग तारीख सीमाएँ जोड़ें",
  "Avoid overlapping date ranges for clean dispatch":
    "सुचारू डिस्पैच के लिए ओवरलैपिंग तारीख सीमाओं से बचें",
  "Each range can carry its own set of generators":
    "प्रत्येक तिथि सीमा में जनरेटरों का अपना अलग सेट हो सकता है",
  "Pick Additional Dates on Calendar": "कैलेंडर पर अतिरिक्त तारीखें चुनें",
  "Configure multiple generators across different dates for large-scale projects.":
    "बड़ी परियोजनाओं के लिए अलग-अलग तारीखों पर कई जनरेटर कॉन्फ़िगर करें।",
  "Select one or more date ranges on the calendar to begin building your bulk fleet manifest.":
    "अपना बल्क फ्लीट मैनिफेस्ट बनाने के लिए कैलेंडर पर एक या अधिक तारीख सीमाएँ चुनें।",
  "Select your dates and specify your power requirements. Choose from our fleet of reliable":
    "अपनी तारीखें चुनें और बिजली की आवश्यकता बताएँ। हमारे भरोसेमंद फ्लीट में से चुनें",
  "Rent generators for your power needs. Select dates, specify power requirements, and choose from our fleet of reliable generators.":
    "अपनी बिजली आवश्यकताओं के लिए जनरेटर किराए पर लें। तारीखें चुनें, पावर ज़रूरत बताएँ और हमारे विश्वसनीय बेड़े में से चुनें।",
  "Project Notes & Specific Requirements (Optional)":
    "प्रोजेक्ट नोट्स और विशेष आवश्यकताएँ (वैकल्पिक)",
  "Tell us about your expected peak load, daily operating hours, diesel logistics preference, or site constraints...":
    "हमें अपने अपेक्षित पीक लोड, दैनिक संचालन घंटों, डीज़ल लॉजिस्टिक्स प्राथमिकता या साइट की स्थितियों के बारे में बताएँ...",

  // Contact Page (/contact)
  "Contact & Power Consultation | Sarvadnya Generators Nashik":
    "संपर्क और पावर परामर्श | सर्वज्ञ जनरेटर्स नासिक",
  "Send us a Message": "हमें संदेश भेजें",
  "General Inquiry": "सामान्य पूछताछ",
  "Preferred Contact Method": "पसंदीदा संपर्क माध्यम",
  "Direct Phone Call": "सीधा फ़ोन कॉल",
  "WhatsApp Message": "व्हाट्सएप संदेश",
  "WhatsApp Enquiry": "व्हाट्सएप पूछताछ",
  "WhatsApp Quick Dispatch": "व्हाट्सएप त्वरित डिस्पैच",
  "Chat on WhatsApp": "व्हाट्सएप पर चैट करें",
  "Subject *": "विषय *",
  "Your Message *": "आपका संदेश *",
  "Your name": "आपका नाम",
  "Phone number": "फ़ोन नंबर",
  "Phone Number": "फ़ोन नंबर",
  "Phone Numbers": "फ़ोन नंबर",
  "Phone Support": "फ़ोन सहायता",
  "Email Addresses": "ईमेल पते",
  "Office Address": "कार्यालय का पता",
  "Business Hours": "कार्य समय",
  "Mon — Sat: 9:00 AM — 7:00 PM": "सोम — शनि: सुबह 9:00 — शाम 7:00",
  "Other Ways to Reach Us": "हमसे जुड़ने के अन्य तरीके",
  "Discuss Power Load Sizing": "पावर लोड साइज़िंग पर चर्चा करें",
  "Speak directly with our technical team": "हमारी तकनीकी टीम से सीधे बात करें",
  "Chat with our support team in real-time": "हमारी सहायता टीम से लाइव चैट करें",
  "Tell us how we can help you...": "हमें बताएँ कि हम आपकी कैसे सहायता कर सकते हैं...",
  "Fill out the form and our team will get back to you within 24 hours.":
    "फ़ॉर्म भरें और हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।",
  "Not sure which generator is right for you? Tell us about your requirements and our experts will create a personalized quotation for you.":
    "निश्चित नहीं हैं कि कौन सा जनरेटर आपके लिए सही है? अपनी आवश्यकता बताएँ और हमारे विशेषज्ञ आपके लिए व्यक्तिगत कोटेशन तैयार करेंगे।",
  "Share Your Requirements": "अपनी आवश्यकताएँ साझा करें",
  "Start Your Rental Enquiry": "अपनी रेंटल पूछताछ शुरू करें",
  "Discovery Call Or Site Visit": "डिस्कवरी कॉल या साइट विज़िट",
  "Tailored Proposal Delivered": "कस्टम प्रस्ताव प्राप्त करें",
  "From Requirements to Rental Enquiry": "आवश्यकता से रेंटल पूछताछ तक",
  "Response within 1–2 hours for rental inquiries and mobilization.":
    "रेंटल पूछताछ और मोबिलाइज़ेशन के लिए 1–2 घंटे में प्रतिक्रिया।",
  "Equipment inspections & consultations by appointment.":
    "अपॉइंटमेंट द्वारा उपकरण निरीक्षण और परामर्श।",

  // Blog (/blog, /blog/[slug])
  "Field Insights.": "फ़ील्ड इनसाइट्स।",
  "Rental Insights & Electrical Advice": "रेंटल इनसाइट्स और इलेक्ट्रिकल सलाह",
  "Popular Tags": "लोकप्रिय टैग",
  "Categories": "श्रेणियाँ",
  "Search articles...": "लेख खोजें...",
  "Search blog articles": "ब्लॉग लेख खोजें",
  "5 min read": "5 मिनट पढ़ें",
  "6 min read": "6 मिनट पढ़ें",
  "7 min read": "7 मिनट पढ़ें",
  "Technical Assistance": "तकनीकी सहायता",
  "Check Service Availability": "सेवा उपलब्धता जाँचें",
  "Browse our generator maintenance guides": "हमारे जनरेटर रखरखाव गाइड देखें",
  "Practical sizing guidance and technical advice for event coordinators, wedding planners, and plant engineers.":
    "इवेंट समन्वयकों, वेडिंग प्लानर्स और प्लांट इंजीनियरों के लिए व्यावहारिक साइज़िंग मार्गदर्शन और तकनीकी सलाह।",
  "Expert advice on generator maintenance, selection guides for weddings, and power solution news for Nashik and Maharashtra.":
    "नासिक और महाराष्ट्र के लिए जनरेटर रखरखाव, विवाह चयन गाइड और पावर समाधान समाचारों पर विशेषज्ञ सलाह।",
  "Introduction to Power Reliability": "पावर विश्वसनीयता का परिचय",
  "Key Considerations for kVA Selection": "kVA चयन के लिए मुख्य बातें",
  "Peak Load Management:": "पीक लोड प्रबंधन:",
  "Always factor in a 20% safety margin.": "हमेशा 20% सुरक्षा मार्जिन ध्यान में रखें।",
  "Fuel Efficiency:": "ईंधन दक्षता:",
  "Modern CPCB II certified engines offer up to 15% better fuel economy.":
    "आधुनिक CPCB II प्रमाणित इंजन 15% तक बेहतर ईंधन बचत देते हैं।",
  "Noise Control:": "शोर नियंत्रण:",
  "For residential zones and weddings, acoustic enclosures are mandatory.":
    "आवासीय क्षेत्रों और विवाहों के लिए ध्वनिरहित एन्क्लोज़र अनिवार्य हैं।",
  "Founder & Technical Lead at Sarvadnya Generators with 15+ years of experience in power systems.":
    "सर्वज्ञ जनरेटर्स के संस्थापक और तकनीकी प्रमुख, पावर सिस्टम्स में 15+ वर्षों के अनुभव के साथ।",
  "The Ultimate Guide to Choosing the Right Generator for Your Wedding":
    "अपनी शादी के लिए सही जनरेटर चुनने की संपूर्ण मार्गदर्शिका",
  "Essential Maintenance Tips for Industrial Silent DG Sets":
    "औद्योगिक साइलेंट DG सेट के लिए आवश्यक रखरखाव सुझाव",
  "The Science of Silence: How Our Acoustic Enclosures Work":
    "मौन का विज्ञान: हमारे ध्वनिरहित एन्क्लोज़र कैसे काम करते हैं",
  "How Sarvadnya Generators is Powering Nashik's Industrial Expansion":
    "सर्वज्ञ जनरेटर्स नासिक के औद्योगिक विस्तार को कैसे ऊर्जा दे रहा है",
  "Optimizing Fuel Management: Strategies for Long-Term Rentals":
    "ईंधन प्रबंधन को अनुकूलित करना: दीर्घकालिक किराए की रणनीतियाँ",
  "Critical Power Backup for Hospitals: Why Every Second Counts":
    "अस्पतालों के लिए महत्वपूर्ण पावर बैकअप: हर सेकंड क्यों मायने रखता है",
  "How to Calculate kVA Requirements for Outdoor Weddings & Banquets":
    "आउटडोर विवाह और बैंक्वेट के लिए kVA आवश्यकता की गणना कैसे करें",
  "Prime Continuous vs. Standby DG Sets: Selecting Industrial Capacity":
    "प्राइम निरंतर बनाम स्टैंडबाय DG सेट: औद्योगिक क्षमता का चयन",
  "Why CPCB-II Soundproof Canopies are Mandatory for Urban Venues":
    "शहरी स्थलों के लिए CPCB-II साउंडप्रूफ कैनोपी क्यों अनिवार्य हैं",
  "Pro Tips for Planning Power Infrastructure for Outdoor Concerts":
    "आउटडोर कॉन्सर्ट के लिए पावर इंफ्रास्ट्रक्चर योजना के प्रो टिप्स",
  "Optimizing Fuel Management for Long-Term Rentals":
    "दीर्घकालिक किराए के लिए ईंधन प्रबंधन का अनुकूलन",
  "Planning Power for Outdoor Concerts": "आउटडोर कॉन्सर्ट के लिए पावर योजना",

  // Profile (/profile)
  "Active Rentals": "सक्रिय किराए",
  "Total Bookings": "कुल बुकिंग",
  "Bookings": "बुकिंग्स",
  "Saved Generators": "सहेजे गए जनरेटर",
  "Saved Sites": "सहेजी गई साइट्स",
  "Manage Saved Sites": "सहेजी गई साइट्स प्रबंधित करें",
  "View Booking History": "बुकिंग इतिहास देखें",
  "Repeat Last Booking": "पिछली बुकिंग दोहराएँ",
  "Member Since": "सदस्यता तिथि",
  "Verified Rentals": "सत्यापित रेंटल",
  "Active Deployment": "सक्रिय तैनाती",
  "Confirmed": "पुष्ट",
  "Completed": "पूर्ण",
  "Cancelled": "रद्द",
  "In Progress": "प्रगति पर",
  "in progress": "प्रगति पर",
  "Call Raised": "कॉल दर्ज",
  "Fuel Refill": "ईंधन रीफ़िल",
  "Repair": "मरम्मत",
  "Reminders": "रिमाइंडर",
  "Feedback": "प्रतिक्रिया",
  "Danger Zone": "डेंजर ज़ोन",
  "Updating...": "अपडेट हो रहा है...",
  "Search by generator or site...": "जनरेटर या साइट के अनुसार खोजें...",
  "All Statuses": "सभी स्थितियाँ",
  "Manage your bookings, sites, and rental history":
    "अपनी बुकिंग्स, साइट्स और रेंटल इतिहास प्रबंधित करें",

  // Misc
  "Industry Leader": "उद्योग अग्रणी",
  "Success Stories": "सफलता की कहानियाँ",
  "Real results from real clients": "असली ग्राहकों के वास्तविक परिणाम",
  "Frequently Asked Questions": "अक्सर पूछे जाने वाले प्रश्न",
  "Frequently Asked": "अक्सर पूछे जाने वाले",
  "Everything you need to know about our silent generator fleet, mobilization timelines, and turnkey power services.":
    "हमारे साइलेंट जनरेटर फ्लीट, मोबिलाइज़ेशन समय-सीमा और टर्नकी पावर सेवाओं के बारे में जानने योग्य सब कुछ।",
  "Clear answers to generator rental logistics, load sizing, fuel autonomy, and technical operations.":
    "जनरेटर रेंटल लॉजिस्टिक्स, लोड साइज़िंग, ईंधन स्वायत्तता और तकनीकी संचालन के स्पष्ट उत्तर।",

  // Services Page Full Sections, Timeline, Testimonial & FAQ
  "Precision-Engineered": "सटीक-इंजीनियर्ड",
  "Deployment Pipeline": "डिप्लॉयमेंट पाइपलाइन",
  "PHASE 01 • SIZING": "चरण 01 • साइज़िंग",
  "Intelligent Power Audit": "इंटेलिजेंट पावर ऑडिट",
  "Zero-Margin Sizing Accuracy": "शून्य-त्रुटि साइज़िंग सटीकता",
  "PHASE 02 • ALLOCATION": "चरण 02 • आवंटन",
  "CPCB-IV+ Silent Acoustic": "CPCB-IV+ साइलेंट ध्वनिरोधन",
  "PHASE 03 • MOBILIZATION": "चरण 03 • मोबिलाइज़ेशन",
  "Rapid Heavy Deployment": "तेज़ हेवी डिप्लॉयमेंट",
  "PHASE 04 • OPERATIONS": "चरण 04 • संचालन",
  "99.98% Guaranteed Grid Uptime": "99.98% गारंटीड ग्रिड अपटाइम",
  "Max Silent Fleet Unit": "अधिकतम साइलेंट फ्लीट यूनिट",
  "Downtime Reduction": "डाउनटाइम में कमी",
  "Client Rating": "ग्राहक रेटिंग",
  "James Mitchell": "जेम्स मिचेल",
  "Owner, Alpine Peak Resort": "मालिक, अल्पाइन पीक रिसॉर्ट",
  "Professional Technical Consultant with 3D Question Mark": "3D प्रश्न चिह्न के साथ तकनीकी सलाहकार",
  "What is included in the turnkey rental service?": "टर्नकी रेंटल सेवा में क्या शामिल है?",
  "From initial site telemetry to active power assurance, every stage is executed with industrial-grade reliability and zero margin for downtime.":
    "प्रारंभिक साइट टेलीमेट्री से लेकर सक्रिय पावर सुरक्षा तक, प्रत्येक चरण औद्योगिक-स्तर की विश्वसनीयता और शून्य डाउनटाइम के साथ पूरा किया जाता है।",
  "Certified electrical engineers analyze peak kVA draw, harmonic loads, and space constraints to eliminate power drop risks.":
    "प्रमाणित इलेक्ट्रिकल इंजीनियर पावर ड्रॉप के जोखिम को खत्म करने के लिए पीक kVA मांग, हार्मोनिक लोड और स्थान की सीमाओं का विश्लेषण करते हैं।",
  "Heavy hydraulic transport, specialized unloading, industrial cabling distribution, and certified on-site electrical commissioning.":
    "भारी हाइड्रोलिक परिवहन, विशेष अनलोडिंग, औद्योगिक केबल वितरण और साइट पर प्रमाणित इलेक्ट्रिकल कमीशनिंग।",
  "\"Working with Sarvadnya transformed our business operations. Within 6 months, we saw a 60% reduction in downtime and our facility's operational efficiency reached an all-time high. Their team's technical expertise is unmatched.\"":
    "\"सर्वज्ञ के साथ काम करने से हमारे व्यावसायिक संचालन में बड़ा बदलाव आया। 6 महीनों में डाउनटाइम में 60% की कमी आई और हमारी कार्यक्षमता रिकॉर्ड स्तर पर पहुँच गई। उनकी टीम की तकनीकी विशेषज्ञता बेजोड़ है।\"",
  "Our entire fleet is CPCB II and CPCB-IV+ certified, ensuring ultra-low emissions, high fuel efficiency, and whisper-silent acoustic performance.":
    "हमारा पूरा फ्लीट CPCB II और CPCB-IV+ प्रमाणित है, जो अत्यंत कम उत्सर्जन, उच्च ईंधन दक्षता और लगभग शून्य शोर वाला प्रदर्शन सुनिश्चित करता है।",

  // About Page Full Sections, Promises & Team
  "POWER YOU CAN TRUST": "भरोसेमंद पावर समाधान",
  "Reliability": "विश्वसनीयता",
  "Driven by Reliability,": "विश्वसनीयता से प्रेरित,",
  "Measured by": "मापा गया",
  "Results": "परिणामों से",
  "17+ Years": "17+ वर्ष",
  "12+ Yrs": "12+ वर्ष",
  "Experience": "अनुभव",
  "Rentals": "किराए",
  "Clients": "ग्राहक",
  "Industry Expertise": "उद्योग विशेषज्ञता",
  "Technical assistance always on standby": "तकनीकी सहायता हमेशा तैयार",
  "The Sarvadnya": "सर्वज्ञ का",
  "Promise": "वादा",
  "We deliver uninterrupted power with fast response times, well-maintained equipment, and dedicated 24/7 technical support.":
    "हम तेज़ प्रतिक्रिया समय, सुव्यवस्थित उपकरण और समर्पित 24/7 तकनीकी सहायता के साथ निर्बाध बिजली प्रदान करते हैं।",
  "Our commitment to reliability, transparent pricing, and 24/7 assistance makes us a trusted choice for temporary and long-term power requirements.":
    "विश्वसनीयता, पारदर्शी कीमत और 24/7 सहायता के प्रति हमारी प्रतिबद्धता हमें अस्थायी और दीर्घकालिक बिजली जरूरतों के लिए एक भरोसेमंद विकल्प बनाती है।",
  "Sustainable": "टिकाऊ",
  "Leyland": "अशोक लीलैंड",
  "Reliability Verified": "विश्वसनीयता सत्यापित",
  "Product Manager": "प्रोडक्ट मैनेजर",
  "Marketing Head": "मार्केटिंग प्रमुख",
  "Technical Lead": "तकनीकी प्रमुख",
  "Security Operations": "सुरक्षा संचालन",
  "Success Team": "सक्सेस टीम",

  // Contact Page Full Sections, Form & Channels
  "Every": "हर",
  "deployment": "तैनाती",
  "starts": "शुरू",
  "with": "के साथ",
  "With": "के साथ",
  "conversation": "बातचीत",
  "Phone": "फ़ोन",
  "Call": "कॉल",
  "Start the conversation": "बातचीत शुरू करें",
  "Submit Enquiry": "पूछताछ सबमिट करें",
  "Submit another enquiry": "एक और पूछताछ भेजें",
  "Enquiry Received": "पूछताछ प्राप्त हुई",
  "Statewide Mobilization": "पूरे राज्य में मोबिलाइज़ेशन",
  "MIDC Ambad": "MIDC अंबड",
  "Satpur": "सातपुर",
  "Sinnar": "सिन्नर",
  "Tanmay Avhad (Lead Dispatch Desk)": "तन्मय अव्हाड (लीड डिस्पैच डेस्क)",
  "Gopal Avhad (Technical Operations)": "गोपाल अव्हाड (तकनीकी संचालन)",
  "Tanmay Avhad: +91 62626 29944": "तन्मय अव्हाड: +91 62626 29944",
  "Gopal Avhad: +91 98231 97881": "गोपाल अव्हाड: +91 98231 97881",
  "Mon - Sat: 9:00 AM - 7:00 PM": "सोम - शनि: सुबह 9:00 - शाम 7:00",
  "Sunday: Emergency Support Only": "रविवार: केवल आपातकालीन सहायता",
  "Wadala - Pathardi Rd, behind sudarshan lawns,": "वडाला - पाथर्डी रोड, सुदर्शन लॉन्स के पीछे,",
  "vanvaibhav colony, Indira Nagar,": "वनवैभव कॉलोनी, इंदिरा नगर,",
  "Google Maps Address": "Google मैप्स पता",
  "Support: support@sarvadnyagenerators.com": "सहायता: support@sarvadnyagenerators.com",
  "Sales: sales@sarvadnyagenerators.com": "सेल्स: sales@sarvadnyagenerators.com",
  "General: info@sarvadnyagenerators.com": "सामान्य: info@sarvadnyagenerators.com",
  "e.g. Rahul Sharma / Industrial Plant Head": "उदा. राहुल शर्मा / इंडस्ट्रियल प्लांट हेड",
  "e.g., Ambad MIDC Plot 42": "उदा., अंबड MIDC प्लॉट 42",
  "5 – 25 kVA (Commercial & Retail)": "5 – 25 kVA (कमर्शियल और रिटेल)",
  "30 – 62.5 kVA (Events & Medium Load)": "30 – 62.5 kVA (इवेंट्स और मध्यम लोड)",
  "82.5 – 125 kVA (Industrial / Manufacturing)": "82.5 – 125 kVA (औद्योगिक / विनिर्माण)",
  "160 – 250 kVA (Heavy Continuous Prime)": "160 – 250 kVA (हैवी निरंतर प्राइम)",
  "Industrial Manufacturing / Plant": "औद्योगिक विनिर्माण / प्लांट",
  "Grand Wedding / VIP Celebration": "भव्य विवाह / VIP समारोह",
  "Concert / Public Festival": "कॉन्सर्ट / सार्वजनिक उत्सव",
  "Infrastructure & Construction Site": "बुनियादी ढाँचा और निर्माण स्थल",
  "Emergency Breakdown Standby": "आपातकालीन ब्रेकडाउन स्टैंडबाय",
  "A considered process built around you": "आपकी ज़रूरतों के अनुसार बनाई गई सुव्यवस्थित प्रक्रिया",
  "We’ll Review Your Enquiry": "हम आपकी पूछताछ की समीक्षा करेंगे",
  "Thank you! Your message has been sent.": "धन्यवाद! आपका संदेश भेज दिया गया है।",
  "Dedicated heavy hydraulic fleet transport, professional loading, and on-site electrical distribution.":
    "समर्पित भारी हाइड्रोलिक फ्लीट परिवहन, प्रोफ़ेशनल लोडिंग और साइट पर इलेक्ट्रिकल वितरण।",
  "Our senior electrical engineering team reviews your site parameters, harmonic loads, peak kVA demand, and acoustics within 60 minutes.":
    "हमारी वरिष्ठ इलेक्ट्रिकल इंजीनियरिंग टीम 60 मिनट के भीतर आपके साइट पैरामीटर, हार्मोनिक लोड, पीक kVA मांग और ध्वनि स्तर की समीक्षा करती है।",
  "You’ll receive a transparent, all-inclusive proposal detailing the exact CPCB-IV+ DG set capacity, heavy hydraulic mobilization, and turnkey fuel logistics.":
    "आपको CPCB-IV+ DG सेट क्षमता, भारी हाइड्रोलिक मोबिलाइज़ेशन और टर्नकी ईंधन लॉजिस्टिक्स के पूर्ण विवरण वाला एक पारदर्शी सर्व-समावेशी प्रस्ताव प्राप्त होगा।",
  "Thank you for defining your power specification. Tanmay Avhad and our engineering dispatch desk are reviewing your details and will contact you via":
    "अपनी पावर आवश्यकता बताने के लिए धन्यवाद। तन्मय अव्हाड और हमारी इंजीनियरिंग डिस्पैच टीम आपके विवरण की समीक्षा कर रही है और आपसे संपर्क करेगी",

  // Blog & Blog Post Detail (/blog, /blog/[slug])
  "Power Insights": "पावर इनसाइट्स",
  "Events": "कार्यक्रम",
  "Efficiency": "दक्षता",
  "Case Studies": "केस स्टडीज़",
  "Technology": "तकनीक",
  "Stay Empowered With": "हमेशा ऊर्जावान रहें",
  "Written By": "लेखक",
  "Tanmay Avhad": "तन्मय अव्हाड",
  "Published On": "प्रकाशन तिथि",
  "Read Time": "पढ़ने का समय",
  "Share": "शेयर करें",
  "Link Copied": "लिंक कॉपी हुआ",
  "Related Articles": "संबंधित लेख",
  "View All": "सभी देखें",
  "Show All Articles": "सभी लेख दिखाएँ",
  "Rental Tips": "किराया सुझाव",
  "Wedding Setup": "विवाह सेटअप",
  "Industrial Safety": "औद्योगिक सुरक्षा",
  "Fuel Efficiency": "ईंधन दक्षता",
  "#Rental Tips": "#किराया सुझाव",
  "#Wedding Setup": "#विवाह सेटअप",
  "#Industrial Safety": "#औद्योगिक सुरक्षा",
  "#Fuel Efficiency": "#ईंधन दक्षता",
  "— Tanmay Avhad, CEO": "— तन्मय अव्हाड, CEO",
  "How To Calculate Kva Requirements For Outdoor Weddings Banquets":
    "आउटडोर विवाह और बैंक्वेट के लिए kVA आवश्यकता की गणना कैसे करें",
  "No articles match your current filter.": "आपके फ़िल्टर से कोई लेख मेल नहीं खाया।",
  "Try clearing your search or switching back to all articles.":
    "अपनी खोज साफ़ करें या सभी लेखों पर वापस जाएँ।",
  "Subscribed! You will receive our next field guide directly in your inbox.":
    "सदस्यता सफल! हमारी अगली फ़ील्ड गाइड सीधे आपके इनबॉक्स में प्राप्त होगी।",
  "Don't let power outages dim your big day. Learn how to calculate your kVA needs, manage acoustic levels, and ensure seamless entertainment.":
    "बिजली कटौती को अपने खास दिन को फीका न करने दें। जानें कि अपनी kVA जरूरतें कैसे गिनें, ध्वनि स्तर नियंत्रित करें और निर्बाध कार्यक्रम सुनिश्चित करें।",
  "Learn how to calculate your kVA needs, manage acoustic levels, and ensure uninterrupted celebration power.":
    "जानें कि अपनी kVA आवश्यकता की गणना कैसे करें, ध्वनि स्तर प्रबंधित करें और निर्बाध उत्सव बिजली सुनिश्चित करें।",
  "Preventive oil, coolant, and load-bank inspection checklists to maximize uptime across continuous industrial operations.":
    "निरंतर औद्योगिक संचालन में अधिकतम अपटाइम बनाए रखने के लिए निवारक ऑयल, कूलेंट और लोड-बैंक जांच सूची।",
  "How sub-10-second AMF failover panels and synchronized redundant DG units protect life-critical medical loads.":
    "कैसे 10 सेकंड से कम वाले AMF फ़ेलओवर पैनल और सिंक्रोनाइज़्ड बैकअप DG यूनिट जीवन-रक्षक चिकित्सा लोड की रक्षा करते हैं।",
  "Inside CPCB-II certified soundproof canopies, baffled airflow channels, and multi-stage exhaust attenuation.":
    "CPCB-II प्रमाणित साउंडप्रूफ कैनोपी, एयरफ़्लो चैनल और मल्टी-स्टेज एग्ज़ॉस्ट शोर नियंत्रण के अंदर की तकनीक।",
  "When planning a grand wedding or managing a 24/7 manufacturing facility, power isn't just a utility—it's the backbone of your operation. A single minute of downtime can result in massive financial losses or the disruption of a once-in-a-lifetime celebration.":
    "भव्य विवाह की योजना बनाते समय या 24/7 विनिर्माण संयंत्र चलाते समय बिजली केवल एक सुविधा नहीं—बल्कि आपके पूरे संचालन की रीढ़ है। एक मिनट का भी डाउनटाइम बड़ा वित्तीय नुकसान या जीवन के अनमोल उत्सव में बाधा डाल सकता है।",
  "“Reliability in power generation is not an option; it's a necessity for modern industrial growth.”":
    "\"बिजली उत्पादन में विश्वसनीयता कोई विकल्प नहीं है; यह आधुनिक औद्योगिक विकास की अनिवार्यता है।\"",
  "Choosing the right kVA rating is the first step. For weddings, you typically need to account for lighting, sound systems, and catering equipment. A 125kVA unit is often the “sweet spot” for grand banquet halls, while 250kVA is preferred for outdoor concerts and large-scale industrial shifts.":
    "सही kVA रेटिंग चुनना पहला कदम है। विवाहों के लिए आमतौर पर लाइटिंग, साउंड सिस्टम और कैटरिंग उपकरण का हिसाब रखना होता है। भव्य बैंक्वेट हॉल के लिए 125kVA यूनिट सबसे उपयुक्त रहती है, जबकि आउटडोर कॉन्सर्ट और बड़े औद्योगिक शिफ़्ट के लिए 250kVA पसंद की जाती है।",

  // Header, Footer & Chatbot Labels
  "Open menu": "मेनू खोलें",
  "Close menu": "मेनू बंद करें",
  "Close Menu": "मेनू बंद करें",
  "Explore All Fleet & Insights": "सभी फ्लीट और लेख देखें",
  "Show password": "पासवर्ड दिखाएँ",
  "Hide password": "पासवर्ड छिपाएँ",
  "Facebook": "फ़ेसबुक",
  "Twitter": "ट्विटर",
  "LinkedIn": "लिंक्डइन",
  "Instagram": "इंस्टाग्राम",
  "WhatsApp": "व्हाट्सएप",
  "Enter City": "शहर दर्ज करें",
  "kVA Requirement Help": "kVA आवश्यकता सहायता",
  "Rental Pricing": "किराया मूल्य सूची",
  "Check Availability": "उपलब्धता जाँचें",
  "View Fleet": "फ्लीट देखें",
  "Talk to Sales": "सेल्स से बात करें",
  "Reserve Now": "अभी बुक करें",
  "Main Menu": "मुख्य मेनू",
  "Corporate Office": "कॉर्पोरेट कार्यालय",
  "Call Support Now": "अभी सहायता कॉल करें",
  "Submit Ticket": "टिकट सबमिट करें",
  "Get Custom Quote": "कस्टम कोटेशन पाएं",
  "Price List": "मूल्य सूची",
  "Great! We have a fleet from 5kVA to 250kVA. How would you like to proceed?":
    "बढ़िया! हमारे पास 5kVA से 250kVA तक का फ्लीट उपलब्ध है। आप आगे कैसे बढ़ना चाहेंगे?",
  "I can check that for you! Which capacity are you looking for?":
    "मैं अभी आपके लिए जाँच सकता हूँ! आप किस क्षमता की तलाश कर रहे हैं?",
  "Pricing depends on the kVA capacity and rental duration. Generally, we offer Daily, Weekly, and Monthly plans. Would you like a custom quote?":
    "कीमत kVA क्षमता और किराए की अवधि पर निर्भर करती है। हम दैनिक, साप्ताहिक और मासिक प्लान देते हैं। क्या आप कस्टम कोटेशन चाहते हैं?",
  "Thank you for the information. Our team is processing your request and will contact you via mobile shortly.":
    "जानकारी के लिए धन्यवाद। हमारी टीम आपके अनुरोध पर कार्य कर रही है और शीघ्र ही मोबाइल पर संपर्क करेगी।",
  "Perfect. I'm redirecting you to our secure booking portal. You can also call us directly to finalize the details.":
    "बढ़िया। मैं आपको हमारे सुरक्षित बुकिंग पोर्टल पर भेज रहा हूँ। विवरण अंतिम करने के लिए आप हमें सीधे कॉल भी कर सकते हैं।",
  "I've noted that. One of our experts will get back to you shortly. Can I help with anything else?":
    "मैंने इसे नोट कर लिया है। हमारे विशेषज्ञ शीघ्र ही आपसे संपर्क करेंगे। क्या मैं किसी और चीज़ में मदद कर सकता हूँ?",

  // Generators, Booking, Bulk Order & Profile UI Labels
  "Hospitals": "अस्पताल",
  "Factories": "फ़ैक्टरियाँ",
  "Retail & Homes": "रिटेल और घर",
  "Commercial Sites": "कमर्शियल साइट्स",
  "Events & Banquets": "इवेंट्स और बैंक्वेट्स",
  "General use": "सामान्य उपयोग",
  "Wedding/Event": "विवाह/कार्यक्रम",
  "Included": "शामिल",
  "Standard": "मानक",
  "How Long It Runs": "कितनी देर चलता है",
  "How Much Power?": "कितनी पावर चाहिए?",
  "Safe for laptops and mobiles": "लैपटॉप और मोबाइल के लिए सुरक्षित",
  "Starts automatically during power cuts": "बिजली कटने पर अपने-आप शुरू होता है",
  "for your project.": "आपके प्रोजेक्ट के लिए।",
  "choosing?": "चुनने में?",
  "Found": "मिला",
  "Total": "कुल",
  "SARVADNYA": "सर्वज्ञ",
  "Standby Ready": "स्टैंडबाय तैयार",
  "Fuel Included": "ईंधन शामिल",
  "Transport Included": "परिवहन शामिल",
  "Comparing 3 selected units": "3 चयनित यूनिट्स की तुलना",
  "Quantity (Units)": "मात्रा (यूनिट्स)",
  "Number of Shifts": "शिफ़्ट की संख्या",
  "Shift Start Time": "शिफ़्ट प्रारंभ समय",
  "Back to Calendar": "कैलेंडर पर वापस जाएँ",
  "Edit Dates": "तारीखें संपादित करें",
  "Done Editing": "संपादन पूर्ण",
  "Select model": "मॉडल चुनें",
  "Add to Quote": "कोटेशन में जोड़ें",
  "Rebook Now": "फिर से बुक करें",
  "Hide Details": "विवरण छिपाएँ",
  "Booking ID": "बुकिंग आईडी",
  "Total Amount": "कुल राशि",
  "Last Booking": "पिछली बुकिंग",
  "Site Manager": "साइट मैनेजर",
  "Instructions": "निर्देश",
  "Company Name": "कंपनी का नाम",
  "Full Address": "पूरा पता",
  "City / Location": "शहर / स्थान",
  "Business Type / Industry": "व्यवसाय प्रकार / उद्योग",
  "Account Settings": "खाता सेटिंग्स",
  "Save Changes": "बदलाव सहेजें",
  "Delete Account": "खाता हटाएँ",
  "Confirm Deletion Request": "हटाने के अनुरोध की पुष्टि करें",
  "Venues": "स्थल",
  "Contacts": "संपर्क",
  "Ranges": "श्रेणियाँ",
  "Configs": "कॉन्फ़िगरेशन",
  "Fleet Dispatch Overview": "फ्लीट डिस्पैच अवलोकन",
  "Review Your Bulk Order": "अपने बल्क ऑर्डर की समीक्षा करें",
  "Edit Selected Date Ranges": "चयनित तारीख श्रेणियाँ संपादित करें",
  "Confirm Selected Date Ranges": "चयनित तारीख श्रेणियों की पुष्टि करें",
  "Site Location / Project Name": "साइट स्थान / प्रोजेक्ट नाम",
  "Site location to be confirmed": "साइट स्थान की पुष्टि की जानी है",
  "Service & Logistics Options": "सेवा और लॉजिस्टिक्स विकल्प",
  "Confirm & Continue →": "पुष्टि करें और आगे बढ़ें →",
  "Create an Account": "खाता बनाएँ",
  "Try Again": "पुनः प्रयास करें",
  "Authentication failed.": "प्रमाणीकरण विफल रहा।",
  "Google sign-in failed.": "Google साइन-इन विफल रहा।",
  "Failed to sign in with Google.": "Google से साइन इन करने में विफल।",
  "Failed to create account.": "खाता बनाने में विफल।",
  "Fill in all basic details.": "सभी बुनियादी विवरण भरें।",
  "Account created! Check email.": "खाता बन गया! अपना ईमेल जाँचें।",
  "Please enter a valid email address.": "कृपया एक मान्य ईमेल पता दर्ज करें।",
  "Please enter your password.": "कृपया अपना पासवर्ड दर्ज करें।",
  "Invalid email or password. Please try again.": "अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।",
  "Profile updated successfully!": "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!",
  "No bookings matched your filter.": "आपके फ़िल्टर से कोई बुकिंग मेल नहीं खाई।",
  "No saved sites found. Add a new site to see it here.":
    "कोई सहेजी गई साइट नहीं मिली। यहाँ देखने के लिए नई साइट जोड़ें।",
  "No venues found. Your booking venues will appear here.":
    "कोई स्थल नहीं मिला। आपके बुकिंग स्थल यहाँ दिखेंगे।",
  "No contacts found. Add sites to see contacts here.":
    "कोई संपर्क नहीं मिला। संपर्क देखने के लिए साइट जोड़ें।",
  "No reminders yet. Your past bookings will appear here as suggestions.":
    "अभी कोई रिमाइंडर नहीं है। आपकी पिछली बुकिंग यहाँ सुझाव के रूप में दिखेंगी।",
  "No date ranges selected. Select dates on the calendar to continue.":
    "कोई तारीख सीमा चयनित नहीं है। आगे बढ़ने के लिए कैलेंडर पर तारीखें चुनें।",
  "Assign capacity, unit count, shift schedule, and delivery location per date range.":
    "प्रत्येक तारीख सीमा के लिए क्षमता, यूनिट संख्या, शिफ़्ट समय और डिलीवरी स्थान तय करें।",
  "Verify your date windows, fleet quantities, and site locations before proceeding to payment.":
    "भुगतान पर जाने से पहले अपनी तारीख अवधि, फ्लीट मात्रा और साइट स्थान सत्यापित करें।",
  "Deleting your account will remove all your data, bookings, and history. This action cannot be undone.":
    "अपना खाता हटाने से आपका सारा डेटा, बुकिंग और इतिहास हट जाएगा। यह कार्रवाई वापस नहीं ली जा सकती।",
  "Account deletion requests require verification via our dispatch desk.":
    "खाता हटाने के अनुरोध के लिए हमारे डिस्पैच डेस्क के माध्यम से सत्यापन आवश्यक है।",
  "Ready for repeat dispatch with stored load specs.":
    "सहेजे गए लोड विवरण के साथ पुनः डिस्पैच के लिए तैयार।",
  "5kVA to 250kVA": "5kVA से 250kVA",
  "for Events, Construction, Hospitals & Emergency Backup. Reliable power when you need it most.":
    "कार्यक्रमों, निर्माण, अस्पतालों और आपातकालीन बैकअप के लिए। जब आपको सबसे ज़्यादा ज़रूरत हो तब भरोसेमंद बिजली।",
  "Manage bookings, rental requests, and support from one premium dashboard.":
    "एक ही प्रीमियम डैशबोर्ड से बुकिंग, रेंटल अनुरोध और सहायता प्रबंधित करें।",
  "Business": "व्यवसाय",
  "24/7 Support": "24/7 सहायता",
  "Reliable Rentals": "विश्वसनीय किराया",
  "Yamaha": "यामाहा",
};

// Lowercase normalized map for case-insensitive O(1) lookup (normalizes smart quotes)
const normalizeForLookup = (s: string) =>
  s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const HI_LOWER = new Map<string, string>();
for (const [k, v] of Object.entries(HI_PHRASES)) {
  HI_LOWER.set(normalizeForLookup(k), v);
}

const MR_LOWER = new Map<string, string>();
for (const [k, v] of Object.entries(MR_PHRASES)) {
  MR_LOWER.set(normalizeForLookup(k), v);
}

// Ordered term/phrase replacements for dynamic/unseen composite strings in Hindi
const HI_TERM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bGenerator Wishlist\b/gi, "जनरेटर विशलिस्ट"],
  [/\bGenerator Cart\b/gi, "जनरेटर कार्ट"],
  [/\bGenerator Fleet\b/gi, "जनरेटर फ्लीट"],
  [/\bSilent Generator\b/gi, "साइलेंट जनरेटर"],
  [/\bSilent DG Set\b/gi, "साइलेंट DG सेट"],
  [/\bSilent DG\b/gi, "साइलेंट DG"],
  [/\bSarvadnya Generators\b/gi, "सर्वज्ञ जनरेटर्स"],
  [/\bSarvadnya Generator\b/gi, "सर्वज्ञ जनरेटर"],
  [/\bStandby Generator\b/gi, "स्टैंडबाय जनरेटर"],
  [/\bIndustrial Generator\b/gi, "औद्योगिक जनरेटर"],
  [/\bCommercial Generator\b/gi, "कमर्शियल जनरेटर"],
  [/\bPortable Generator\b/gi, "पोर्टेबल जनरेटर"],
  [/\bGenerators\b/gi, "जनरेटर"],
  [/\bGenerator\b/gi, "जनरेटर"],
  [/\bKirloskar\b/gi, "किर्लोस्कर"],
  [/\bCummins\b/gi, "कमिंस"],
  [/\bMahindra\b/gi, "महिंद्रा"],
  [/\bPerkins\b/gi, "पर्किन्स"],
  [/\bHonda\b/gi, "होंडा"],
  [/\bNashik\b/gi, "नासिक"],
  [/\bMaharashtra\b/gi, "महाराष्ट्र"],
  [/\bAvailable\b/gi, "उपलब्ध"],
  [/\bBooked\b/gi, "बुक किया गया"],
  [/\bMaintenance\b/gi, "रखरखाव"],
  [/\bSingle Phase\b/gi, "सिंगल फ़ेज़"],
  [/\bThree Phase\b/gi, "थ्री फ़ेज़"],
  [/\b3-Phase\b/gi, "3-फ़ेज़"],
  [/\bDiesel\b/gi, "डीज़ल"],
  [/\bPetrol\b/gi, "पेट्रोल"],
  [/\bper day\b/gi, "प्रति दिन"],
  [/\/day\b/gi, "/दिन"],
  [/\bhours?\b/gi, "घंटे"],
  [/\bJanuary\b/gi, "जनवरी"],
  [/\bFebruary\b/gi, "फ़रवरी"],
  [/\bMarch\b/gi, "मार्च"],
  [/\bApril\b/gi, "अप्रैल"],
  [/\bMay\b/gi, "मई"],
  [/\bJune\b/gi, "जून"],
  [/\bJuly\b/gi, "जुलाई"],
  [/\bAugust\b/gi, "अगस्त"],
  [/\bSeptember\b/gi, "सितंबर"],
  [/\bOctober\b/gi, "अक्टूबर"],
  [/\bNovember\b/gi, "नवंबर"],
  [/\bDecember\b/gi, "दिसंबर"],
];

interface LocaleConfig {
  phrases: Record<string, string>;
  lowerMap: Map<string, string>;
  termReplacements: Array<[RegExp, string]>;
  generatorsWord: string;
  stepWord: string;
  shortlistedPrefix: string;
  shortlistedSuffix: string;
  minReadWord: string;
  rightsReserved: string;
  hoursWord: string;
  fullTankPrefix: string;
  runtimeWord: string;
  viewingPrefix: string;
  foundWord: string;
  clearWord: string;
  comparingSuffix: string;
  compareSlotWord: string;
  unitWord: string;
  bookSuffix: string;
  removeSuffix: string;
  insuranceWord: string;
  lastYearText: string;
}

const LOCALE_CONFIGS: Record<"hi" | "mr", LocaleConfig> = {
  hi: {
    phrases: HI_PHRASES,
    lowerMap: HI_LOWER,
    termReplacements: HI_TERM_REPLACEMENTS,
    generatorsWord: "जनरेटर",
    stepWord: "चरण",
    shortlistedPrefix: "",
    shortlistedSuffix: "शॉर्टलिस्ट किए गए जनरेटर मॉडल दिखाए जा रहे हैं",
    minReadWord: "मिनट पढ़ें",
    rightsReserved: "सर्वज्ञ जनरेटर्स। सर्वाधिकार सुरक्षित।",
    hoursWord: "घंटे",
    fullTankPrefix: "फ़ुल टैंक पर",
    runtimeWord: "रनटाइम",
    viewingPrefix: "देख रहे हैं:",
    foundWord: "मिले",
    clearWord: "साफ़ करें",
    comparingSuffix: "चयनित यूनिट्स की तुलना",
    compareSlotWord: "तुलना स्लॉट",
    unitWord: "यूनिट",
    bookSuffix: "बुक करें",
    removeSuffix: "हटाएँ",
    insuranceWord: "बीमा",
    lastYearText: "पिछले साल इस समय",
  },
  mr: {
    phrases: MR_PHRASES,
    lowerMap: MR_LOWER,
    termReplacements: MR_TERM_REPLACEMENTS,
    generatorsWord: "जनरेटर",
    stepWord: "पायरी",
    shortlistedPrefix: "",
    shortlistedSuffix: "निवडलेले जनरेटर मॉडेल्स दाखवत आहे",
    minReadWord: "मिनिटे वाचन",
    rightsReserved: "सर्वज्ञ जनरेटर्स. सर्व हक्क राखीव.",
    hoursWord: "तास",
    fullTankPrefix: "फुल टँकवर",
    runtimeWord: "रनटाइम",
    viewingPrefix: "पाहत आहात:",
    foundWord: "सापडले",
    clearWord: "साफ करा",
    comparingSuffix: "निवडलेल्या युनिट्सची तुलना",
    compareSlotWord: "तुलना स्लॉट",
    unitWord: "युनिट",
    bookSuffix: "बुक करा",
    removeSuffix: "काढा",
    insuranceWord: "विमा",
    lastYearText: "गेल्या वर्षी याच वेळी",
  },
};

function translateByLocaleConfig(norm: string, cfg: LocaleConfig): string | null {
  if (!norm || !/[a-zA-Z]/.test(norm)) return null;

  // 1. Exact & case-insensitive match
  if (cfg.phrases[norm]) return cfg.phrases[norm];
  const lowerHit = cfg.lowerMap.get(normalizeForLookup(norm));
  if (lowerHit) return lowerHit;

  // 2. Dynamic pattern templates
  let m: RegExpMatchArray | null;

  if ((m = norm.match(/^(\d+)\s+Generators?$/i))) {
    return `${m[1]} ${cfg.generatorsWord}`;
  }
  if ((m = norm.match(/^Step\s+(\d+)\s*\/\s*(\d+)$/i))) {
    return `${cfg.stepWord} ${m[1]} / ${m[2]}`;
  }
  if ((m = norm.match(/^Showing\s+(\d+)\s+shortlisted\s+generator\s+models$/i))) {
    return `${cfg.shortlistedPrefix}${m[1]} ${cfg.shortlistedSuffix}`;
  }
  if ((m = norm.match(/^(\d+)\s+min\s+read$/i))) {
    return `${m[1]} ${cfg.minReadWord}`;
  }
  if ((m = norm.match(/^©\s*(\d{4})\s+Sarvadnya Generators\.?\s*All rights reserved\.?$/i))) {
    return `© ${m[1]} ${cfg.rightsReserved}`;
  }
  if ((m = norm.match(/^([\d.]+\s*hours?)\s+runtime on full tank$/i))) {
    return `${cfg.fullTankPrefix} ${m[1].replace(/hours?/i, cfg.hoursWord)} ${cfg.runtimeWord}`;
  }
  if ((m = norm.match(/^Viewing:\s*(.+)$/i))) {
    const inner = translateByLocaleConfig(m[1].trim(), cfg) || m[1].trim();
    return `${cfg.viewingPrefix} ${inner}`;
  }
  if ((m = norm.match(/^(\d+)\s+found$/i))) {
    return `${m[1]} ${cfg.foundWord}`;
  }
  if ((m = norm.match(/^Clear\s*\((\d+)$/i))) {
    return `${cfg.clearWord} (${m[1]}`;
  }
  if ((m = norm.match(/^Comparing\s+(\d+)\s+selected\s+units$/i))) {
    return `${m[1]} ${cfg.comparingSuffix}`;
  }
  if ((m = norm.match(/^Compare\s+Slot\s+(\d+)$/i))) {
    return `${cfg.compareSlotWord} ${m[1]}`;
  }
  if ((m = norm.match(/^Unit\s+(\d+)\s*•\s*(.+)$/i))) {
    const sub = translateByLocaleConfig(m[2].trim(), cfg) || m[2].trim();
    return `${cfg.unitWord} ${m[1]} • ${sub}`;
  }
  if ((m = norm.match(/^Book\s+([\d.]+\s*kVA)$/i))) {
    return `${m[1]} ${cfg.bookSuffix}`;
  }
  if ((m = norm.match(/^Remove\s+([\d.]+\s*kVA)$/i))) {
    return `${m[1]} ${cfg.removeSuffix}`;
  }
  if ((m = norm.match(/^([\d–\-.\s]+)\s*hrs$/i))) {
    return `${m[1].trim()} ${cfg.hoursWord}`;
  }
  if (norm.match(/^Insurance\s*\(₹/i)) {
    return `${cfg.insuranceWord} (₹`;
  }
  if (norm.match(/^This time last year$/i)) {
    return cfg.lastYearText;
  }

  // 3. Multi-part pipe titles (e.g. "Page Title | Sarvadnya Generators")
  if (norm.includes(" | ")) {
    const parts = norm
      .split(" | ")
      .map((p) => translateByLocaleConfig(p.trim(), cfg) || p.trim());
    const joined = parts.join(" | ");
    if (joined !== norm) return joined;
  }

  // 4. Composite domain-term fallback so mixed strings translate cleanly
  let candidate = norm;
  let changed = false;
  for (const [pattern, replacement] of cfg.termReplacements) {
    const next = candidate.replace(pattern, replacement);
    if (next !== candidate) {
      candidate = next;
      changed = true;
    }
  }

  return changed ? candidate : null;
}

/**
 * Translates any visible text fragment while preserving exact leading/trailing spaces.
 * Returns null if no translation is needed or available (so original node stays untouched).
 */
export function translateTextForDOM(rawText: string, language: Language): string | null {
  if (language === "en") return null;

  const match = rawText.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match) return null;

  const [, leading, body, trailing] = match;
  const norm = body.replace(/\s+/g, " ").trim();
  if (!norm || !/[a-zA-Z]/.test(norm)) return null;

  // Skip pure emails, URLs, or JSX/code-like paths
  if (
    /^https?:\/\//i.test(norm) ||
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(norm)
  ) {
    return null;
  }

  const cfg = LOCALE_CONFIGS[language];
  const translated = translateByLocaleConfig(norm, cfg);
  return translated ? `${leading}${translated}${trailing}` : null;
}

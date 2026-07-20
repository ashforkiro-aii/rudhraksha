import { createContext, useContext, useState } from "react"

const translations = {
  en: {
    // Navbar
    home: "HOME",
    allRudraksha: "ALL RUDRAKSHA",
    collections: "COLLECTIONS",
    contactUs: "CONTACT US",
    login: "Login",
    search: "Search rudraksha...",
    seeAllResults: (q) => `See all results for "${q}"`,
    switchToAdmin: "Switch to Admin",
    switchToUser: "Switch to User",
    profile: "Profile",
    myOrders: "My Orders",
    wishlist: "Wishlist",
    logout: "Logout",
    langToggle: "తెలుగు",

    // Hero
    heroSubtitle: "ॐ  Sacred · Authentic · Divine  ॐ",
    heroHeading1: "Authentic Rudraksha",
    heroHeading2: "For Spiritual Awakening",
    heroDesc: "Embrace the divine power, energy, and protection with Genuinely Sourced Rudraksha Beads from Nepal & India.",
    shopCollection: "SHOP COLLECTION",
    viewAll: "VIEW ALL",

    // About
    aboutLabel: "About Us",
    aboutTitle: "Dakshinamurthy Astrology Centre",
    aboutSubtitle: "(Vastu)",
    aboutP1: "We have over 15 years of experience in providing authentic Rudraksha beads. Every Rudraksha is carefully examined using multiple methods to ensure its authenticity, quality, and spiritual effectiveness.",
    aboutP2: "We thoroughly test each Rudraksha to verify its quality, assess its energy, and determine whether it exhibits positive spiritual vibrations through modern testing techniques before selecting it for our customers.",
    aboutP3: "There is no doubt that wearing a genuine Rudraksha can bring peace of mind, good health, spiritual growth, prosperity, and relief from astrological doshas (planetary afflictions). It is also believed that those who wear a Rudraksha receive the divine blessings of Lord Shiva.",
    aboutP4: "Wearing a Rudraksha is considered the result of good deeds (punya) accumulated in previous births.",
    aboutP5: "Nowadays, many low-quality and counterfeit Rudraksha beads are available in the market. Therefore, it is essential to verify the authenticity and quality of a Rudraksha before wearing it.",
    aboutP6: "A properly selected and authentic Rudraksha can bring remarkable and beneficial results to the wearer.",
    aboutYears: "15+",
    aboutYearsLabel: "Years of Experience",
    aboutAuthentic: "100%",
    aboutAuthenticLabel: "Authentic Products",
    aboutCustomers: "10K+",
    aboutCustomersLabel: "Happy Customers",

    // Sections
    ourCollections: "Our Divine Collections",
    whyChoose: "Why Choose Rudraksha Divine?",
    bestsellers: "Bestsellers",
    bestsellersSub: "Devotee Favourites",
    newArrivals: "New Arrivals",
    newArrivalsSub: "Just In",
    viewAllLink: "View All",

    // Features
    feat1Title: "100% AUTHENTIC",
    feat1Sub: "(Certified Lab)",
    feat2Title: "GENUINE SOURCING",
    feat3Title: "EXPERT COUNSELING",
    feat4Title: "FREE SHIPPING",

    // Product card
    addToCart: "Add to Cart",
    goToCart: "Go to Cart",
    outOfStock: "Out of Stock",
    certified: "Certified",
    nepal: "Nepal",
    rare: "Rare",
    explore: "EXPLORE",
    inStock: "In Stock",

    // Footer
    footerTagline: "Authentic certified Rudraksha beads sourced directly from Nepal & India. Divine energy, genuine quality.",
    footerCollections: "Collections",
    footerQuickLinks: "Quick Links",
    footerHelp: "Help",
    footerShop: "Shop",
    footerAccount: "My Account",
    footerCart: "Cart",
    footerContact: "Contact Us",
    footerShipping: "Shipping Policy",
    footerRefund: "Refund Policy",
    footerPrivacy: "Privacy Policy",
    footerCopy: "© 2026 Rudhraksha Divine. All rights reserved. | Crafted with 🙏 in India",

    // Checkout
    checkout: "Checkout",
    buyNow: "Buy Now",
    deliveryAddress: "Delivery Address",
    addNew: "Add New",
    continuePayment: "Continue to Payment →",
    payViaUPI: "Pay via UPI",
    scanQR: "Scan QR or use UPI ID below",
    amountToPay: "Amount to Pay",
    scanWithUPI: "Scan with any UPI app",
    orPayUPI: "Or pay using UPI ID",
    openUPIApp: "Open UPI App (amount auto-filled)",
    howToPay: "How to pay:",
    uploadScreenshot: "Upload Payment Screenshot",
    upiRef: "UPI Transaction Reference (optional)",
    clickUpload: "Click to upload payment screenshot",
    pngJpg: "PNG, JPG · max 10MB",
    placingOrder: "Placing Order...",
    confirmOrder: "I've Paid · Confirm Order",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    enterPromo: "Enter promo code",
    apply: "Apply",
    availableOffers: "Available Offers",
    upiSecure: "🔒 UPI Payment — Secure & Safe",
    orderPlaced: "Order Placed!",
    orderPending: "Your order is pending payment verification.",
    orderNotify: "We will confirm your order once payment is verified. You will be notified.",
    viewOrders: "View Orders",
    continueShopping: "Continue Shopping",
  },

  te: {
    // Navbar
    home: "హోమ్",
    allRudraksha: "అన్ని రుద్రాక్షలు",
    collections: "సేకరణలు",
    contactUs: "సంప్రదించండి",
    login: "లాగిన్",
    search: "రుద్రాక్ష వెతకండి...",
    seeAllResults: (q) => `"${q}" కోసం అన్ని ఫలితాలు`,
    switchToAdmin: "అడ్మిన్‌కు మారండి",
    switchToUser: "యూజర్‌కు మారండి",
    profile: "ప్రొఫైల్",
    myOrders: "నా ఆర్డర్లు",
    wishlist: "విష్‌లిస్ట్",
    logout: "లాగ్అవుట్",
    langToggle: "English",

    // Hero
    heroSubtitle: "ॐ  పవిత్రం · అసలైనది · దివ్యమైనది  ॐ",
    heroHeading1: "అసలైన రుద్రాక్ష",
    heroHeading2: "ఆధ్యాత్మిక జాగృతి కోసం",
    heroDesc: "నేపాల్ & భారత్ నుండి నేరుగా సేకరించిన రుద్రాక్ష పూసలతో దైవిక శక్తి, శక్తి మరియు రక్షణను పొందండి.",
    shopCollection: "సేకరణ చూడండి",
    viewAll: "అన్నీ చూడండి",

    // About
    aboutLabel: "మా గురించి",
    aboutTitle: "దక్షిణామూర్తి జ్యోతిష్య కేంద్రం",
    aboutSubtitle: "(వాస్తు)",
    aboutP1: "మేము 15 సంవత్సరాలకు పైగా అసలైన రుద్రాక్ష పూసలను అందించడంలో అనుభవం కలిగి ఉన్నాము. ప్రతి రుద్రాక్షను దాని ప్రామాణికత, నాణ్యత మరియు ఆధ్యాత్మిక ప్రభావాన్ని నిర్ధారించేందుకు బహుళ పద్ధతులతో జాగ్రత్తగా పరీక్షిస్తాము.",
    aboutP2: "మా కస్టమర్లకు ఎంపిక చేయడానికి ముందు ఆధునిక పరీక్షా పద్ధతుల ద్వారా ప్రతి రుద్రాక్ష యొక్క నాణ్యతను ధృవీకరించడానికి, దాని శక్తిని అంచనా వేయడానికి మరియు అది సానుకూల ఆధ్యాత్మిక స్పందనలను ప్రదర్శిస్తుందో లేదో నిర్ధారించడానికి పూర్తిగా పరీక్షిస్తాము.",
    aboutP3: "నిజమైన రుద్రాక్ష ధరించడం మనో శాంతి, ఆరోగ్యం, ఆధ్యాత్మిక వికాసం, సంపద మరియు జ్యోతిష్య దోషాల నుండి ఉపశమనం తీసుకురాగలదనడంలో సందేహం లేదు. రుద్రాక్ష ధరించిన వారికి శివుని దివ్య ఆశీస్సులు లభిస్తాయని కూడా నమ్ముతారు.",
    aboutP4: "రుద్రాక్ష ధరించడం పూర్వ జన్మలలో చేసిన పుణ్య కర్మల ఫలితంగా భావిస్తారు.",
    aboutP5: "నేటి కాలంలో మార్కెట్లో అనేక నకిలీ మరియు తక్కువ నాణ్యత కలిగిన రుద్రాక్ష పూసలు అందుబాటులో ఉన్నాయి. అందువల్ల, రుద్రాక్ష ధరించే ముందు దాని ప్రామాణికత మరియు నాణ్యతను ధృవీకరించడం చాలా అవసరం.",
    aboutP6: "సరిగ్గా ఎంపిక చేయబడిన మరియు అసలైన రుద్రాక్ష ధరించే వ్యక్తికి అద్భుతమైన మరియు లాభదాయకమైన ఫలితాలను అందించగలదు.",
    aboutYears: "15+",
    aboutYearsLabel: "సంవత్సరాల అనుభవం",
    aboutAuthentic: "100%",
    aboutAuthenticLabel: "అసలైన ఉత్పత్తులు",
    aboutCustomers: "10వే+",
    aboutCustomersLabel: "సంతుష్ట కస్టమర్లు",

    // Sections
    ourCollections: "మా దివ్య సేకరణలు",
    whyChoose: "రుద్రాక్ష డివైన్ ఎందుకు ఎంచుకోవాలి?",
    bestsellers: "అత్యధికంగా అమ్ముడైనవి",
    bestsellersSub: "భక్తుల ఇష్టాలు",
    newArrivals: "కొత్త రాకలు",
    newArrivalsSub: "ఇప్పుడే వచ్చాయి",
    viewAllLink: "అన్నీ చూడండి",

    // Features
    feat1Title: "100% అసలైనది",
    feat1Sub: "(సర్టిఫైడ్ ల్యాబ్)",
    feat2Title: "నిజమైన సేకరణ",
    feat3Title: "నిపుణుల సలహా",
    feat4Title: "ఉచిత షిప్పింగ్",

    // Product card
    addToCart: "కార్ట్‌కు జోడించండి",
    goToCart: "కార్ట్‌కు వెళ్ళండి",
    outOfStock: "స్టాక్ లేదు",
    certified: "సర్టిఫైడ్",
    nepal: "నేపాల్",
    rare: "అరుదైనది",
    explore: "చూడండి",
    inStock: "స్టాక్‌లో ఉంది",

    // Footer
    footerTagline: "నేపాల్ & భారత్ నుండి నేరుగా సేకరించిన అసలైన రుద్రాక్ష పూసలు. దైవిక శక్తి, నిజమైన నాణ్యత.",
    footerCollections: "సేకరణలు",
    footerQuickLinks: "త్వరిత లింకులు",
    footerHelp: "సహాయం",
    footerShop: "షాప్",
    footerAccount: "నా ఖాతా",
    footerCart: "కార్ట్",
    footerContact: "సంప్రదించండి",
    footerShipping: "షిప్పింగ్ పాలసీ",
    footerRefund: "రిఫండ్ పాలసీ",
    footerPrivacy: "గోప్యతా పాలసీ",
    footerCopy: "© 2026 రుద్రాక్ష డివైన్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి. | భారత్‌లో 🙏 తో తయారుచేయబడింది",

    // Checkout
    checkout: "చెక్అవుట్",
    buyNow: "ఇప్పుడే కొనండి",
    deliveryAddress: "డెలివరీ చిరునామా",
    addNew: "కొత్తది జోడించండి",
    continuePayment: "చెల్లింపుకు కొనసాగండి →",
    payViaUPI: "UPI ద్వారా చెల్లించండి",
    scanQR: "QR స్కాన్ చేయండి లేదా UPI ID వాడండి",
    amountToPay: "చెల్లించవలసిన మొత్తం",
    scanWithUPI: "ఏదైనా UPI యాప్‌తో స్కాన్ చేయండి",
    orPayUPI: "లేదా UPI ID తో చెల్లించండి",
    openUPIApp: "UPI యాప్ తెరవండి (మొత్తం స్వయంచాలకంగా నింపబడుతుంది)",
    howToPay: "ఎలా చెల్లించాలి:",
    uploadScreenshot: "చెల్లింపు స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి",
    upiRef: "UPI లావాదేవీ రిఫరెన్స్ (ఐచ్ఛికం)",
    clickUpload: "చెల్లింపు స్క్రీన్‌షాట్ అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
    pngJpg: "PNG, JPG · గరిష్టం 10MB",
    placingOrder: "ఆర్డర్ చేస్తున్నాము...",
    confirmOrder: "చెల్లించాను · ఆర్డర్ నిర్ధారించండి",
    orderSummary: "ఆర్డర్ సారాంశం",
    subtotal: "ఉప మొత్తం",
    shipping: "షిప్పింగ్",
    total: "మొత్తం",
    enterPromo: "ప్రోమో కోడ్ నమోదు చేయండి",
    apply: "వర్తించు",
    availableOffers: "అందుబాటులో ఉన్న ఆఫర్లు",
    upiSecure: "🔒 UPI చెల్లింపు — సురక్షితమైనది",
    orderPlaced: "ఆర్డర్ చేయబడింది!",
    orderPending: "మీ ఆర్డర్ చెల్లింపు ధృవీకరణ కోసం వేచి ఉంది.",
    orderNotify: "చెల్లింపు ధృవీకరించిన తర్వాత మేము మీ ఆర్డర్‌ను నిర్ధారిస్తాము. మీకు తెలియజేయబడుతుంది.",
    viewOrders: "ఆర్డర్లు చూడండి",
    continueShopping: "షాపింగ్ కొనసాగించండి",
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en")
  const t = translations[lang]
  const toggleLang = () => setLang(l => l === "en" ? "te" : "en")
  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

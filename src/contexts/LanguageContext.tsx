import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.education": "Education Center",
    "nav.assessment": "Sarcopenia Assessment",
    "nav.reportIssue": "Report Issue",
    "nav.getStarted": "Get Started",
    
    // Hero Section
    "hero.badge": "Trusted by 50,000+ patients",
    "hero.title1": "Empowering Your",
    "hero.title2": "Bone",
    "hero.title3": "Health",
    "hero.title4": "Journey",
    "hero.subtitle": "Get personalized guidance, expert resources, and 24/7 AI support to understand and improve your bone health. Start your journey today.",
    "hero.satisfaction": "Satisfaction Rate",
    "hero.videos": "Expert Videos",
    "hero.support": "AI Support",
    "hero.startAssessment": "Start Assessment",
    "hero.watchTutorials": "Watch Tutorials",
    
    // Education Page
    "education.title": "Education Center",
    "education.subtitle": "Explore our library of expert-curated videos on bone health, nutrition, exercise, and rehabilitation.",
    "education.search": "Search videos...",
    "education.noResults": "No videos found matching your search.",
    "education.clearFilters": "Clear Filters",
    "education.views": "views",
    "education.closeVideo": "Close Video",
    
    // Categories
    "category.all": "All",
    "category.nutrition": "Nutrition",
    "category.exercise": "Exercise",
    "category.rehabilitation": "Rehabilitation",
    "category.fallPrevention": "Fall Prevention",
    "category.understandingBMD": "Understanding BMD",
    
    // FAQ Section
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions about bone health, osteoporosis, and managing your condition.",
    "faq.testing": "Testing",
    "faq.treatment": "Treatment",
    
    // FAQ Questions
    "faq.q1": "What is a T-score and what does it mean?",
    "faq.a1": "A T-score compares your bone density to that of a healthy 30-year-old adult. A T-score of -1.0 or above is normal, between -1.0 and -2.5 indicates osteopenia (low bone mass), and -2.5 or below indicates osteoporosis.",
    "faq.q2": "How often should I get a bone density test?",
    "faq.a2": "The frequency depends on your risk factors and previous test results. Generally, women over 65 and men over 70 should get tested every 1-2 years. Those with osteoporosis or high risk factors may need more frequent testing.",
    "faq.q3": "What foods are best for bone health?",
    "faq.a3": "Calcium-rich foods like dairy products, leafy greens, and fortified foods are essential. Vitamin D sources include fatty fish and fortified foods. Also important are protein, vitamin K (found in green vegetables), and minerals like magnesium and zinc.",
    "faq.q4": "What exercises help prevent osteoporosis?",
    "faq.a4": "Weight-bearing exercises like walking, jogging, and dancing, along with resistance training, are most beneficial. Balance exercises like tai chi can help prevent falls. Aim for at least 30 minutes of exercise most days of the week.",
    "faq.q5": "Are there medications for osteoporosis?",
    "faq.a5": "Yes, several medications are available including bisphosphonates, denosumab, and hormone-related therapies. Your doctor will recommend the best option based on your bone density, fracture risk, and overall health.",
    "faq.q6": "How can I prevent falls at home?",
    "faq.a6": "Remove tripping hazards, install grab bars in bathrooms, ensure good lighting, wear non-slip footwear, and keep frequently used items within easy reach. Regular balance exercises also help prevent falls.",
    
    // Footer
    "footer.description": "Empowering your bone health journey with expert guidance, educational resources, and personalized assessments. Your trusted partner in osteoporosis care.",
    "footer.quickLinks": "Quick Links",
    "footer.findSpecialist": "Find a Specialist",
    "footer.faqs": "FAQs",
    "footer.contact": "Contact",
    "footer.reportIssue": "Report Issue",
    "footer.rights": "All rights reserved.",
    
    // Specialists Section
    "specialists.title": "Meet Our Specialists",
    "specialists.subtitle": "Connect with experienced healthcare professionals specializing in bone health and osteoporosis management.",
  },
  hi: {
    // Navbar
    "nav.home": "होम",
    "nav.education": "शिक्षा केंद्र",
    "nav.assessment": "सार्कोपेनिया मूल्यांकन",
    "nav.reportIssue": "समस्या बताएं",
    "nav.getStarted": "शुरू करें",
    
    // Hero Section
    "hero.badge": "50,000+ रोगियों द्वारा विश्वसनीय",
    "hero.title1": "आपकी",
    "hero.title2": "हड्डियों की",
    "hero.title3": "स्वास्थ्य",
    "hero.title4": "यात्रा को सशक्त बनाना",
    "hero.subtitle": "अपनी हड्डियों के स्वास्थ्य को समझने और सुधारने के लिए व्यक्तिगत मार्गदर्शन, विशेषज्ञ संसाधन और 24/7 AI सहायता प्राप्त करें।",
    "hero.satisfaction": "संतुष्टि दर",
    "hero.videos": "विशेषज्ञ वीडियो",
    "hero.support": "AI सहायता",
    "hero.startAssessment": "मूल्यांकन शुरू करें",
    "hero.watchTutorials": "ट्यूटोरियल देखें",
    
    // Education Page
    "education.title": "शिक्षा केंद्र",
    "education.subtitle": "हड्डियों के स्वास्थ्य, पोषण, व्यायाम और पुनर्वास पर विशेषज्ञ वीडियो की हमारी लाइब्रेरी देखें।",
    "education.search": "वीडियो खोजें...",
    "education.noResults": "आपकी खोज से मेल खाने वाला कोई वीडियो नहीं मिला।",
    "education.clearFilters": "फ़िल्टर साफ़ करें",
    "education.views": "व्यूज",
    "education.closeVideo": "वीडियो बंद करें",
    
    // Categories
    "category.all": "सभी",
    "category.nutrition": "पोषण",
    "category.exercise": "व्यायाम",
    "category.rehabilitation": "पुनर्वास",
    "category.fallPrevention": "गिरने से रोकथाम",
    "category.understandingBMD": "BMD को समझना",
    
    // FAQ Section
    "faq.title": "अक्सर पूछे जाने वाले प्रश्न",
    "faq.subtitle": "हड्डियों के स्वास्थ्य, ऑस्टियोपोरोसिस और अपनी स्थिति के प्रबंधन के बारे में सामान्य प्रश्नों के उत्तर पाएं।",
    "faq.testing": "परीक्षण",
    "faq.treatment": "उपचार",
    
    // FAQ Questions
    "faq.q1": "T-स्कोर क्या है और इसका क्या मतलब है?",
    "faq.a1": "T-स्कोर आपकी हड्डी की घनत्व की तुलना एक स्वस्थ 30 वर्षीय वयस्क से करता है। -1.0 या उससे ऊपर का T-स्कोर सामान्य है, -1.0 और -2.5 के बीच ऑस्टियोपेनिया (कम हड्डी द्रव्यमान) को इंगित करता है, और -2.5 या उससे नीचे ऑस्टियोपोरोसिस को इंगित करता है।",
    "faq.q2": "मुझे कितनी बार बोन डेंसिटी टेस्ट करवाना चाहिए?",
    "faq.a2": "आवृत्ति आपके जोखिम कारकों और पिछले परीक्षण परिणामों पर निर्भर करती है। आमतौर पर, 65 से अधिक उम्र की महिलाओं और 70 से अधिक उम्र के पुरुषों को हर 1-2 साल में परीक्षण करवाना चाहिए।",
    "faq.q3": "हड्डियों के स्वास्थ्य के लिए कौन से खाद्य पदार्थ सबसे अच्छे हैं?",
    "faq.a3": "डेयरी उत्पाद, पत्तेदार सब्जियां और फोर्टिफाइड खाद्य पदार्थों जैसे कैल्शियम युक्त खाद्य पदार्थ आवश्यक हैं। विटामिन डी के स्रोतों में फैटी मछली और फोर्टिफाइड खाद्य पदार्थ शामिल हैं।",
    "faq.q4": "कौन से व्यायाम ऑस्टियोपोरोसिस को रोकने में मदद करते हैं?",
    "faq.a4": "चलना, जॉगिंग और नृत्य जैसे वजन उठाने वाले व्यायाम, प्रतिरोध प्रशिक्षण के साथ, सबसे फायदेमंद हैं। ताई ची जैसे संतुलन व्यायाम गिरने से रोकने में मदद कर सकते हैं।",
    "faq.q5": "क्या ऑस्टियोपोरोसिस के लिए दवाएं हैं?",
    "faq.a5": "हां, बिसफॉस्फोनेट्स, डेनोसुमैब और हार्मोन-संबंधित थेरेपी सहित कई दवाएं उपलब्ध हैं। आपका डॉक्टर आपकी हड्डी की घनत्व, फ्रैक्चर जोखिम और समग्र स्वास्थ्य के आधार पर सबसे अच्छा विकल्प सुझाएंगे।",
    "faq.q6": "घर पर गिरने से कैसे बचें?",
    "faq.a6": "ट्रिपिंग खतरों को हटाएं, बाथरूम में ग्रैब बार लगाएं, अच्छी रोशनी सुनिश्चित करें, नॉन-स्लिप फुटवियर पहनें और अक्सर उपयोग की जाने वाली वस्तुओं को आसान पहुंच के भीतर रखें।",
    
    // Footer
    "footer.description": "विशेषज्ञ मार्गदर्शन, शैक्षिक संसाधनों और व्यक्तिगत मूल्यांकन के साथ आपकी हड्डियों की स्वास्थ्य यात्रा को सशक्त बनाना।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.findSpecialist": "विशेषज्ञ खोजें",
    "footer.faqs": "सामान्य प्रश्न",
    "footer.contact": "संपर्क",
    "footer.reportIssue": "समस्या बताएं",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    
    // Specialists Section
    "specialists.title": "हमारे विशेषज्ञों से मिलें",
    "specialists.subtitle": "हड्डियों के स्वास्थ्य और ऑस्टियोपोरोसिस प्रबंधन में विशेषज्ञता रखने वाले अनुभवी स्वास्थ्य पेशेवरों से जुड़ें।",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

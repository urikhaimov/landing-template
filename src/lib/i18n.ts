export type Locale = "he" | "en";
export interface FAQItem {
  q: string;
  a: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ReviewItem {
  name: string;
  comment: string;
}

export interface LanguagePack {
  heroTitle: string;
  heroSubtitle: string;
  callToAction: string;
  toggleLang: string;
  toggleTheme: string;
  servicesTitle: string;
  services: ServiceItem[];
  reviewsTitle: string;
  reviews: ReviewItem[];
  faqTitle: string;
  faq: FAQItem[];
  contactTitle: string;
  contactPlaceholder: string;
  contactSend: string;
  footerText: string;
}

export const ui = {
  he: {
    heroTitle: "ברוכים הבאים",
    heroSubtitle: "תבנית נחיתה מקצועית",
    callToAction: "צור קשר",
    toggleLang: "English",
    toggleTheme: "מצב לילה",
    servicesTitle: "השירותים שלנו",
    services: [
      { title: "בניית אתרים", description: "אתרים מודרניים מותאמים לעסק" },
      { title: "שיווק דיגיטלי", description: "קידום ברשתות חברתיות" },
      { title: "פיתוח אפליקציות", description: "אפליקציות חכמות iOS/Android" },
    ],
    reviewsTitle: "לקוחות מספרים",
    reviews: [
      { name: "דוד", comment: "שירות מדהים!" },
      { name: "רוני", comment: "מהיר, מקצועי ואמין." },
    ],
    faqTitle: "שאלות נפוצות",
    faq: [
      { q: "כמה זמן לוקח לבנות אתר?", a: "תלוי בפרויקט — לרוב 1–3 שבועות." },
      { q: "האם יש תמיכה?", a: "כן! ליווי מלא גם אחרי." },
    ],
    contactTitle: "שלחו הודעה",
    contactPlaceholder: "הודעה...",
    contactSend: "שלח",
    footerText: "© כל הזכויות שמורות",
  },
  en: {
    heroTitle: "Welcome",
    heroSubtitle: "Premium landing page template",
    callToAction: "Contact Us",
    toggleLang: "עברית",
    toggleTheme: "Dark Mode",
    servicesTitle: "Our Services",
    services: [
      { title: "Web Design", description: "Modern websites for your business" },
      { title: "Digital Marketing", description: "Grow your online presence" },
      { title: "App Development", description: "Smart apps for iOS/Android" },
    ],
    reviewsTitle: "Testimonials",
    reviews: [
      { name: "David", comment: "Amazing work!" },
      { name: "Ron", comment: "Fast and professional." },
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      { q: "How long does a website take?", a: "Usually 1–3 weeks." },
      { q: "Do you provide support?", a: "Yes, full ongoing support." },
    ],
    contactTitle: "Send a message",
    contactPlaceholder: "Message...",
    contactSend: "Send",
    footerText: "© All rights reserved",
  },
};

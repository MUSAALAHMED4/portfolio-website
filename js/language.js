/**
 * Dil Yöneticisi
 * Türkçe ve İngilizce arasında geçiş yapma ve kalıcılığı yönetir
 */

// Tüm çeviriler
const translations = {
  tr: {
    // Navigasyon
    home: "Ana Sayfa",
    about: "Hakkımda",
    education: "Eğitim",
    experience: "Deneyim",
    portfolio: "Portföy",
    contact: "İletişim",

    // Ana Sayfa
    hello: "Merhaba...",
    iAm: "Ben",
    showPortfolio: "Portföyü Göster",

    // Hakkımda Sayfası
    aboutMeTitle: "Benim hakkımda biraz...",
    aboutPara1:
      "Ben bir Yazılım Mühendisi olarak Frontend Developer alanında çalışıyorum. Modern ve etkileşimli kullanıcı arayüzleri tasarlamak ve geliştirmek için en son teknolojileri kullanıyorum. Yazılım mühendisliği alanındaki akademik geçmişim, grafik tasarım ve fotoğrafçılık eğitimiyle birleşerek teknik ve sanatsal yeteneklerimi güçlendiriyor ve projelerimde estetik ile teknolojiyi bir araya getirmemi sağlıyor.",
    aboutPara2:
      "Mobil cihaz bakımı konusunda geniş bir deneyime sahibim; hem yazılım hem de donanım alanında derinlemesine bilgiye sahibim. Bu, teknik sorunlara etkili çözümler üretme yeteneğimi geliştirdi. Ayrıca, çeşitli yazılım geliştirme kursları aracılığıyla ileri düzeyde programlama becerileri kazandım ve yenilikçi ve verimli çözümler sunabiliyorum.",
    aboutPara3:
      "İki yıldan fazla bir süre boyunca bir insani yardım kuruluşunun medya ofisinde gönüllü olarak çalıştım ve hala etkinlikleri ve organizasyonları düzenlemeye katkıda bulunuyorum. Bu deneyim, takım çalışması ve sosyal sorumluluk konusundaki bağlılığımı daha da güçlendirdi.",
    aboutPara4:
      "Yazılım mühendisliği ve bilgi teknolojileri alanındaki uzmanlığım, kullanıcı deneyimlerini iyileştiren ve yenilikçi teknolojik çözümler sunan projelere katkıda bulunmak için kullanmayı hedefliyorum.",

    // Eğitim Sayfası
    educationTitle: "Eğitim Geçmişi",

    // Deneyim Sayfası
    experienceTitle: "Deneyim",

    // Portföy Sayfası
    portfolioTitle: "Portföy",
    viewOnGithub: "GitHub'da Gör",

    // İletişim Sayfası
    contactTitle: "İletişim",
    nameLabel: "Ad",
    namePlaceholder: "Adınız",
    emailLabel: "E-posta",
    emailPlaceholder: "ornek@mail.com",
    subjectLabel: "Konu",
    subjectPlaceholder: "Mesaj konusu",
    messageLabel: "Mesaj",
    messagePlaceholder: "Mesajınızı yazın",
    send: "Gönder",

    // Footer
    footerDesc:
      "Hayallerimi kodlarla ve tasarımla gerçeğe dönüştüren bir yazılım mühendisi.",
    links: "Bağlantılar",
    contactFooter: "İletişim",
  },

  en: {
    // Navigation
    home: "Home",
    about: "About",
    education: "Education",
    experience: "Experience",
    portfolio: "Portfolio",
    contact: "Contact",

    // Home Page
    hello: "Hello...",
    iAm: "I'm",
    showPortfolio: "Show Portfolio",

    // About Page
    aboutMeTitle: "A bit about me...",
    aboutPara1:
      "I am a Software Engineer working in the field of Frontend Development. I use the latest technologies to design and develop modern and interactive user interfaces. My academic background in software engineering, combined with my training in graphic design and photography, strengthens my technical and artistic skills, allowing me to bring together aesthetics and technology in my projects.",
    aboutPara2:
      "I have extensive experience in mobile device maintenance; I have in-depth knowledge in both software and hardware. This has developed my ability to produce effective solutions to technical problems. Additionally, I have gained advanced programming skills through various software development courses and can offer innovative and efficient solutions.",
    aboutPara3:
      "For more than two years, I volunteered in the media office of a humanitarian aid organization and still contribute to organizing events and activities. This experience has further strengthened my commitment to teamwork and social responsibility.",
    aboutPara4:
      "I aim to use my expertise in software engineering and information technology to contribute to projects that improve user experiences and offer innovative technological solutions.",

    // Education Page
    educationTitle: "Education History",

    // Experience Page
    experienceTitle: "Experience",

    // Portfolio Page
    portfolioTitle: "Portfolio",
    viewOnGithub: "View on GitHub",

    // Contact Page
    contactTitle: "Contact",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "example@mail.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "Message subject",
    messageLabel: "Message",
    messagePlaceholder: "Write your message",
    send: "Send",

    // Footer
    footerDesc:
      "A software engineer who turns dreams into reality through code and design.",
    links: "Links",
    contactFooter: "Contact",
  },
};

class LanguageManager {
  constructor() {
    this.currentLang = this.getSavedLanguage() || "tr";
    this.applyLanguage(this.currentLang);
  }

  /**
   * localStorage'dan kaydedilmiş dili al
   * @returns {string} Kaydedilmiş dil veya null
   */
  getSavedLanguage() {
    return localStorage.getItem("site-language");
  }

  /**
   * Dili localStorage'a kaydet
   * @param {string} lang - Kaydedilecek dil ('tr' veya 'en')
   */
  saveLanguage(lang) {
    localStorage.setItem("site-language", lang);
  }

  /**
   * Dili sayfaya uygula
   * @param {string} lang - Uygulanacak dil ('tr' veya 'en')
   */
  applyLanguage(lang) {
    this.currentLang = lang;
    this.saveLanguage(lang);
    document.documentElement.setAttribute("lang", lang);
    this.translatePage();
  }

  /**
   * Sayfadaki tüm çevrilebilir elementleri çevir
   */
  translatePage() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = translations[this.currentLang][key];

      if (translation) {
        // Eğer element bir input ise placeholder'ı güncelle
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Buton ikonunu güncelle
    this.updateLanguageButton();
  }

  /**
   * Diller arasında geçiş yap
   * @returns {string} Yeni dil
   */
  toggleLanguage() {
    const newLang = this.currentLang === "tr" ? "en" : "tr";
    this.applyLanguage(newLang);
    return newLang;
  }

  /**
   * Mevcut dili al
   * @returns {string} Mevcut dil
   */
  getLanguage() {
    return this.currentLang;
  }

  /**
   * Dil butonunu güncelle
   */
  updateLanguageButton() {
    const langButton = document.getElementById("languageToggle");
    if (langButton) {
      const flagIcon = langButton.querySelector(".lang-flag");
      if (flagIcon) {
        flagIcon.textContent = this.currentLang === "tr" ? "🇹🇷" : "🇬🇧";
      }
      langButton.setAttribute(
        "title",
        this.currentLang === "tr" ? "Switch to English" : "Türkçe'ye Geç",
      );
    }
  }
}

// Sayfa yüklendiğinde dil yöneticisini başlat
let languageManager;

document.addEventListener("DOMContentLoaded", () => {
  // Dil yöneticisi örneği oluştur
  languageManager = new LanguageManager();

  // Dil değiştirme butonunu oluştur
  createLanguageToggleButton();
});

/**
 * Dil değiştirme butonunu oluştur
 */
function createLanguageToggleButton() {
  // Butonun önceden var olup olmadığını kontrol et
  if (document.getElementById("languageToggle")) return;

  // Butonu oluştur
  const button = document.createElement("button");
  button.id = "languageToggle";
  button.className = "language-toggle";
  button.setAttribute("aria-label", "Dil Değiştir / Change Language");
  button.setAttribute(
    "title",
    languageManager.getLanguage() === "tr"
      ? "Switch to English"
      : "Türkçe'ye Geç",
  );

  // Bayrak ikonu ekle
  const flag = document.createElement("span");
  flag.className = "lang-flag";
  flag.textContent = languageManager.getLanguage() === "tr" ? "🇹🇷" : "🇬🇧";

  button.appendChild(flag);

  // Butonu header'a ekle
  const header = document.querySelector(".site-header .container.nav");
  if (header) {
    header.appendChild(button);
  }

  // Tıklama olayını ekle
  button.addEventListener("click", () => {
    languageManager.toggleLanguage();

    // Tıklamada animasyon
    button.style.transform = "scale(0.9)";
    setTimeout(() => {
      button.style.transform = "";
    }, 200);
  });
}

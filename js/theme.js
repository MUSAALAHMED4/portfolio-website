/**
 * Tema Yöneticisi
 * Tüm site sayfaları için gündüz/gece modu yönetimi
 * Koyu/açık tema değişimini ve kalıcılığını yönetir
 */

class ThemeManager {
  constructor() {
    this.currentTheme = this.getSavedTheme() || "dark";
    this.applyTheme(this.currentTheme);
  }

  /**
   * localStorage'dan kaydedilmiş temayı al
   * @returns {string} Kaydedilmiş tema veya null
   */
  getSavedTheme() {
    return localStorage.getItem("site-theme");
  }

  /**
   * Temayı localStorage'a kaydet
   * @param {string} theme - Kaydedilecek tema ('light' veya 'dark')
   */
  saveTheme(theme) {
    localStorage.setItem("site-theme", theme);
  }

  /**
   * Temayı sayfaya uygula
   * @param {string} theme - Uygulanacak tema ('light' veya 'dark')
   */
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
    this.saveTheme(theme);
  }

  /**
   * Açık ve koyu tema arasında geçiş yap
   * @returns {string} Yeni tema
   */
  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
    return newTheme;
  }

  /**
   * Mevcut temayı al
   * @returns {string} Mevcut tema
   */
  getTheme() {
    return this.currentTheme;
  }
}

// Sayfa yüklendiğinde tema yöneticisini başlat
let themeManager;

document.addEventListener("DOMContentLoaded", () => {
  // Tema yöneticisi örneği oluştur
  themeManager = new ThemeManager();

  // Tema değiştirme butonunu oluştur
  createThemeToggleButton();
});

/**
 * Tema değiştirme butonunu oluştur
 */
function createThemeToggleButton() {
  // Butonun önceden var olup olmadığını kontrol et
  if (document.getElementById("themeToggle")) return;

  // Butonu oluştur
  const button = document.createElement("button");
  button.id = "themeToggle";
  button.className = "theme-toggle";
  button.setAttribute("aria-label", "تبديل الوضع النهاري/الليلي");
  button.setAttribute("title", "تبديل الوضع النهاري/الليلي");

  // İkonu ekle
  const icon = document.createElement("span");
  icon.className = "theme-toggle-icon";
  icon.textContent = themeManager.getTheme() === "light" ? "🌙" : "☀️";

  button.appendChild(icon);

  // Butonu sayfaya ekle
  document.body.appendChild(button);

  // Tıklama olayını ekle
  button.addEventListener("click", () => {
    themeManager.toggleTheme();
    updateThemeIcon();

    // Tıklamada dönme animasyonu
    button.style.transform = "scale(0.9) rotate(360deg)";
    setTimeout(() => {
      button.style.transform = "";
    }, 300);
  });
}

/**
 * Mevcut temaya göre buton ikonunu güncelle
 */
function updateThemeIcon() {
  const iconElement = document.querySelector(".theme-toggle-icon");
  if (iconElement) {
    iconElement.textContent = themeManager.getTheme() === "light" ? "🌙" : "☀️";
  }
}

/**
 * InteractiveCard Bileşeni
 * Hover ve tıklama etkileşimleri olan yeniden kullanılabilir, animasyonlu kart bileşeni
 *
 * Özellikler:
 * - Hover efektleri: gölge yükseltme ve hafif ölçeklendirme
 * - Tıklama efektleri: ölçeklendirme dönüşümü ile animasyonlu çevirme
 * - Yapılandırma nesnesi ile özelleştirilebilir
 * - Saf JavaScript (ES6+), harici bağımlılık yok
 * - Koyu/Açık tema desteği
 */

/**
 * ThemeManager Sınıfı
 * Koyu/açık tema değişimini ve kalıcılığını yönetir
 */
class ThemeManager {
  constructor() {
    this.currentTheme = this.getSavedTheme() || "light";
    this.applyTheme(this.currentTheme);
  }

  /**
   * localStorage'dan kaydedilmiş temayı al
   * @returns {string} Kaydedilmiş tema veya null
   */
  getSavedTheme() {
    return localStorage.getItem("theme");
  }

  /**
   * Temayı localStorage'a kaydet
   * @param {string} theme - Kaydedilecek tema ('light' veya 'dark')
   */
  saveTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  /**
   * Temayı belgeye uygula
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

class InteractiveCard {
  /**
   * InteractiveCard için yapıcı metod
   * @param {Object} config - Kart için yapılandırma nesnesi
   * @param {string} config.containerId - Kapsayıcı öğenin ID'si
   * @param {string} config.title - Kart başlık metni
   * @param {string} config.description - Kart açıklama metni
   * @param {string} config.icon - Görüntülenecek ikon/emoji
   * @param {string} config.primaryColor - Birincil renk (CSS renk değeri)
   * @param {string} config.secondaryColor - İkincil renk (CSS renk değeri)
   */
  constructor(config) {
    // Yapılandırmayı sakla
    this.config = {
      containerId: config.containerId || "card-container",
      title: config.title || "Interactive Card",
      description: config.description || "Click me to see animation!",
      icon: config.icon || "✨",
      primaryColor: config.primaryColor || "#6366f1",
      secondaryColor: config.secondaryColor || "#8b5cf6",
    };

    // Bileşen durumu
    this.isFlipped = false;
    this.cardElement = null;

    // Bileşeni başlat
    this.init();
  }

  /**
   * Bileşeni başlat
   * Kart öğesini oluşturur ve olay dinleyicilerini ekler
   */
  init() {
    this.createCard();
    this.attachEventListeners();
  }

  /**
   * Kart DOM yapısını oluştur
   */
  createCard() {
    const container = document.getElementById(this.config.containerId);

    if (!container) {
      console.error(`Container with id "${this.config.containerId}" not found`);
      return;
    }

    // Kart sarmalayıcısını oluştur
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "interactive-card-wrapper";

    // Ön ve arka yüzü olan kart öğesini oluştur
    this.cardElement = document.createElement("div");
    this.cardElement.className = "interactive-card";

    // Renkler için özel CSS özelliklerini ayarla
    this.cardElement.style.setProperty(
      "--primary-color",
      this.config.primaryColor,
    );
    this.cardElement.style.setProperty(
      "--secondary-color",
      this.config.secondaryColor,
    );

    // Ön yüzü oluştur
    const frontFace = this.createFrontFace();

    // Arka yüzü oluştur
    const backFace = this.createBackFace();

    // Kartı birleştir
    this.cardElement.appendChild(frontFace);
    this.cardElement.appendChild(backFace);
    cardWrapper.appendChild(this.cardElement);
    container.appendChild(cardWrapper);
  }

  /**
   * Kartın ön yüzünü oluştur
   * @returns {HTMLElement} Ön yüz öğesi
   */
  createFrontFace() {
    const front = document.createElement("div");
    front.className = "interactive-card__face interactive-card__face--front";

    front.innerHTML = `
      <div class="interactive-card__icon">${this.config.icon}</div>
      <h3 class="interactive-card__title">${this.config.title}</h3>
      <p class="interactive-card__description">${this.config.description}</p>
      <div class="interactive-card__hint">Click to flip</div>
    `;

    return front;
  }

  /**
   * Kartın arka yüzünü oluştur
   * @returns {HTMLElement} Arka yüz öğesi
   */
  createBackFace() {
    const back = document.createElement("div");
    back.className = "interactive-card__face interactive-card__face--back";

    back.innerHTML = `
      <div class="interactive-card__icon">🎉</div>
      <h3 class="interactive-card__title">You flipped me!</h3>
      <p class="interactive-card__description">This demonstrates smooth CSS animations combined with JavaScript interactions.</p>
      <div class="interactive-card__hint">Click again to flip back</div>
    `;

    return back;
  }

  /**
   * Karta olay dinleyicilerini ekle
   */
  attachEventListeners() {
    if (!this.cardElement) return;

    // Tıklama olayı: kartı çevir
    this.cardElement.addEventListener("click", () => this.handleClick());

    // Ek görsel geri bildirim için hover olayları
    this.cardElement.addEventListener("mouseenter", () =>
      this.handleHover(true),
    );
    this.cardElement.addEventListener("mouseleave", () =>
      this.handleHover(false),
    );
  }

  /**
   * Tıklama olayını işle - kartı çevir
   */
  handleClick() {
    this.isFlipped = !this.isFlipped;

    if (this.isFlipped) {
      this.cardElement.classList.add("is-flipped");
    } else {
      this.cardElement.classList.remove("is-flipped");
    }

    // Tıklamada nabız animasyonu ekle
    this.cardElement.classList.add("is-clicked");
    setTimeout(() => {
      this.cardElement.classList.remove("is-clicked");
    }, 600);
  }

  /**
   * Hover durumunu işle
   * @param {boolean} isHovering - Kartın üzerinde gezinilip gezinilmediği
   */
  handleHover(isHovering) {
    if (isHovering) {
      this.cardElement.classList.add("is-hovering");
    } else {
      this.cardElement.classList.remove("is-hovering");
    }
  }

  /**
   * Kart içeriğini güncellemek için genel metod
   * @param {Object} newConfig - Yeni yapılandırma değerleri
   */
  updateContent(newConfig) {
    if (newConfig.title) this.config.title = newConfig.title;
    if (newConfig.description) this.config.description = newConfig.description;
    if (newConfig.icon) this.config.icon = newConfig.icon;

    // Kartı yeniden işle
    this.cardElement.innerHTML = "";
    this.cardElement.appendChild(this.createFrontFace());
    this.cardElement.appendChild(this.createBackFace());
  }

  /**
   * Kartı yok etmek için genel metod
   */
  destroy() {
    if (this.cardElement && this.cardElement.parentElement) {
      this.cardElement.parentElement.remove();
    }
  }
}

// Modüllerde kullanım için dışa aktar (opsiyonel)
// export { InteractiveCard, ThemeManager };

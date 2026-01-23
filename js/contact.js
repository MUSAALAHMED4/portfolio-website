/**
 * İletişim Formu Yöneticisi
 * Form doğrulama ve gönderme işlemlerini yönetir
 */

class ContactFormManager {
  constructor() {
    this.form = null;
    this.submitButton = null;
    this.init();
  }

  /**
   * Form yöneticisini başlat
   */
  init() {
    this.form = document.querySelector(".contact-grid form");
    if (!this.form) return;

    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.setupEventListeners();
  }

  /**
   * Olay dinleyicilerini ayarla
   */
  setupEventListeners() {
    // Form gönderme olayı
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Gerçek zamanlı doğrulama
    const inputs = this.form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });
  }

  /**
   * Form gönderimini işle
   * @param {Event} e - Submit olayı
   */
  async handleSubmit(e) {
    e.preventDefault();

    // Tüm alanları doğrula
    if (!this.validateForm()) {
      this.showNotification(
        "Lütfen tüm alanları doğru şekilde doldurun.",
        "error",
      );
      return;
    }

    // Form verilerini al
    const formData = new FormData(this.form);
    const data = {
      name: formData.get("ad"),
      email: formData.get("eposta"),
      subject: formData.get("konu"),
      message: formData.get("mesaj"),
    };

    // Butonu devre dışı bırak ve yükleme durumunu göster
    this.setLoadingState(true);

    try {
      // Burada gerçek API çağrısı yapılabilir
      await this.sendContactForm(data);

      // Başarı mesajı göster
      this.showNotification(
        "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        "success",
      );

      // Formu sıfırla
      this.form.reset();
    } catch (error) {
      console.error("Form gönderim hatası:", error);
      this.showNotification(
        "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        "error",
      );
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * İletişim formunu gönder (simüle edilmiş)
   * @param {Object} data - Form verileri
   * @returns {Promise}
   */
  sendContactForm(data) {
    return new Promise((resolve, reject) => {
      // Gerçek API çağrısını simüle et
      setTimeout(() => {
        console.log("Form verileri:", data);
        resolve({ success: true });
      }, 1500);
    });
  }

  /**
   * Tüm formu doğrula
   * @returns {boolean} Form geçerli mi?
   */
  validateForm() {
    let isValid = true;
    const inputs = this.form.querySelectorAll(
      "input[required], textarea[required]",
    );

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Tek bir alanı doğrula
   * @param {HTMLElement} field - Doğrulanacak alan
   * @returns {boolean} Alan geçerli mi?
   */
  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = "";

    // Boş alan kontrolü
    if (value === "") {
      errorMessage = "Bu alan zorunludur.";
    }
    // E-posta doğrulama
    else if (fieldName === "eposta") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Geçerli bir e-posta adresi girin.";
      }
    }
    // Minimum uzunluk kontrolü
    else if (fieldName === "mesaj" && value.length < 10) {
      errorMessage = "Mesajınız en az 10 karakter olmalıdır.";
    }

    if (errorMessage) {
      this.showError(field, errorMessage);
      return false;
    } else {
      this.clearError(field);
      return true;
    }
  }

  /**
   * Alanda hata göster
   * @param {HTMLElement} field - Alan
   * @param {string} message - Hata mesajı
   */
  showError(field, message) {
    const formRow = field.closest(".form-row");
    if (!formRow) return;

    // Önceki hatayı temizle
    this.clearError(field);

    // Hata mesajı oluştur
    const errorDiv = document.createElement("div");
    errorDiv.className = "form-error";
    errorDiv.textContent = message;

    // Alanı hatalı olarak işaretle
    field.classList.add("error");

    // Hata mesajını ekle
    formRow.appendChild(errorDiv);
  }

  /**
   * Alandaki hatayı temizle
   * @param {HTMLElement} field - Alan
   */
  clearError(field) {
    const formRow = field.closest(".form-row");
    if (!formRow) return;

    const errorDiv = formRow.querySelector(".form-error");
    if (errorDiv) {
      errorDiv.remove();
    }

    field.classList.remove("error");
  }

  /**
   * Yükleme durumunu ayarla
   * @param {boolean} loading - Yükleniyor mu?
   */
  setLoadingState(loading) {
    if (!this.submitButton) return;

    if (loading) {
      this.submitButton.disabled = true;
      this.submitButton.classList.add("loading");
      this.submitButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
    } else {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove("loading");

      // Dil desteği için data-i18n özniteliğini kontrol et
      const originalText = this.submitButton.getAttribute("data-i18n")
        ? languageManager && languageManager.getLanguage() === "en"
          ? "Send"
          : "Gönder"
        : "Gönder";

      this.submitButton.textContent = originalText;
    }
  }

  /**
   * Bildirim göster
   * @param {string} message - Mesaj
   * @param {string} type - Tür ('success' veya 'error')
   */
  showNotification(message, type = "info") {
    // Mevcut bildirimi kaldır
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Yeni bildirim oluştur
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const icon =
      type === "success"
        ? '<i class="fa-solid fa-circle-check"></i>'
        : '<i class="fa-solid fa-circle-exclamation"></i>';

    notification.innerHTML = `
      ${icon}
      <span>${message}</span>
      <button class="notification-close" aria-label="Kapat">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    // Bildirimi sayfaya ekle
    document.body.appendChild(notification);

    // Kapatma butonu işlevi
    const closeButton = notification.querySelector(".notification-close");
    closeButton.addEventListener("click", () => {
      notification.classList.add("fade-out");
      setTimeout(() => notification.remove(), 300);
    });

    // Otomatik kapat (5 saniye)
    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.add("fade-out");
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);

    // Animasyon için kısa bir gecikme
    setTimeout(() => notification.classList.add("show"), 100);
  }
}

// Sayfa yüklendiğinde form yöneticisini başlat
document.addEventListener("DOMContentLoaded", () => {
  new ContactFormManager();
});

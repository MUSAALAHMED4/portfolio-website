/**
 * Animasyonlu Arka Plan Çizgileri
 * Canvas kullanarak dinamik ve animasyonlu çizgiler oluşturur
 */

class AnimatedLines {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.lines = [];
    this.numberOfLines = 50;
    this.animationId = null;

    this.init();
  }

  /**
   * Canvas'ı başlat ve çizgileri oluştur
   */
  init() {
    this.createCanvas();
    this.createLines();
    this.setupEventListeners();
    this.animate();
  }

  /**
   * Canvas elementini oluştur ve sayfaya ekle
   */
  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "animated-lines-canvas";
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.zIndex = "-1";
    this.canvas.style.pointerEvents = "none";

    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
  }

  /**
   * Canvas boyutunu pencere boyutuna göre ayarla
   */
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Çizgileri oluştur
   */
  createLines() {
    this.lines = [];
    for (let i = 0; i < this.numberOfLines; i++) {
      this.lines.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
  }

  /**
   * Pencere yeniden boyutlandırma olayını dinle
   */
  setupEventListeners() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.createLines();
    });
  }

  /**
   * Tek bir çizgiyi çiz
   */
  drawLine(line) {
    this.ctx.save();
    this.ctx.translate(line.x, line.y);
    this.ctx.rotate(line.angle);

    // Tema rengini al
    const theme = document.documentElement.getAttribute("data-theme");
    const color = theme === "light" ? "0, 0, 0" : "158, 255, 87"; // Siyah veya neon yeşil

    this.ctx.strokeStyle = `rgba(${color}, ${line.opacity})`;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";

    this.ctx.beginPath();
    this.ctx.moveTo(-line.length / 2, 0);
    this.ctx.lineTo(line.length / 2, 0);
    this.ctx.stroke();

    this.ctx.restore();
  }

  /**
   * Çizgiyi güncelle (hareket ettir)
   */
  updateLine(line) {
    // Çizgiyi açısına göre hareket ettir
    line.x += Math.cos(line.angle) * line.speed;
    line.y += Math.sin(line.angle) * line.speed;

    // Açıyı döndür
    line.angle += line.rotationSpeed;

    // Ekrandan çıkan çizgileri tekrar başa al
    if (line.x < -100) line.x = this.canvas.width + 100;
    if (line.x > this.canvas.width + 100) line.x = -100;
    if (line.y < -100) line.y = this.canvas.height + 100;
    if (line.y > this.canvas.height + 100) line.y = -100;
  }

  /**
   * Animasyon döngüsü
   */
  animate() {
    // Canvas'ı temizle
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Tüm çizgileri güncelle ve çiz
    this.lines.forEach((line) => {
      this.updateLine(line);
      this.drawLine(line);
    });

    // Bir sonraki kareyi çiz
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Animasyonu durdur
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Animasyonu yeniden başlat
   */
  restart() {
    this.stop();
    this.animate();
  }

  /**
   * Canvas'ı kaldır ve animasyonu durdur
   */
  destroy() {
    this.stop();
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Sayfa yüklendiğinde animasyonu başlat
let animatedLines;

document.addEventListener("DOMContentLoaded", () => {
  animatedLines = new AnimatedLines();
});

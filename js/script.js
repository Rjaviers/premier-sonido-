/* =========================================================
   CONFIG — EDITÁ ACÁ el número de WhatsApp si cambia.
   Sin "+" ni espacios: código de país + área + línea.
   ========================================================= */
const CONFIG = {
  whatsappNumber: '5492646713399',
};

// Header sólido al hacer scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Smooth-scroll para los links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length > 1){
      const target = document.querySelector(id);
      if (target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

/* =========================================================
   LIGHTBOX — click en una foto para agrandarla
   ========================================================= */
(function initLightbox(){
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg) return;

  const zoomableImgs = document.querySelectorAll('.gallery-item img, .photo-panel-img img, .card-frame img');

  function openLightbox(img){
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  zoomableImgs.forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Cerrar al tocar el fondo (pero no la imagen agrandada)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
})();

/* =========================================================
   QR — abre WhatsApp con un mensaje de consulta genérico
   ========================================================= */
(function generateQR(){
  const qrMsg = encodeURIComponent('Hola! Quiero hacer una consulta en Premier Security & Sound.');
  const qrUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${qrMsg}`;
  const qr = qrcode(0, 'M');
  qr.addData(qrUrl);
  qr.make();
  const target = document.getElementById('qrCanvas');
  target.innerHTML = qr.createImgTag(6, 8);
  const img = target.querySelector('img');
  if (img){
    img.style.width = '150px';
    img.style.height = '150px';
    const dl = document.getElementById('downloadQr');
    dl.href = img.src;
  }
})();

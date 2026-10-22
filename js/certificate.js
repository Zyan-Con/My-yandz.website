// ============================================
// CERTIFICATE MODULE LOGIC (SEPARATED JS)
// ============================================

// Buka Modal Pop-up Sertifikat
function openCertModal(imageSrc, title) {
  const modal = document.getElementById('certModal');
  const modalImage = document.getElementById('certModalImage');
  const modalTitle = document.getElementById('certModalTitle');

  if (modal && modalImage && modalTitle) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

// Tutup Modal Pop-up Sertifikat
function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Tutup modal jika tombol ESC ditekan
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCertModal();
  }
});

// Kontrol Scroll Geser Kartu Sertifikat
function scrollCerts(direction) {
  const track = document.getElementById('certSliderTrack');
  if (!track) return;

  const cardWidth = 314; // Lebar kartu (290px) + Gap (24px)
  if (direction === 'left') {
    track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
}
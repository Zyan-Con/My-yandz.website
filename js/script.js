// ============================================
// 1. MATRIX RAIN BACKGROUND (DARK/LIGHT ADAPTIVE)
// ============================================
const canvas = document.getElementById('matrix-bg');

if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();

  const characters = '01アイウエオカキクケコサシスセソタチツテト';
  const charArray = characters.split('');
  const fontSize = 16;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Canvas Background: Hitam pekat di dark mode, krem di light mode
    ctx.fillStyle = isDark ? 'rgba(8, 8, 12, 0.2)' : 'rgba(228, 221, 208, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Warna Karakter: Hijau Hacker Neon (#00ff66) di dark mode, cokelat di light mode
    ctx.fillStyle = isDark ? '#00ff66' : '#8a7f68';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);

  window.addEventListener('resize', () => {
    resizeCanvas();
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
  });
}

// ============================================
// 2. CORE NAVIGATION & UI HELPERS
// ============================================
window.addEventListener('pageshow', () => {
  if (document.body.classList.contains('home-page')) {
    window.scrollTo(0, 0);
  }
});

// Active Navigation Link Indicator
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('#sideMenu a');
navLinks.forEach((link) => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});

// Hamburger Menu Toggle
function toggleMenu() {
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const menuBtn = document.getElementById('menuBtn');
  if (sideMenu) sideMenu.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
  if (menuBtn) menuBtn.classList.toggle('active');
}

// Custom Cursor & Trail
const customCursor = document.querySelector('.custom-cursor');
if (customCursor) {
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });

  const hoverTargets = document.querySelectorAll('a, button');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
  });

  let trailCount = 0;
  document.addEventListener('mousemove', (e) => {
    trailCount++;
    if (trailCount % 3 === 0) {
      const trail = document.createElement('div');
      trail.classList.add('cursor-trail');
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 500);
    }
  });
}

// Magnetic Buttons Effect
const magneticButtons = document.querySelectorAll('.magnetic');
magneticButtons.forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Parallax Ghost Number
const ghostNumber = document.querySelector('.page-ghost-number');
if (ghostNumber) {
  window.addEventListener('scroll', () => {
    ghostNumber.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  });
}

// ============================================
// 3. CERTIFICATE MODAL & HORIZONTAL SCROLL
// ============================================
function openCertModal(imageSrc, title) {
  const modal = document.getElementById('certModal');
  const modalImage = document.getElementById('certModalImage');
  const modalTitle = document.getElementById('certModalTitle');

  if (modal) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCertModal() {
  const modal = document.getElementById('certModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function scrollCerts(direction) {
  const track = document.getElementById('certSliderTrack');
  if (!track) return;
  const scrollAmount = 304;
  if (direction === 'left') {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// ============================================
// 4. PROJECTS SLIDER & CATEGORY FILTER
// ============================================
function scrollProjects(direction) {
  const track = document.getElementById('projectsScrollTrack');
  if (!track) return;
  const scrollAmount = 368;
  if (direction === 'left') {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function filterProjects(category, buttonEl) {
  document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');

  const cards = document.querySelectorAll('.photo2-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCat.includes(category)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// ============================================
// 5. CHATBOT ASSISTANT
// ============================================
const chatData = [
  { keywords: ['skill', 'kemampuan', 'bisa apa'], answer: "Yanda menguasai PHP, JavaScript, React, Laravel, Python, dan arsitektur database MySQL / IndexedDB." },
  { keywords: ['kerja', 'pengalaman', 'job'], answer: "Yanda saat ini aktif membangun proyek software engineering dan sedang magang di PT Garuda Cyber Indonesia." },
  { keywords: ['tinggal', 'lokasi', 'domisili', 'alamat'], answer: "Yanda berdomisili di Tangerang, Indonesia (WIB - UTC+7)." },
  { keywords: ['hobi', 'suka', 'minat'], answer: "Yanda menyukai anime & kultur Jepang, membaca, olahraga (gym & running), serta eksplorasi teknologi AI dan cybersecurity." },
  { keywords: ['kontak', 'hubungi', 'email', 'wa', 'whatsapp'], answer: "Kamu bisa menghubungi Yanda via WhatsApp Bisnis di +62 831-8338-2530 atau email zoliandaalmaghribi@gmail.com." },
  { keywords: ['project', 'karya', 'portofolio'], answer: "Cek bagian Featured Projects untuk melihat proyek unggulan seperti Anime Chronicle (3D Book UI + IndexedDB)!" },
   {
    keywords: ['skill', 'kemampuan', 'bisa apa'],
    answer: 'Aku bisa membantu menjelaskan skill Yanda.'
  },
  {
    keywords: ['hobi', 'hobby', 'kesukaan'],
    answer: 'Hobiku adalah belajar programming, mengeksplorasi teknologi, dan mempelajari hal-hal baru.'
  },
  {
    keywords: ['bahasa pemrograman', 'programming'],
    answer: 'Aku sedang mempelajari Java, PHP, dan pengembangan website.'
  },
  {
    keywords: ['yanda','terimakasih'],
    answer: 'sama sama, terimakasih kembali ya telah mampir ke portofolia saya, salam hangat yanda'
  }
];

function getBotResponse(userText) {
  const lowerText = userText.toLowerCase();
  for (const item of chatData) {
    for (const keyword of item.keywords) {
      if (lowerText.includes(keyword)) {
        return item.answer;
      }
    }
  }
  return "Maaf, aku belum punya jawaban untuk itu. Kamu bisa tanya tentang keahlian, proyek, kontak, atau cara bekerja sama dengan Yanda!";
}

function toggleChat() {
  const chatBox = document.getElementById('chatBox');
  if (chatBox) chatBox.classList.toggle('active');
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  if (!input || !messages) return;

  const userText = input.value.trim();
  if (userText === '') return;

  const userBubble = document.createElement('div');
  userBubble.classList.add('chat-bubble', 'user');
  userBubble.textContent = userText;
  messages.appendChild(userBubble);

  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  const typingBubble = document.createElement('div');
  typingBubble.classList.add('chat-bubble', 'bot', 'typing-indicator');
  typingBubble.innerHTML = '<span></span><span></span><span></span>';
  messages.appendChild(typingBubble);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typingBubble.remove();
    const botBubble = document.createElement('div');
    botBubble.classList.add('chat-bubble', 'bot');
    botBubble.textContent = getBotResponse(userText);
    messages.appendChild(botBubble);
    messages.scrollTop = messages.scrollHeight;
  }, 700);
}

// ============================================
// 6. DARK MODE THEME CONTROLLER
// ============================================
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// ============================================
// KAMUS MULTI-BAHASA LENGKAP (HOME + ABOUT DENSE)
// ============================================
const translations = {
  id: {
    // Navigasi & Umum
    nav_home: "Home", nav_about: "Tentang", nav_projects: "Proyek", nav_cert: "Sertifikat", nav_contact: "Kontak",
    hero_title: "Halo", btn_resume: "Resume", btn_projects: "Proyek",
    hero_text1: "Saya seorang full-stack developer yang tinggal di Tangerang, Indonesia, saat ini sedang mendalami Laravel, React, dan teknologi web modern.",
    hero_text2: "Saya senang mengubah ide menjadi produk nyata, dari logika backend hingga animasi frontend.",
    
    // --- HALAMAN ABOUT (EDITORIAL COMPLETE) ---
    about_hero_tag: "FULL-STACK SPECIALIST • ARCH LINUX USER • AI EXPLORER ⚡",
    about_who_sticker: "TENTANG SAYA <span>☺</span>",
    about_bio: "Zolianda Al Maghribi (dikenal sebagai <strong>Yandz.id</strong>) adalah seorang full-stack developer asal Tangerang, Indonesia 🇮🇩. Berfokus pada perancangan arsitektur backend Laravel yang kokoh, antarmuka reaktif modern, dan integrasi kecerdasan buatan (AI).",
    about_ast1_title: "PERAN INDUSTRI SAAT INI",
    about_ast1_desc: "Sedang menjalani magang aktif di <strong>PT Garuda Cyber Indonesia</strong> 🦅, menangani arsitektur database relasional, API RESTful, dan modul backend PHP/Laravel.",
    about_ast2_title: "PRINSIP REKAYASA KODE",
    about_ast2_desc: "Menulis kode yang bersih (*Clean Code*), optimasi kecepatan muat, dan merancang aplikasi ramah luring (*Offline-First PWA*) dengan IndexedDB.",
    
    // IDE Component
    about_ide_sticker: "LINGKUNGAN KODING <span>💻</span>",
    about_ide_copy: "Salin Kode",
    
    // Stats Metrics
    about_stats_sticker: "METRIK PROYEK & KODING 📊",
    about_stat1_title: "Proyek Selesai",
    about_stat1_desc: "Web apps, dashboard manajemen, katalog aplikasi, dan landing page modern.",
    about_stat2_title: "Jam Koding Murni",
    about_stat2_desc: "Dedikasi eksplorasi logika algoritma, arsitektur database, dan optimasi performa.",
    about_stat3_title: "Git Commit & Push",
    about_stat3_desc: "Rekam jejak konsisten dan aktif di repositori GitHub @Zyan-Con.",
    about_stat4_title: "Fokus Uptime Produksi",
    about_stat4_desc: "Menjaga performa aplikasi tetap cepat, ringan, dan bebas runtime error.",
    
    // Arch Linux Dojo
    about_dojo_sticker: "DIGITAL DOJO SAYA <span>🐧</span>",
    about_dojo_badge: "Lingkungan Arch Linux",
    about_dojo_uptime: "Uptime: 24/7 Hacker Flow",
    about_dojo_desc: "Saya menggunakan <strong>Arch Linux</strong> sebagai sistem operasi harian. Membangun lingkungan koding dari awal melatih pemahaman mendalam tentang manajemen memori, terminal script, dan efisiensi resource sistem.",
    about_dojo_lbl1: "OS & KERNEL",
    about_dojo_lbl2: "SHELL & TERMINAL",
    about_dojo_lbl3: "CODE EDITORS",
    about_dojo_lbl4: "LOCAL STACK",
    
    // Proof & Polaroid
    about_proof_sticker: "BUKTI NYATA & MAGANG 📸",
    about_proof_sub: "Dokumentasi autentik kegiatan magang industri, sertifikasi sains, dan proyek nyata.",
    about_pol1_title: "🏢 Garuda Cyber Indonesia HQ",
    about_pol1_desc: "Mengembangkan arsitektur backend Laravel & modul web enterprise bersama tim engineering.",
    about_pol2_title: "🏆 Duta Inspirasi Indonesia",
    about_pol2_desc: "Penghargaan nasional atas kontribusi pemuda inspiratif & kepemimpinan digital.",
    about_pol3_title: "🐍 CS50P Python Programming",
    about_pol3_desc: "Kurikulum ilmu komputer ketat dari Harvard University dengan pemecahan masalah algoritma nyata.",
    
    // Services I Offer
    about_services_sticker: "LAYANAN YANG SAYA TAWARKAN 🛠️",
    about_srv1_title: "APLIKASI WEB FULL-STACK",
    about_srv1_desc: "Membangun sistem web responsif dari nol menggunakan Laravel, React.js, dan RESTful API.",
    about_srv2_title: "OFFLINE-FIRST PWA & DATABASE",
    about_srv2_desc: "Integrasi IndexedDB lokal, sinkronisasi storage, dan optimasi arsitektur database MySQL.",
    about_srv3_title: "INTEGRASI MODEL AI & API",
    about_srv3_desc: "Menghubungkan endpoint LLM (Gemini / OpenAI API) ke dalam sistem web yang siap pakai.",
    about_srv4_title: "PERFORMA & KEAMANAN TINGGI",
    about_srv4_desc: "Slicing UI pixel-perfect, kecepatan loading optimal, dan penerapan best-practice keamanan web.",
    
    // Daily Routine
    about_routine_sticker: "RUTINITAS HARIAN <span>⏱️</span>",
    about_rt1_title: "🌅 Protokol Pagi",
    about_rt1_desc: "Review target harian, membaca dokumentasi teknologi baru, dan merencanakan sprint koding.",
    about_rt2_title: "🏢 Engineering Sprint (PT Garuda Cyber)",
    about_rt2_desc: "Fokus pada modul backend, debugging logic Laravel, dan integrasi query database.",
    about_rt3_title: "🏋️‍♂️ Iron & Stamina (Gym Session)",
    about_rt3_desc: "Angkat beban (*progressive overload*). Disiplin fisik adalah fondasi stamina koding berjam-jam.",
    about_rt4_title: "⚡ Proyek Pribadi & Riset AI",
    about_rt4_desc: "Mengeksplorasi Anime Chronicle, bereksperimen dengan model AI, dan optimasi arsitektur web.",
    about_rt5_title: "🇯🇵 Japanese Deck & Membaca",
    about_rt5_desc: "Menyelesaikan review kartu Anki kosakata N5/N4 dan membaca literatur sains sebelum istirahat.",
    
    // Bento Passions
    about_gym_tag: "DISIPLIN FISIK & MENTAL",
    about_gym_title: "Angkat Beban & Stamina Mental 🏋️",
    about_gym_desc: "Di gym, setiap beban mengajarkan bahwa hasil nyata datang dari konsistensi berulang (*progressive overload*). Pola pikir yang sama persis saya terapkan saat mendebug kode rumit: pantang menyerah sampai solusi ditemukan.",
    about_jp_tag: "EKSPLORASI BAHASA",
    about_jp_title: "日本語 (Japanese) Desk 🇯🇵",
    about_jp_desc: "Saat ini aktif mendalami bahasa Jepang (level <strong>JLPT N5 menuju N4</strong>). Membuka akses langsung ke literatur teknologi di Jepang dan kolaborasi tim global.",
    
    // Preferences (Likes vs Dislikes)
    about_pref_sticker: "FILOSOFI & PREFERENSI KODING ⚖️",
    about_likes_title: "YANG SAYA SUKAI DALAM KODE",
    about_likes_1: "Arsitektur MVC yang rapi dan modular",
    about_likes_2: "Desain antarmuka Dark Mode yang tidak menyilaukan",
    about_likes_3: "Respon API super cepat (< 100ms)",
    about_likes_4: "Dokumentasi fungsi koding yang jelas untuk manusia",
    about_dislikes_title: "YANG SAYA HINDARI SEPERTI BUG",
    about_dislikes_1: "Kode spageti tanpa pemisahan komponen",
    about_dislikes_2: "Unhandled promises dan error diam-diam di console",
    about_dislikes_3: "Website berat penuh plugin yang tidak terpakai",
    about_dislikes_4: "Commit Git bertuliskan 'fix bug' tanpa penjelasan",
    
    // Beyond & Connect
    about_beyond_sticker: "DI LUAR KODING <span>🎯</span>",
    about_cert_sticker: "SERTIFIKAT SAYA ☺",
    cert_desc: "Beberapa sertifikasi pilihan yang telah saya selesaikan untuk mengasah keahlian pemrograman web, sains, dan bahasa.",
    about_cert_btn: "Semua Sertifikat →",
    about_connect_sticker: "HUBUNGI SAYA ☺",

    // Universal Footer
    footer_cta_badge: "MULAI KOLABORASI",
    footer_cta_title: "Punya ide atau proyek impian?<br><span>Mari kita bangun sesuatu yang luar biasa bersama.</span>",
    footer_cta_desc: "Terbuka untuk freelance, kerja sama jangka panjang, hingga diskusi seputar software engineering & AI.",
    footer_cta_btn_wa: "Chat WhatsApp Bisnis",
    footer_cta_btn_email: "Kirim Email",
    footer_tagline: "Full-Stack Developer & AI Technology Enthusiast yang berfokus pada performa modern, clean architecture, dan UI/UX interaktif.",
    footer_available: "Tersedia untuk Proyek",
    footer_nav_title: "Navigasi",
    footer_follow: "Sosial Media",
    footer_contact_title: "Kontak Langsung",
    footer_call: "TELEPON / WHATSAPP",
    footer_write: "EMAIL RESMI",
    footer_time_label: "JAM LOKAL (WIB)",
    footer_passion: "Dibuat dengan Dedikasi",
       // NEW AVO CTA BANNER & DIRECT CONNECT CARD
    avo_sub_tag: "MULAI PROYEK • PROSES CEPAT & TRANSPARAN",
    avo_cta_title: "Mulai kolaborasi proyek bersama Yanda hari ini.",
    avo_cta_subtext: "Punya ide aplikasi, butuh backend Laravel yang kokoh, atau integrasi AI? Mari diskusikan solusinya bersama.",
    direct_live_status: "SIAP BEKERJA",
    direct_est_response: "⚡ < 30 Menit (Respon Cepat)",
    direct_work_pref: "💼 Remote / Kontrak / Freelance",
    direct_core_focus: "🛠️ Laravel, React, APIs & AI",
    direct_btn_wa: "Chat via WhatsApp Langsung",

    // Footer
    footer_tagline: "Full-Stack Developer crafting scalable web applications, robust Laravel architectures, and AI integrations.",
    footer_available: "Tersedia untuk Proyek",
    footer_nav_title: "Navigasi",
    footer_follow: "Sosial Media",
    footer_contact_title: "Kontak Langsung",
    footer_call: "TELEPON / WHATSAPP",
    footer_write: "EMAIL RESMI",
    footer_time_label: "JAM LOKAL (WIB)",

      proj_breadcrumb: "Home / <strong style='color: var(--accent-orange);'>Arsip Proyek</strong>",
    proj_hero_title: "Karya Kami.<br><span>Mewujudkan Visi Anda.</span>",
    proj_hero_desc: "Setiap baris kode menceritakan perjalanan dedikasi rekayasa perangkat lunak. Dari sistem backend enterprise, web aplikasi offline-first, hingga eksplorasi model kecerdasan buatan (AI).",
    proj_btn_explore: "Jelajahi Semua Proyek ↓",
    proj_btn_start: "Mulai Proyek",
    catalog_badge: "Portofolio Lengkap",
    catalog_title: "Jelajahi Proyek yang Selesai",
    catalog_desc: "Setiap proyek diuji dengan standar performa tinggi, modularitas MVC, keamanan data, dan kemudahan bagi pengguna akhir.",
    filter_all: "Semua",
    filter_fullstack: "Full-Stack",
    filter_frontend: "Frontend",
    filter_backend: "Backend",
    filter_ai: "AI & Python",
    filter_solo: "Proyek Solo",
    filter_team: "Tim / Kolaborasi",
    btn_gallery: "Lihat Galeri & Detail ➔",
    badge_solo: "Proyek Solo",
    badge_team: "Tim (3 Devs)",
    badge_duo: "Kolaborasi Duo",

    // Di translations.id:
    cert_page_badge: "SERTIFIKASI & PENGHARGAAN",
    cert_archive_title: "Sertifikat & Pencapaian Resmi",
    cert_archive_desc: "Dokumentasi resmi penguasaan ilmu komputer, pemrograman web, algoritma sains, dan pengakuan kepemimpinan tingkat nasional maupun global.",
    cert_filter_all: "Semua",
    cert_filter_code: "Coding & CS",
    cert_filter_awards: "Penghargaan",
    cert_filter_comp: "Kompetisi Sains",
    cert_view_btn: "Buka Sertifikat Penuh ➔",

        // KHUSUS HALAMAN CONTACT & FORM
    contact_title: "Ayo Ngobrol",
    contact_intro: "Punya ide proyek, kebutuhan rekayasa web, atau ingin berdiskusi santai seputar teknologi? Jangan ragu untuk menghubungi saya.",
    form_name: "Nama Lengkap",
    form_email: "Alamat Email",
    form_message: "Pesan / Detail Proyek",
    form_send: "Kirim Pesan",
    detail_email: "EMAIL RESMI",
    detail_location: "LOKASI & ZONA WAKTU",

      // 02. About Summary
    about_badge: "Tentang Saya",
    about_lead: "Mengubah Baris Kode Menjadi Solusi Kreatif & Nyata",
    about_desc1: "Saya seorang full-stack developer yang berfokus pada ekosistem web modern, backend logic, dan pengalaman frontend yang dinamis.",
    about_desc2: "Alumni magang software engineering di PT Garuda Cyber Indonesia. Saat ini aktif membangun sistem web mandiri dan siap untuk kerja sama profesional.",
    btn_read_more: "Baca Selengkapnya Tentang Saya →",
    stat_projects: "Proyek Dibuat", stat_hours: "Jam Coding", stat_dedication: "% Dedikasi", stat_certs: "Sertifikat",

    // 03. Tech Stack & Skills
    tech_badge: "Teknologi & Keahlian",
    tech_title: "Tech Stack & Spesialisasi",
    tech_desc: "Kumpulan teknologi, bahasa pemrograman, framework, dan domain AI/ML yang saya kuasai dan kembangkan.",
    skill_fe_title: "Frontend Engineering",
    skill_fe_desc: "HTML5, CSS3, JavaScript (ES6+), React.js, Responsive UI, Tailwind CSS, Bootstrap.",
    skill_be_title: "Backend & Server Logic",
    skill_be_desc: "PHP Modern, Laravel Framework, RESTful API Development, Python Scripting, Java basics.",
    skill_db_title: "Database Architecture",
    skill_db_desc: "MySQL, IndexedDB (Offline-First Storage), Relational Schema Design, Laragon environment.",
    skill_ai_title: "Artificial Intelligence & ML",
    skill_ai_desc: "Eksplorasi integrasi LLM API, prompt engineering, Python data fundamentals, dan arsitektur Deep Learning.",
    lang_section_badge: "Komunikasi Global",
    lang_section_title: "Kemampuan Bahasa",

    // 04. Featured Projects
    projects_badge: "Portofolio",
    projects_title: "Proyek Unggulan",
    projects_desc: "Setiap project dibangun dengan fokus pada performa cepat, estetika modern, dan arsitektur rapi.",
    filter_all: "Semua", filter_fullstack: "Full-Stack", filter_frontend: "Frontend", filter_offline: "Offline-First",
    proj1_desc: "Aplikasi katalog anime interaktif berbasis IndexedDB offline-first dengan UI 3D Book.",
    proj2_desc: "Website portofolio multi-halaman dengan dark mode, multi-bahasa, dan terminal interaktif.",
    proj3_desc: "Pengembangan modul backend dan manajemen data sistem menggunakan Laravel & MySQL.",
    view_more_link: "Lihat Detail →",

    // 06. Dev Pass
    pass_badge: "DEV PASS TERVERIFIKASI",
    pass_status: "Tersedia untuk Kerja",
    pass_role: "Full-Stack Web Developer & AI/ML Technology Enthusiast",
    pass_label_loc: "LOKASI UTAMA", pass_label_wa: "WHATSAPP BISNIS", pass_label_stack: "TECH STACK UTAMA", pass_label_lang: "BAHASA",
    pass_btn_wa: "Chat WhatsApp Bisnis", pass_btn_copy: "Salin Link Portofolio", pass_caption: "PINDAI UNTUK BUKA DI HP",

    // 07. FAQ
    faq_badge: "Tanya Jawab",
    faq_title: "Pertanyaan yang Sering Diajukan",
    faq_desc: "Pertanyaan mengenai ketersediaan proyek, teknologi, dan cara berkolaborasi.",
    faq_q1: "Apakah Yanda bersedia untuk freelance atau kontrak kerja full-time?",
    faq_a1: "Ya! Saya sangat terbuka untuk kesempatan kerja lepas (freelance), kerja sama jangka panjang, maupun proyek kolaboratif frontend & backend logic.",
    faq_q2: "Bagaimana kesiapan komunikasi dalam tim internasional?",
    faq_a2: "Saya mampu berkomunikasi secara profesional dalam Bahasa Inggris (70%), serta memiliki kemampuan dasar percakapan Bahasa Jepang (JLPT N5).",
    faq_q3: "Teknologi apa yang paling sering digunakan dalam proyek baru?",
    faq_a3: "Framework utama saya adalah Laravel (PHP) untuk backend tangguh & REST API, dipadukan dengan React.js atau vanilla modern JS untuk antarmuka interaktif.",
    faq_q4: "Berapa nomor kontak resmi yang paling cepat dihubungi?",
    faq_a4: "Kamu bisa langsung menghubungi WhatsApp Bisnis saya di +62 831-8338-2530 atau melalui email di zoliandaalmaghribi@gmail.com.",

    // 08. Coffee
    coffee_title: "Traktir Saya Kopi",
    coffee_desc: "Jika kamu menyukai portofolio ini atau ingin mendukung eksplorasi saya di dunia software engineering, segelas kopi sangat berarti! ☕",
    coffee_hint: "Klik untuk salin nomor",

    // Footer Avo
    avo_sub_tag: "MULAI PROYEK • PROSES CEPAT & TRANSPARAN",
    avo_cta_title: "Mulai kolaborasi proyek bersama Yanda hari ini.",
    avo_cta_subtext: "Punya ide aplikasi, butuh backend Laravel yang kokoh, atau integrasi AI? Mari diskusikan solusinya bersama.",
    direct_live_status: "SIAP BEKERJA",
    direct_est_response: "⚡ < 30 Menit (Respon Cepat)",
    direct_work_pref: "💼 Remote / Kontrak / Freelance",
    direct_core_focus: "🛠️ Laravel, React, APIs & AI",
    direct_btn_wa: "Chat via WhatsApp Langsung",
    footer_tagline: "Full-Stack Developer crafting scalable web applications, robust Laravel architectures, and AI integrations.",
    footer_available: "Tersedia untuk Proyek",
    footer_nav_title: "Navigasi",
    footer_follow: "Sosial Media",
    footer_contact_title: "Kontak Langsung",
    footer_call: "TELEPON / WHATSAPP",
    footer_write: "EMAIL RESMI",
    footer_time_label: "JAM LOKAL (WIB)",
    footer_passion: "Dibuat dengan Dedikasi"
    
  },

  en: {
    // Navigasi & General
    nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_cert: "Certificates", nav_contact: "Contact",
    hero_title: "Hello", btn_resume: "Resume", btn_projects: "Projects",
    hero_text1: "I'm a full-stack developer based in Tangerang, Indonesia, currently exploring Laravel, React, and modern web technologies.",
    hero_text2: "I enjoy turning ideas into working products, from backend logic to frontend animation.",
    
    // --- ABOUT PAGE (EDITORIAL COMPLETE) ---
    about_hero_tag: "FULL-STACK SPECIALIST • ARCH LINUX USER • AI EXPLORER ⚡",
    about_who_sticker: "WHO I AM <span>☺</span>",
    about_bio: "Zolianda Al Maghribi (known as <strong>Yandz.id</strong>) is a full-stack developer based in Tangerang, Indonesia 🇮🇩. Focused on crafting robust Laravel backend architectures, modern reactive UIs, and artificial intelligence (AI) integrations.",
    about_ast1_title: "CURRENT INDUSTRY ROLE",
    about_ast1_desc: "Active software engineering intern at <strong>PT Garuda Cyber Indonesia</strong> 🦅, engineering relational database schemas, RESTful APIs, and enterprise PHP/Laravel modules.",
    about_ast2_title: "ENGINEERING PRINCIPLES",
    about_ast2_desc: "Committed to clean architecture, performance optimization, and building resilient Offline-First PWAs powered by IndexedDB.",
    
    // IDE Component
    about_ide_sticker: "DEV ENVIRONMENT <span>💻</span>",
    about_ide_copy: "Copy Code",
    
    // Stats Metrics
    about_stats_sticker: "PROJECTS & ENGINE METRICS 📊",
    about_stat1_title: "Completed Projects",
    about_stat1_desc: "Full-stack apps, internal dashboards, catalog systems, and creative landing pages.",
    about_stat2_title: "Hours of Pure Coding",
    about_stat2_desc: "Dedicated time crafting algorithm logic, database queries, and frontend animations.",
    about_stat3_title: "Git Commits & Pushes",
    about_stat3_desc: "Consistent engineering activity across public and private GitHub repositories.",
    about_stat4_title: "Production Uptime Focus",
    about_stat4_desc: "Maintaining lightweight bundle sizes, zero memory leaks, and runtime stability.",
    
    // Arch Linux Dojo
    about_dojo_sticker: "MY DIGITAL DOJO <span>🐧</span>",
    about_dojo_badge: "Arch Linux Environment",
    about_dojo_uptime: "Uptime: 24/7 Hacker Flow",
    about_dojo_desc: "I run <strong>Arch Linux</strong> as my primary daily driver. Building my workspace from the ground up instills deep respect for memory efficiency, terminal scripting, and Linux system internals.",
    about_dojo_lbl1: "OS & KERNEL",
    about_dojo_lbl2: "SHELL & TERMINAL",
    about_dojo_lbl3: "CODE EDITORS",
    about_dojo_lbl4: "LOCAL STACK",
    
    // Proof & Polaroid
    about_proof_sticker: "PROOF OF WORK & EVIDENCE 📸",
    about_proof_sub: "Authentic documentation of industrial internships, verified certifications, and hands-on milestones.",
    about_pol1_title: "🏢 Garuda Cyber Indonesia HQ",
    about_pol1_desc: "Engineering enterprise Laravel backend modules and relational data flows with the core team.",
    about_pol2_title: "🏆 Duta Inspirasi Indonesia",
    about_pol2_desc: "National award recipient recognizing youth leadership and digital innovation contributions.",
    about_pol3_title: "🐍 CS50P Python Programming",
    about_pol3_desc: "Rigorous computer science problem solving and algorithm mastery authorized by Harvard University.",
    
    // Services I Offer
    about_services_sticker: "SERVICES I OFFER 🛠️",
    about_srv1_title: "FULL-STACK WEB APPLICATIONS",
    about_srv1_desc: "End-to-end web software engineered with Laravel, React.js, and structured REST APIs.",
    about_srv2_title: "OFFLINE-FIRST PWA & DATABASE",
    about_srv2_desc: "Client-side IndexedDB databases, service workers, and high-performance MySQL schemas.",
    about_srv3_title: "AI MODEL & API INTEGRATION",
    about_srv3_desc: "Seamless integration of LLM endpoints (Gemini / OpenAI API) into functional web tools.",
    about_srv4_title: "PERFORMANCE & SECURITY",
    about_srv4_desc: "Pixel-perfect UI delivery, sub-second response times, and web security best practices.",
    
    // Daily Routine
    about_routine_sticker: "DAILY ROUTINE <span>⏱️</span>",
    about_rt1_title: "🌅 Morning Protocol",
    about_rt1_desc: "Daily goal architecture, reading technical release notes, and sprint planning.",
    about_rt2_title: "🏢 Engineering Sprint (PT Garuda Cyber)",
    about_rt2_desc: "Backend architecture sprints, debugging business logic, and query optimization.",
    about_rt3_title: "🏋️‍♂️ Iron & Stamina (Gym Session)",
    about_rt3_desc: "Progressive overload weightlifting. Physical discipline powers 10+ hours of coding focus.",
    about_rt4_title: "⚡ Personal Projects & AI Lab",
    about_rt4_desc: "Advancing Anime Chronicle, benchmarking AI prompts, and fine-tuning portfolio architecture.",
    about_rt5_title: "🇯🇵 Japanese Deck & Reading",
    about_rt5_desc: "Completing daily Anki N5/N4 vocabulary reviews and science reading before sleep.",
    
    // Bento Passions
    about_gym_tag: "BODY & MIND DISCIPLINE",
    about_gym_title: "Heavy Lifting & Mental Stamina 🏋️",
    about_gym_desc: "In the gym, progressive overload proves that real growth requires calculated consistency. I bring this exact relentless grit when debugging complex architectures.",
    about_jp_tag: "LANGUAGE EXPEDITION",
    about_jp_title: "日本語 (Japanese) Desk 🇯🇵",
    about_jp_desc: "Actively studying Japanese (advancing from <strong>JLPT N5 toward N4</strong>). Expanding access to Japanese software ecosystems and global engineering teams.",
    
    // Preferences (Likes vs Dislikes)
    about_pref_sticker: "DEV PHILOSOPHY & PREFERENCES ⚖️",
    about_likes_title: "THINGS I ADMIRE IN CODE",
    about_likes_1: "Clean, modular, and decoupled MVC architecture",
    about_likes_2: "Thoughtfully tuned dark mode interfaces",
    about_likes_3: "Lightning-fast API response times (< 100ms)",
    about_likes_4: "Self-documenting code written with human empathy",
    about_dislikes_title: "THINGS I AVOID LIKE A BUG",
    about_dislikes_1: "Monolithic spaghetti code without component boundaries",
    about_dislikes_2: "Unhandled promises and silent console failures",
    about_dislikes_3: "Bloated web apps overloaded with unnecessary packages",
    about_dislikes_4: "Cryptic git commits like 'fix stuff' without context",
    
    // Beyond & Connect
    about_beyond_sticker: "BEYOND CODE <span>🎯</span>",
    about_cert_sticker: "MY CERTIFICATES ☺",
    cert_desc: "Handpicked certified credentials validating computer science foundations, web engineering, and languages.",
    about_cert_btn: "All Certificates →",
    about_connect_sticker: "CONNECT WITH ME ☺",

        // NEW AVO CTA BANNER & DIRECT CONNECT CARD
    avo_sub_tag: "START A PROJECT • FAST & TRANSPARENT PROCESS",
    avo_cta_title: "Start building with Yanda today.",
    avo_cta_subtext: "Have an app idea, require a reliable Laravel backend, or need AI integration? Let's engineer the solution together.",
    direct_live_status: "OPEN TO WORK",
    direct_est_response: "⚡ < 30 Mins (Fast Reply)",
    direct_work_pref: "💼 Remote / Contract / Freelance",
    direct_core_focus: "🛠️ Laravel, React, APIs & AI",
    direct_btn_wa: "Direct WhatsApp Chat",

    footer_tagline: "Full-Stack Developer crafting scalable web applications, robust Laravel architectures, and AI integrations.",
    footer_available: "Available for Projects",
    footer_nav_title: "Navigation",
    footer_follow: "Connect",
    footer_contact_title: "Direct Contact",
    footer_call: "CALL / WHATSAPP",
    footer_write: "OFFICIAL EMAIL",
    footer_time_label: "LOCAL TIME (WIB)",

       proj_breadcrumb: "Home / <strong style='color: var(--accent-orange);'>Projects Archive</strong>",
    proj_hero_title: "Our Work.<br><span>Your Vision Realized.</span>",
    proj_hero_desc: "Every line of code tells a story of engineering dedication. From enterprise backend systems, offline-first web apps, to generative AI model integration.",
    proj_btn_explore: "Explore All Projects ↓",
    proj_btn_start: "Start a Project",
    catalog_badge: "Complete Portfolio",
    catalog_title: "Discover Completed Projects",
    catalog_desc: "Each project is engineered with high performance, clean MVC architecture, data security, and seamless UX in mind.",
    filter_all: "All",
    filter_fullstack: "Full-Stack",
    filter_frontend: "Frontend",
    filter_backend: "Backend",
    filter_ai: "AI & Python",
    filter_solo: "Solo Projects",
    filter_team: "Team / Duo",
    btn_gallery: "View Gallery & Details ➔",
    badge_solo: "Solo Project",
    badge_team: "Team (3 Devs)",
    badge_duo: "Duo Collab",

     // Di translations.en:
    cert_page_badge: "VERIFIED CREDENTIALS",
    cert_archive_title: "Certificates & Achievements",
    cert_archive_desc: "Verified credentials validating computer science foundations, web engineering, algorithmic problem solving, and national leadership.",
    cert_filter_all: "All",
    cert_filter_code: "Coding & CS",
    cert_filter_awards: "Awards & Honors",
    cert_filter_comp: "Competitions",
    cert_view_btn: "View Full Certificate ➔",

       // KHUSUS HALAMAN CONTACT & FORM
    contact_title: "Let's Talk",
    contact_intro: "Have a project in mind, need software engineering solutions, or just want to discuss tech? Feel free to reach out.",
    form_name: "Full Name",
    form_email: "Email Address",
    form_message: "Message / Project Details",
    form_send: "Send Message",
    detail_email: "OFFICIAL EMAIL",
    detail_location: "LOCATION & TIMEZONE",

       about_badge: "Who I Am",
    about_lead: "Turning Code Into Creative & Scalable Solutions",
    about_desc1: "I'm a full-stack developer dedicated to clean backend logic, scalable systems, and reactive user interfaces.",
    about_desc2: "Former software engineering intern at PT Garuda Cyber Indonesia. Currently independent, building high-impact web apps and open to engineering roles.",
    btn_read_more: "Read More About Me →",
    stat_projects: "Projects Built", stat_hours: "Hours Coding", stat_dedication: "% Dedication", stat_certs: "Certifications",

    tech_badge: "Stack & Frameworks",
    tech_title: "Technologies & Tools",
    tech_desc: "A curated collection of tools, programming languages, frameworks, and AI/ML domains I leverage daily.",
    skill_fe_title: "Frontend Engineering",
    skill_fe_desc: "HTML5, CSS3, JavaScript (ES6+), React.js, Responsive UI, Tailwind CSS, Bootstrap.",
    skill_be_title: "Backend & Server Logic",
    skill_be_desc: "PHP Modern, Laravel Framework, RESTful API Development, Python Scripting, Java basics.",
    skill_db_title: "Database Architecture",
    skill_db_desc: "MySQL, IndexedDB (Offline-First Storage), Relational Schema Design, Laragon environment.",
    skill_ai_title: "Artificial Intelligence & ML",
    skill_ai_desc: "LLM API integrations, prompt engineering, Python data fundamentals, and Deep Learning architecture.",
    lang_section_badge: "Global Communication",
    lang_section_title: "Language Proficiency",

    projects_badge: "Portfolio",
    projects_title: "Featured Projects",
    projects_desc: "Each project is engineered with high performance, clean architecture, and modern UX design in mind.",
    filter_all: "All", filter_fullstack: "Full-Stack", filter_frontend: "Frontend", filter_offline: "Offline-First",
    proj1_desc: "Interactive offline-first anime catalog application powered by IndexedDB with a 3D Book UI.",
    proj2_desc: "Multi-page portfolio website featuring dark mode, multi-language support, and interactive terminal.",
    proj3_desc: "Enterprise backend module engineering and relational data management using Laravel & MySQL.",
    view_more_link: "View Details →",

    pass_badge: "VERIFIED DEVELOPER PASS",
    pass_status: "Available for Work",
    pass_role: "Full-Stack Web Developer & AI/ML Technology Enthusiast",
    pass_label_loc: "BASE LOCATION", pass_label_wa: "BUSINESS WHATSAPP", pass_label_stack: "PRIMARY STACK", pass_label_lang: "LANGUAGES",
    pass_btn_wa: "Chat WhatsApp Business", pass_btn_copy: "Copy Portfolio Link", pass_caption: "SCAN TO OPEN ON MOBILE",

    faq_badge: "Questions & Answers",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Common inquiries about project availability, technical stack, and collaboration workflows.",
    faq_q1: "Is Yanda available for freelance or full-time contractual roles?",
    faq_a1: "Yes! I am actively open to freelance opportunities, long-term software partnerships, and full-time remote engineering roles.",
    faq_q2: "How is your readiness for international team communication?",
    faq_a2: "I communicate fluently in technical English (Professional 70%), and possess conversational basics in Japanese (JLPT N5 level).",
    faq_q3: "What is your primary technology choice for new applications?",
    faq_a3: "My primary backend engine is Laravel (PHP) with relational database design, paired with React.js or modern vanilla JS for reactive frontends.",
    faq_q4: "What is the fastest way to get in touch?",
    faq_a4: "You can reach me directly on my Business WhatsApp at +62 831-8338-2530 or via email at zoliandaalmaghribi@gmail.com.",

    coffee_title: "Give Me Some Coffee",
    coffee_desc: "If you enjoy my work or want to fuel my software engineering journey, a cup of coffee is greatly appreciated! ☕",
    coffee_hint: "Click to copy number",

    avo_sub_tag: "START A PROJECT • FAST & TRANSPARENT PROCESS",
    avo_cta_title: "Start building with Yanda today.",
    avo_cta_subtext: "Have an app idea, require a reliable Laravel backend, or need AI integration? Let's engineer the solution together.",
    direct_live_status: "OPEN TO WORK",
    direct_est_response: "⚡ < 30 Mins (Fast Reply)",
    direct_work_pref: "💼 Remote / Contract / Freelance",
    direct_core_focus: "🛠️ Laravel, React, APIs & AI",
    direct_btn_wa: "Direct WhatsApp Chat",
    footer_tagline: "Full-Stack Developer crafting scalable web applications, robust Laravel architectures, and AI integrations.",
    footer_available: "Available for Projects",
    footer_nav_title: "Navigation",
    footer_follow: "Connect",
    footer_contact_title: "Direct Contact",
    footer_call: "CALL / WHATSAPP",
    footer_write: "OFFICIAL EMAIL",
    footer_time_label: "LOCAL TIME (WIB)",
    footer_passion: "Crafted with Passion"
  },

  ja: {
    // ナビゲーション＆全般
    nav_home: "ホーム", nav_about: "自己紹介", nav_projects: "プロジェクト", nav_cert: "証明書", nav_contact: "お問い合わせ",
    hero_title: "こんにちは", btn_resume: "履歴書", btn_projects: "プロジェクト",
    hero_text1: "私はインドネシアのタンゲランを拠点とするフルスタック開発者で、現在Laravel、React、最新ウェブ技術を学んでいます。",
    hero_text2: "アイデアをバックエンドからフロントエンドアニメーションまで、実際の動く製品に仕上げることが好きです。",
    
    // --- ABOUT PAGE (日本語・自然な技術表現) ---
    about_hero_tag: "フルスタック専門職 • ARCH LINUX愛好家 • AI探求者 ⚡",
    about_who_sticker: "自己紹介 <span>☺</span>",
    about_bio: "ゾリアンダ・アル・マグリビ（活動名：<strong>Yandz.id</strong>）は、インドネシア・タンゲランを拠点とするフルスタックエンジニアです 🇮🇩。堅牢なLaravelバックエンド設計、最新リアクティブUI、AI（人工知能）統合に強みを持っています。",
    about_ast1_title: "現在の実務経験・インターン",
    about_ast1_desc: "現在、<strong>PT Garuda Cyber Indonesia</strong> 🦅 にてソフトウェアエンジニアとしてインターン中。リレーショナルDB設計、RESTful API構築、PHP/Laravel業務モジュール開発を担当しています。",
    about_ast2_title: "開発における行動規範",
    about_ast2_desc: "人間にとって読みやすいクリーンコード、描画速度の極限化、IndexedDBを活用したオフライン対応PWAの設計を徹底しています。",
    
    // IDE Component
    about_ide_sticker: "開発環境 <span>💻</span>",
    about_ide_copy: "コードをコピー",
    
    // Stats Metrics
    about_stats_sticker: "開発実績＆活動指標 📊",
    about_stat1_title: "完了プロジェクト",
    about_stat1_desc: "Webアプリケーション、管理ダッシュボード、オフラインカタログ、モダンUIなど多数開発。",
    about_stat2_title: "総コーディング時間",
    about_stat2_desc: "アルゴリズム構築、DB設計、UIアニメーション実装に費やした実践的時間。",
    about_stat3_title: "Gitコミット＆プッシュ",
    about_stat3_desc: "GitHub（@Zyan-Con）における定常的かつ継続的な開発アクティビティ。",
    about_stat4_title: "稼働安定性へのこだわり",
    about_stat4_desc: "ランタイムエラーの徹底排除と軽量高速なレスポンス性能の維持。",
    
    // Arch Linux Dojo
    about_dojo_sticker: "マイ・デジタル道場 <span>🐧</span>",
    about_dojo_badge: "Arch Linux 稼働環境",
    about_dojo_uptime: "稼働状況: 24/7 Hacker Flow",
    about_dojo_desc: "日常の開発OSとして<strong>Arch Linux</strong>を採用しています。環境を一から自作することで、メモリ効率、シェルスクリプト、Linuxカーネル内部の深い理解を培っています。",
    about_dojo_lbl1: "OS & カーネル",
    about_dojo_lbl2: "シェル & ターミナル",
    about_dojo_lbl3: "エディタ",
    about_dojo_lbl4: "ローカル環境",
    
    // Proof & Polaroid
    about_proof_sticker: "実務証明＆活動記録 📸",
    about_proof_sub: "企業インターンシップ、公的受賞、国際認定資格の実際の証明記録です。",
    about_pol1_title: "🏢 PT Garuda Cyber Indonesia 本社",
    about_pol1_desc: "開発チームと協働し、エンタープライズ向けLaravelバックエンドとデータ構造の設計を担当。",
    about_pol2_title: "🏆 Duta Inspirasi Indonesia",
    about_pol2_desc: "若手イノベーションおよびデジタルリーダーシップの功績により授与された国家表彰。",
    about_pol3_title: "🐍 ハーバード大学 CS50P Python",
    about_pol3_desc: "ハーバード大学提供の厳格なCS課題をクリアし修了したPythonプログラミング認定。",
    
    // Services I Offer
    about_services_sticker: "提供可能な開発サービス 🛠️",
    about_srv1_title: "フルスタックWeb開発",
    about_srv1_desc: "Laravel、React.js、RESTful APIを用いた高品質・高機能なWebシステム開発。",
    about_srv2_title: "オフライン対応PWA＆DB設計",
    about_srv2_desc: "IndexedDBローカル保存、サービスワーカー、高速MySQLスキーマの構築。",
    about_srv3_title: "AIモデル・API連携機能",
    about_srv3_desc: "GeminiやOpenAIなどのLLMエンドポイントを実用的なWeb機能へスムーズに統合。",
    about_srv4_title: "表示速度最適化＆セキュリティ",
    about_srv4_desc: "ピクセルパーフェクトなCSS実装、サブセコンド応答、セキュアなコード設計。",
    
    // Daily Routine
    about_routine_sticker: "日課・タイムライン <span>⏱️</span>",
    about_rt1_title: "🌅 朝のプロトコル",
    about_rt1_desc: "一日の開発目標設定、最新技術ドキュメントのインプット、スプリント計画。",
    about_rt2_title: "🏢 開発スプリント（PT Garuda Cyber）",
    about_rt2_desc: "バックエンド機能実装、Laravelロジックの検証、DBクエリの高速化。",
    about_rt3_title: "🏋️‍♂️ 肉体鍛錬（ジムセッション）",
    about_rt3_desc: "プログレッシブ・オーバーロードによる筋力向上。長時間の開発を支える強靭な体力作り。",
    about_rt4_title: "⚡ 個人開発＆AI実験ラボ",
    about_rt4_desc: "Anime Chronicleの拡張、新規AIモデル検証、ポートフォリオ改善。",
    about_rt5_title: "🇯🇵 日本語学習＆読書",
    about_rt5_desc: "AnkiによるN5/N4単語カード復習と科学技術書の読書。",
    
    // Bento Passions
    about_gym_tag: "心身の規律",
    about_gym_title: "ウエイトトレーニングと精神力 🏋️",
    about_gym_desc: "ジムでのトレーニングは、真の成果が毎日の規律正しい反復から生まれることを教えてくれます。この決して諦めない精神を、困難なバグの解決にそのまま注ぎ込んでいます。",
    about_jp_tag: "語学探究",
    about_jp_title: "日本語学習デスク 🇯🇵",
    about_jp_desc: "現在、<strong>日本語（JLPT N5からN4目標）</strong>を意欲的に学習中。日本のソフトウェアエコシステムやグローバルチームとの円滑な連携を目指しています。",
    
    // Preferences (Likes vs Dislikes)
    about_pref_sticker: "開発の美学とこだわり ⚖️",
    about_likes_title: "コードにおいて重視すること",
    about_likes_1: "美しくモジュール化されたクリーンなMVC構造",
    about_likes_2: "目に優しく洗練されたダークモードデザイン",
    about_likes_3: "100ms未満の超高速APIレスポンス",
    about_likes_4: "読む人への思いやりが込められた分かりやすいコード",
    about_dislikes_title: "避けるべきアンチパターン",
    about_dislikes_1: "責任分担のない混沌としたスパゲッティコード",
    about_dislikes_2: "コンソールで握りつぶされた未処理のエラー",
    about_dislikes_3: "不要なライブラリで肥大化した重量級Webサイト",
    about_dislikes_4: "文脈のない曖昧なGitコミットログ",
    
    // Beyond & Connect
    about_beyond_sticker: "趣味・コードを超えて <span>🎯</span>",
    about_cert_sticker: "保有認定資格 ☺",
    cert_desc: "コンピュータサイエンス、Web技術、語学力を証明する厳選された認定資格一覧です。",
    about_cert_btn: "すべての資格を見る →",
    about_connect_sticker: "お問い合わせ ☺",

    // Universal Footer
    footer_cta_badge: "共創の始まり",
    footer_cta_title: "アイデアや開発プロジェクトはありますか？<br><span>共に素晴らしいプロダクトを創り上げましょう。</span>",
    footer_cta_desc: "フリーランス案件、長期的な開発パートナーシップ、AI・Web技術のディスカッションをいつでも歓迎しています。",
    footer_cta_btn_wa: "公式WhatsAppで相談",
    footer_cta_btn_email: "メールを送信する",
    footer_tagline: "最新のパフォーマンス、清潔なアーキテクチャ、直感的なUI/UXを追求するフルスタック開発者。",
    footer_available: "新規案件・採用受付中",
    footer_nav_title: "ページ案内",
    footer_follow: "フォロー",
    footer_contact_title: "直接連絡先",
    footer_call: "電話 / WHATSAPP",
    footer_write: "公式メール",
    footer_time_label: "現地時間 (WIB / 日本 -2時間)",
    footer_passion: "情熱を込めて制作",
        // NEW AVO CTA BANNER & DIRECT CONNECT CARD (日本語・自然な表現)
    avo_sub_tag: "プロジェクト相談 • 迅速かつ明瞭な開発体制",
    avo_cta_title: "Yandaと共に、次のプロジェクトを始めましょう。",
    avo_cta_subtext: "Webアプリケーション開発、堅牢なLaravelバックエンド、AI機能の導入など、最適な解決策をご提案します。",
    direct_live_status: "お仕事受付中",
    direct_est_response: "⚡ 30分以内の迅速返信",
    direct_work_pref: "💼 リモート / 業務委託 / 案件",
    direct_core_focus: "🛠️ Laravel, React, APIs & AI",
    direct_btn_wa: "WhatsAppで直接相談する",

    footer_tagline: "最新のパフォーマンス、清潔なアーキテクチャ、直感的なUI/UXを追求するフルスタック開発者。",
    footer_available: "新規案件・採用受付中",
    footer_nav_title: "ページ案内",
    footer_follow: "フォロー",
    footer_contact_title: "直接連絡先",
    footer_call: "電話 / WHATSAPP",
    footer_write: "公式メール",
    footer_time_label: "現地時間 (WIB / 日本 -2時間)",

    proj_breadcrumb: "ホーム / <strong style='color: var(--accent-orange);'>制作実績アーカイブ</strong>",
    proj_hero_title: "確かな技術で、<br><span>構想を現実に。</span>",
    proj_hero_desc: "すべてのコードには開発への情熱が込められています。堅牢な企業向けバックエンドからオフラインPWA、生成AIモデルの連携まで幅広く手掛けています。",
    proj_btn_explore: "すべての実績を見る ↓",
    proj_btn_start: "開発のご相談",
    catalog_badge: "全制作実績",
    catalog_title: "完了したプロジェクト一覧",
    catalog_desc: "高速な応答速度、クリーンなMVC設計、データ保護、そして直感的なユーザー体験を徹底して追求しています。",
    filter_all: "すべて",
    filter_fullstack: "フルスタック",
    filter_frontend: "フロントエンド",
    filter_backend: "バックエンド",
    filter_ai: "AI・Python",
    filter_solo: "個人開発 (Solo)",
    filter_team: "チーム開発 (Team)",
    btn_gallery: "詳細・画像ギャラリー ➔",
    badge_solo: "個人開発",
    badge_team: "チーム開発 (3名)",
    badge_duo: "共同開発 (Duo)",

    // KHUSUS HALAMAN CONTACT & FORM (BAHASA JEPANG ALAMI)
    contact_title: "お問い合わせ",
    contact_intro: "Web開発案件、システム設計のご相談、技術的なディスカッションなど、いつでもお気軽にご連絡ください。",
    form_name: "お名前・貴社名",
    form_email: "メールアドレス",
    form_message: "お問い合わせ内容・開発要件",
    form_send: "メッセージを送信",
    detail_email: "公式メール",
    detail_location: "活動拠点・タイムゾーン",
        // Di translations.ja:
    cert_page_badge: "認定資格・公式表彰",
    cert_archive_title: "公式認定資格・受賞実績",
    cert_archive_desc: "コンピュータサイエンス、Web技術、アルゴリズム開発、国内外のコンペティションで取得した公的認定資格一覧です。",
    cert_filter_all: "すべて",
    cert_filter_code: "開発・CS",
    cert_filter_awards: "表彰・リーダーシップ",
    cert_filter_comp: "競技大会",
    cert_view_btn: "証明書を拡大表示 ➔",

      about_badge: "自己紹介",
    about_lead: "コードを創造的でスケーラブルなソリューションへ",
    about_desc1: "タンゲラン在住のフルスタックエンジニアです。クリーンなバックエンド設計と直感的なUI構築を行っています。",
    about_desc2: "PT Garuda Cyber Indonesiaにてバックエンド開発のインターンを修了。現在は独立し、フリーランス案件や開発協力を歓迎しています。",
    btn_read_more: "プロフィール詳細を見る →",
    stat_projects: "開発プロジェクト", stat_hours: "総コーディング時間", stat_dedication: "% 献身度", stat_certs: "保有認定資格",

    tech_badge: "技術とフレームワーク",
    tech_title: "使用技術と開発ツール",
    tech_desc: "私が習得・開発に活用しているプログラミング言語、フレームワーク、AI/ML技術一覧です。",
    skill_fe_title: "フロントエンド開発",
    skill_fe_desc: "HTML5、CSS3、JavaScript (ES6+)、React.js、レスポンシブUI、Tailwind CSS、Bootstrap。",
    skill_be_title: "バックエンド・サーバー設計",
    skill_be_desc: "モダンPHP、Laravelフレームワーク、RESTful API設計、Pythonスクリプト、Java基礎。",
    skill_db_title: "データベース設計",
    skill_db_desc: "MySQL、IndexedDB（オフライン対応ストレージ）、リレーショナルスキーマ設計、Laragon環境。",
    skill_ai_title: "人工知能（AI）＆機械学習",
    skill_ai_desc: "LLM API連携、プロンプトエンジニアリング、Pythonデータ処理、ディープラーニング基礎。",
    lang_section_badge: "語学力",
    lang_section_title: "多言語コミュニケーション",

    projects_badge: "制作実績",
    projects_title: "注目のプロジェクト",
    projects_desc: "高速なパフォーマンス、清潔な設計、優れたUI体験を重視して構築しています。",
    filter_all: "すべて", filter_fullstack: "フルスタック", filter_frontend: "フロントエンド", filter_offline: "オフラインPWA",
    proj1_desc: "IndexedDBを活用したオフライン対応の3Dブック型アニメカタログWebアプリ。",
    proj2_desc: "ダークモード、多言語対応、カスタムカーソル、アニメーションを備えた個人ポートフォリオ。",
    proj3_desc: "LaravelとMySQLを用いたバックエンド機能実装および企業データ管理システム。",
    view_more_link: "詳細を見る →",

    pass_badge: "認証済み開発者パス",
    pass_status: "お仕事受付中",
    pass_role: "フルスタックエンジニア & AI/ML愛好家",
    pass_label_loc: "活動拠点",
    pass_label_wa: "ビジネスWHATSAPP",
    pass_label_stack: "主要スキル",
    pass_label_lang: "対応言語",
    pass_btn_wa: "WhatsAppでお問い合わせ",
    pass_btn_copy: "リンクをコピー",
    pass_caption: "スマホカメラで読み取り",

    faq_badge: "よくあるご質問",
    faq_title: "よくある質問 (FAQ)",
    faq_desc: "お仕事の依頼、採用、使用技術に関する質問をまとめました。",
    faq_q1: "フリーランスや長期契約の案件は受け付けていますか？",
    faq_a1: "はい！フリーランス案件、長期プロジェクト、リモートでの業務委託開発に積極的に対応しています。",
    faq_q2: "グローバルチームでの英語や日本語の対応は可能ですか？",
    faq_a2: "技術英語での業務コミュニケーション（実務レベル70%）が可能です。また、基礎的な日本語会話（JLPT N5レベル）にも対応しています。",
    faq_q3: "新規開発で主に使用している技術スタックは何ですか？",
    faq_a3: "信頼性の高いLaravel (PHP)とリレーショナルDB設計をバックエンドに採用し、React.js等をフロントエンドに組み合わせて開発しています。",
    faq_q4: "最も素早く連絡が取れる方法はどれですか？",
    faq_a4: "公式ビジネスWhatsApp (+62 831-8338-2530) またはメール (zoliandaalmaghribi@gmail.com) より迅速にご返信いたします。",

    coffee_title: "コーヒーをおごる",
    coffee_desc: "私の制作物や開発への挑戦を応援していただけるなら、一杯のコーヒーのご支援が大きな力になります！ ☕",
    coffee_hint: "クリックして番号をコピー",

    avo_sub_tag: "プロジェクト相談 • 迅速かつ明瞭な開発体制",
    avo_cta_title: "Yandaと共に、次のプロジェクトを始めましょう。",
    avo_cta_subtext: "Webアプリケーション開発、堅牢なLaravelバックエンド、AI機能の導入など、最適な解決策をご提案します。",
    direct_live_status: "お仕事受付中",
    direct_est_response: "⚡ 30分以内の迅速返信",
    direct_work_pref: "💼 リモート / 業務委託 / 案件",
    direct_core_focus: "🛠️ Laravel, React, APIs & AI",
    direct_btn_wa: "WhatsAppで直接相談する",
    footer_tagline: "最新のパフォーマンス、清潔なアーキテクチャ、直感的なUI/UXを追求するフルスタック開発者。",
    footer_available: "新規案件・採用受付中",
    footer_nav_title: "ページ案内",
    footer_follow: "フォロー",
    footer_contact_title: "直接連絡先",
    footer_call: "電話 / WHATSAPP",
    footer_write: "公式メール",
    footer_time_label: "現地時間 (WIB / 日本 -2時間)",
    footer_passion: "情熱を込めて制作"
    
  }
};

// ============================================
// 8. FUNGSI GANTI BAHASA (INNERHTML SAFE - NO TEXTCONTENT BUG!)
// ============================================
function setLanguage(lang) {
  if (!translations[lang]) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      // WAJIB innerHTML agar tag <br> dan <span> dieksekusi benar!
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('language', lang);
}

const savedLang = localStorage.getItem('language') || 'id';

document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();
  setLanguage(savedLang);
});

// ============================================
// 9. ANIMASI INTERAKTIF & SPOTLIGHT
// ============================================
document.querySelectorAll('.glow-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Animasi Bar Bahasa Saat Scroll
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.lang-bar-fill').forEach((bar) => {
        bar.style.width = bar.style.getPropertyValue('--val');
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const langCard = document.querySelector('.language-card');
if (langCard) langObserver.observe(langCard);

// Scroll Run-In & Run-Out Observer
const runObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const el = entry.target;
    if (entry.isIntersecting) {
      el.classList.add('run-in');
      el.classList.remove('run-out');
    } else {
      if (entry.boundingClientRect.top < 0) {
        el.classList.add('run-out');
        el.classList.remove('run-in');
      } else {
        el.classList.remove('run-in', 'run-out');
      }
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.run-item').forEach(el => runObserver.observe(el));

// Text Decrypt / Hacker Scramble Effect
const scrambleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function scrambleText(element) {
  const originalText = element.dataset.original || element.textContent.trim();
  element.dataset.original = originalText;
  let iteration = 0;

  clearInterval(element.scrambleInterval);

  element.scrambleInterval = setInterval(() => {
    element.textContent = originalText
      .split("")
      .map((char, index) => {
        if (index < iteration) return originalText[index];
        if (char === " ") return " ";
        return scrambleLetters[Math.floor(Math.random() * scrambleLetters.length)];
      })
      .join("");

    if (iteration >= originalText.length) {
      clearInterval(element.scrambleInterval);
    }
    iteration += 1 / 2;
  }, 30);
}

const scrambleObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrambleText(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-scramble]').forEach(el => scrambleObserver.observe(el));

// ============================================
// 10. FAQ ACCORDION INTERACTION
// ============================================
function toggleFaq(card) {
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));
  if (!isOpen) {
    card.classList.add('open');
  }
}

// ============================================
// 11. FITUR SALIN LINK & NOMOR DANA (1-CLICK)
// ============================================
function copyPortfolioLink(btn) {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Link Disalin!';
    btn.style.borderColor = '#22c55e';
    btn.style.color = '#22c55e';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 2500);
  });
}

function copyDanaNumber(number, cardElement) {
  navigator.clipboard.writeText(number).then(() => {
    const hint = cardElement.querySelector('.donation-hint');
    const originalText = hint.textContent;
    
    hint.textContent = 'Nomor DANA Berhasil Disalin! ✓';
    hint.style.color = '#22c55e';
    hint.style.fontWeight = 'bold';

    setTimeout(() => {
      hint.textContent = originalText;
      hint.style.color = '';
      hint.style.fontWeight = '';
    }, 2500);
  });
}

// ============================================
// 12. INTERACTIVE DEVELOPER TERMINAL (WITH ANIME COMMAND!)
// ============================================
const termInput = document.getElementById('terminalInput');
const termBody = document.getElementById('terminalBody');

if (termInput) {
  termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const command = this.value.trim().toLowerCase();
      this.value = '';

      const userLine = document.createElement('div');
      userLine.className = 'term-line';
      userLine.innerHTML = `<span class="term-user">visitor@yandz.id:~$</span> <span class="term-text">${command}</span>`;
      termBody.insertBefore(userLine, this.parentElement);

      let response = '';
      switch (command) {
        case 'help':
          response = 'Available commands: <br>• <strong>skills</strong>: view all technical stack<br>• <strong>contact</strong>: show WhatsApp & email<br>• <strong>whoami</strong>: about Yanda<br>• <strong>anime</strong>: favorite quotes & otaku motto<br>• <strong>clear</strong>: clean terminal console';
          break;
        case 'skills':
          response = 'Core Stack: HTML5, CSS3, JavaScript, React.js, Python, Java, PHP, Laravel, MySQL, AI/ML APIs.';
          break;
        case 'contact':
          response = 'WhatsApp Business: +62 831-8338-2530<br>Email: zoliandaalmaghribi@gmail.com';
          break;
        case 'whoami':
          response = 'Zolianda Al Maghribi (Yanda) - Full-Stack Developer based in Tangerang, Indonesia.';
          break;
        case 'anime':
          response = '🎌 <strong>Favorite Anime & Tech Quotes:</strong><br>' +
                     '• <em>"あきらめたら そこで試合終了ですよ"</em> — 安西先生 (Slam Dunk)<br>' +
                     '• <em>"Nothing begins until you take the first step."</em> — Steins;Gate<br>' +
                     '• Current Project: <strong>Anime Chronicle (3D Book + IndexedDB)</strong>';
          break;
        case 'clear':
          const lines = termBody.querySelectorAll('.term-line:not(:last-child), .term-output');
          lines.forEach(line => line.remove());
          return;
        default:
          response = `bash: command not found: ${command}. Type <strong>'help'</strong> for available commands.`;
      }

      const out = document.createElement('div');
      out.className = 'term-output';
      out.innerHTML = response;
      termBody.insertBefore(out, this.parentElement);
      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}

// ============================================
// 13. PARALLAX CONTROLLER & LIVE WIB CLOCK (SINGLE & CLEAN)
// ============================================
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = Math.min(Math.max(scrollTop / (docHeight || 1), 0), 1);
  document.documentElement.style.setProperty('--scroll-percent', ratio.toFixed(3));
}, { passive: true });

function updateLocalTime() {
  const timeEl = document.getElementById('footerLocalTime');
  if (!timeEl) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  timeEl.textContent = `${timeString} WIB`;
}

setInterval(updateLocalTime, 1000);
updateLocalTime();


// Update sendMessage agar asinkron memanggil AI asli
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  if (!input || !messages) return;

  const userText = input.value.trim();
  if (userText === '') return;

  // Tampilkan bubble user
  const userBubble = document.createElement('div');
  userBubble.classList.add('chat-bubble', 'user');
  userBubble.textContent = userText;
  messages.appendChild(userBubble);

  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Efek mengetik
  const typingBubble = document.createElement('div');
  typingBubble.classList.add('chat-bubble', 'bot', 'typing-indicator');
  typingBubble.innerHTML = '<span></span><span></span><span></span>';
  messages.appendChild(typingBubble);
  messages.scrollTop = messages.scrollHeight;

  // Panggil AI Beneran!
  const aiAnswer = await getBotResponse(userText);

  typingBubble.remove();
  const botBubble = document.createElement('div');
  botBubble.classList.add('chat-bubble', 'bot');
  botBubble.innerHTML = aiAnswer.replace(/\n/g, '<br>');
  messages.appendChild(botBubble);
  messages.scrollTop = messages.scrollHeight;
}

// ============================================
// COPY CODE SNIPPET (VS CODE IDE IN ABOUT)
// ============================================
function copyCodeSnippet(button) {
  const codeBlock = button.closest('.ide-window').querySelector('code');
  if (!codeBlock) return;

  navigator.clipboard.writeText(codeBlock.innerText).then(() => {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    button.style.background = '#22c55e';
    button.style.color = '#fff';

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  });
}

// AVO FOOTER DIRECT MESSAGE HANDLER
function handleAvoContact(e) {
  e.preventDefault();
  const input = document.getElementById('avoQuickInput');
  if (!input) return;

  const userMsg = input.value.trim();
  if (userMsg === '') return;

  const waURL = `https://wa.me/6283183382530?text=${encodeURIComponent('Halo Yanda, pesan dari website: ' + userMsg)}`;
  window.open(waURL, '_blank');
  input.value = '';
}

// LIVE WIB TIME UPDATER
function updateAvoTime() {
  const el = document.getElementById('avoLiveTime');
  const footerEl = document.getElementById('footerLocalTime');
  const now = new Date();
  const timeStr = `${now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB`;
  
  if (el) el.textContent = timeStr;
  if (footerEl) footerEl.textContent = timeStr;
}
setInterval(updateAvoTime, 1000);
updateAvoTime();

// ============================================
// PROJECT 4-5 PHOTO GALLERY & LIGHTBOX ENGINE
// ============================================
const projectGalleries = {
  anime: {
    title: "Anime Chronicle Web App",
    desc: "Aplikasi katalog anime berbasis IndexedDB offline-first dengan tampilan 3D Book interaktif.",
    team: "Solo Project",
    demo: "https://fanciful-kangaroo-d3690e.netlify.app/index.html",
    github: "https://github.com/Zyan-Con/Anime-Chronicle.git",
    photos: [
      "images/image copy.png",
      "images/project/image.png",
      "images/project/image copy.png",
      "images/project/image copy 2.png"
    ]
  },
  garuda: {
    title: "Garuda Cyber Enterprise Suite",
    desc: "Modul backend enterprise dan manajemen database relasional tingkat lanjut menggunakan Laravel & MySQL.",
    team: "Team (3 Devs) • Internship",
    github: "https://github.com/Zyan-Con",
    photos: [
      "images/project/WhatsApp Image 2026-10-18 at 09.15.45.jpeg",
    ]
  },
  portfolio: {
    title: "Developer Portfolio v2",
    desc: "Portofolio arsitektur modern dengan dark mode, multi-bahasa terintegrasi, dan terminal interaktif.",
    team: "Solo Project",
    demo: "index.html",
    github: "https://github.com/Zyan-Con",
    photos: [
      "images/project/image copy 5.png",
      "images/project/image copy 6.png",
      "images/project/image copy 7.png",
    ]
  },
  ai: {
    title: "AI Neural Doc Analyzer",
    desc: "Alat ekstraksi dokumen otomatis berbasis kecerdasan buatan LLM (Gemini API & Python FastAPI).",
    team: "Duo Collab",
    github: "https://github.com/Zyan-Con",
    photos: [
      "images/image copy 2.png",
    ]
  },
  inventory: {
    title: "StoreInventory Pro PWA",
    desc: "Aplikasi kasir dan manajemen stok barang offline-first dengan ekspor file laporan CSV lokal.",
    team: "Solo Project",
    github: "https://github.com/Zyan-Con",
    photos: [
      "images/image copy.png",
      "images/profile.jpg",
      "images/WhatsApp Image 2026-07-30 at 14.21.21.jpeg",
      "images/image copy.png"
    ]
  },
  api: {
    title: "High-Throughput REST Engine",
    desc: "Arsitektur microservices backend Laravel dengan caching Redis, Docker, dan autentikasi token JWT.",
    team: "Team (3 Devs)",
    github: "https://github.com/Zyan-Con",
    photos: [
      "images/project/image copy 3.png",
      "images/project/image copy 4.png",
    ]
  }
};

let currentProjectKey = 'anime';
let currentPhotoIndex = 0;

function openProjectGallery(projectKey) {
  const data = projectGalleries[projectKey];
  if (!data) return;

  currentProjectKey = projectKey;
  currentPhotoIndex = 0;

  document.getElementById('galleryTitle').textContent = data.title;
  document.getElementById('galleryDesc').textContent = data.desc;
  document.getElementById('galleryTeamBadge').textContent = data.team;

  // Render Tombol Demo & GitHub
  const linksContainer = document.getElementById('galleryLinks');
  linksContainer.innerHTML = '';
  if (data.demo) {
    linksContainer.innerHTML += `<a href="${data.demo}" target="_blank" class="gpd-link-demo"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`;
  }
  if (data.github) {
    linksContainer.innerHTML += `<a href="${data.github}" target="_blank" class="gpd-link-git"><i class="fa-brands fa-github"></i> Source Code</a>`;
  }

  // Render Deretan Thumbnail 4-5 Foto
  const thumbsRow = document.getElementById('galleryThumbsRow');
  thumbsRow.innerHTML = '';
  data.photos.forEach((src, idx) => {
    thumbsRow.innerHTML += `
      <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" onclick="selectGalleryPhoto(${idx})">
        <img src="${src}" alt="Thumb ${idx + 1}">
      </div>
    `;
  });

  updateGalleryDisplay();
  const modal = document.getElementById('projectGalleryModal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function selectGalleryPhoto(idx) {
  currentPhotoIndex = idx;
  updateGalleryDisplay();
}

function changeGalleryPhoto(direction) {
  const photos = projectGalleries[currentProjectKey].photos;
  currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
  updateGalleryDisplay();
}

function updateGalleryDisplay() {
  const data = projectGalleries[currentProjectKey];
  document.getElementById('galleryMainImg').src = data.photos[currentPhotoIndex];
  document.getElementById('galleryPhotoCounter').textContent = `${currentPhotoIndex + 1} / ${data.photos.length}`;

  // Update Thumbnail Aktif
  document.querySelectorAll('.gallery-thumb-item').forEach((item, idx) => {
    item.classList.toggle('active', idx === currentPhotoIndex);
  });
}

function closeProjectGallery() {
  const modal = document.getElementById('projectGalleryModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Filter Proyek di Katalog
function filterCatalog(category, btn) {
  document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('#projectsCatalogGrid .catalog-card');
  let count = 0;

  cards.forEach(card => {
    const cats = card.getAttribute('data-category') || '';
    if (category === 'all' || cats.includes(category)) {
      card.style.display = 'flex';
      count++;
    } else {
      card.style.display = 'none';
    }
  });

  document.getElementById('visibleCount').textContent = count;
}

// Filter Kategori di Halaman Certificate Archive
function filterCertificates(category, btn) {
  document.querySelectorAll('.cert-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('#certGridContainer .cert-modern-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    if (category === 'all' || cardCat.includes(category)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const counterEl = document.getElementById('certVisibleCount');
  if (counterEl) counterEl.textContent = visibleCount;
}

// ============================================
// KHUSUS LOGIKA CONTACT FORM & CLIPBOARD
// ============================================

// 1. Submit Form Kontak
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const successBox = document.getElementById('formSuccess');

  if (successBox) successBox.classList.add('active');
  form.reset();

  // Animasi konfeti jika fungsi createConfetti ada
  if (typeof createConfetti === 'function') {
    for (let i = 0; i < 25; i++) {
      createConfetti();
    }
  }

  setTimeout(() => {
    if (successBox) successBox.classList.remove('active');
  }, 4000);
}

// 2. Salin Alamat Email / Nomor (1-Click Copy)
function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const hint = element.querySelector('.card-hint, .label');
    if (!hint) return;
    const originalText = hint.textContent;

    hint.textContent = 'Berhasil Disalin! ✓';
    hint.style.color = '#22c55e';
    hint.style.fontWeight = 'bold';

    setTimeout(() => {
      hint.textContent = originalText;
      hint.style.color = '';
      hint.style.fontWeight = '';
    }, 2000);
  });
}

// 3. Quick Message di Footer Avo langsung ke WhatsApp
function handleAvoContact(e) {
  e.preventDefault();
  const input = document.getElementById('avoQuickInput');
  if (!input) return;

  const userMsg = input.value.trim();
  if (userMsg === '') return;

  const waURL = `https://wa.me/6283183382530?text=${encodeURIComponent('Halo Yanda, pesan dari website: ' + userMsg)}`;
  window.open(waURL, '_blank');
  input.value = '';
}

// ============================================
// CYBER-APERTURE PRELOADER & SEAMLESS TRANSITION
// ============================================
const preloader = document.getElementById('cyberPreloader');
const counterEl = document.getElementById('preloaderCounter');
const statusTextEl = document.getElementById('preloaderStatusText');

function finishPreloader() {
  if (!preloader) return;
  if (counterEl) counterEl.textContent = '100';
  if (statusTextEl) statusTextEl.textContent = 'SYSTEM MOUNTED • READY';

  setTimeout(() => {
    preloader.classList.add('loaded');
    document.body.style.overflow = '';
  }, 200);
}

if (preloader) {
  let count = 0;
  const statusSteps = [
    { at: 25, text: "FETCHING ASSETS & ARCHITECTURE" },
    { at: 65, text: "MOUNTING NEURAL MODULES" },
    { at: 90, text: "OPTIMIZING PERFORMANCE" }
  ];

  // Hitung Cepat 0 -> 100 dalam ~0.6 detik
  const countInterval = setInterval(() => {
    count += Math.floor(Math.random() * 12) + 6;
    
    statusSteps.forEach(step => {
      if (count >= step.at && statusTextEl) {
        statusTextEl.textContent = step.text;
      }
    });

    if (count >= 100) {
      count = 100;
      clearInterval(countInterval);
      finishPreloader();
    }

    if (counterEl) {
      // Format 3 digit (001, 045, 100)
      counterEl.textContent = count.toString().padStart(3, '0');
    }
  }, 35);

  // Pengaman Darurat (Maksimal 1.2s langsung buka)
  setTimeout(() => {
    clearInterval(countInterval);
    finishPreloader();
  }, 1200);
}

// Transisi Halus Saat Klik Link Menu Pindah Halaman
document.querySelectorAll('a[href$=".html"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetUrl = link.getAttribute('href');

    // Abaikan jika buka tab baru, link kosong, atau halaman yang sama
    if (e.ctrlKey || e.metaKey || link.target === '_blank' || targetUrl === window.location.pathname.split('/').pop()) {
      return;
    }

    e.preventDefault();
    if (preloader) {
      preloader.classList.remove('loaded'); // Tutup kembali tirai
      if (counterEl) counterEl.textContent = '080';
      if (statusTextEl) statusTextEl.textContent = 'TRANSMITTING VIEW...';
    }

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 280); // 280ms: Sangat cepat layaknya single page app
  });
});
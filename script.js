// ==========================================
// QasinoTok — Толық script.js
// ==========================================

// 1. ДЕМО ВИДЕОЛАР БАЗАСЫ
const demoVideos = [
  {
    id: 1,
    author: "qasino_admin",
    avatar: "https://i.pravatar.cc/150?u=1",
    caption: "QasinoTok-қа қош келдіңіз! 🎉 #qasinotok #тренд",
    music: "Original Sound — QasinoTok",
    likes: 1200,
    comments: [],
    shares: 45,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    id: 2,
    author: "traveler_kz",
    avatar: "https://i.pravatar.cc/150?u=2",
    caption: "Таулардағы таңғы ас 🏔️ #табиғат #travel",
    music: "Sunrise — Chill Beats",
    likes: 850,
    comments: [],
    shares: 12,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    id: 3,
    author: "coder_life",
    avatar: "https://i.pravatar.cc/150?u=3",
    caption: "Код жазу — өнер! 💻 #coding #javascript",
    music: "Lo-Fi Coding — Beats",
    likes: 3400,
    comments: [],
    shares: 210,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
  }
];

// 2. FEED-КЕ ВИДЕОЛАРДЫ ШЫҒАРУ ФУНКЦИЯСЫ
const videoFeed = document.getElementById('videoFeed');

function renderFeed() {
  videoFeed.innerHTML = ''; // Тазалау
  demoVideos.forEach((vid, index) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <video src="${vid.videoUrl}" loop playsinline muted></video>
      <div class="video-overlay"></div>
      
      <!-- Оң жақтағы батырмалар -->
      <div class="video-actions">
        <img src="${vid.avatar}" class="action-avatar" alt="avatar">
        <button class="action-btn like-btn" data-id="${vid.id}">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <span class="count">${vid.likes}</span>
        </button>
        <button class="action-btn comment-btn" data-id="${vid.id}">
          <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z"/></svg>
          <span class="count">0</span>
        </button>
        <button class="action-btn share-btn" data-id="${vid.id}">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          <span class="count">${vid.shares}</span>
        </button>
      </div>

      <!-- Төменгі сол жақтағы ақпарат -->
      <div class="video-info">
        <div class="video-author">
          <img src="${vid.avatar}" alt="avatar" style="width:32px;height:32px;border-radius:50%;">
          <span class="author-name">@${vid.author}</span>
        </div>
        <div class="video-caption">${vid.caption}</div>
        <div class="video-music">
          <svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <span>${vid.music}</span>
        </div>
      </div>
    `;
    videoFeed.appendChild(card);
  });

  setupVideoObservers();
}

// 3. ВИДЕОЛАРДЫ АВТОМАТТЫ ОЙНАТУ (SCROLL)
function setupVideoObservers() {
  const videos = document.querySelectorAll('.video-card video');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        // Экранға кіргенде ойнату
        video.play().catch(() => {});
        // Басқа видеоларды тоқтату
        videos.forEach(v => { if (v !== video) v.pause(); });
      } else {
        // Экраннан шыққанда тоқтату
        video.pause();
      }
    });
  }, { threshold: 0.6 }); // 60% көрінгенде ойнатады

  videos.forEach(v => observer.observe(v));
}

// 4. БАТЫРМАЛАРДЫ БАСУ (Лайк, Пікір, Бөлісу)
document.addEventListener('click', (e) => {
  // Лайк
  const likeBtn = e.target.closest('.like-btn');
  if (likeBtn) {
    likeBtn.classList.toggle('liked');
    const countSpan = likeBtn.querySelector('.count');
    let count = parseInt(countSpan.innerText);
    countSpan.innerText = likeBtn.classList.contains('liked') ? count + 1 : count - 1;
  }

  // Пікір (әзірге alert)
  const commentBtn = e.target.closest('.comment-btn');
  if (commentBtn) alert('Пікір жазу терезесі ашылды (жақында қосылады)');

  // Бөлісу
  const shareBtn = e.target.closest('.share-btn');
  if (shareBtn) {
    if (navigator.share) {
      navigator.share({ title: 'QasinoTok', text: 'Бұл видеоны қараңыз!', url: window.location.href });
    } else {
      alert('Сілтеме көшірілді!');
    }
  }
});

// 5. ТӨМЕНГІ НАВИГАЦИЯ (Беттерді ауыстыру)
const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const pageName = btn.dataset.page;
    
    // Батырмалардың активтігін өзгерту
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Беттерді ауыстыру
    pages.forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById('page-' + pageName);
    if (targetPage) targetPage.classList.add('active');
  });
});

// 6. ІСКЕ ҚОСУ
document.addEventListener('DOMContentLoaded', () => {
  renderFeed();
});

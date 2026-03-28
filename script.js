// ===========================
// CURSOR PERSONALIZADO
// ===========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .mojito-card, .filtro-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.transform = 'translate(-50%,-50%) scale(1.4)';
    follower.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.opacity = '0.5';
  });
});

// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// MENU HAMBURGUESA
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ===========================
// FADE-UP ANIMACIONES
// ===========================
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ===========================
// CONTADOR DE STATS
// ===========================
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(num => counterObserver.observe(num));

function animateCounter(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 25);
}

// ===========================
// DATOS DEL CATÁLOGO
// ===========================
const mojitos = [
  {
    nombre: 'Mojito Clásico',
    desc: 'La receta original. Ron blanco, menta fresca, limón, azúcar y agua con gas.',
    precio: '$4.500',
    emoji: '🍃',
    categoria: 'clasico',
    badge: null,
    gradiente: 'linear-gradient(135deg, #0d2416, #1a4a2a)',
  },
  {
    nombre: 'Mojito de Frutilla',
    desc: 'Frutillas frescas trituradas con menta, ron y un toque de limón. Irresistible.',
    precio: '$5.200',
    emoji: '🍓',
    categoria: 'frutal',
    badge: 'Popular',
    badgeType: 'hot',
    gradiente: 'linear-gradient(135deg, #2a0d12, #4a1a22)',
  },
  {
    nombre: 'Mojito de Maracuyá',
    desc: 'Maracuyá tropical, menta y ron premium. El preferido del verano.',
    precio: '$5.200',
    emoji: '🟡',
    categoria: 'frutal',
    badge: 'Nuevo',
    badgeType: 'new',
    gradiente: 'linear-gradient(135deg, #1f1a05, #3d3210)',
  },
  {
    nombre: 'Mojito de Mango',
    desc: 'Mango dulce natural con ron, limón y hierbabuena fresca. Tropical al máximo.',
    precio: '$5.500',
    emoji: '🥭',
    categoria: 'frutal',
    badge: null,
    gradiente: 'linear-gradient(135deg, #221506, #453015)',
  },
  {
    nombre: 'Mojito Rosa',
    desc: 'Con frambuesa, rosas y ron rosado. Elegante, suave y delicioso.',
    precio: '$5.800',
    emoji: '🌹',
    categoria: 'especial',
    badge: 'Premium',
    badgeType: '',
    gradiente: 'linear-gradient(135deg, #250d1a, #4a1530)',
  },
  {
    nombre: 'Mojito Cítrico',
    desc: 'Naranja, toronja y limón con ron añejo y menta. Explosión de cítricos.',
    precio: '$5.000',
    emoji: '🍊',
    categoria: 'frutal',
    badge: null,
    gradiente: 'linear-gradient(135deg, #1f1006, #3a2210)',
  },
  {
    nombre: 'Mojito Virgen',
    desc: 'Sin alcohol. Todo el sabor, todo el frescor, sin el ron. Perfecto para todos.',
    precio: '$3.500',
    emoji: '🌿',
    categoria: 'clasico',
    badge: null,
    gradiente: 'linear-gradient(135deg, #0a200e, #183a1f)',
  },
  {
    nombre: 'Mojito Especial Chef',
    desc: 'Receta secreta de la casa. Pepino, albahaca, ron añejo y hierbabuena. Una experiencia única.',
    precio: '$6.500',
    emoji: '👨‍🍳',
    categoria: 'especial',
    badge: 'Exclusivo',
    badgeType: 'hot',
    gradiente: 'linear-gradient(135deg, #0d1a1a, #1a3535)',
  },
];

// ===========================
// RENDERIZAR CARDS
// ===========================
function renderCards(filtro = 'all') {
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';

  const filtrados = filtro === 'all' ? mojitos : mojitos.filter(m => m.categoria === filtro);

  filtrados.forEach((mojito, i) => {
    const card = document.createElement('div');
    card.className = 'mojito-card fade-up';
    card.style.transitionDelay = `${i * 0.08}s`;

    const badgeHTML = mojito.badge
      ? `<span class="card-badge-top ${mojito.badgeType || ''}">${mojito.badge}</span>`
      : '';

    card.innerHTML = `
      <div class="card-emoji-bg" style="--card-bg: ${mojito.gradiente}">
        ${badgeHTML}
        <span class="card-emoji">${mojito.emoji}</span>
      </div>
      <div class="card-body">
        <h3 class="card-name">${mojito.nombre}</h3>
        <p class="card-desc">${mojito.desc}</p>
        <div class="card-footer">
          <div class="card-price">
            ${mojito.precio} <small>/ unidad</small>
          </div>
          <a href="https://wa.me/56972850740?text=Hola!%20quiero%20pedir%20un%20${encodeURIComponent(mojito.nombre)}%20🍃"
             target="_blank"
             class="card-btn">
            <i class="fa-brands fa-whatsapp"></i> Pedir
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);

    // Observar fade-up
    setTimeout(() => observer.observe(card), 10);
  });
}

// ===========================
// FILTROS
// ===========================
const filtros = document.querySelectorAll('.filtro-btn');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(btn.getAttribute('data-filter'));
  });
});

// Render inicial
renderCards();

// ===========================
// SCROLL SUAVE AL INICIO
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

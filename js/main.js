// ===== DOM Elements =====
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const heroCard = document.getElementById('hero-card');
const canvas = document.getElementById('particles-canvas');

let countersStarted = false;

// ===== Loader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAOS();
    }, 600);
});

// ===== Navbar Scroll =====
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    backToTop.classList.toggle('visible', window.scrollY > 400);
    updateActiveNav();
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const offset = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (offset >= top && offset < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

// ===== Hamburger =====
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

document.addEventListener('click', e => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// ===== Back to Top =====
backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== Typewriter =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Data Engineer & AI Developer',
    'Machine Learning Engineer',
    'Big Data Pipeline Architect',
    'Full-Stack Developer',
    'Cloud & DevOps Enthusiast'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function runTypewriter() {
    if (!typewriterEl) return;
    const phrase = phrases[phraseIdx];
    typewriterEl.textContent = deleting ? phrase.slice(0, --charIdx) : phrase.slice(0, ++charIdx);
    let delay = deleting ? 35 : 65;
    if (!deleting && charIdx === phrase.length) { deleting = true; delay = 1500; }
    if (deleting && charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 400; }
    setTimeout(runTypewriter, delay);
}
runTypewriter();

// ===== Stat Counters =====
function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = Number(counter.dataset.count || 0);
        const start = performance.now();
        const duration = 1200;
        const step = ts => {
            const progress = Math.min((ts - start) / duration, 1);
            counter.textContent = String(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    });
}

// ===== Scroll Animations (AOS) =====
function initAOS() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = Number(entry.target.dataset.aosDelay || 0);
            setTimeout(() => entry.target.classList.add('aos-animate'), delay);
            if (entry.target.id === 'about' || entry.target.closest('#about')) {
                animateCounters();
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-aos], section').forEach(el => observer.observe(el));
}

// ===== Hero Card 3D Tilt =====
if (heroCard && window.innerWidth > 1024) {
    heroCard.addEventListener('mousemove', e => {
        const rect = heroCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        heroCard.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 12}deg)`;
    });
    heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
}

// ===== Contact Form =====
contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const original = btn.innerHTML;
    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const message = contactForm.querySelector('#message').value;
    const link = `mailto:mohamedtamzirtai@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    setTimeout(() => {
        window.location.href = link;
        btn.innerHTML = '<span>Done!</span><i class="fas fa-check"></i>';
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; contactForm.reset(); }, 1200);
    }, 400);
});

// ===== Copy Code Button =====
const copyBtn = document.querySelector('.card-action');
const codeBlock = document.querySelector('.code-lines code');
if (copyBtn && codeBlock && navigator.clipboard) {
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(codeBlock.innerText);
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        } catch { copyBtn.innerHTML = '<i class="fas fa-times"></i>'; }
        setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy"></i>'; }, 1000);
    });
}

// ===== Particle Background =====
function initParticles() {
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() {
        w = canvas.width = canvas.parentElement.offsetWidth;
        h = canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    const count = Math.min(60, Math.floor(w * h / 15000));
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.4 + 0.1
        });
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(13,148,136,${p.o})`;
            ctx.fill();
            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x, dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(13,148,136,${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }
    draw();
}
initParticles();

// ===== Reduced Motion =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
}

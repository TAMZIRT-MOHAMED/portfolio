const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');
const heroCard = document.querySelector('.hero-card');

let countersStarted = false;

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAOS();
    }, 650);
});

if (window.innerWidth > 860 && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
        cursorOutline.style.left = `${clientX}px`;
        cursorOutline.style.top = `${clientY}px`;
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    document.querySelectorAll('a, button, .project-card, .skill-tag, .detail-card, .cert-card, .contact-card').forEach((el) => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 20);
    backToTop.classList.toggle('visible', currentScroll > 320);
    updateActiveNavLink();
});

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    });
}

document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const offset = window.scrollY + 140;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (offset >= top && offset < top + height) {
            document.querySelectorAll('.nav-link').forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
});

const typewriterText = document.getElementById('typewriter');
const phrases = [
    'Étudiant en Ingénierie des Données',
    'Passionné de Machine Learning',
    'Développeur Big Data',
    'Apprenant Java et Spring',
    'Explorateur IA et NLP'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypewriter() {
    if (!typewriterText) return;

    const phrase = phrases[phraseIndex];
    typewriterText.textContent = deleting
        ? phrase.slice(0, --charIndex)
        : phrase.slice(0, ++charIndex);

    let nextTick = deleting ? 38 : 72;

    if (!deleting && charIndex === phrase.length) {
        deleting = true;
        nextTick = 1300;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        nextTick = 360;
    }

    setTimeout(runTypewriter, nextTick);
}

runTypewriter();

filterBtns.forEach((button) => {
    button.addEventListener('click', () => {
        filterBtns.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;

        projectCards.forEach((card, index) => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !show);
            if (show) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(12px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 45);
            }
        });
    });
});

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    document.querySelectorAll('.stat-number').forEach((counter) => {
        const target = Number(counter.dataset.count || 0);
        const start = performance.now();
        const duration = 1400;

        const step = (timestamp) => {
            const progress = Math.min((timestamp - start) / duration, 1);
            counter.textContent = String(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    });
}

function initAOS() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const delay = Number(entry.target.dataset.aosDelay || 0);
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);

            if (entry.target.id === 'about' || entry.target.closest('#about')) {
                animateCounters();
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-aos], section').forEach((item) => observer.observe(item));
}

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('.btn-submit');
    const original = submitButton.innerHTML;

    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const subject = contactForm.querySelector('#subject').value;
    const message = contactForm.querySelector('#message').value;

    const body = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
    const link = `mailto:mohamedtamzirtai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    submitButton.innerHTML = '<span>Préparation...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;

    setTimeout(() => {
        window.location.href = link;
        submitButton.innerHTML = '<span>Envoyé !</span><i class="fas fa-check"></i>';

        setTimeout(() => {
            submitButton.innerHTML = original;
            submitButton.disabled = false;
            contactForm.reset();
        }, 1200);
    }, 450);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

if (heroCard && window.innerWidth > 860) {
    heroCard.addEventListener('mousemove', (event) => {
        const rect = heroCard.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 10;
        const rotateX = (0.5 - y) * 10;
        heroCard.style.transform = `perspective(850px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(850px) rotateX(0deg) rotateY(0deg)';
    });
}

function addParticles() {
    const bg = document.querySelector('.hero-bg-effects');
    if (!bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (let index = 0; index < 16; index += 1) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${6 + Math.random() * 7}s`;
        bg.appendChild(particle);
    }
}

function setupCopyCode() {
    const action = document.querySelector('.card-action');
    const code = document.querySelector('.code-lines code');
    if (!action || !code || !navigator.clipboard) return;

    action.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(code.innerText);
            action.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                action.innerHTML = '<i class="fas fa-copy"></i>';
            }, 1000);
        } catch (_) {
            action.innerHTML = '<i class="fas fa-times"></i>';
            setTimeout(() => {
                action.innerHTML = '<i class="fas fa-copy"></i>';
            }, 1000);
        }
    });
}

addParticles();
setupCopyCode();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-aos]').forEach((item) => item.classList.add('aos-animate'));
}

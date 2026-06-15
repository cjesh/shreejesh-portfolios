/* ========== LOADER ========== */
const loader = document.getElementById('loader');
const progress = document.querySelector('.loader-progress');

gsap.to(progress, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete: () => {
        gsap.to(loader, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
            onComplete: () => {
                loader.style.display = 'none';
                initAnimations();
            }
        });
    }
});

/* ========== CUSTOM CURSOR ========== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        gsap.to(cursor, { x: mx, y: my, duration: 0.1 });
    });

    function followCursor() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        gsap.set(follower, { x: fx, y: fy });
        requestAnimationFrame(followCursor);
    }
    followCursor();

    document.querySelectorAll('a, button, .project-card, .service-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });
}

/* ========== MAGNETIC BUTTONS ========== */
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
});

/* ========== NAVIGATION ========== */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach((link, i) => {
    link.style.transitionDelay = `${i * 0.08 + 0.2}s`;
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ========== SMOOTH SCROLL FOR ANCHORS ========== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ========== GSAP ANIMATIONS ========== */
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    // Hero title lines
    gsap.utils.toArray('.hero-line span').forEach((line, i) => {
        gsap.to(line, {
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // Reveal elements
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out'
        });
    });

    // Hero reveals (no scroll trigger needed, immediate on load)
    gsap.utils.toArray('.hero .reveal').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.4 + i * 0.12,
            ease: 'power3.out'
        });
    });

    // Stat counters
    gsap.utils.toArray('.stat-number').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        gsap.fromTo(counter, { innerText: 0 }, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Service items stagger
    gsap.utils.toArray('.service-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: 'power3.out'
        });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: (i % 2) * 0.15,
            ease: 'power3.out'
        });
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Skill groups stagger
    gsap.utils.toArray('.skill-group').forEach((group, i) => {
        gsap.to(group, {
            scrollTrigger: {
                trigger: group,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out'
        });
    });

    // Parallax effect on hero
    gsap.to('.hero-visual', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 80,
        ease: 'none'
    });

    // Marquee speed on scroll
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        ScrollTrigger.create({
            trigger: '.marquee-section',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: self => {
                const speed = 1 + Math.abs(self.getVelocity()) / 3000;
                gsap.to(marqueeTrack, {
                    animationDuration: `${30 / speed}s`,
                    duration: 0.5,
                    overwrite: true
                });
            }
        });
    }

    // Achievement banner
    gsap.to('.achievement-banner', {
        scrollTrigger: {
            trigger: '.achievement-banner',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

/* ========== ACTIVE NAV LINK ON SCROLL ========== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

/* ========== PERFORMANCE: Reduce motion for prefers-reduced-motion ========== */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(20);
    document.querySelectorAll('.marquee-track').forEach(el => {
        el.style.animation = 'none';
    });
}
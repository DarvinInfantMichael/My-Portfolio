// Portfolio Redesign JS - Carousel, Flip Cards, Filters
document.addEventListener('DOMContentLoaded', function() {
    // Dark theme toggle
    const darkBtn = document.getElementById('dark-theme-btn');
    const body = document.body;
    const isDark = localStorage.getItem('darkMode') === 'true';
    
    if (isDark) {
        body.classList.add('dark-mode');
        darkBtn.textContent = 'Light Theme';
    }
    
    darkBtn.classList.add('theme-btn');
    darkBtn.addEventListener('click', (e) => {
        const rect = darkBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Theme-specific mega effects
        const darkMode = !body.classList.contains('dark-mode'); // Will be after toggle
        
        // Theme transition
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkMode);
        darkBtn.textContent = darkMode ? '🌙 Light' : '☀️ Dark';
        
        // Portfolio special effect - cards matrix flip
        triggerPortfolioMatrixFlip();
        
        // Theme particles (different colors)
        createThemeParticles(x, y, darkMode);
        
        // Double ripple burst
        for (let ring = 0; ring < 5; ring++) {
            setTimeout(() => createRipple(darkBtn, {offsetX: x, offsetY: y}), ring * 80);
        }
        
        // Button elastic bounce + glow
        darkBtn.animate([
            { transform: 'scale(1)', filter: 'brightness(1) drop-shadow(0 0 0 #fd7805)' },
            { transform: 'scale(1.3) rotate(90deg)', filter: 'brightness(2) drop-shadow(0 0 30px #fd7805)' },
            { transform: 'scale(0.8) rotate(-90deg)', filter: 'brightness(1.5) drop-shadow(0 0 20px #4d44db)' },
            { transform: 'scale(1.1)', filter: 'brightness(1.8) drop-shadow(0 0 40px #4d44db)' },
            { transform: 'scale(1)', filter: 'brightness(1) drop-shadow(0 0 10px)' }
        ], { duration: 1000, easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' });
        
        // Global wave effect
        createGlobalWave();
    });
    
    function triggerPortfolioMatrixFlip() {
        const cards = document.querySelectorAll('.portfolio-flip-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.animate([
                    { transform: 'rotateY(0deg) scale(1)' },
                    { transform: 'rotateY(360deg) scale(1.2)', offset: 0.3 },
                    { transform: 'rotateY(720deg) scale(0.8)', offset: 0.6 },
                    { transform: 'rotateY(1080deg) scale(1)' }
                ], { duration: 1200, easing: 'ease-in-out' });
            }, index * 100);
        });
    }
    
    function createThemeParticles(x, y, isDarkMode) {
        const colors = isDarkMode ? ['#ffd700', '#ffed4e', '#fff176'] : ['#4d44db', '#5e4dcc', '#8e7cc3'];
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random()*6 + 2}px;
                height: ${Math.random()*6 + 2}px;
                border-radius: 50%;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                background: ${colors[Math.floor(Math.random()*colors.length)]};
                z-index: 10000;
                box-shadow: 0 0 8px currentColor;
            `;
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 150 + Math.random() * 100;
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle)*velocity}px, ${Math.sin(angle)*-velocity}px) scale(0)`,
                    opacity: 0
                }
            ], { duration: 1200 + Math.random()*400, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }).onfinish = () => particle.remove();
        }
    }
    
    function createGlobalWave() {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(253,120,5,0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9998;
            mix-blend-mode: overlay;
        `;
        document.body.appendChild(wave);
        wave.animate({ opacity: [0, 1, 0] }, { duration: 800, easing: 'ease-out' }).onfinish = () => wave.remove();
    }
    
    function createRipple(button, e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        button.appendChild(ripple);
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(3)', opacity: 0 }
        ], { duration: 600, easing: 'ease-out' }).onfinish = () => ripple.remove();
    }
    
    function createRipple(button, e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        button.appendChild(ripple);
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(3)', opacity: 0 }
        ], { duration: 600, easing: 'ease-out' }).onfinish = () => ripple.remove();
    }
    
    function createParticles(button, x, y) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px; height: 4px;
                border-radius: 50%;
                pointer-events: none;
                left: ${x + button.getBoundingClientRect().left}px;
                top: ${y + button.getBoundingClientRect().top}px;
                background: ${i%2 ? '#fd7805' : '#4d44db'};
                z-index: 9999;
            `;
            document.body.appendChild(particle);
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${ (Math.random()-0.5)*100 }px, ${-(Math.random()*100 + 50)}px) scale(0)`, opacity: 0 }
            ], { duration: 800, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }).onfinish = () => particle.remove();
        }
    }

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Portfolio filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-flip-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => card.style.display = 'none', 200);
                }
            });
        });
    });

    // Carousel scroll snap indicators
    const carousel = document.getElementById('portfolioCarousel');
    const cards = document.querySelectorAll('.portfolio-flip-card');
    let currentSnap = 0;
    
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 30; // gap included
        currentSnap = Math.round(scrollLeft / cardWidth);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') carousel.scrollBy({ left: -450, behavior: 'smooth' });
        if (e.key === 'ArrowRight') carousel.scrollBy({ left: 450, behavior: 'smooth' });
    });

    // Card tilt effect on hover (3D)
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                progress.style.width = progress.dataset.width || progress.style.width;
            }
        });
    });
    
    document.querySelectorAll('.skill-item').forEach(skill => {
        const progress = skill.querySelector('.skill-progress');
        progress.dataset.width = progress.style.width;
        observer.observe(skill);
    });

    // Form submission
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent. (Demo)');
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

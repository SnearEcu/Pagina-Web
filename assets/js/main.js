// Macroequipos Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    // Create menu button for mobile
    const menuBtn = document.createElement('button');
    menuBtn.className = 'menu-toggle';
    menuBtn.innerHTML = '☰';
    menuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--color-primary);
    `;

    document.querySelector('.nav').insertBefore(menuBtn, document.querySelector('.header-actions'));

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '☰';

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Calculate root prefix based on main.js location
    let rootPath = '';
    const script = document.querySelector('script[src*="main.js"]');
    if (script) {
        const src = script.getAttribute('src');
        rootPath = src.replace('main.js', '');
    }

    // WhatsApp Chat Widget Redesign
    const whatsappWidget = document.createElement('div');
    whatsappWidget.className = 'whatsapp-float';
    whatsappWidget.innerHTML = `
        <div class="whatsapp-chat-window" id="waChat">
            <div class="chat-header">
                <div class="chat-header-info">
                    <span>Macroequipos Team</span>
                    <small>Suelen responder en pocos minutos</small>
                </div>
                <button class="chat-close" id="waClose">×</button>
            </div>
            <div class="chat-body">
                <div class="branch-selector">
                    <a href="https://wa.me/593986079443" class="branch-link" target="_blank">
                        <div class="salesperson-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <div class="branch-info">
                            <div class="branch-name">Matriz Ibarra</div>
                            <div class="branch-role">Jose Mejia Lequerica y 9-15, Ibarra</div>
                        </div>
                    </a>
                    <a href="https://wa.me/593960664842" class="branch-link" target="_blank">
                        <div class="salesperson-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <div class="branch-info">
                            <div class="branch-name">Sucursal Riobamba</div>
                            <div class="branch-role">Juan Montalvo 15-59 y Baron de Carondelet</div>
                        </div>
                    </a>
                    <a href="https://wa.me/593994192715" class="branch-link" target="_blank">
                        <div class="salesperson-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <div class="branch-info">
                            <div class="branch-name">Sucursal Julio Andrade</div>
                            <div class="branch-role">Panamericana y Tarqui, Julio Andrade</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <button class="whatsapp-btn" id="waBtn">
            <img src="${rootPath}../images/ui/whatsapp.png" alt="WhatsApp" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
        </button>
    `;
    document.body.appendChild(whatsappWidget);

    const waBtn = document.getElementById('waBtn');
    const waChat = document.getElementById('waChat');
    const waClose = document.getElementById('waClose');

    waBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        waChat.classList.toggle('active');
    });

    waClose.addEventListener('click', (e) => {
        e.stopPropagation();
        waChat.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!whatsappWidget.contains(e.target)) {
            waChat.classList.remove('active');
        }
    });

    // Hero Slider Management
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Create Dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev');
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                    slide.classList.add('prev');
                }
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
            resetInterval();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 7000);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        resetInterval();
    }

    // Lightbox Functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        // Create Lightbox Markup
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-nav prev">&#10094;</button>
                <img src="" alt="Lightbox Image">
                <button class="lightbox-nav next">&#10095;</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevGallBtn = lightbox.querySelector('.lightbox-nav.prev');
        const nextGallBtn = lightbox.querySelector('.lightbox-nav.next');
        let currentGallIndex = 0;

        galleryItems.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentGallIndex = index;
                showImage(currentGallIndex);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            });
        });

        function showImage(index) {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = galleryItems[index].src;
                lightboxImg.style.opacity = '1';
            }, 150);
        }

        function nextGall() {
            currentGallIndex = (currentGallIndex + 1) % galleryItems.length;
            showImage(currentGallIndex);
        }

        function prevGall() {
            currentGallIndex = (currentGallIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentGallIndex);
        }

        nextGallBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextGall();
        });

        prevGallBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevGall();
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeBtn.click();
            if (e.key === 'ArrowRight') nextGall();
            if (e.key === 'ArrowLeft') prevGall();
        });
    }
});

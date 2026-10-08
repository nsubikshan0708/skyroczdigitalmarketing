/**
 * SKYROCZ DIGITAL MARKETING - Premium Interactive Scripting
 */

const EMAILJS_PUBLIC_KEY = 'r0qmkTO9g4mJM5bbI';
const EMAILJS_SERVICE_ID = 'service_xa0cpro';
const EMAILJS_TEMPLATE_ID = 'template_pi45d0m';
let emailjsInitialized = false;

function initEmailJS() {
    if (typeof emailjs === 'undefined' || typeof emailjs.init !== 'function') {
        console.warn('EmailJS SDK not loaded or init is unavailable.');
        return false;
    }

    if (!emailjsInitialized) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        emailjsInitialized = true;
        console.log('EmailJS initialized with key:', EMAILJS_PUBLIC_KEY);
    }

    return emailjsInitialized;
}

document.addEventListener('DOMContentLoaded', () => {
    initEmailJS();
    initCustomCursor();
    initBackgroundParticles();
    initScrollEffects();
    initMobileMenu();
    initTiltEffect();
    initCtaParticles();
    initLeadGenerationModal();
    initPortfolioPopup();
    initVideoModal();
    initImageLightbox();
    initScrollToTop();
});

/* ==========================================================================
   1. Custom Lag Cursor
   ========================================================================== */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    
    if (!dot || !outline) return;

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;

    // Track real mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for the inner dot
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Animate outer outline with easing interpolation
    function animateCursor() {
        const dx = mouseX - outlineX;
        const dy = mouseY - outlineY;
        
        outlineX += dx * 0.15;
        outlineY += dy * 0.15;
        
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scale effects on hover of interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .tilt-effect, .service-card, .case-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('custom-cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('custom-cursor-hover');
        });
    });

    // Event delegation for dynamically created elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.portfolio-image, .portfolio-link, .floating-btn')) {
            document.body.classList.add('custom-cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.portfolio-image, .portfolio-link, .floating-btn')) {
            document.body.classList.remove('custom-cursor-hover');
        }
    });

    // Shrink cursor on click
    window.addEventListener('mousedown', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(0.8)';
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    
    window.addEventListener('mouseup', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/* ==========================================================================
   2. Background Particles System (Canvas)
   ========================================================================== */
function initBackgroundParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#7DD3FC', '#EAF7FF', '#FFFFFF', '#38BDF8'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.25;
            this.speedY = (Math.random() - 0.5) * 0.25;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.fadeSpeed = 0.002 + Math.random() * 0.003;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Loop boundaries
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }

            // Alpha pulsing
            this.alpha -= this.fadeSpeed;
            if (this.alpha <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // Create particle list
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   3. Scroll Effects & Progress Bar
   ========================================================================== */
function initScrollEffects() {
    const header = document.getElementById('header');
    const progressBar = document.getElementById('scroll-bar');
    const reveals = document.querySelectorAll('.reveal');

    // Scroll handler for navbar sticky states & scroll progress
    window.addEventListener('scroll', () => {
        // Sticky Header styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }
    });

    // Reveal Elements on Scroll using Intersection Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it is a statistic element container, start the counter
                const stats = entry.target.querySelectorAll('.stat-number');
                if (stats.length > 0) {
                    stats.forEach(stat => animateCounter(stat));
                }
                
                // Stop observing once animated
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // Active navigation menu links based on section positions
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Stats Counter animation function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quadratic function
        const easedProgress = progress * (2 - progress);
        const currentCount = Math.floor(easedProgress * (target - start) + start);
        
        element.textContent = currentCount;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ==========================================================================
   4. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/* ==========================================================================
   5. Interactive Mouse-follow Tilt and Glow
   ========================================================================== */
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-effect');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within card
            const y = e.clientY - rect.top;  // y coordinate within card
            
            // Set mouse-x & mouse-y variables for gradient shine follows cursor
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Compute 3D rotation ratios (Max 8 degrees tilt)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = -(y - centerY) / centerY * 8;
            const tiltY = (x - centerX) / centerX * 8;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset to flat
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.setProperty('--mouse-x', `0px`);
            card.style.setProperty('--mouse-y', `0px`);
        });
    });
}

/* ==========================================================================
   6. CTA Banner Float particles
   ========================================================================== */
function initCtaParticles() {
    const container = document.getElementById('cta-particles');
    if (!container) return;

    const count = 12;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cta-particle');
        
        const size = Math.random() * 6 + 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 6 + 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        // Alternate color nodes
        if (Math.random() > 0.5) {
            particle.style.background = '#7DD3FC';
            particle.style.boxShadow = '0 0 10px rgba(125, 211, 252, 0.4)';
        } else {
            particle.style.background = '#FF6B00';
            particle.style.boxShadow = '0 0 10px rgba(255, 107, 0, 0.4)';
        }

        container.appendChild(particle);
    }
}

/* ==========================================================================
   8. Lead Generation Modal & EmailJS Integration
   ========================================================================== */
function initLeadGenerationModal() {
    const modalOverlay = document.getElementById('lead-modal-overlay');
    const modal = document.querySelector('.lead-modal');
    const modalClose = document.getElementById('lead-modal-close');
    const form = modal?.querySelector('#lead-modal-form');
    const responsePopup = document.getElementById('lead-response-popup');
    const responseCard = document.getElementById('lead-response-card');
    const responseIcon = document.getElementById('lead-response-icon');
    const responseTitle = document.getElementById('lead-response-title');
    const responseMessage = document.getElementById('lead-response-message');
    const ctaButtons = document.querySelectorAll(
        '.nav-actions > .cta-nav, .hero-cta-group > .btn-primary, .about-content > .btn-primary, .cta-content > .btn-cta-glow'
    );

    // EmailJS configuration constants
    const EMAILJS_PUBLIC_KEY = 'r0qmkTO9g4mJM5bbI';
    const EMAILJS_SERVICE_ID = 'service_xa0cpro';
    const EMAILJS_TEMPLATE_ID = 'template_pi45d0m';

    if (!modalOverlay || !modal || !modalClose || !form || !responsePopup || !responseCard) return;

    initEmailJS();

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let lastFocusedElement = null;
    let previousBodyOverflow = '';
    let previousDocumentOverflow = '';

    // Open the modal and prepare focus + form state
    function openModal() {
        lastFocusedElement = document.activeElement;
        previousBodyOverflow = document.body.style.overflow;
        previousDocumentOverflow = document.documentElement.style.overflow;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        clearFormErrors();
        form.reset();
        form.scrollTop = 0;
        const firstField = form.querySelector('input, select, textarea');
        if (firstField instanceof HTMLElement) {
            firstField.focus();
        }
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousDocumentOverflow;
        form.scrollTop = 0;
        if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
    }

    function clearFormErrors() {
        form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    }

    function showResponse(status, title, message) {
        responseCard.classList.remove('success', 'error');
        responseCard.classList.add(status);
        responseIcon.textContent = status === 'success' ? '✔' : '✖';
        responseTitle.textContent = title;
        responseMessage.textContent = message;
        responsePopup.classList.add('active');

        window.setTimeout(() => {
            responsePopup.classList.remove('active');
        }, 4000);
    }

    function setSubmitButtonState(isLoading) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        submitButton.disabled = isLoading;
        submitButton.innerHTML = isLoading
            ? 'Sending... <span class="button-spinner" aria-hidden="true"></span>'
            : 'Submit Request';
    }

    function validateField(field, errorId, validator) {
        const errorElement = form.querySelector(`#${errorId}`);
        const value = field.value.trim();
        const error = validator(value);
        errorElement.textContent = error || '';
        return !error;
    }

    function validateForm() {
        const name = form.querySelector('#modal-name');
        const phone = form.querySelector('#modal-phone');
        const email = form.querySelector('#modal-email');
        const service = form.querySelector('#modal-service');
        const message = form.querySelector('#modal-message');

        const isNameValid = validateField(name, 'error-modal-name', value => value ? '' : 'Name is required.');
        const isPhoneValid = validateField(phone, 'error-modal-phone', value => {
            if (!value) return 'Contact number is required.';
            if (!/^[0-9]+$/.test(value)) return 'Only digits are allowed.';
            if (value.length !== 10) return 'Enter exactly 10 digits.';
            return '';
        });
        const isEmailValid = validateField(email, 'error-modal-email', value => {
            if (!value) return 'Email is required.';
            if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email address.';
            return '';
        });
        const isServiceValid = validateField(service, 'error-modal-service', value => value ? '' : 'Please select a required service.');
        const isMessageValid = validateField(message, 'error-modal-message', value => value ? '' : 'Message is required.');

        return isNameValid && isPhoneValid && isEmailValid && isServiceValid && isMessageValid;
    }

    function trapFocus(event) {
        const focusableElements = Array.from(modal.querySelectorAll(focusableSelectors))
            .filter(el => !el.hasAttribute('disabled'));
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key !== 'Tab') return;
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    ctaButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            openModal();
        });
    });

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
        if (event.key === 'Tab' && modalOverlay.classList.contains('active')) {
            trapFocus(event);
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        const templateParams = {
            from_name: form.querySelector('#modal-name').value.trim(),
            from_email: form.querySelector('#modal-email').value.trim(),
            contact_number: form.querySelector('#modal-phone').value.trim(),
            required_service: form.querySelector('#modal-service').value,
            message: form.querySelector('#modal-message').value.trim(),
            submitted_at: new Date().toLocaleString()
        };

        console.log('EmailJS templateParams:', templateParams);

        if (!initEmailJS()) {
            console.error('EmailJS initialization failed.');
            showResponse('error', 'Unable to submit your request.', 'Please try again later.');
            return;
        }

        if (typeof emailjs === 'undefined' || typeof emailjs.send !== 'function') {
            console.error('EmailJS SDK not available or send is not a function.');
            showResponse('error', 'Unable to submit your request.', 'Please try again later.');
            return;
        }

        setSubmitButtonState(true);

        try {
            const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            console.log('EMAILJS SUCCESS', response);
            closeModal();
            showResponse('success', 'Thank You!', 'Your request has been successfully submitted. Our team will contact you within 24 hours.');
        } catch (error) {
            console.error('EMAILJS ERROR', error);
            showResponse('error', 'Unable to submit your request.', 'Please try again later.');
        } finally {
            setSubmitButtonState(false);
        }
    });
}

/* ==========================================================================
   9. Portfolio Popup Modal
   ========================================================================== */
function initPortfolioPopup() {
    const popupOverlay = document.getElementById('portfolio-modal-overlay');
    const popupClose = document.getElementById('portfolio-modal-close');
    const popupTitle = document.getElementById('portfolio-modal-title');

    if (!popupOverlay || !popupClose || !popupTitle) return;

    // Category titles mapping
    const categoryTitles = {
        'video-editing': 'Video Editing Portfolio',
        'video-production': 'Video Production Portfolio',
        'design-works': 'Logo & Poster Portfolio'
    };

    function openPopup(category) {
        const title = categoryTitles[category];
        if (!title) return;

        popupTitle.textContent = title;

        // Hide all grids first
        const allGrids = document.querySelectorAll('.portfolio-grid');
        allGrids.forEach(grid => {
            grid.style.display = 'none';
        });

        // Show the selected grid
        const selectedGrid = document.getElementById(`${category}-grid`);
        if (selectedGrid) {
            selectedGrid.style.display = 'grid';
        }

        popupOverlay.classList.add('active');
        popupOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Trigger reveal animations
        setTimeout(() => {
            const visibleGrid = document.querySelector('.portfolio-grid[style*="grid"]');
            if (visibleGrid) {
                visibleGrid.querySelectorAll('.reveal').forEach(card => {
                    card.classList.add('active');
                });
            }
        }, 100);
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        popupOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.style.position = '';

        // Hide all grids
        const allGrids = document.querySelectorAll('.portfolio-grid');
        allGrids.forEach(grid => {
            grid.style.display = 'none';
        });

        // Show video-editing grid by default
        const defaultGrid = document.getElementById('video-editing-grid');
        if (defaultGrid) {
            defaultGrid.style.display = 'grid';
        }
    }

    // Make entire cards clickable
    const caseCards = document.querySelectorAll('.case-card[data-category]');
    
    caseCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const category = card.dataset.category;
            if (category) {
                openPopup(category);
            }
        });
    });

    popupClose.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
}

/* ==========================================================================
   10. Video Modal
   ========================================================================== */
function initVideoModal() {
    const videoOverlay = document.getElementById('video-modal-overlay');
    const videoClose = document.getElementById('video-modal-close');
    const videoPlayer = document.getElementById('video-player');

    if (!videoOverlay || !videoClose || !videoPlayer) return;

    function openVideoModal(videoSrc) {
        videoPlayer.src = videoSrc;
        videoOverlay.classList.add('active');
        videoOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        videoPlayer.play().catch(e => console.log('Auto-play prevented:', e));
    }

    function closeVideoModal() {
        videoOverlay.classList.remove('active');
        videoOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.style.position = '';
        videoPlayer.pause();
        videoPlayer.src = '';
    }

    // Event delegation for portfolio links with data-video
    document.addEventListener('click', (e) => {
        const portfolioLink = e.target.closest('.portfolio-link');
        if (portfolioLink && portfolioLink.dataset.video) {
            e.preventDefault();
            const videoSrc = portfolioLink.dataset.video;
            if (videoSrc) {
                openVideoModal(videoSrc);
            }
        }
    });

    videoClose.addEventListener('click', closeVideoModal);

    videoOverlay.addEventListener('click', (e) => {
        if (e.target === videoOverlay) {
            closeVideoModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoOverlay.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

/* ==========================================================================
   11. Image Lightbox
   ========================================================================== */
function initImageLightbox() {
    const lightboxOverlay = document.getElementById('image-lightbox-overlay');
    const lightboxClose = document.getElementById('image-lightbox-close');
    const lightboxPrev = document.getElementById('image-lightbox-prev');
    const lightboxNext = document.getElementById('image-lightbox-next');
    const lightboxImage = document.getElementById('lightbox-image');

    if (!lightboxOverlay || !lightboxClose || !lightboxPrev || !lightboxNext || !lightboxImage) return;

    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(imageSrc, allImages, index) {
        currentImages = allImages;
        currentIndex = index;
        lightboxImage.src = imageSrc;
        lightboxOverlay.classList.add('active');
        lightboxOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        lightboxOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.body.style.position = '';
        lightboxImage.src = '';
        currentImages = [];
        currentIndex = 0;
    }

    function showNextImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex];
    }

    function showPrevImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex];
    }

    // Event delegation for portfolio links with data-image
    document.addEventListener('click', (e) => {
        const portfolioLink = e.target.closest('.portfolio-link');
        if (portfolioLink && portfolioLink.dataset.image) {
            e.preventDefault();
            const imageSrc = portfolioLink.dataset.image;
            if (imageSrc) {
                // Collect all design images from the current visible portfolio grid
                const visibleGrid = document.querySelector('.portfolio-grid[style*="grid"]');
                if (visibleGrid) {
                    const allImages = Array.from(visibleGrid.querySelectorAll('.portfolio-link[data-image]'))
                        .map(link => link.dataset.image)
                        .filter(src => src);
                    const index = allImages.indexOf(imageSrc);
                    openLightbox(imageSrc, allImages, index);
                }
            }
        }
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (!lightboxOverlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });
}

/* ==========================================================================
   10. Scroll to Top Button
   ========================================================================== */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard accessibility
    scrollTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

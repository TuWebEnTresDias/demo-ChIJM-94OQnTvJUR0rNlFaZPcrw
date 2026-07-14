/* ============================================
   STORYBROOKE BUENOS AIRES - Landing Page JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    function handleHeaderScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // MENU TABS
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and categories
            tabBtns.forEach(b => b.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button and corresponding category
            this.classList.add('active');
            const targetCategory = document.getElementById(tabId);
            if (targetCategory) {
                targetCategory.classList.add('active');
                
                // Trigger animations for newly visible items
                const animateItems = targetCategory.querySelectorAll('[data-animate]');
                animateItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animateObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => {
        animateObserver.observe(el);
    });

    // ============================================
    // FORM TO WHATSAPP
    // ============================================
    const reservaForm = document.getElementById('reservaForm');
    
    if (reservaForm) {
        reservaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const personas = document.getElementById('personas').value;
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Format date for display
            let fechaDisplay = fecha;
            if (fecha) {
                const dateParts = fecha.split('-');
                fechaDisplay = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            }
            
            // Format time for display
            let horaDisplay = hora;
            if (hora) {
                const timeParts = hora.split(':');
                const hours = parseInt(timeParts[0]);
                const minutes = timeParts[1];
                const period = hours >= 12 ? 'PM' : 'AM';
                const hours12 = hours > 12 ? hours - 12 : hours;
                horaDisplay = `${hours12}:${minutes} ${period}`;
            }
            
            let whatsappMessage = `Hola! Quiero hacer una reserva en Storybrooke Buenos Aires.\n\n`;
            whatsappMessage += `*Nombre:* ${nombre}\n`;
            whatsappMessage += `*Fecha:* ${fechaDisplay}\n`;
            whatsappMessage += `*Hora:* ${horaDisplay}\n`;
            whatsappMessage += `*Personas:* ${personas}\n`;
            whatsappMessage += `*Servicio:* ${servicio}\n`;
            
            if (mensaje) {
                whatsappMessage += `*Mensaje:* ${mensaje}\n`;
            }
            
            const whatsappUrl = `https://wa.me/5491138386233?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                const whatsappMessage = `Hola! Me quiero suscribir al newsletter de Storybrooke Buenos Aires.\n\nMi email: ${email}`;
                const whatsappUrl = `https://wa.me/5491138386233?text=${encodeURIComponent(whatsappMessage)}`;
                
                window.open(whatsappUrl, '_blank');
                this.reset();
                alert('¡Gracias por suscribirte! Te contactaremos pronto.');
            }
        });
    }

    // ============================================
    // GALLERY LIGHTBOX EFFECT (Simple)
    // ============================================
    const galleryItems = document.querySelectorAll('.galeria-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-overlay"></div>
                    <div class="lightbox-content">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="lightbox-close">&times;</button>
                    </div>
                `;
                
                // Add styles dynamically
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                `;
                
                lightbox.querySelector('.lightbox-overlay').style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(26, 26, 26, 0.95);
                `;
                
                lightbox.querySelector('.lightbox-content').style.cssText = `
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    animation: zoomIn 0.3s ease;
                `;
                
                lightbox.querySelector('img').style.cssText = `
                    max-width: 100%;
                    max-height: 85vh;
                    border-radius: 8px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                `;
                
                lightbox.querySelector('.lightbox-close').style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                const closeLightbox = () => {
                    lightbox.style.opacity = '0';
                    lightbox.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }, 300);
                };
                
                lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
                lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
                
                // Close on escape key
                const handleEscape = (e) => {
                    if (e.key === 'Escape') {
                        closeLightbox();
                        document.removeEventListener('keydown', handleEscape);
                    }
                };
                document.addEventListener('keydown', handleEscape);
            }
        });
    });

    // ============================================
    // HERO PARALLAX EFFECT (Subtle)
    // ============================================
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallax = scrolled * 0.3;
                heroImage.style.transform = `scale(1.05) translateY(${parallax}px)`;
            }
        }, { passive: true });
    }

    // ============================================
    // CURRENT YEAR IN FOOTER
    // ============================================
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }

    // ============================================
    // ADD KEYFRAME ANIMATIONS
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes zoomIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
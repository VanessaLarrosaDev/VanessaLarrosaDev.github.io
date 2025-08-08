// ================================
// VARIABLES GLOBALES Y CONFIGURACIÓN
// ================================

// Variable para guardar la última posición de scroll del usuario
let lastScrollTop = 0;

// Variable que almacena el idioma elegido de la web, inicia en español
let currentLang = 'es';

// Objeto con la información para descargar el CV
const cvConfig = {
    filename: 'CV Vanessa Larrosa Vilar.pdf', // Nombre de archivo del CV
    path: 'assets/cv/'                       // Ruta donde está el archivo
};

// Configuración para Intersection Observer utilizado en animaciones al hacer scroll
const observerOptions = {
    threshold: 0.3,             // Lanza la animación cuando el 30% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Margen para anticipar la animación antes de estar visible
};

// ================================
// DICCIONARIO DE TRADUCCIONES
// ================================

// Diccionario con todas las traducciones para español (es) e inglés (en)
const translations = {
    es: {
        "nav-about": "Sobre mí",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        "nav-about-mobile": "Sobre mí",
        "nav-projects-mobile": "Proyectos",
        "nav-contact-mobile": "Contacto",
        "hero-title": "DESARROLLADORA<br>DE SOFTWARE",
        "hero-subtitle": '"Hola, soy Vanessa, graduada en DAM apasionada por el código, explorando frontend y backend para crear experiencias digitales completas."',
        "scroll-text": "Scroll para explorar",
        "about-title": "SOBRE MÍ",
        "about-text-1": "Combino mi pasión por el código con una curiosidad infinita por aprender.",
        "about-text-2": "Desde Unity hasta backend, disfruto explorando diferentes tecnologías y creando proyectos que resuelvan problemas reales.",
        "about-text-3": "Mi experiencia como profesora me dio una perspectiva única: la paciencia para debuggear y la creatividad para encontrar soluciones elegantes.",
        "about-text-4": "Siempre hay algo nuevo que descubrir en este mundo del desarrollo.",
        "about-download-button": "¡Click aquí!", // Para escritorio
        "download-feedback": "¡CV descargándose!",
        "projects-title": "PROYECTOS",
        "project-1-title": "**PROYECTO EN DESARROLLO 1**",
        "project-1-description": "Aquí irá la descripción de un emocionante proyecto en el que estoy trabajando o que está planificado, mostrando mis habilidades.",
        "project-1-tags": "[ Tags: Próximamente, Tech1 ]",
        "project-2-title": "**PROYECTO EN DESARROLLO 2**",
        "project-2-description": "Aquí irá la descripción de un emocionante proyecto en el que estoy trabajando o que está planificado, mostrando mis habilidades.",
        "project-2-tags": "[ Tags: Próximamente, Tech2 ]",
        "project-3-title": "**PROYECTO EN DESARROLLO 3**",
        "project-3-description": "Aquí irá la descripción de un emocionante proyecto en el que estoy trabajando o que está planificado, mostrando mis habilidades.",
        "project-3-tags": "[ Tags: Próximamente, Tech3 ]",
        "project-4-title": "**PROYECTO EN DESARROLLO 4**",
        "project-4-description": "Aquí irá la descripción de un emocionante proyecto en el que estoy trabajando o que está planificado, mostrando mis habilidades.",
        "project-4-tags": "[ Tags: Próximamente, Tech4 ]",
        "contact-title": "CONTACTAR",
        "contact-linkedin": "LinkedIn",
        "contact-github": "GitHub",
        "contact-email": "vanessalarrosadev@gmail.com",
        "brand-text": "VANESSA LARROSA",
        "email-copied": "¡Email copiado al portapapeles!",
        "link-opening": "Abriendo enlace...",
        "about-touch-message": "¡Tócame!", // Para móviles/dispositivos táctiles
        "about-click-mobile": "¡Tócame!"   // Clave extra para evitar errores si se usa legacy
    },

    en: {
        "nav-about": "About Me",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "nav-about-mobile": "About Me",
        "nav-projects-mobile": "Projects",
        "nav-contact-mobile": "Contact",
        "hero-title": "SOFTWARE<br>DEVELOPER",
        "hero-subtitle": '"Hi, I\'m Vanessa, a DAM graduate passionate about code, exploring frontend and backend to create complete digital experiences."',
        "scroll-text": "Scroll to explore",
        "about-title": "ABOUT ME",
        "about-text-1": "I combine my passion for code with an infinite curiosity to learn.",
        "about-text-2": "From Unity to backend, I enjoy exploring different technologies and creating projects that solve real problems.",
        "about-text-3": "My experience as a teacher gave me a unique perspective: the patience to debug and the creativity to find elegant solutions.",
        "about-text-4": "There's always something new to discover in this world of development.",
        "about-download-button": "Click here!",
        "download-feedback": "CV downloading!",
        "projects-title": "PROJECTS",
        "project-1-title": "**PROJECT IN DEVELOPMENT 1**",
        "project-1-description": "Here will go the description of an exciting project I'm working on or that is planned, showing my skills.",
        "project-1-tags": "[ Tags: Coming Soon, Tech1 ]",
        "project-2-title": "**PROJECT IN DEVELOPMENT 2**",
        "project-2-description": "Here will go the description of an exciting project I'm working on or that is planned, showing my skills.",
        "project-2-tags": "[ Tags: Coming Soon, Tech2 ]",
        "project-3-title": "**PROJECT IN DEVELOPMENT 3**",
        "project-3-description": "Here will go the description of an exciting project I'm working on or that is planned, showing my skills.",
        "project-3-tags": "[ Tags: Coming Soon, Tech3 ]",
        "project-4-title": "**PROJECT IN DEVELOPMENT 4**",
        "project-4-description": "Here will go the description of an exciting project I'm working on or that is planned, showing my skills.",
        "project-4-tags": "[ Tags: Coming Soon, Tech4 ]",
        "contact-title": "CONTACT",
        "contact-linkedin": "LinkedIn",
        "contact-github": "GitHub",
        "contact-email": "vanessalarrosadev@gmail.com",
        "brand-text": "VANESSA LARROSA",
        "email-copied": "Email copied to clipboard!",
        "link-opening": "Opening link...",
        "about-touch-message": "Tap me!",
        "about-click-mobile": "Tap me!"
    }
};

// ================================
// FUNCIONES UTILITARIAS
// ================================

/**
 * Verifica si el usuario está en un dispositivo táctil
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Verifica si el usuario está en un móvil (ancho <= 768px)
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Verifica si el usuario está en tablet o móvil (ancho <= 1023px)
 */
function isTabletOrMobile() {
    return window.innerWidth <= 1023;
}

// ================================
// EFECTO DE SCROLL EN EL HEADER
// ================================

/**
 * Añade/quita la clase 'scrolled' al header según el scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    });
}

// ================================
// MENÚ HAMBURGUESA Y NAVEGACIÓN
// ================================

/**
 * Lógica del menú hamburguesa para móvil/tablet
 */
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu-mobile');
    const navLinks = document.querySelectorAll('#nav-menu-mobile a');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (isTabletOrMobile()) {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 300);
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (
            hamburger.classList.contains('active') &&
            !hamburger.contains(e.target) &&
            !navMenu.contains(e.target)
        ) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ================================
// CAMBIO DE IDIOMA Y TRADUCCIONES
// ================================

/**
 * Actualiza todos los textos traducibles de la web al cambiar de idioma
 * @param {string} lang - Código del idioma ('es' o 'en')
 */
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            // Si la clave permite HTML (ejemplo: hero-title)
            if (key === 'hero-title') {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Actualiza el tooltip del email según idioma
    function updateContactTranslations(lang) {
        const emailLink = document.querySelector('.contact-email');
        if (emailLink) {
            const tooltipText = lang === 'es'
                ? 'Hacer clic para copiar email'
                : 'Click to copy email';
            emailLink.setAttribute('title', tooltipText);
        }
    }
    updateContactTranslations(lang);
}

/**
 * Marca visualmente el botón de idioma seleccionado
 */
function updateLanguageButtons(selectedLang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        if (btnLang === selectedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Asigna la funcionalidad al hacer clic en los botones de idioma
 */
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newLang = button.getAttribute('data-lang');
            if (newLang !== currentLang) {
                currentLang = newLang;
                updateTexts(currentLang);
                updateLanguageButtons(currentLang);
                updateCVButtonText();
            }
        });
    });
}

// ================================
// NAVEGACIÓN ACTIVA Y SMOOTH SCROLL
// ================================

/**
 * Marca el enlace de navegación activo según el scroll
 * Y aplica scroll suave al navegar por las secciones
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.desktop-menu a[data-section], .mobile-menu a[data-section]');
    
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 100; // Ajusta por el header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ================================
// FUNCIONALIDAD DE LA SECCIÓN HERO
// ================================

/**
 * Permite hacer scroll a la sección "Sobre mí" al hacer clic en el indicador
 */
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Aplica efecto parallax (movimiento) en el hero para escritorio
 */
function initParallaxEffect() {
    if (!isMobile()) {
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const parallaxSpeed = 0.5;
            if (hero) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        }
        
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });
    }
}

// ================================
// FUNCIONALIDAD DE DESCARGA DEL CV
// ================================

/**
 * Realiza la descarga del curriculum (PDF) usando un enlace invisible
 */
function downloadCV() {
    const link = document.createElement('a');
    link.href = `${cvConfig.path}${cvConfig.filename}`;
    link.download = cvConfig.filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showDownloadFeedback(); // Muestra aviso visual de descarga
}

/**
 * Muestra una notificación visual cuando se descarga el CV
 */
function showDownloadFeedback() {
    const aboutContainer = document.querySelector('.about-container');
    if (!aboutContainer) return;
    const feedback = document.createElement('div');
    feedback.textContent = translations[currentLang]['download-feedback'];
    feedback.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(142, 60, 230, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 100;
        pointer-events: none;
        animation: fadeInOut 2s ease-in-out forwards;
    `;
    // Añade animación solo la primera vez
    if (!document.querySelector('#download-feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'download-feedback-styles';
        style.textContent = `@keyframes fadeInOut { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } 20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } }`;
        document.head.appendChild(style);
    }
    aboutContainer.style.position = 'relative';
    aboutContainer.appendChild(feedback);
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

/**
 * Asocia el clic del botón para descargar el CV
 */
function initCVDownloadLogic() {
    const downloadButton = document.querySelector('.about-download-button');
    if (!downloadButton) return;
    downloadButton.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadCV();
    });
}

// ================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ================================

/**
 * Inicializa animaciones cuando las secciones entran en pantalla
 */
function initIntersectionObservers() {
    // Para 'about'
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Para 'projects'
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                projectsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Para 'contact'
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                startContactAnimations();
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    // Observar cada sección si existe
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
}

/**
 * Aplica animaciones a los enlaces e iconos cuando la sección contacto aparece
 */
function startContactAnimations() {
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer && !isMobile()) {
        imageContainer.style.animation = 'floatImage 6s ease-in-out infinite';
    }
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 300 + (index * 150));
    });
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 800 + (index * 100));
    });
}

/**
 * Lógica para hacer que las tarjetas de proyecto sean activables en dispositivos táctiles
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    // Solo en dispositivos táctiles
    if (projectCards.length > 0 && isTouchDevice()) {
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('is-active');
                // Desactiva otras si una está activa
                if (card.classList.contains('is-active')) {
                    projectCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('is-active');
                        }
                    });
                }
            });
        });
        // Si se hace clic fuera, desactiva todas
        document.addEventListener('click', (e) => {
            projectCards.forEach(card => {
                if (!card.contains(e.target)) {
                    card.classList.remove('is-active');
                }
            });
        });
    }
}

/**
 * Corrige problemas de foco en dispositivos móviles tras tocar algo interactivo
 */
function initMobileTouchFixes() {
    document.addEventListener('touchend', () => {
        if ('ontouchstart' in window) {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
    });
}

/**
 * Copia texto al portapapeles usando la API moderna
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            return fallbackCopyTextToClipboard(text);
        }
    } catch (err) {
        console.error('Error al copiar al portapapeles: ', err);
        return false;
    }
}

/**
 * Alternativa para copiar texto usando un <textarea> temporal
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (err) {
        console.error('Error en fallback de copiado: ', err);
        document.body.removeChild(textArea);
        return false;
    }
}

/**
 * Inicializa la sección de contacto, animaciones y funcionalidad de copia email
 */
function initContactSection() {
    initIntersectionObservers();   // Lanza animaciones de entrada
    initImageParallax();           // Añade efecto parallax en imagen
    const emailLink = document.querySelector('.contact-email');
    if (emailLink) {
        emailLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = emailLink.querySelector('.link-text').textContent;
            const copied = await copyToClipboard(email);
            if (copied) {
                const message = translations[currentLang]['email-copied'] || 'Email copied!';
                showCopyFeedback(emailLink, message);
            } else {
                window.location.href = `mailto:${email}`;
            }
        });
        emailLink.setAttribute('title', 'Hacer clic para copiar email');
        emailLink.style.cursor = 'copy';
    }
    const externalLinks = document.querySelectorAll('.contact-link:not(.contact-email), .social-icon');
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            if (url && (url.includes('linkedin.com') || url.includes('github.com'))) {
                handleExternalLink(e, link, url);
            }
        });
    });
    setupInitialContactStyles();
}

/**
 * Oculta los enlaces y los iconos de contacto para aplicar animaciones de entrada
 */
function setupInitialContactStyles() {
    const elementsToHide = document.querySelectorAll('.contact-link, .social-icon');
    elementsToHide.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.style.transform = 'scale(0.8)';
        icon.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

/**
 * Actualiza el texto del botón para descargar el CV según el tipo de dispositivo y idioma
 */
function updateCVButtonText() {
    const button = document.querySelector('.about-download-button');
    if (!button) return;
    // Usa el texto específico para táctil/móvil
    const buttonTextKey = window.innerWidth <= 1023 ? "about-touch-message" : "about-download-button";
    button.textContent = translations[currentLang][buttonTextKey];
}

/**
 * Inicializa todas las funcionalidades y efectos al cargar la web
 */
function initializeApp() {
    updateTexts(currentLang);
    updateLanguageButtons(currentLang);
    initHeaderScroll();
    initHamburgerMenu();
    initLanguageToggle();
    initActiveNavigation();
    initScrollIndicator();
    updateCVButtonText();           // Establece texto inicial del botón CV
    initCVDownloadLogic();          // Asocia el evento de descarga al botón
    initIntersectionObservers();    // Inicializa animaciones
    initProjectCards();             // Inicializa tarjetas activas en táctil
    initMobileTouchFixes();         // Corrige problemas en móviles
    initContactSection();           // Inicializa efectos en sección contacto
}

/**
 * Actualiza textos y botones al cambiar el tamaño de ventana
 */
function handleResize() {
    updateTexts(currentLang);
    updateCVButtonText();
}

// Ejecuta initializeApp cuando todo el DOM está cargado
document.addEventListener('DOMContentLoaded', initializeApp);
// Actualiza textos y botones al redimensionar la ventana
window.addEventListener('resize', handleResize);

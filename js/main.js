// ================================
// VARIABLES GLOBALES Y CONFIGURACIÓN
// ================================

// Variable para rastrear la última posición de scroll
let lastScrollTop = 0;

// Variable para el idioma actual (por defecto español)
let currentLang = 'es';

// Configuración para la descarga del CV
const cvConfig = {
    filename: 'CV Vanessa Larrosa Vilar.pdf',
    path: 'assets/cv/'
};

// Opciones para el Intersection Observer
const observerOptions = {
    threshold: 0.3, // Se activa cuando el 30% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Margen adicional para activar antes
};

// ================================
// DICCIONARIO DE TRADUCCIONES
// ================================

// Objeto que contiene todas las traducciones de la página
const translations = {
    es: {
        "nav-about": "Sobre mí",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        "nav-about-mobile": "Sobre mí", // Nueva clave para el menú móvil
        "nav-projects-mobile": "Proyectos", // Nueva clave para el menú móvil
        "nav-contact-mobile": "Contacto", // Nueva clave para el menú móvil
        "hero-title": "DESARROLLADORA<br>DE SOFTWARE",
        "hero-subtitle": '"Hola, soy Vanessa, graduada en DAM apasionada por el código, explorando frontend y backend para crear experiencias digitales completas."',
        "scroll-text": "Scroll para explorar",
        "about-title": "SOBRE MÍ",
        "about-text-1": "Combino mi pasión por el código con una curiosidad infinita por aprender.",
        "about-text-2": "Desde Unity hasta backend, disfruto explorando diferentes tecnologías y creando proyectos que resuelvan problemas reales.",
        "about-text-3": "Mi experiencia como profesora me dio una perspectiva única: la paciencia para debuggear y la creatividad para encontrar soluciones elegantes.",
        "about-text-4": "Siempre hay algo nuevo que descubrir en este mundo del desarrollo.",
        "about-click-mobile": "¡Tócame!",
        "about-click-desktop": "¡Click aquí!",
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
        // Mensajes de feedback
        "email-copied": "¡Email copiado al portapapeles!",
        "link-opening": "Abriendo enlace...",
    },
    en: {
        "nav-about": "About Me",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "nav-about-mobile": "About Me", // Nueva clave para el menú móvil
        "nav-projects-mobile": "Projects", // Nueva clave para el menú móvil
        "nav-contact-mobile": "Contact", // Nueva clave para el menú móvil
        "hero-title": "SOFTWARE<br>DEVELOPER",
        "hero-subtitle": '"Hi, I\'m Vanessa, a DAM graduate passionate about code, exploring frontend and backend to create complete digital experiences."',
        "scroll-text": "Scroll to explore",
        "about-title": "ABOUT ME",
        "about-text-1": "I combine my passion for code with an infinite curiosity to learn.",
        "about-text-2": "From Unity to backend, I enjoy exploring different technologies and creating projects that solve real problems.",
        "about-text-3": "My experience as a teacher gave me a unique perspective: the patience to debug and the creativity to find elegant solutions.",
        "about-text-4": "There's always something new to discover in this world of development.",
        "about-click-mobile": "Tap me!",
        "about-click-desktop": "Click here!",
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
    }
};

// ================================
// FUNCIONES UTILITARIAS
// ================================

/**
 * Detecta si el dispositivo es táctil
 * @returns {boolean} true si es dispositivo táctil
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Detecta si estamos en un dispositivo móvil basado en el ancho de pantalla
 * @returns {boolean} true si es móvil (ancho <= 768px)
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Detecta si estamos en una pantalla de tablet/móvil para el menú
 * @returns {boolean} true si es tablet/móvil (ancho <= 1023px)
 */
function isTabletOrMobile() {
    return window.innerWidth <= 1023;
}

// ================================
// EFECTO DE SCROLL EN EL HEADER
// ================================

/**
 * Inicializa el efecto de scroll en el header
 * Añade/quita clase 'scrolled' según la posición del scroll
 */
function initHeaderScroll() {
    // Selecciona el elemento header
    const header = document.querySelector('header');
    
    // Si no existe el header, salir de la función
    if (!header) return;

    // Evento para detectar el scroll de la ventana
    window.addEventListener('scroll', () => {
        // Obtiene la posición actual del scroll
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si el usuario ha hecho scroll más de 50px, añade la clase 'scrolled'
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            // Si está cerca de la parte superior, quita la clase
            header.classList.remove('scrolled');
        }
        
        // Actualiza la última posición de scroll
        lastScrollTop = scrollTop;
    });
}

// ================================
// MENÚ HAMBURGUESA Y NAVEGACIÓN
// ================================

/**
 * Inicializa la funcionalidad del menú hamburguesa
 */
function initHamburgerMenu() {
    // Selecciona el icono del menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    // Selecciona el menú de navegación móvil por su ID
    const navMenu = document.getElementById('nav-menu-mobile');
    // Selecciona todos los enlaces de la navegación móvil
    const navLinks = document.querySelectorAll('#nav-menu-mobile a');
    
    // Si no existen los elementos necesarios, salir de la función
    if (!hamburger || !navMenu) return;

    // Evento para abrir/cerrar menú hamburguesa cuando se hace clic en el icono
    hamburger.addEventListener('click', () => {
        // Alterna la clase 'active' en el icono hamburguesa
        hamburger.classList.toggle('active');
        // Alterna la clase 'active' en el menú de navegación móvil
        navMenu.classList.toggle('active');
    });

    // Cierra el menú al hacer clic en un enlace del menú móvil
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (isTabletOrMobile()) {
                // Espera un poco para que la navegación sea más fluida antes de cerrar
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 300);
            }
        });
    });

    // Cierra el menú si haces clic fuera de él o del icono
    document.addEventListener('click', (e) => {
        // Solo cierra si el menú está activo y el clic fue fuera del botón y del menú
        if (hamburger.classList.contains('active') && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
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
    // Selecciona todos los elementos que tienen el atributo data-key
    const elements = document.querySelectorAll('[data-key]');

    // Recorre cada elemento traducible
    elements.forEach(el => {
        // Obtiene la clave de traducción del elemento
        const key = el.getAttribute('data-key');
        
        // Verifica si la clave existe para el idioma actual
        if (translations[lang] && translations[lang][key]) {
             // Si el elemento es el título del hero, permite HTML (para <br>)
            if (key === 'hero-title') {
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });

    // Función interna para actualizar tooltips del email
    function updateContactTranslations(lang) {
        const emailLink = document.querySelector('.contact-email');
        if (emailLink) {
            const tooltipText = lang === 'es' ? 'Hacer clic para copiar email' : 'Click to copy email';
            emailLink.setAttribute('title', tooltipText);
        }
    }
    // Llama a la función interna
    updateContactTranslations(lang);
}

/**
 * Actualiza el estado visual de los botones de idioma
 * @param {string} selectedLang - Idioma seleccionado
 */
function updateLanguageButtons(selectedLang) {
    // Selecciona todos los botones de idioma
    const langButtons = document.querySelectorAll('.lang-btn');

    // Recorre cada botón de idioma
    langButtons.forEach(btn => {
        // Obtiene el idioma asociado al botón
        const btnLang = btn.getAttribute('data-lang');

        // Si es el idioma seleccionado, añade la clase 'active'
        if (btnLang === selectedLang) {
            btn.classList.add('active');
        } else {
            // Si no, quita la clase 'active'
            btn.classList.remove('active');
        }
    });
}

/**
 * Inicializa la funcionalidad de cambio de idioma
 */
function initLanguageToggle() {
    // Selecciona todos los botones de idioma
    const langButtons = document.querySelectorAll('.lang-btn');

    // Asocia el evento de cambio de idioma a cada botón
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtiene el nuevo idioma del atributo data-lang
            const newLang = button.getAttribute('data-lang');

            // Solo cambia si es diferente al idioma actual
            if (newLang !== currentLang) {
                // Actualiza el idioma actual
                currentLang = newLang;
                // Actualiza todos los textos con el nuevo idioma
                updateTexts(currentLang);
                // Actualiza el estado visual de los botones
                updateLanguageButtons(currentLang);
            }
        });
    });
}

// ================================
// NAVEGACIÓN ACTIVA Y SMOOTH SCROLL
// ================================

/**
 * Inicializa la funcionalidad de navegación activa y smooth scroll
 */
function initActiveNavigation() {
    // Selecciona todas las secciones que tienen ID
    const sections = document.querySelectorAll('section[id]');
    // Selecciona todos los enlaces de navegación de ambos menús
    const allNavLinks = document.querySelectorAll('.desktop-menu a[data-section], .mobile-menu a[data-section]');
    
    /**
     * Actualiza el enlace activo basado en la posición del scroll
     */
    function updateActiveLink() {
        let currentSection = '';
        // Posición actual del scroll con offset para el header fijo
        const scrollPosition = window.pageYOffset + 100;
        
        // Encuentra qué sección está visible actualmente
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Actualiza las clases activas en todos los enlaces
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Ejecuta la función al hacer scroll y al cargar la página
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // Implementa smooth scroll para todos los enlaces
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
 * Inicializa la funcionalidad del indicador de scroll en hero
 */
function initScrollIndicator() {
    // Selecciona el indicador de scroll
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
 * Inicializa el efecto parallax en la sección hero (solo en escritorio)
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
        
        // Añade el evento de scroll con requestAnimationFrame para mejor rendimiento
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });
    }
}

// ================================
// FUNCIONALIDAD DE DESCARGA DEL CV
// ================================

/**
 * Realiza la descarga del CV
 */
function downloadCV() {
    const link = document.createElement('a');
    link.href = `${cvConfig.path}${cvConfig.filename}`;
    link.download = cvConfig.filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showDownloadFeedback();
}

/**
 * Muestra un feedback visual cuando se descarga el CV
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
 * Inicializa la funcionalidad de descarga del CV
 */
function initCVDownload() {
    const aboutContainer = document.querySelector('.about-container');
    if (!aboutContainer) return;
    if (isTouchDevice()) {
        let isActive = false;
        aboutContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isActive) {
                aboutContainer.classList.add('is-active');
                downloadCV();
                isActive = true;
            } else {
                aboutContainer.classList.remove('is-active');
                isActive = false;
            }
        });
        document.addEventListener('click', (e) => {
            if (isActive && !aboutContainer.contains(e.target)) {
                aboutContainer.classList.remove('is-active');
                isActive = false;
            }
        });
    } else {
        aboutContainer.addEventListener('click', downloadCV);
    }
}

// ================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ================================

/**
 * Inicializa los observadores de intersección para animaciones de entrada
 */
function initIntersectionObservers() {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                projectsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                startContactAnimations();
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

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

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0 && isTouchDevice()) {
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('is-active');
                if (card.classList.contains('is-active')) {
                    projectCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('is-active');
                        }
                    });
                }
            });
        });
        document.addEventListener('click', (e) => {
            projectCards.forEach(card => {
                if (!card.contains(e.target)) {
                    card.classList.remove('is-active');
                }
            });
        });
    }
}

function initMobileTouchFixes() {
    document.addEventListener('touchend', () => {
        if ('ontouchstart' in window) {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
    });
}

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

function showCopyFeedback(element, message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.className = 'copy-feedback';
    feedback.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(40, 167, 69, 0.95); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; z-index: 1000; pointer-events: none; white-space: nowrap; animation: copyFeedbackAnimation 2s ease-in-out forwards;`;
    if (!document.querySelector('#copy-feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'copy-feedback-styles';
        style.textContent = `@keyframes copyFeedbackAnimation { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } 20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } }`;
        document.head.appendChild(style);
    }
    element.style.position = 'relative';
    element.appendChild(feedback);
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

function handleExternalLink(event, element, url) {
    event.preventDefault();
    const feedbackMsg = translations[currentLang]['link-opening'] || 'Opening link...';
    showLinkFeedback(element, feedbackMsg);
    setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }, 500);
}

function showLinkFeedback(element, message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.className = 'link-feedback';
    feedback.style.cssText = `position: absolute; top: 50%; right: 0; transform: translateY(-50%); background: rgba(54, 162, 235, 0.95); color: white; padding: 6px 12px; border-radius: 15px; font-size: 11px; font-weight: 500; z-index: 1000; pointer-events: none; white-space: nowrap; animation: linkFeedbackAnimation 1.5s ease-in-out forwards;`;
    if (!document.querySelector('#link-feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'link-feedback-styles';
        style.textContent = `@keyframes linkFeedbackAnimation { 0% { opacity: 0; transform: translateY(-50%) translateX(10px); } 30%, 70% { opacity: 1; transform: translateY(-50%) translateX(0); } 100% { opacity: 0; transform: translateY(-50%) translateX(-10px); } }`;
        document.head.appendChild(style);
    }
    element.style.position = 'relative';
    element.appendChild(feedback);
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 1500);
}

function initImageParallax() {
    const profileImage = document.querySelector('.profile-image');
    const imageContainer = document.querySelector('.image-container');
    if (!profileImage || !imageContainer || isMobile()) return;
    function updateImageParallax(e) {
        const rect = imageContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        const rotateX = deltaY * -5;
        const rotateY = deltaX * 5;
        const translateZ = Math.abs(deltaX + deltaY) * 10;
        profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        const imageShadow = document.querySelector('.image-shadow');
        if (imageShadow) {
            imageShadow.style.transform = `translate(${20 - deltaX * 10}px, ${20 - deltaY * 10}px) scale(${1 + Math.abs(deltaX + deltaY) * 0.05})`;
        }
    }
    function resetImageParallax() {
        profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        const imageShadow = document.querySelector('.image-shadow');
        if (imageShadow) {
            imageShadow.style.transform = 'translate(20px, 20px) scale(1)';
        }
    }
    imageContainer.addEventListener('mousemove', updateImageParallax);
    imageContainer.addEventListener('mouseleave', resetImageParallax);
}

function initContactSection() {
    initIntersectionObservers();
    initImageParallax();
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

function initializeApp() {
    updateTexts(currentLang);
    updateLanguageButtons(currentLang);
    initHeaderScroll();
    initHamburgerMenu();
    initLanguageToggle();
    initActiveNavigation();
    initScrollIndicator();
    initParallaxEffect();
    initCVDownload();
    initIntersectionObservers();
    initProjectCards();
    initMobileTouchFixes();
    initContactSection();
}

function handleResize() {
    updateTexts(currentLang);
}

document.addEventListener('DOMContentLoaded', initializeApp);
window.addEventListener('resize', handleResize);
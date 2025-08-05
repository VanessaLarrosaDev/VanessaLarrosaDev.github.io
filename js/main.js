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
        "project-4-tags": "[ Tags: Próximamente, Tech4 ]"
    },
    en: {
        "nav-about": "About Me",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
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
        "project-4-tags": "[ Tags: Coming Soon, Tech4 ]"
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
    // Selecciona el menú de navegación
    const navMenu = document.getElementById('nav-menu');
    // Selecciona todos los enlaces de la navegación
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Si no existen los elementos necesarios, salir de la función
    if (!hamburger || !navMenu) return;
    
    // Evento para abrir/cerrar menú hamburguesa cuando se hace clic en el icono
    hamburger.addEventListener('click', () => {
        // Alterna la clase 'active' en el icono hamburguesa
        hamburger.classList.toggle('active');
        // Alterna la clase 'active' en el menú de navegación
        navMenu.classList.toggle('active');
    });
    
    // Cierra el menú al hacer clic en algún enlace (solo en modo móvil/tablet)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Solo cerrar si es tablet/móvil (ancho menor o igual a 1023px)
            if (isTabletOrMobile()) {
                // Espera un poco para que se note el feedback visual
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 300);
            }
        });
    });
    
    // Cierra el menú si haces clic fuera del menú o del icono hamburguesa
    document.addEventListener('click', (e) => {
        // Verifica que el clic no sea en el hamburger ni en el menú
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
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
        
        // Caso especial: mensaje de click que cambia según el dispositivo
        if (key === 'about-click-message') {
            // Determina si es móvil para mostrar el texto apropiado
            const clickKey = isMobile() ? 'about-click-mobile' : 'about-click-desktop';
            el.textContent = translations[lang][clickKey];
        }
        // Caso especial: título de hero que usa innerHTML para permitir saltos de línea
        else if (key === 'hero-title') {
            el.innerHTML = translations[lang][key];
        }
        // Resto de elementos: solo texto normal
        else if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
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
// NAVEGACIÓN ACTIVA EN EL MENÚ
// ================================

/**
 * Inicializa la funcionalidad de navegación activa y smooth scroll
 */
function initActiveNavigation() {
    // Selecciona todas las secciones que tienen ID
    const sections = document.querySelectorAll('section[id]');
    // Selecciona todos los enlaces de navegación que tienen data-section
    const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
    
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
            
            // Si el scroll está dentro de esta sección
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualiza las clases activas en los enlaces
        navLinks.forEach(link => {
            // Quita la clase active de todos los enlaces
            link.classList.remove('active');
            // Añade la clase active al enlace de la sección actual
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Ejecuta la función al hacer scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Ejecuta la función al cargar la página
    updateActiveLink();
    
    // Implementa smooth scroll para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previene el comportamiento por defecto del enlace
            e.preventDefault();
            
            // Obtiene el ID de la sección objetivo
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            // Si existe la sección objetivo
            if (targetSection) {
                // Calcula la altura del header para el offset
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                // Calcula la posición objetivo menos la altura del header
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Realiza el scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cierra el menú móvil si está abierto
                if (isTabletOrMobile()) {
                    const hamburger = document.getElementById('hamburger');
                    const navMenu = document.getElementById('nav-menu');
                    
                    // Espera un poco antes de cerrar para mejor UX
                    setTimeout(() => {
                        if (hamburger) hamburger.classList.remove('active');
                        if (navMenu) navMenu.classList.remove('active');
                    }, 300);
                }
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
    
    // Si existe el indicador
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // Busca la sección "about"
            const aboutSection = document.getElementById('about');
            
            // Si existe, hace scroll suave hacia ella
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
    // Solo aplica parallax en pantallas grandes
    if (!isMobile()) {
        /**
         * Actualiza el efecto parallax basado en el scroll
         */
        function updateParallax() {
            // Obtiene la posición actual del scroll
            const scrolled = window.pageYOffset;
            // Selecciona el elemento hero
            const hero = document.querySelector('.hero');
            // Velocidad del efecto parallax (más bajo = más lento)
            const parallaxSpeed = 0.5;
            
            // Si existe el elemento hero, aplica la transformación
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
    // Crea un elemento <a> temporal para la descarga
    const link = document.createElement('a');
    // Establece la ruta del archivo
    link.href = `${cvConfig.path}${cvConfig.filename}`;
    // Establece el nombre de descarga
    link.download = cvConfig.filename;
    // Abre en nueva pestaña como respaldo
    link.target = '_blank';
    
    // Añade el enlace al DOM temporalmente
    document.body.appendChild(link);
    // Simula el clic para iniciar la descarga
    link.click();
    // Remueve el enlace del DOM
    document.body.removeChild(link);
    
    // Muestra feedback visual de la descarga
    showDownloadFeedback();
}

/**
 * Muestra un feedback visual cuando se descarga el CV
 */
function showDownloadFeedback() {
    // Obtiene el contenedor de la sección about
    const aboutContainer = document.querySelector('.about-container');
    if (!aboutContainer) return;
    
    // Crea el elemento de feedback
    const feedback = document.createElement('div');
    feedback.textContent = translations[currentLang]['download-feedback'];
    
    // Aplica estilos inline al elemento de feedback
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
    
    // Añade estilos CSS para la animación si no existen
    if (!document.querySelector('#download-feedback-styles')) {
        const style = document.createElement('style');
        style.id = 'download-feedback-styles';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Establece posición relativa en el contenedor para el posicionamiento absoluto
    aboutContainer.style.position = 'relative';
    // Añade el feedback al contenedor
    aboutContainer.appendChild(feedback);
    
    // Remueve el feedback después de 2 segundos
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
    // Selecciona el contenedor de la sección about
    const aboutContainer = document.querySelector('.about-container');
    if (!aboutContainer) return;
    
    // Comportamiento diferente para dispositivos táctiles
    if (isTouchDevice()) {
        let isActive = false;
        
        // En dispositivos táctiles, alterna estado activo
        aboutContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (!isActive) {
                // Activa el estado y descarga
                aboutContainer.classList.add('is-active');
                downloadCV();
                isActive = true;
            } else {
                // Desactiva el estado
                aboutContainer.classList.remove('is-active');
                isActive = false;
            }
        });
        
        // Desactiva si se hace clic fuera del contenedor
        document.addEventListener('click', (e) => {
            if (isActive && !aboutContainer.contains(e.target)) {
                aboutContainer.classList.remove('is-active');
                isActive = false;
            }
        });
    } else {
        // En dispositivos no táctiles, descarga directamente al hacer clic
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
    // Observer para la sección about
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento entra en la vista
            if (entry.isIntersecting) {
                // Añade la clase para activar la animación
                entry.target.classList.add('in-view');
                // Deja de observar este elemento (animación única)
                aboutObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer para la sección de proyectos
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento entra en la vista
            if (entry.isIntersecting) {
                // Añade la clase para activar la animación
                entry.target.classList.add('in-view');
                // Deja de observar este elemento (animación única)
                projectsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa la sección about si existe
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
    
    // Observa la sección de proyectos si existe
    const projectsSection = document.querySelector('.projects');
    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }
}

// ================================
// FUNCIONALIDAD DE LAS TARJETAS DE PROYECTO
// ================================

/**
 * Inicializa la funcionalidad de las tarjetas de proyecto en dispositivos táctiles
 */
function initProjectCards() {
    // Selecciona todas las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    
    // Solo en dispositivos táctiles
    if (projectCards.length > 0 && isTouchDevice()) {
        // Añade funcionalidad de toggle a cada tarjeta
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Alterna el estado activo de la tarjeta actual
                card.classList.toggle('is-active');
                
                // Si se activa esta tarjeta, desactiva las demás
                if (card.classList.contains('is-active')) {
                    projectCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('is-active');
                        }
                    });
                }
            });
        });
        
        // Desactiva todas las tarjetas si se hace clic fuera
        document.addEventListener('click', (e) => {
            projectCards.forEach(card => {
                if (!card.contains(e.target)) {
                    card.classList.remove('is-active');
                }
            });
        });
    }
}

// ================================
// UTILIDADES PARA MÓVIL
// ================================

/**
 * Elimina estados hover persistentes en dispositivos móviles
 */
function initMobileTouchFixes() {
    // Elimina el estado :active después de touch
    document.addEventListener('touchend', () => {
        // Solo en dispositivos táctiles
        if ('ontouchstart' in window) {
            // Quita el foco del elemento activo para eliminar estados hover persistentes
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }
    });
}

// ================================
// INICIALIZACIÓN PRINCIPAL
// ================================

/**
 * Inicializa todas las funcionalidades cuando el DOM está listo
 */
function initializeApp() {
    // Inicializa los textos y botones de idioma con el idioma por defecto
    updateTexts(currentLang);
    updateLanguageButtons(currentLang);
    
    // Inicializa todas las funcionalidades
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
}

/**
 * Maneja el redimensionamiento de la ventana
 */
function handleResize() {
    // Actualiza los textos (importante para mensajes que cambian según dispositivo)
    updateTexts(currentLang);
}

// ================================
// EVENTOS PRINCIPALES
// ================================

// Inicializa la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeApp);

// Maneja el redimensionamiento de la ventana
window.addEventListener('resize', handleResize);
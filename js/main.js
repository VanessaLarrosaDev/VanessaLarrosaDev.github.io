
// ================================
// EFECTO DE SCROLL EN EL HEADER
// ================================
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScrollTop = scrollTop;
});

// ================================
// MENÚ HAMBURGUESA Y NAVEGACIÓN
// ================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Abrir/cerrar menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (versión móvil)
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // En móvil, cerrar el menú después de hacer clic
        if (window.innerWidth <= 1023) {
            setTimeout(() => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }, 300);
        }
    });
});

// Cerrar menú al clicar fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================================
// CAMBIO DE IDIOMA Y TRADUCCIONES
// ==================================

// Botón e indicadores
const langToggle = document.getElementById('lang-toggle');
const langText = document.querySelector('.lang-text');

// Idioma actual, inicializado al cargar
let currentLang = 'es';

// Diccionario de traducciones completo y consolidado
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
        "download-feedback": "¡CV descargándose!"
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
        "download-feedback": "CV downloading!"
    }
};

// Función para actualizar todos los textos según el idioma y el tamaño de la pantalla
// Esta es la versión correcta y consolidada
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');

        // Lógica especial para el mensaje de click
        if (key === 'about-click-message') {
            const isMobile = window.innerWidth <= 768;
            const clickKey = isMobile ? 'about-click-mobile' : 'about-click-desktop';
            el.textContent = translations[lang][clickKey];
        } 
        // Lógica especial para el título del hero que tiene <br>
        else if (key === 'hero-title') {
            el.innerHTML = translations[lang][key];
        } 
        // Lógica normal para el resto de elementos
        else if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// Evento de cambio de idioma
langToggle.addEventListener('click', () => {
    if (currentLang === 'es') {
        currentLang = 'en';
        langText.textContent = 'EN';
    } else {
        currentLang = 'es';
        langText.textContent = 'ES';
    }
    updateTexts(currentLang);
});


// ================================
// REMOVER ESTADOS HOVER PERSISTENTES EN MÓVIL (Versión simplificada)
// ================================
document.addEventListener('touchend', () => {
    // Solo en móviles, remover el foco de los elementos
    if ('ontouchstart' in window) {
        document.activeElement.blur();
    }
});


// ================================
// HERO SECTION FUNCTIONALITY
// ================================
const scrollIndicator = document.getElementById('scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ================================
// EFECTO PARALLAX SUTIL
// ================================
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const parallaxSpeed = 0.5;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
}
// Solo activar parallax en escritorio
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });
}


// ================================
// FUNCIONALIDAD DE DESCARGA DE CV
// ================================
const cvConfig = {
    filename: 'CV Vanessa Larrosa Vilar.pdf',
    path: 'assets/cv/',
};

const aboutContainer = document.querySelector('.about-container');

if (aboutContainer) {
    // Función para detectar si el dispositivo es táctil
    const isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    // Si es un dispositivo táctil (móvil), cambiamos la lógica del click
    if (isTouchDevice()) {
        let isActive = false;
        
        // Escuchador de eventos para el click (tap) en el contenedor "Sobre Mí"
        aboutContainer.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el evento se propague a los elementos padres

            // Si el efecto no está activo, lo activamos y descargamos el CV
            if (!isActive) {
                aboutContainer.classList.add('is-active');
                downloadCV(); // Llama a tu función de descarga
                isActive = true;
            } else {
                // Si ya estaba activo, lo desactivamos al hacer click de nuevo
                aboutContainer.classList.remove('is-active');
                isActive = false;
            }
        });
        
        // Escuchador de eventos para el documento completo
        // Desactiva el efecto si se hace click fuera del contenedor
        document.addEventListener('click', (e) => {
            if (isActive && !aboutContainer.contains(e.target)) {
                aboutContainer.classList.remove('is-active');
                isActive = false;
            }
        });
    } else {
        // En escritorio (no táctil), el click solo descarga el CV, el efecto hover lo gestiona el CSS
        aboutContainer.addEventListener('click', downloadCV);
    }
}

// La función `downloadCV` y `showDownloadFeedback` se mantienen igual
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

function showDownloadFeedback() {
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
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
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


// ================================
// INTERSECTION OBSERVER PARA ANIMACIONES DE LA SECCIÓN SOBRE MÍ
// ================================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            aboutObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// ================================
// LLAMADAS INICIALES Y LISTENERS
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Cargar idioma y textos iniciales
    updateTexts(currentLang);
    
    // Iniciar el Intersection Observer
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Inicializar la navegación activa
    handleActiveNavigation();

    // Sincronizar el texto del botón de idioma con el idioma actual
    langText.textContent = currentLang.toUpperCase();
});

// Listener para actualizar textos al redimensionar la ventana
window.addEventListener('resize', () => {
    updateTexts(currentLang);
});


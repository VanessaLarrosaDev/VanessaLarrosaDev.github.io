
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
// MENÚ HAMBURGUESA (versión móvil)
// ================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ================================
// NAVEGACIÓN ACTIVA
// ================================
const navLinks = document.querySelectorAll('.nav-menu a');

// Función para manejar la navegación activa
function handleActiveNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            // En móvil, cerrar el menú después de hacer clic
            if (window.innerWidth <= 1023) {
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 300);
            }
            
            // Aquí puedes agregar la lógica de navegación real
            // Por ejemplo: smooth scroll a la sección correspondiente
            const targetId = this.getAttribute('href');
            console.log('Navegando a:', targetId);
        });
    });
}

// Inicializar navegación activa
handleActiveNavigation();

// ==================================
// CAMBIO DE IDIOMA (con traducción)
// ==================================

// Botón e indicadores
const langToggle = document.getElementById('lang-toggle');
const langText = document.querySelector('.lang-text');

// Idioma actual
let currentLang = 'es';

// Diccionario de traducciones
const translations = {
    es: {
        "nav-about": "Sobre mí",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        "main-title": "VANESSA LA",
        // Agrega aquí más claves conforme avances
    },
    en: {
        "nav-about": "About Me",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "main-title": "VANESSA LA",
        // Agrega aquí más claves conforme avances
    }
};

// Función para actualizar todos los textos según el idioma
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
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
// CERRAR MENÚ AL CLICAR FUERA
// ================================
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ================================
// REMOVER ESTADOS HOVER PERSISTENTES EN MÓVIL
// ================================
function handleTouchEnd() {
    // En dispositivos táctiles, remover cualquier estado hover persistente
    if ('ontouchstart' in window) {
        navLinks.forEach(link => {
            link.addEventListener('touchend', function() {
                // Pequeño delay para permitir que se complete la animación de click
                setTimeout(() => {
                    this.blur(); // Remover el foco del elemento
                }, 100);
            });
        });
    }
}

// Inicializar manejo de touch
handleTouchEnd();

// ================================
// HERO SECTION FUNCTIONALITY - FUNCIONALIDAD DE LA SECCIÓN HERO
// ================================

// Obtiene el elemento del indicador de scroll (flecha + texto)
const scrollIndicator = document.getElementById('scroll-indicator');

// Añade funcionalidad de scroll suave al hacer clic en la flecha
scrollIndicator.addEventListener('click', () => {
    // Calcula la altura del viewport (ventana del navegador) para hacer scroll a la siguiente sección
    const viewportHeight = window.innerHeight;
    
    // Hace scroll suave hasta la altura de una pantalla completa
    window.scrollTo({
        top: viewportHeight, // Desplaza exactamente una pantalla hacia abajo
        behavior: 'smooth' // Animación suave en lugar de salto brusco
    });
});

// ================================
// EFECTO PARALLAX SUTIL - MOVIMIENTO SUTIL DEL HERO AL HACER SCROLL
// ================================

// Variable para controlar la optimización de rendimiento
let ticking = false;

// Función que actualiza el efecto parallax
function updateParallax() {
    // Obtiene cuánto se ha desplazado la página
    const scrolled = window.pageYOffset;
    // Obtiene el elemento hero
    const hero = document.querySelector('.hero');
    // Velocidad del efecto parallax (más bajo = más sutil)
    const parallaxSpeed = 0.5;
    
    // Si existe el elemento hero, aplica el desplazamiento
    if (hero) {
        // Mueve el hero hacia arriba a medida que se hace scroll hacia abajo
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    
    // Resetea la variable de control para permitir la siguiente actualización
    ticking = false;
}

// Función optimizada que controla cuándo actualizar el parallax
function requestParallaxUpdate() {
    // Solo ejecuta si no hay una actualización pendiente (optimización de rendimiento)
    if (!ticking) {
        // Programa la actualización para el siguiente frame de animación
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Solo activar parallax en escritorio para mejor rendimiento
// En móviles puede causar lag, así que lo desactivamos
if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestParallaxUpdate);
}

// ================================
// TRADUCCIONES ACTUALIZADAS - AÑADIR TEXTOS DEL HERO AL SISTEMA DE IDIOMAS
// ================================

// Actualizar el objeto translations existente con las nuevas claves del hero
// Object.assign añade las nuevas propiedades sin borrar las existentes

// Traducciones en español
Object.assign(translations.es, {
    "hero-title": "DESARROLLADORA<br>DE SOFTWARE", // Título principal en español
    "hero-subtitle": '"Hola, soy Vanessa, graduada en DAM apasionada por el código, explorando frontend y backend para crear experiencias digitales completas."', // Descripción en español
    "scroll-text": "Scroll para explorar" // Texto del indicador de scroll en español
});

// Traducciones en inglés
Object.assign(translations.en, {
    "hero-title": "SOFTWARE<br>DEVELOPER", // Título principal en inglés
    "hero-subtitle": '"Hi, I\'m Vanessa, a DAM graduate passionate about code, exploring frontend and backend to create complete digital experiences."', // Descripción en inglés
    "scroll-text": "Scroll to explore" // Texto del indicador de scroll en inglés
});

// ================================
// FUNCIÓN MEJORADA PARA ACTUALIZAR TEXTOS CON HTML
// ================================

// Esta función reemplaza la función updateTexts existente
// Permite usar HTML en ciertos elementos (como el <br> en el título)
function updateTexts(lang) {
    // Busca todos los elementos que tienen el atributo data-key
    const elements = document.querySelectorAll('[data-key]');
    
    // Recorre cada elemento encontrado
    elements.forEach(el => {
        // Obtiene la clave de traducción del elemento
        const key = el.getAttribute('data-key');
        
        // Si existe la traducción para ese idioma y esa clave
        if (translations[lang] && translations[lang][key]) {
            // Para el título del hero, permite HTML (como <br>)
            if (key === 'hero-title') {
                el.innerHTML = translations[lang][key]; // Permite HTML
            } else {
                el.textContent = translations[lang][key]; // Solo texto plano
            }
        }
    });
}

// ================================
// NAVEGACIÓN SUAVE A LA SECCIÓN SOBRE MÍ
// ================================

// Función para navegación suave
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Inicializar navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Buscar todos los enlaces que apuntan a #about
    const aboutLinks = document.querySelectorAll('a[href="#about"]');
    
    aboutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir comportamiento por defecto
            smoothScrollToSection('#about');
            
            // En móvil, cerrar el menú si está abierto
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Actualizar navegación activa
            document.querySelectorAll('.nav-menu a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
        });
    });
});

// ================================
// FUNCIONALIDAD DE DESCARGA DE CV
// ================================

// Configuración del archivo CV
const cvConfig = {
    filename: 'CV Vanessa Larrosa Vilar.pdf', // Nombre del archivo
    path: 'assets/cv/', // Ruta donde está el CV (ajustar según tu estructura)
};

// Función para descargar el CV
function downloadCV() {
    // Crear elemento de descarga temporal
    const link = document.createElement('a');
    link.href = `${cvConfig.path}${cvConfig.filename}`;
    link.download = cvConfig.filename;
    link.target = '_blank'; // Abrir en nueva pestaña como fallback
    
    // Añadir al DOM temporalmente y hacer click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback visual opcional
    showDownloadFeedback();
}

// Feedback visual de descarga
function showDownloadFeedback() {
    const aboutContainer = document.querySelector('.about-container');
    if (aboutContainer) {
        // Crear elemento de feedback
        const feedback = document.createElement('div');
        feedback.textContent = currentLang === 'es' ? '¡CV descargándose!' : 'CV downloading!';
        feedback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(187, 126, 251, 0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            z-index: 100;
            pointer-events: none;
            animation: fadeInOut 2s ease-in-out forwards;
        `;
        
        // Añadir animación CSS
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
        
        // Remover feedback después de la animación
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }
}

// Inicializar funcionalidad de descarga
document.addEventListener('DOMContentLoaded', () => {
    const aboutContainer = document.querySelector('.about-container');
    if (aboutContainer) {
        aboutContainer.addEventListener('click', downloadCV);
        
        // Actualizar tooltip según idioma
        function updateTooltipLanguage() {
            aboutContainer.setAttribute('data-lang', currentLang);
        }
        
        // Actualizar tooltip inicial
        updateTooltipLanguage();
        
        // Escuchar cambios de idioma
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                setTimeout(updateTooltipLanguage, 100); // Pequeño delay para que currentLang se actualice
            });
        }
    }
});

// ================================
// INTERSECTION OBSERVER PARA ANIMACIONES DE LA SECCIÓN SOBRE MÍ
// ================================

// Configuración del observer para detectar cuando la sección es visible
const observerOptions = {
    threshold: 0.3, // Se activa cuando el 30% de la sección es visible
    rootMargin: '0px 0px -50px 0px' // Margen inferior para activar un poco antes
};

// Crear el observer
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Añadir clase para activar animaciones
            entry.target.classList.add('in-view');
            
            // Opcional: dejar de observar una vez que se ha animado
            aboutObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Inicializar observer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }
});

// ================================
// TRADUCCIONES PARA LA SECCIÓN SOBRE MÍ
// ================================

// Añadir traducciones al objeto existente
Object.assign(translations.es, {
    "about-title": "SOBRE MÍ",
    "about-text-1": "Combino mi pasión por el código con una curiosidad infinita por aprender.",
    "about-text-2": "Desde Unity hasta backend, disfruto explorando diferentes tecnologías y creando proyectos que resuelvan problemas reales.",
    "about-text-3": "Mi experiencia como profesora me dio una perspectiva única: la paciencia para debuggear y la creatividad para encontrar soluciones elegantes.",
    "about-text-4": "Siempre hay algo nuevo que descubrir en este mundo del desarrollo."
});

Object.assign(translations.en, {
    "about-title": "ABOUT ME",
    "about-text-1": "I combine my passion for code with an infinite curiosity to learn.",
    "about-text-2": "From Unity to backend, I enjoy exploring different technologies and creating projects that solve real problems.",
    "about-text-3": "My experience as a teacher gave me a unique perspective: the patience to debug and the creativity to find elegant solutions.",
    "about-text-4": "There's always something new to discover in this world of development."
});
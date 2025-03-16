// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const header = document.getElementById('header');
    const scrollToTop = document.getElementById('scroll-to-top');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const skillLevels = document.querySelectorAll('.skill-level');
    const contactForm = document.getElementById('contact-form');
    const tabButtons = document.querySelectorAll('.experience__tab-btn');
    const tabContents = document.querySelectorAll('.experience__tab-content');

    // Asignar índices a los elementos de navegación para animación
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // Funciones de navegación mejoradas
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Prevenir scroll cuando el menú está abierto
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
            // Añadir eventos de teclado para accesibilidad
            document.addEventListener('keydown', handleEscKey);
        } else {
            document.body.style.overflow = '';
            // Quitar eventos de teclado
            document.removeEventListener('keydown', handleEscKey);
        }
    }

    // Función para cerrar menú con tecla Escape
    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    }

    function closeMenu() {
        if (menuToggle.getAttribute('aria-expanded') === 'true') {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscKey);
        }
    }

    // Cambiar estilo del header al hacer scroll
    function checkScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            scrollToTop.classList.remove('active');
        }
    }

    // Scroll suave al hacer clic en enlaces de navegación
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        closeMenu();
    }

    // Actualizar link activo en la navegación
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Animar las barras de habilidades cuando sean visibles
    function animateSkillBars() {
        skillLevels.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (skillPosition < screenPosition) {
                const skillWidth = skill.parentElement.getAttribute('data-width');
                skill.style.width = skillWidth;
            }
        });
    }

    // Animar elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition) {
                element.classList.add('active');
            }
        });
        
        animateSkillBars();
    }

    // Inicialización de las barras de habilidades
    function initSkillBars() {
        skillLevels.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0';
            skill.parentElement.setAttribute('data-width', width);
        });
    }

    // Scroll a la parte superior de la página
    function scrollToTopFunction() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Validar formulario de contacto
    function validateForm(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        // Validación básica
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Por favor ingresa tu nombre');
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Por favor ingresa tu email');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Por favor ingresa un email válido');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Por favor ingresa un asunto');
            isValid = false;
        } else {
            removeError(subjectInput);
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Por favor ingresa un mensaje');
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        if (isValid) {
            // Aquí se enviaría el formulario, pero como es un ejercicio, mostramos un mensaje de éxito
            showSuccessMessage();
            contactForm.reset();
        }
    }

    // Funciones auxiliares para validación de formulario
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        if (!formGroup.querySelector('.error-message')) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            formGroup.appendChild(errorElement);
        } else {
            formGroup.querySelector('.error-message').textContent = message;
        }
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Mensaje enviado con éxito. Te contactaré pronto.';
        
        contactForm.parentElement.insertBefore(successMessage, contactForm);
        
        // Eliminar el mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Agregar clases fade-in a elementos para animaciones
    function addFadeInClass() {
        document.querySelectorAll('.timeline-item, .skill-category, .project-card, .education-item').forEach(element => {
            element.classList.add('fade-in');
        });
    }

    // Animación de observador para elementos que aparecen al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-category, .education-item, .glass-card').forEach(item => {
        observer.observe(item);
    });

    // Efecto de desplazamiento para la navegación
    window.addEventListener('scroll', () => {
        // Cambiar estilo del header al hacer scroll
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Mostrar/ocultar botón de volver arriba
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }

        // Actualizar enlace activo en navegación
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

    // Scroll al principio de la página al hacer clic en el botón
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animación de contador para estadísticas
    const counterAnimation = () => {
        const counters = document.querySelectorAll('.about__stat-number span');
        
        counters.forEach(counter => {
            const target = +counter.dataset.count;
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps approx
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                counter.textContent = Math.floor(current);
                
                if (current < target) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            const statObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    statObserver.unobserve(counter);
                }
            }, { threshold: 0.5 });
            
            statObserver.observe(counter);
        });
    };

    // Manejador de pestañas para sección de experiencia
    function handleTabClick() {
        // Eliminar clase active de todos los botones y contenidos
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Añadir clase active al botón clickeado
        this.classList.add('active');
        
        // Mostrar el contenido correspondiente
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    }

    // Inicializar la funcionalidad de pestañas de experiencia
    function initExperienceTabs() {
        if (tabButtons.length > 0) {
            tabButtons.forEach(button => {
                button.addEventListener('click', handleTabClick);
            });
        }
    }

    // Inicializar menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al hacer clic fuera del menú
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Inicializar
    function init() {
        // Añadir clases para animaciones
        addFadeInClass();
        
        // Inicializar barras de habilidades
        initSkillBars();
        
        // Event Listeners
        menuToggle.addEventListener('click', toggleMenu);
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('scroll', setActiveNavLink);
        window.addEventListener('scroll', animateOnScroll);
        scrollToTop.addEventListener('click', scrollToTopFunction);
        
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        if (contactForm) {
            contactForm.addEventListener('submit', validateForm);
        }
        
        // Comprobar scroll inicial
        checkScroll();
        setActiveNavLink();
        animateOnScroll();
    }

    // Iniciar la aplicación
    init();

    // Inicializar al cargar la página
    counterAnimation();
    initExperienceTabs();
    animateSkillBars();

    // Mejorar accesibilidad de tarjetas de proyecto para foco con teclado
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Hacer que las tarjetas sean navegables con teclado
        card.setAttribute('tabindex', '0');
        
        // Mostrar información al recibir foco
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const info = this.querySelector('.project-info');
                if (info) {
                    info.style.transform = 'translateY(0)';
                }
                
                // Foco en el primer botón
                const firstButton = this.querySelector('.project-links a');
                if (firstButton) {
                    setTimeout(() => {
                        firstButton.focus();
                    }, 300);
                }
            }
        });
    });
    
    // Verificar si hay imágenes en rutas relativas incorrectas y corregirlas
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (this.src.startsWith('/')) {
                // Corregir rutas que comienzan con barra
                const newSrc = this.src.replace(/^\//, '');
                this.src = newSrc;
            }
        });
    });

    // Inicialización
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', checkScreenSize);
    
    scrollToTop.addEventListener('click', scrollToTopFunction);
    
    // Inicializar
    checkScroll();
    setActiveNavLink();
    initSkillBars();
    addFadeInClass();
    checkScreenSize();
    
    // Detectar cambios de tamaño para mejorar responsive
    function checkScreenSize() {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    }

    // Función para animación de typing con cursor
    function initTypingEffect() {
        const typingTexts = document.querySelectorAll('.hero__typing-text');
        
        // Crear cursor de escritura
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        
        // Añadir cursor después del contenedor de typing
        const typingContainer = document.querySelector('.hero__typing');
        if (typingContainer) {
            typingContainer.appendChild(cursor);
        }
        
        // Función para activar cada texto en secuencia
        function activateTypingText(index) {
            typingTexts.forEach(text => text.classList.remove('active'));
            
            if (index < typingTexts.length) {
                typingTexts[index].classList.add('active');
                
                // Preparar la siguiente animación
                setTimeout(() => {
                    activateTypingText((index + 1) % typingTexts.length);
                }, 2000); // 2 segundos por palabra
            }
        }
        
        // Iniciar la animación de typing
        if (typingTexts.length > 0) {
            activateTypingText(0);
        }
    }

    // Detector de preferencias de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Inicializar efecto de typing solo si el usuario no prefiere movimiento reducido
    if (!prefersReducedMotion) {
        initTypingEffect();
    } else {
        // Alternativa para usuarios que prefieren movimiento reducido
        const typingContainer = document.querySelector('.hero__typing');
        if (typingContainer) {
            const allTexts = Array.from(typingContainer.querySelectorAll('.hero__typing-text'));
            allTexts.forEach(text => text.style.display = 'none');
            
            // Mostrar solo el primer texto sin animación
            if (allTexts.length > 0) {
                allTexts[0].style.display = 'inline';
            }
        }
    }
    
    // Manejo de navegación con teclado para iconos de tecnología
    const techIcons = document.querySelectorAll('.hero__tech-icons i');
    techIcons.forEach(icon => {
        icon.addEventListener('keydown', function(e) {
            // Activar el hover al presionar Enter o Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Simular el hover
                this.classList.add('active');
                
                // Mostrar tooltip o información sobre la tecnología
                const techName = this.getAttribute('title');
                if (techName) {
                    // Se podría implementar un tooltip accesible aquí
                    console.log(`Tecnología: ${techName}`);
                }
            }
        });
        
        // Quitar el estado activo al perder el foco
        icon.addEventListener('blur', function() {
            this.classList.remove('active');
        });
    });
});

// Animación de texto cyberpunk para elementos destacados
function glitchEffect(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        // Solo aplicar a elementos visibles
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('glitch-active');
            setTimeout(() => {
                element.classList.remove('glitch-active');
            }, 2000);
        }
    });
}

// Aplicar efecto glitch a títulos de proyectos ocasionalmente
setInterval(() => {
    glitchEffect('.project-info h3');
}, 10000);

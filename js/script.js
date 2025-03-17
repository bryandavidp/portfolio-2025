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
    // Nuevos elementos para caso de estudio
    const caseStudyButtons = document.querySelectorAll('.case-study-btn');

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
    initProjectModals();

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
    
    // Función para inicializar los modales de proyectos
    function initProjectModals() {
        // Obtener todos los botones de caso de estudio
        const caseStudyButtons = document.querySelectorAll('.case-study-btn');
        const modalCloseButtons = document.querySelectorAll('.project-modal-close');
        const modalOverlays = document.querySelectorAll('.project-modal-overlay');
        
        // Mejorar la interactividad del botón de caso de estudio
        caseStudyButtons.forEach(button => {
            // Añadir efecto pulsante
            const addPulseEffect = () => {
                if (!button.classList.contains('pulse-effect')) {
                    button.classList.add('pulse-effect');
                    setTimeout(() => {
                        button.classList.remove('pulse-effect');
                    }, 1000);
                }
            };
            
            // Añadir efecto de destello aleatorio
            setInterval(() => {
                // Solo aplicar a botones visibles en la pantalla
                const rect = button.getBoundingClientRect();
                if (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                ) {
                    if (Math.random() > 0.7 && !prefersReducedMotion) {
                        addPulseEffect();
                    }
                }
            }, 3000);
            
            // Agregar evento de clic a los botones de caso de estudio
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const modal = document.getElementById(`modal-${projectId}`);
                
                if (modal) {
                    // Preparar el modal antes de mostrarlo
                    prepareModalForAnimation(modal);
                    
                    // Marcar este botón como el último que se hizo clic
                    caseStudyButtons.forEach(btn => btn.removeAttribute('data-active'));
                    this.setAttribute('data-active', 'true');
                    
                    // Efecto de clic para feedback visual
                    this.classList.add('clicked');
                    setTimeout(() => {
                        this.classList.remove('clicked');
                    }, 300);
                    
                    // Abrir el modal después de un pequeño retraso para permitir la preparación del DOM
                    requestAnimationFrame(() => {
                        // Abrir el modal
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden'; // Prevenir scroll en el body
                        
                        // Agregar evento de teclado para accesibilidad
                        document.addEventListener('keydown', handleModalEscKey);
                        
                        // Enfocar el primer elemento interactivo dentro del modal
                        setTimeout(() => {
                            const closeButton = modal.querySelector('.project-modal-close');
                            if (closeButton) {
                                closeButton.focus();
                            }
                        }, 100);
                    });
                }
            });
        });
        
        // Función para preparar el modal antes de la animación
        function prepareModalForAnimation(modal) {
            // Asegurar que las secciones y elementos estén preparados para la animación
            const sections = modal.querySelectorAll('.project-modal-section');
            const metrics = modal.querySelectorAll('.project-modal-metric');
            const techItems = modal.querySelectorAll('.project-modal-tech-item');
            
            // Hacer reset de las propiedades de animación
            [...sections, ...metrics, ...techItems].forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(15px)';
                // No establecer transición aquí para evitar glitches
                element.style.transition = 'none';
            });
            
            // Forzar reflow para aplicar los estilos inmediatamente
            modal.offsetHeight;
        }
        
        // Función para cerrar modal con tecla Escape
        function handleModalEscKey(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        }
        
        // Agregar evento de clic a los botones de cierre
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', function() {
                closeAllModals();
            });
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        });
        
        // Función para cerrar todos los modales
        function closeAllModals() {
            modalOverlays.forEach(overlay => {
                // Eliminar la clase active con una pequeña transición
                overlay.classList.remove('active');
                
                // Restaurar scroll después de que termine la animación
                setTimeout(() => {
                    document.body.style.overflow = '';
                }, 400); // Coincidir con la duración de la transición CSS
            });
            
            // Eliminar evento de teclado
            document.removeEventListener('keydown', handleModalEscKey);
            
            // Devolver el foco al último botón de caso de estudio que se hizo clic
            setTimeout(() => {
                // Encontrar el último botón de caso de estudio que se hizo clic
                const activeButton = document.querySelector('.case-study-btn[data-active="true"]');
                if (activeButton) {
                    activeButton.focus();
                    activeButton.removeAttribute('data-active');
                }
            }, 100);
        }
        
        // Agregar eventos de teclado para navegación accesible dentro del modal
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    const focusableElements = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    // Si se está presionando Shift + Tab y el elemento activo es el primero, enfoca el último
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                    // Si se está presionando Tab y el elemento activo es el último, enfoca el primero
                    else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        });
        
        // Animar elementos dentro del modal cuando se abre
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('transitionend', function(e) {
                // Solo animar si fue el overlay el que completó la transición y está activo
                if (e.target === this && this.classList.contains('active')) {
                    animateModalContent(this);
                }
            });
        });
        
        // Función para animar el contenido del modal
        function animateModalContent(modal) {
            // Establecer primero las propiedades de transición para evitar glitches
            const elements = modal.querySelectorAll('.project-modal-section, .project-modal-tech-item, .project-modal-metric');
            
            // Aplicar animaciones con un enfoque más suave y progresivo
            elements.forEach((el, index) => {
                // Establecer la transición antes de cualquier cambio visual
                el.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
                
                // Establecer estado inicial
                el.style.opacity = '0';
                el.style.transform = 'translateY(15px)';
                
                // Asignar un retraso más corto para mejorar la percepción de fluidez
                const delay = 150 + (index * 40);
                
                // Aplicar los cambios después de un pequeño retraso
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                }, delay);
            });
            
            // También animar elementos simples de texto para asegurar legibilidad
            const textElements = modal.querySelectorAll('.project-modal-header-content p, .project-modal-section p, .project-modal-section ul li');
            textElements.forEach((el) => {
                // Asegurar que el texto siempre sea legible
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    }
    
    // Animación de la línea de tiempo de experiencia
    function initExperienceTimeline() {
        const timelineNodes = document.querySelectorAll('.timeline-node');
        
        // Crear observador para animar los nodos de la línea de tiempo
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Añadir delay para escalonar las animaciones
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 150 * Array.from(timelineNodes).indexOf(entry.target));
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        // Observar cada nodo de la línea de tiempo
        timelineNodes.forEach(node => {
            observer.observe(node);
        });
        
        // Efecto de desplazamiento paralax para la línea de tiempo
        window.addEventListener('scroll', () => {
            const timeline = document.querySelector('.experience-timeline');
            if (timeline) {
                const timelineRect = timeline.getBoundingClientRect();
                // Solo aplicar efecto si la línea de tiempo está visible
                if (timelineRect.top < window.innerHeight && timelineRect.bottom > 0) {
                    const scrollPosition = window.scrollY;
                    const timelineOffset = timeline.offsetTop;
                    const scrollPercentage = (scrollPosition - timelineOffset + 500) / (timeline.offsetHeight + 500);
                    
                    // Aplicar movimiento a los nodos según el scroll
                    timelineNodes.forEach((node, index) => {
                        if (node.classList.contains('visible')) {
                            const direction = index % 2 === 0 ? 1 : -1;
                            const translateX = Math.min(15, scrollPercentage * 40) * direction;
                            const rotate = Math.min(1, scrollPercentage * 3) * direction;
                            node.querySelector('.timeline-card').style.transform = 
                                `translateY(-10px) translateX(${translateX}px) rotate(${rotate}deg)`;
                        }
                    });
                }
            }
        });
        
        // Aplicar efecto de parpadeo aleatorio a los marcadores
        setInterval(() => {
            if (!prefersReducedMotion) {
                const randomNode = timelineNodes[Math.floor(Math.random() * timelineNodes.length)];
                if (randomNode && randomNode.classList.contains('visible')) {
                    const marker = randomNode.querySelector('.marker-dot');
                    marker.style.transform = 'scale(1.3)';
                    marker.style.boxShadow = '0 0 25px var(--accent-primary)';
                    
                    setTimeout(() => {
                        marker.style.transform = '';
                        marker.style.boxShadow = '';
                    }, 1000);
                }
            }
        }, 4000);
    }
    
    // Animación de las tarjetas de habilidades
    function initSkillsAnimation() {
        const skillItems = document.querySelectorAll('.skill-tag-item');
        
        // Añadir delay de animación a cada elemento
        skillItems.forEach((item, index) => {
            // Añadir delay escalonado para cada elemento
            const delay = index * 0.1;
            item.style.animationDelay = `${delay}s`;
            
            // Añadir clase de animación al ser visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, delay * 1000);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(item);
        });
        
        // Añadir efecto de brillo aleatorio a algunos elementos
        /* setInterval(() => {
            if (!prefersReducedMotion) {
                const randomItem = skillItems[Math.floor(Math.random() * skillItems.length)];
                randomItem.classList.add('glow-effect');
                
                setTimeout(() => {
                    randomItem.classList.remove('glow-effect');
                }, 2000);
            }
        }, 3000); */
    }
    
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
    initSkillsAnimation();
    initExperienceTimeline();
    initEducationCards();
    initContactCards();
    
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

// Inicialización de la sección de educación con animaciones escalonadas
function initEducationCards() {
    const educationCards = document.querySelectorAll('.education-card');
    
    // Crear observer para las tarjetas de educación
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir delay escalonado para cada tarjeta
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Añadir efectos aleatorios a los badges
                    const badge = entry.target.querySelector('.education-badge');
                    const randomDelay = Math.random() * 3000 + 2000; // Entre 2 y 5 segundos
                    
                    // Función para pulsar el badge aleatoriamente
                    const pulseBadge = () => {
                        if (Math.random() > 0.5 && !prefersReducedMotion) {
                            badge.style.transform = 'scale(1.2) rotate(' + (Math.random() * 10 - 5) + 'deg)';
                            badge.style.boxShadow = '0 0 20px rgba(var(--accent-primary-rgb), 0.7)';
                            
                            setTimeout(() => {
                                badge.style.transform = '';
                                badge.style.boxShadow = '';
                            }, 700);
                        }
                    };
                    
                    // Iniciar pulsaciones aleatorias
                    if (!prefersReducedMotion) {
                        setTimeout(() => {
                            setInterval(pulseBadge, randomDelay);
                        }, index * 300);
                    }
                    
                    // Animar skills después de aparecer la tarjeta
                    const skills = entry.target.querySelectorAll('.education-skills span');
                    skills.forEach((skill, skillIndex) => {
                        setTimeout(() => {
                            skill.style.opacity = '0';
                            skill.style.transform = 'translateY(20px)';
                            skill.style.transition = 'all 0.4s ease';
                            
                            setTimeout(() => {
                                skill.style.opacity = '1';
                                skill.style.transform = 'translateY(0)';
                            }, 50);
                        }, 500 + (skillIndex * 100));
                    });
                    
                }, 150 * index);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    // Observar cada tarjeta de educación
    educationCards.forEach(card => {
        observer.observe(card);
    });
    
    // Añadir efectos interactivos a las habilidades
    document.querySelectorAll('.education-skills span').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            if (!prefersReducedMotion) {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            }
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Inicialización de la sección de contacto con animaciones
function initContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    // Observer para las tarjetas de contacto
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añadir delay escalonado para cada tarjeta
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Aplicar efecto de resaltado al badge
                    const badge = entry.target.querySelector('.contact-badge');
                    if (badge && !prefersReducedMotion) {
                        setTimeout(() => {
                            badge.style.transform = 'scale(1.2) rotate(10deg)';
                            badge.style.boxShadow = '0 0 20px rgba(var(--accent-primary-rgb), 0.7)';
                            
                            setTimeout(() => {
                                badge.style.transform = '';
                                badge.style.boxShadow = '';
                            }, 1000);
                        }, 500);
                    }
                    
                    // Animación progresiva para los elementos de información de contacto
                    const contactItems = entry.target.querySelectorAll('.contact-item, .form-group');
                    contactItems.forEach((item, itemIndex) => {
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px)';
                            item.style.transition = 'all 0.5s ease';
                            
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        }, 300 + (itemIndex * 150));
                    });
                    
                }, 200 * index);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    // Observar cada tarjeta de contacto
    contactCards.forEach(card => {
        observer.observe(card);
    });
    
    // Añadir efectos aleatorios para los iconos de contacto
    if (!prefersReducedMotion) {
        setInterval(() => {
            const items = document.querySelectorAll('.contact-icon, .platform-icon');
            if (items.length > 0) {
                const randomItem = items[Math.floor(Math.random() * items.length)];
                
                randomItem.style.transform = 'scale(1.2) rotate(10deg)';
                randomItem.style.boxShadow = '0 0 15px rgba(var(--accent-primary-rgb), 0.6)';
                
                setTimeout(() => {
                    randomItem.style.transform = '';
                    randomItem.style.boxShadow = '';
                }, 1000);
            }
        }, 3000);
    }
}

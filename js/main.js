document.addEventListener('DOMContentLoaded', function() {
    // Agregar atributo data-text para efectos de glitch
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        heroTitle.setAttribute('data-text', heroTitle.textContent);
    }
    
    // Observador de Intersección para elementos con animación
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar elementos de la tarjeta
    document.querySelectorAll('.glass-card, .skill-category, .education-item, .hero__tech-icons i, .stat-item').forEach(item => {
        observer.observe(item);
    });

    // Efecto flotante para iconos de tecnología
    const techIcons = document.querySelectorAll('.hero__tech-icons i');
    techIcons.forEach((icon, index) => {
        // Agregar retraso y clase para animación flotante
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('tech-icon-float');
        
        // Animación al hover para mostrar tooltip con nombre de tecnología
        icon.addEventListener('mouseenter', function() {
            const techName = this.getAttribute('class').split('fa-')[1].split(' ')[0];
            const tooltip = document.createElement('span');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = techName.charAt(0).toUpperCase() + techName.slice(1);
            this.appendChild(tooltip);
        });
        
        icon.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tech-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Efecto de hover para secciones con gradiente
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            // Calcular posición relativa del mouse dentro de la sección
            const rect = section.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Actualizar variables CSS personalizadas
            section.style.setProperty('--mouse-x', `${x}%`);
            section.style.setProperty('--mouse-y', `${y}%`);
        });
        
        section.addEventListener('mouseleave', () => {
            // Restablecer la posición al centro cuando el mouse sale
            section.style.setProperty('--mouse-x', '50%');
            section.style.setProperty('--mouse-y', '50%');
        });
    });

    // Efecto parallax suave para el hero
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero__content');
    const profileFrame = document.querySelector('.hero__profile-frame');
    
    window.addEventListener('scroll', () => {
        if (hero) {
            const scrollPosition = window.scrollY;
            if (scrollPosition < hero.offsetHeight) {
                // Efecto parallax en contenido y perfil
                content.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                profileFrame.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${scrollPosition * 0.1}px)`;
            }
        }
    });
    
    // Efecto de glitch aleatorio en textos cyberpunk
    const glitchElements = document.querySelectorAll('.hero__title, .section-title, .hero__greeting');
    
    function triggerGlitch() {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        randomElement.classList.add('glitch-effect');
        
        setTimeout(() => {
            randomElement.classList.remove('glitch-effect');
        }, 500);
        
        // Programar próximo glitch aleatorio
        setTimeout(triggerGlitch, Math.random() * 5000 + 3000);
    }
    
    // Iniciar glitch con un retraso
    setTimeout(triggerGlitch, 3000);
    
    // Animación de escritura para elementos de código
    const codeElements = document.querySelectorAll('.hero__greeting');
    
    codeElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = 1;
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                
                // Añadir cursor parpadeante al final
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '|';
                element.appendChild(cursor);
            }
        }, 100);
    });

    // Tooltip accesible para móviles
    const skillTags = document.querySelectorAll('[data-tooltip]');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Solo crear tooltip en dispositivos táctiles
            if (window.matchMedia('(max-width: 768px)').matches) {
                const tooltip = document.querySelector('.mobile-tooltip');
                
                // Eliminar tooltip existente
                if (tooltip) {
                    tooltip.remove();
                }
                
                // Crear nuevo tooltip
                const newTooltip = document.createElement('div');
                newTooltip.className = 'mobile-tooltip';
                newTooltip.textContent = this.getAttribute('data-tooltip');
                
                // Posicionar y mostrar
                document.body.appendChild(newTooltip);
                
                const rect = this.getBoundingClientRect();
                newTooltip.style.top = `${rect.top - newTooltip.offsetHeight - 10}px`;
                newTooltip.style.left = `${rect.left + (rect.width / 2) - (newTooltip.offsetWidth / 2)}px`;
                
                // Cerrar tooltip al hacer clic en cualquier lugar
                setTimeout(() => {
                    document.addEventListener('click', function closeTooltip() {
                        newTooltip.remove();
                        document.removeEventListener('click', closeTooltip);
                    });
                }, 10);
            }
        });
    });

    // Mejora de contraste adaptativo
    const contrastButton = document.getElementById('contrast-toggle');
    if (contrastButton) {
        contrastButton.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            
            // Guardar preferencia en localStorage
            if (document.body.classList.contains('high-contrast')) {
                localStorage.setItem('highContrast', 'true');
                contrastButton.setAttribute('aria-pressed', 'true');
                contrastButton.title = 'Desactivar alto contraste';
            } else {
                localStorage.setItem('highContrast', 'false');
                contrastButton.setAttribute('aria-pressed', 'false');
                contrastButton.title = 'Activar alto contraste';
            }
        });
        
        // Verificar preferencias guardadas
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
            contrastButton.setAttribute('aria-pressed', 'true');
            contrastButton.title = 'Desactivar alto contraste';
        }
    }

    // Modo oscuro/claro
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeSwitcher.title = 'Cambiar a modo oscuro';
            } else {
                localStorage.setItem('theme', 'dark');
                themeSwitcher.title = 'Cambiar a modo claro';
            }
        });
        
        // Verificar preferencias guardadas o preferencias del sistema
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            document.body.classList.add('light-mode');
            themeSwitcher.title = 'Cambiar a modo oscuro';
        } else {
            themeSwitcher.title = 'Cambiar a modo claro';
        }
    }
}); 
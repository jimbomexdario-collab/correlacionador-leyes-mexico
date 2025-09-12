// Portal Jurídico Mexicano - JavaScript

// Funcionalidad de animación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Animar las tarjetas de documentos al aparecer
    animateCards();

    // Agregar funcionalidad de búsqueda
    addSearchFunctionality();

    // Mejorar la navegación
    enhanceNavigation();
});

// Función para animar las tarjetas
function animateCards() {
    const cards = document.querySelectorAll('.document-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Función para agregar búsqueda
function addSearchFunctionality() {
    // Crear barra de búsqueda dinámicamente
    const heroSection = document.querySelector('.hero');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.marginTop = '2rem';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar documentos legales...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 500px;
        padding: 12px 20px;
        border: 2px solid #e5e7eb;
        border-radius: 25px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s ease;
    `;

    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#2563eb';
    });

    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#e5e7eb';
    });

    searchInput.addEventListener('input', function() {
        filterDocuments(this.value);
    });

    searchContainer.appendChild(searchInput);
    heroSection.appendChild(searchContainer);
}

// Función para filtrar documentos
function filterDocuments(searchTerm) {
    const cards = document.querySelectorAll('.document-card');
    const searchTermLower = searchTerm.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector('.document-title').textContent.toLowerCase();
        const description = card.querySelector('.document-description').textContent.toLowerCase();

        if (title.includes(searchTermLower) || description.includes(searchTermLower)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Función para mejorar la navegación
function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si el enlace es "#", prevenir el comportamiento por defecto
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showComingSoon();
            }
        });
    });
}

// Función para mostrar mensaje de "próximamente"
function showComingSoon() {
    // Crear modal de "próximamente"
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 0.75rem;
        text-align: center;
        max-width: 400px;
        margin: 0 1rem;
    `;

    modalContent.innerHTML = `
        <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Próximamente</h2>
        <p style="color: #4b5563; margin-bottom: 1.5rem;">Esta sección estará disponible pronto.</p>
        <button onclick="this.closest('[style*=position]').remove()" 
                style="background-color: #2563eb; color: white; padding: 0.5rem 1.5rem; 
                       border: none; border-radius: 0.5rem; cursor: pointer;">
            Cerrar
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Funcionalidad adicional: Smooth scroll para enlaces internos
function addSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para agregar efectos de hover mejorados
function enhanceHoverEffects() {
    const cards = document.querySelectorAll('.document-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Inicializar funcionalidades adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    addSmoothScroll();
    enhanceHoverEffects();
});

// Agregar estilos CSS dinámicos para animaciones
const styles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .document-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
`;

// Inyectar estilos en el documento
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
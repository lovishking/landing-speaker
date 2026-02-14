// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = 'rgba(26, 26, 46, 0.98)';
        navMenu.style.padding = '20px';
    });
}

// Close mobile menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Active Navigation Link
const updateActiveLink = () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveLink);

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const phone = contactForm.querySelector('input[placeholder="Phone Number"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        // Show success message
        alert(`Thank you, ${name}! Your message has been sent successfully. We'll contact you soon at ${email}`);

        // Reset form
        contactForm.reset();
    });
}

// CTA Button - Get In Touch
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(button => {
    if (button.textContent.includes('Get In Touch') || button.textContent.includes('Book Now') || button.textContent.includes('Book')) {
        button.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// Scroll Animation - Fade In Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to cards on scroll
const animateElements = document.querySelectorAll(
    '.service-card, .outcome-item, .testimonial-card, .audience-card, .gallery-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        createModal(index);
    });
});

function createModal(index) {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-image"></div>
            <div class="modal-nav">
                <button class="prev-btn">&#10094;</button>
                <button class="next-btn">&#10095;</button>
            </div>
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .gallery-modal {
            display: flex;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90vh;
        }

        .modal-image {
            width: 100%;
            height: 60vh;
            background: linear-gradient(135deg, #e94560, #ffc857);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-modal {
            position: absolute;
            right: 20px;
            top: 20px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            font-weight: bold;
            z-index: 2001;
        }

        .close-modal:hover {
            color: #e94560;
        }

        .modal-nav {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            gap: 20px;
        }

        .prev-btn, .next-btn {
            background: #e94560;
            color: white;
            border: none;
            padding: 15px 20px;
            font-size: 20px;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s ease;
            flex: 1;
        }

        .prev-btn:hover, .next-btn:hover {
            background: #ff6b6b;
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(modal);

    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Navigation
    let currentIndex = index;
    const updateImage = () => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        ];
        modal.querySelector('.modal-image').style.background = colors[currentIndex % colors.length];
    };

    modal.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateImage();
    });

    modal.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateImage();
    });

    updateImage();
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0% ${window.pageYOffset * 0.5}px`;
    }
});

// Counter animation for outcomes
const countToNumber = (element, target, duration = 2000) => {
    const start = 0;
    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * (target - start) + start);

        if (current !== target) {
            requestAnimationFrame(animate);
        }
    };

    animate();
};

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.gallery-modal');
        if (modal) {
            modal.remove();
        }
    }
});

// Lazy load images
const lazyLoadImages = () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    updateActiveLink();
});

// Smooth scroll on page load with hash
window.addEventListener('load', () => {
    if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
});

// Add active state to CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #e94560 !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

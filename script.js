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

// Active Navigation Link - with throttling
let lastUpdateTime = 0;
const updateActiveLink = () => {
    const now = Date.now();
    if (now - lastUpdateTime < 200) return; // Throttle to every 200ms
    lastUpdateTime = now;

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

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ========================================
// EmailJS Configuration
// ========================================
// 1. Sign up free at https://www.emailjs.com
// 2. Add an email service (e.g. Gmail) → copy the Service ID
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
// 4. Replace the values below with your own
// ========================================
const EMAILJS_PUBLIC_KEY = 'yb-j-RtQYT0oQPygI';   // Account → API Keys → Public Key
const EMAILJS_SERVICE_ID = 'service_n9ryq1n';   // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_98qp9ci'; // Email Templates → Template ID

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

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
            showFormStatus('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phone)) {
            showFormStatus('Please enter a valid phone number', 'error');
            return;
        }

        // Disable button while sending
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: name,
            from_email: email,
            phone: phone,
            subject: subject,
            message: message
        }).then(() => {
            showFormStatus(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
        }).catch((error) => {
            console.error('EmailJS Error:', error);
            showFormStatus('Failed to send message. Please try again or email directly.', 'error');
        }).finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Show form status message (success/error)
function showFormStatus(message, type) {
    // Remove existing status message if any
    const existing = document.querySelector('.form-status');
    if (existing) existing.remove();

    const statusEl = document.createElement('div');
    statusEl.className = `form-status form-status-${type}`;
    statusEl.textContent = message;

    const form = document.querySelector('.contact-form');
    if (form) {
        form.appendChild(statusEl);
        // Auto-remove after 5 seconds
        setTimeout(() => statusEl.remove(), 5000);
    }
}

// CTA Button - Get In Touch
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(button => {
    if (button.textContent.includes('Get In Touch') || button.textContent.includes('Book Now') || button.textContent.includes('Book')) {
        button.addEventListener('click', () => {
            window.open('https://www.linkedin.com/in/samrat-d-43a3133ab/', '_blank');
        });
    }
});
// CTA Button - Book Now (if separate from Get In Touch)
// Scroll Animation - Fade In Elements (optimized with performance settings)
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
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
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    el.style.willChange = 'opacity, transform';
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
            <img class="modal-image" src="" alt="Gallery Image">
            <div class="modal-nav">
                <button class="prev-btn">&#10094;</button>
                <button class="next-btn">&#10095;</button>
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(modal);

    // Close modal + cleanup
    const closeModal = () => modal.remove();
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Navigation
    let currentIndex = index;
    const updateImage = () => {
        const img = galleryItems[currentIndex].querySelector('img');
        const modalImg = modal.querySelector('.modal-image');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
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

// Parallax removed for performance

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



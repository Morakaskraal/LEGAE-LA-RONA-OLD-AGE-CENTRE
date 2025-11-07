document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initSmoothScroll();
    initGallery();
    initForms();
    initAnimations();
    initDonateButton();
});

// Navigation Enhancement
function initNavigation() {
    const nav = document.querySelector('nav');
    const currentPage = window.location.pathname;

    // Highlight current page in navigation
    nav.querySelectorAll('a').forEach(link => {
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Add scroll effect to header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
        }

        if (currentScroll > lastScroll && currentScroll > 50) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        }

        if (currentScroll < lastScroll) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery Enhancement
function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery img');
    
    galleryImages.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        // Add click handler for lightbox
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

// Lightbox functionality
function openLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="${imageAlt}">
            <p class="lightbox-caption">${imageAlt}</p>
            <button class="lightbox-close">&times;</button>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    lightbox.addEventListener('click', function(e) {
        if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
            closeLightbox(lightbox);
        }
    });
}

function closeLightbox(lightbox) {
    document.body.style.overflow = '';
    lightbox.remove();
}

// Form Enhancement
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add form validation
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                showSuccessMessage(this);
                this.reset();
            }
        });

        // Add input animations
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else {
            clearError(input);
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email address');
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phonePattern = /^\+?[\d\s-]{10,}$/;
            if (!phonePattern.test(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid phone number');
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!input.parentElement.querySelector('.error-message')) {
        input.parentElement.appendChild(errorDiv);
    }
    input.classList.add('error');
}

function clearError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your submission!';
    form.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Scroll Animations
function initAnimations() {
    const elements = document.querySelectorAll('.section-header, .gallery img, form, button');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Donate Button Enhancement
function initDonateButton() {
    const donateBtn = document.querySelector('button');
    if (donateBtn && donateBtn.textContent.toLowerCase().includes('donate')) {
        donateBtn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 1000);

            // Show donation options modal
            showDonationModal();
        });
    }
}

function showDonationModal() {
    const modal = document.createElement('div');
    modal.className = 'donation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Choose Donation Method</h3>
            <div class="donation-options">
                <button class="donation-option" data-amount="100">R100</button>
                <button class="donation-option" data-amount="200">R200</button>
                <button class="donation-option" data-amount="500">R500</button>
                <button class="donation-option custom">Custom Amount</button>
            </div>
            <div class="donation-info">
                <p>Bank Transfer Details:</p>
                <p>Bank: Legae La Rona NPC</p>
                <p>Account: XXXX-XXXX-XXXX</p>
            </div>
            <button class="modal-close">&times;</button>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('donation-modal') || e.target.classList.contains('modal-close')) {
            this.remove();
            document.body.style.overflow = '';
        }
    });

    modal.querySelectorAll('.donation-option').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('custom')) {
                const amount = prompt('Enter donation amount (R):', '100');
                if (amount) {
                    alert(`Thank you for your donation of R${amount}! We will contact you with the next steps.`);
                }
            } else {
                const amount = this.getAttribute('data-amount');
                alert(`Thank you for your donation of R${amount}! We will contact you with the next steps.`);
            }
            modal.remove();
            document.body.style.overflow = '';
        });
    });
}

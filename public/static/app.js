// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Hide loader after page loads
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Initialize interactive canvas animation
    initCanvasAnimation();
});

// Interactive Canvas Animation
function initCanvasAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let animationFrame;
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    
    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.color = `rgba(${139 + Math.random() * 50}, ${92 + Math.random() * 50}, ${246 + Math.random() * 50}, ${0.3 + Math.random() * 0.5})`;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.02;
        }
        
        draw() {
            // Pulsing size effect
            this.pulse += this.pulseSpeed;
            const pulseSize = this.size + Math.sin(this.pulse) * 0.5;
            
            // Gradient for particle
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseSize * 2);
            gradient.addColorStop(0, this.color.replace(/[\d.]+\)/, '1)'));
            gradient.addColorStop(0.5, this.color);
            gradient.addColorStop(1, this.color.replace(/[\d.]+\)/, '0)'));
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color.replace(/[\d.]+\)/, '0.8)');
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        
        update() {
            // Calculate distance from mouse
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            
            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
            
            // Add floating motion
            this.x += this.vx * 0.5;
            this.y += this.vy * 0.5;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
    }
    
    // Create particles
    function init() {
        particles = [];
        let numberOfParticles = (canvas.width * canvas.height) / 12000;
        numberOfParticles = Math.min(numberOfParticles, 150); // Increased limit for richer effect
        
        for (let i = 0; i < numberOfParticles; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }
    
    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    opacityValue = 1 - (distance / 120);
                    
                    // Create gradient for connection lines
                    const gradient = ctx.createLinearGradient(
                        particles[a].x, particles[a].y,
                        particles[b].x, particles[b].y
                    );
                    gradient.addColorStop(0, `rgba(236, 72, 153, ${opacityValue * 0.3})`);
                    gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacityValue * 0.4})`);
                    gradient.addColorStop(1, `rgba(249, 115, 22, ${opacityValue * 0.3})`);
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = opacityValue * 2;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        // Create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        connect();
        
        // Draw mouse interaction circle
        if (mouse.x && mouse.y) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(236, 72, 153, 0.1)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, mouse.radius * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    // Click ripple effects
    const ripples = [];
    
    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 300;
            this.speed = 8;
            this.opacity = 1;
        }
        
        update() {
            this.radius += this.speed;
            this.opacity = 1 - (this.radius / this.maxRadius);
            return this.radius < this.maxRadius;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(236, 72, 153, ${this.opacity * 0.5})`;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(139, 92, 246, ${this.opacity * 0.3})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    // Enhanced animation loop with ripples
    const originalAnimate = animate;
    animate = function() {
        // Create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        connect();
        
        // Draw and update ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
            if (!ripples[i].update()) {
                ripples.splice(i, 1);
            } else {
                ripples[i].draw();
            }
        }
        
        // Draw mouse interaction circle
        if (mouse.x && mouse.y) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(236, 72, 153, 0.1)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, mouse.radius * 0.7, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        animationFrame = requestAnimationFrame(animate);
    };
    
    // Mouse events
    const heroSection = document.querySelector('.hero-section');
    
    heroSection.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });
    
    // Click event for ripples
    heroSection.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ripples.push(new Ripple(x, y));
        
        // Create particle burst on click
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 / 10) * i;
            const burstX = x + Math.cos(angle) * 20;
            const burstY = y + Math.sin(angle) * 20;
            particles.push(new Particle(burstX, burstY));
        }
        
        // Remove oldest particles if too many
        if (particles.length > 200) {
            particles.splice(0, 10);
        }
    });
    
    heroSection.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Touch events for mobile
    heroSection.addEventListener('touchmove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0];
        mouse.x = touch.clientX - rect.left;
        mouse.y = touch.clientY - rect.top;
    });
    
    heroSection.addEventListener('touchend', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Resize event
    window.addEventListener('resize', function() {
        setCanvasSize();
        init();
    });
    
    // Initialize and start animation
    init();
    animate();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form handling
const inquiryForm = document.getElementById('inquiryForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            businessName: document.getElementById('businessName').value,
            requirements: document.getElementById('requirements').value,
            reference: document.getElementById('reference').value || ''
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnSuccess = submitBtn.querySelector('.btn-success');
        
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        submitBtn.disabled = true;
        
        try {
            // Submit form to API
            const response = await fetch('/api/submit-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success state
                btnLoading.classList.add('hidden');
                btnSuccess.classList.remove('hidden');
                
                // Show success message
                showMessage('success', result.message || 'Thank you for your inquiry! We will contact you within 24 hours.');
                
                // Reset form after delay
                setTimeout(() => {
                    inquiryForm.reset();
                    btnSuccess.classList.add('hidden');
                    btnText.classList.remove('hidden');
                    submitBtn.disabled = false;
                }, 3000);
                
                // Track conversion (if analytics is set up)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        'event_category': 'engagement',
                        'event_label': 'inquiry_form'
                    });
                }
            } else {
                throw new Error(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            // Show error state
            btnLoading.classList.add('hidden');
            btnText.classList.remove('hidden');
            submitBtn.disabled = false;
            
            showMessage('error', error.message || 'Failed to submit form. Please try again or contact us directly.');
        }
    });
}

// Form validation
function validateForm(data) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
        showMessage('error', 'Please enter a valid phone number.');
        return false;
    }
    
    // Check required fields
    if (!data.name || !data.businessName || !data.requirements) {
        showMessage('error', 'Please fill in all required fields.');
        return false;
    }
    
    return true;
}

// Show message function
function showMessage(type, message) {
    if (!formMessage) return;
    
    const alert = formMessage.querySelector('.alert');
    formMessage.classList.remove('hidden');
    
    if (type === 'success') {
        alert.className = 'alert alert-success p-4 rounded-lg text-white';
        alert.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-3 text-2xl"></i>
                <span>${message}</span>
            </div>
        `;
    } else {
        alert.className = 'alert alert-error p-4 rounded-lg text-white';
        alert.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-exclamation-circle mr-3 text-2xl"></i>
                <span>${message}</span>
            </div>
        `;
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// Add hover effects to buttons
document.querySelectorAll('button, .btn-get-started, .btn-consultation, .btn-cta-pricing').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add 3D tilt effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const shapes = document.querySelectorAll('.shape');
    
    if (heroSection) {
        // Parallax for shapes
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add specific animations based on element
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe elements and add card index for staggered animations
document.querySelectorAll('.feature-card').forEach((el, index) => {
    el.style.setProperty('--card-index', index);
    observer.observe(el);
});

document.querySelectorAll('.step-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add ripple effect to buttons
document.querySelectorAll('button, a.btn-get-started, a.btn-consultation').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log page load time
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    });
}

// Add console Easter egg
console.log('%c🚀 Welcome to LaunchPad!', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cLooking for a website? Contact us at development@dynamic-odyssey.com', 'font-size: 14px; color: #6b7280;');
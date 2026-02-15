// ============================================
// FERTOLIX PRO - JAVASCRIPT FUNCTIONALITY
// ============================================

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // LIVE VISITOR COUNTER
    // ============================================
    const visitorCountElement = document.getElementById('visitorCount');

    // Function to update visitor count with random fluctuation
    function updateVisitorCount() {
        // Random number between 35 and 65
        const count = Math.floor(Math.random() * (65 - 35 + 1)) + 35;
        visitorCountElement.textContent = count;
    }

    // Update visitor count every 8-12 seconds (random interval)
    function scheduleVisitorUpdate() {
        const interval = Math.floor(Math.random() * (12000 - 8000 + 1)) + 8000;
        setTimeout(function () {
            updateVisitorCount();
            scheduleVisitorUpdate(); // Schedule next update
        }, interval);
    }

    // Start visitor counter
    scheduleVisitorUpdate();

    // ============================================
    // ORDER NOTIFICATION POPUP
    // ============================================
    const orderNotification = document.getElementById('orderNotification');
    const notificationName = document.getElementById('notificationName');
    const notificationOrder = document.getElementById('notificationOrder');

    // Array of Nigerian names and cities
    const nigerianNames = [
{ name: 'Chinedu', city: 'Lagos' },
        { name: 'Ibrahim', city: 'Kano' },
        { name: 'Emeka', city: 'Port Harcourt' },
        { name: 'Adewale', city: 'Ibadan' },
        { name: 'Musa', city: 'Abuja' },
        { name: 'Chidi', city: 'Enugu' },
        { name: 'Obinna', city: 'Onitsha' },
        { name: 'Aliyu', city: 'Kaduna' },
        { name: 'Femi', city: 'Abeokuta' },
        { name: 'Usman', city: 'Sokoto' },
        { name: 'Ikechukwu', city: 'Owerri' },
        { name: 'Abubakar', city: 'Maiduguri' },
        { name: 'Oluwaseun', city: 'Osogbo' },
        { name: 'Abdullahi', city: 'Ilorin' },
        { name: 'Kelechi', city: 'Awka' },
        { name: 'Yusuf', city: 'Jos' },
        { name: 'Uchenna', city: 'Calabar' },
        { name: 'Sani', city: 'Bauchi' },
        { name: 'Olusegun', city: 'Akure' },
        { name: 'Tunde', city: 'Benin City' },
        { name: 'Godwin', city: 'Warri' },
        { name: 'Nasiru', city: 'Gombe' },
        { name: 'Nnamdi', city: 'Umuahia' },
        { name: 'Kabiru', city: 'Katsina' }
    ];

    // Array of package options
    const packages = [
        '1 Bottle',
        '2 Bottles + Diet Plan',
        '3 Bottles + Diet Plan',
        '4 Bottles + Diet Plan'
    ];

    // Function to show notification
    function showNotification() {
        // Get random name, city, and package
        const randomPerson = nigerianNames[Math.floor(Math.random() * nigerianNames.length)];
        const randomPackage = packages[Math.floor(Math.random() * packages.length)];

        // Update notification content
        notificationName.textContent = `${randomPerson.name} from ${randomPerson.city}`;
        notificationOrder.textContent = `just ordered ${randomPackage}`;

        // Show notification with slide-in animation
        orderNotification.classList.add('show');

        // Hide notification after 5 seconds
        setTimeout(function () {
            orderNotification.classList.remove('show');
        }, 5000);
    }

    // Show first notification after 15 seconds
    setTimeout(showNotification, 15000);

    // Then show notification every 15 seconds
    setInterval(showNotification, 15000);

    // ============================================
    // STOCK SCARCITY COUNTER
    // ============================================
    const stockCountElements = [
        document.getElementById('stockCount'),
        document.getElementById('stockCountForm'),
        document.getElementById('stockCountFinal')
    ];

    let stockCount = 12; // Starting stock count

    // Function to update all stock count displays
    function updateStockCount() {
        stockCountElements.forEach(element => {
            if (element) {
                element.textContent = stockCount;
            }
        });

        // Decrease stock count
        stockCount--;

        // Don't go below 5
        if (stockCount < 5) {
            stockCount = 5;
        }
    }

    // Update stock count every 45-90 seconds (random)
    function scheduleStockUpdate() {
        const interval = Math.floor(Math.random() * (90000 - 45000 + 1)) + 45000;
        setTimeout(function () {
            updateStockCount();
            scheduleStockUpdate(); // Schedule next update
        }, interval);
    }

    // Start stock counter
    scheduleStockUpdate();

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // ============================================
    // FORM VALIDATION & SUBMISSION
    // ============================================
    const orderForm = document.getElementById('orderFormElement');

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            // Get form fields
            const fullName = document.getElementById('fullName').value.trim();
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            const phoneNumberConfirm = document.getElementById('phoneNumberConfirm').value.trim();
            const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
            const state = document.getElementById('state').value;
            const quantity = document.getElementById('quantity').value;

            // Validation checks
            let errors = [];

            // Check if all required fields are filled
            if (!fullName) errors.push('Please enter your full name');
            if (!phoneNumber) errors.push('Please enter your phone number');
            if (!phoneNumberConfirm) errors.push('Please confirm your phone number');
            if (!deliveryAddress) errors.push('Please enter your delivery address');
            if (!state) errors.push('Please select your state');
            if (!quantity) errors.push('Please select a package');

            // Check if phone numbers match
            if (phoneNumber && phoneNumberConfirm && phoneNumber !== phoneNumberConfirm) {
                errors.push('Phone numbers do not match');
            }

            // Validate phone number format (Nigerian format)
            const phoneRegex = /^(\+234|234|0)[789][01]\d{8}$/;
            if (phoneNumber && !phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
                errors.push('Please enter a valid Nigerian phone number');
            }

            // If there are errors, prevent submission and show alert
            if (errors.length > 0) {
                e.preventDefault();
                alert('Please fix the following errors:\n\n' + errors.join('\n'));
                return false;
            }

            // If validation passes, form will submit to Formspree
            // Show success message (optional - Formspree handles this)
            alert('Thank you! Your order has been submitted. We will contact you within 2 hours to confirm your order.');
        });

        // Real-time phone number matching validation
        const phoneNumberInput = document.getElementById('phoneNumber');
        const phoneNumberConfirmInput = document.getElementById('phoneNumberConfirm');

        function checkPhoneMatch() {
            if (phoneNumberInput.value && phoneNumberConfirmInput.value) {
                if (phoneNumberInput.value !== phoneNumberConfirmInput.value) {
                    phoneNumberConfirmInput.style.borderColor = '#E74C3C';
                } else {
                    phoneNumberConfirmInput.style.borderColor = '#27AE60';
                }
            }
        }

        phoneNumberInput.addEventListener('input', checkPhoneMatch);
        phoneNumberConfirmInput.addEventListener('input', checkPhoneMatch);
    }

    // ============================================
    // SCROLL ANIMATIONS (Fade In On Scroll)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.testimonial-card, .benefit-card, .problem-item, .pricing-card, .faq-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // PREVENT FORM RESUBMISSION ON PAGE REFRESH
    // ============================================
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    // ============================================
    // CONSOLE MESSAGE (Optional - for developers)
    // ============================================
    console.log('%c🌿 Gupta - Landing Page Loaded Successfully! 🌿', 'color: #2D8B8B; font-size: 16px; font-weight: bold;');
    console.log('%cAll interactive features are now active.', 'color: #5A6C7D; font-size: 12px;');

}); // End of DOMContentLoaded

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Function to format Nigerian phone numbers
function formatNigerianPhone(phone) {
    // Remove all spaces and special characters
    let cleaned = phone.replace(/\D/g, '');

    // Handle different formats
    if (cleaned.startsWith('234')) {
        cleaned = '0' + cleaned.substring(3);
    } else if (cleaned.startsWith('+234')) {
        cleaned = '0' + cleaned.substring(4);
    }

    return cleaned;
}

// Function to validate email (if needed in future)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Prevent right-click on images (optional - to protect product images)
// Uncomment if you want to enable this feature
/*
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});
*/

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (if you add actual product images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// END OF SCRIPT
// ============================================

  document.addEventListener("contextmenu", e => e.preventDefault());

  document.addEventListener("keydown", e => {
    if (
    e.ctrlKey &&
    (e.key === "u" ||
    e.key === "U" ||
    e.key === "c" ||
    e.key === "C" ||
    e.key === "s" ||
    e.key === "S" ||
    e.key === "i" ||
    e.key === "I")
    ) {
        e.preventDefault();
    }
  });
  document.getElementById("stickyCtaBtn").addEventListener("click", function () {
    const orderForm = document.getElementById("orderFormElement");

    if (orderForm) {
      orderForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

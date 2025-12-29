// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
function showSidebar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default for internal navigation links
        const href = this.getAttribute('href');
        if (href.startsWith('#') && !this.hasAttribute('target') && !this.hasAttribute('download')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submission handling
// const contactForm = document.querySelector('.contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         // Get form data
//         const formData = new FormData(this);
//         const data = Object.fromEntries(formData);

//         // Here you would typically send the data to a server
//         console.log('Form submitted:', data);

//         // Show success message
//         // alert('Thank you for your message! I will get back to you soon.'); // Removed alert
//         this.reset();
//     });
// }

// Contact form animated success message
(function () {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // Check if the listener has already been added
    if (contactForm.dataset.listenerAdded) {
        return; // If already added, exit the function
    }

    // Mark the form to indicate the listener has been added
    contactForm.dataset.listenerAdded = 'true';

    // Get the submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton.innerHTML; // Store original HTML including text and potential icons

    // Create success message element
    let successMsg = document.createElement('div');
    successMsg.className = 'contact-success-msg';
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
    successMsg.style.display = 'none';
    contactForm.parentNode.insertBefore(successMsg, contactForm);

    // Create error message element
    let errorMsg = document.createElement('div');
    errorMsg.className = 'contact-error-msg';
    errorMsg.innerHTML = '<i class="fas fa-times-circle"></i> Sorry, there was an error sending your message. Please try again later.';
    errorMsg.style.display = 'none';
    contactForm.parentNode.insertBefore(errorMsg, contactForm);

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Hide previous messages
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';
        successMsg.classList.remove('show');
        errorMsg.classList.remove('show');

        // Disable button and show loader
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; // Add spinner HTML
        submitButton.classList.add('loading'); // Add a class for potential CSS spinner

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // EmailJS send
        emailjs.send(
            'service_v8tqsin', // Updated Service ID
            'template_1tp61cq', // Updated Template ID
            {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message
            },
            'WSnVwfTbGEPCqzo_0' // Your EmailJS Public Key
        )
            .then(function (response) {
                // On success
                console.log('EmailJS Success:', response);
                contactForm.reset();
                // Show animated success message
                setTimeout(() => {
                    successMsg.style.display = 'block';
                    successMsg.classList.add('show');
                    // Hide after delay
                    setTimeout(() => {
                        successMsg.classList.remove('show');
                        successMsg.style.display = 'none';
                    }, 4000); // Display for 4 seconds
                }, 200); // Delay before showing
            }, function (error) {
                // On error
                console.error('EmailJS Error:', error);
                // Show animated error message
                setTimeout(() => {
                    errorMsg.style.display = 'block';
                    errorMsg.classList.add('show');
                    // Hide after delay
                    setTimeout(() => {
                        errorMsg.classList.remove('show');
                        errorMsg.style.display = 'none';
                    }, 4000); // Display for 4 seconds
                }, 200); // Delay before showing
            })
            .finally(() => {
                // This will run regardless of success or error
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHTML; // Restore original button HTML
                submitButton.classList.remove('loading');
            });
    });
})();

// Typing effect for hero tagline
const taglineTexts = [
    "Computer Vision Explorer",
    "Passionate Tech Learner",
    "ML Developer in Progress",
    "Vibe Coder."
];
let taglineIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typed-text');
const cursor = document.querySelector('.cursor');

function typeTagline() {
    if (!typedText) return;
    const current = taglineTexts[taglineIndex];
    if (isDeleting) {
        typedText.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglineTexts.length;
            setTimeout(typeTagline, 500);
        } else {
            setTimeout(typeTagline, 40);
        }
    } else {
        typedText.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(typeTagline, 1200);
        } else {
            setTimeout(typeTagline, 80);
        }
    }
}
typeTagline();

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a, .menu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// EmailJS integration for contact form
// 1. Sign up at https://www.emailjs.com/
// 2. Add your email service and template (with variables: from_name, from_email, message)
// 3. Replace the placeholders below with your actual EmailJS Service ID, Template ID, and Public Key
/*
(function() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        // Add console log to inspect data
        console.log('Form data captured:', data);
        // EmailJS send
        emailjs.send(
            'service_v8tqsin',
            'template_1tp61cq',
            {
                from_name: data.name,
                from_email: data.email,
                message: data.message
            },
            'WSnVwfTbGEPCqzo_0'
        )
        .then(function(response) {
            // On success
            console.log('EmailJS Success:', response);
            contactForm.reset();
        }, function(error) {
            // On error
            console.error('EmailJS Error:', error);
        });
    });
})();
*/

// Project card modal logic
// Project card modal logic (Event Delegation)
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');

// Use event delegation on the document or a static container
document.addEventListener('click', function (e) {
    const card = e.target.closest('.project-card');
    // If a project card was clicked
    if (card) {
        // Check if a button was clicked
        const btn = e.target.closest('.project-btn');
        if (btn) {
            // Prevent default behavior for placeholder links
            if (btn.getAttribute('href') === '#' || btn.getAttribute('href') === '') {
                e.preventDefault();
            }
            return; // Stop modal from opening
        }

        // Get image source from the clicked card
        const img = card.querySelector('.project-img');
        const modalImg = document.getElementById('modal-img');
        if (img && modalImg) {
            modalImg.src = img.src;
            modalImg.alt = card.getAttribute('data-title');
        }

        modalTitle.textContent = card.getAttribute('data-title');
        modalDesc.textContent = card.getAttribute('data-description');
        modal.classList.add('active');
    }
});
if (closeModal) {
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
}
window.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('active');
});

// --- Infinite Projects Carousel with JavaScript ---
(function () {
    const carousel = document.querySelector('.projects-carousel');
    const track = document.querySelector('.carousel-track');
    if (!carousel || !track) return;
    // Only clone if not already cloned
    if (!track.classList.contains('js-infinite')) {
        track.classList.add('js-infinite');

        // 1. Ensure the "base set" of content is wide enough to fill a large screen (e.g., 2500px)
        const originalCards = Array.from(track.children);
        const cardWidthEstimate = 350; // approx width + gap
        let currentContentWidth = originalCards.length * cardWidthEstimate;
        const minWidth = window.innerWidth * 2; // Safety margin

        // Keep appending copies of the original set until we are wide enough
        while (currentContentWidth < minWidth && currentContentWidth > 0) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone-base');
                track.appendChild(clone);
            });
            currentContentWidth += originalCards.length * cardWidthEstimate;
        }

        // 2. Clone the ENTRIE extended set once more for the smooth infinite loop logic (scrollWidth / 2)
        const extendedCards = Array.from(track.children);
        extendedCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone-loop');
            track.appendChild(clone);
        });
    }
    let scrollAmount = 0;
    let reqId;
    function animate() {
        scrollAmount += 0.5; // Adjust speed here - decreased from 1.1
        if (scrollAmount >= track.scrollWidth / 2) {
            scrollAmount = 0;
        }
        track.style.transform = `translateX(-${scrollAmount}px)`;
        reqId = requestAnimationFrame(animate);
    }
    animate();
    // Pause on hover - REMOVED as per user request
    // carousel.addEventListener('mouseenter', () => cancelAnimationFrame(reqId));
    // carousel.addEventListener('mouseleave', animate);
})();

// --- Infinite Tech Stack Carousel with Drag & Resume ---
(function () {
    const container = document.querySelector('.js-infinite-tech-stack');
    const track1 = container ? container.querySelector('.tech-stack-track.track-1') : null;
    const track2 = container ? container.querySelector('.tech-stack-track.track-2') : null;
    if (!container || !track1 || !track2) return;

    // 1. Cloning Logic (ensure 3 sets of items for smooth infinite loop)
    // We clone twice to have [Original] [Clone1] [Clone2]
    // Infinite loop happens over the width of one set.
    function setupClones(track) {
        if (!track.classList.contains('js-infinite-cloned')) {
            track.classList.add('js-infinite-cloned');
            const items = Array.from(track.children);
            // First clone set
            items.forEach(item => track.appendChild(item.cloneNode(true)));
            // Second clone set
            items.forEach(item => track.appendChild(item.cloneNode(true)));
        }
    }

    setupClones(track1);
    setupClones(track2);

    const defaultSpeed = 0.8;

    function setupTrack(track, direction) {
        // direction: 1 = Moves Left (Track 1)
        // direction: -1 = Moves Right (Track 2)

        let scrollAmount = 0;
        let isDragging = false;
        let startX = 0;
        let startScroll = 0;
        let isPaused = false;
        let resumeTimeout;

        // Wait for layout to ensure scrollWidth is correct
        // We can just rely on the loop to pick it up, but for initial wrap logic...
        // Let's just start at 0.

        function animate() {
            // One set width is total width / 3
            const maxScroll = track.scrollWidth / 3;

            if (!isDragging && !isPaused && maxScroll > 0) {
                scrollAmount += defaultSpeed * direction;
            }

            // Unified Wrap Logic
            // We want scrollAmount to always be between 0 and maxScroll for the transform
            // but we allow it to go out of bounds temporarily during calculation
            if (maxScroll > 0) {
                scrollAmount = ((scrollAmount % maxScroll) + maxScroll) % maxScroll;
            }

            track.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(animate);
        }

        // --- Drag Logic ---

        function getX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        }

        function startDrag(e) {
            // Only allow left click for mouse
            if (e.type === 'mousedown' && e.button !== 0) return;

            isDragging = true;
            isPaused = true;
            startX = getX(e);
            startScroll = scrollAmount;

            track.style.cursor = 'grabbing';
            track.style.transition = 'none'; // Disable transition for direct 1:1 movement

            clearTimeout(resumeTimeout);
        }

        function moveDrag(e) {
            if (!isDragging) return;

            // Prevent default vertical scroll on touch ONLY if moving mostly horizontally?
            // For now, simple aggressive prevention to ensure drag works
            if (e.type === 'touchmove') e.preventDefault();

            const currentX = getX(e);
            const delta = currentX - startX;

            // If dragging right (delta > 0), we want content to move right.
            // translateX gets larger (closer to 0 or positive).
            // Since we use translateX(-scrollAmount), decreasing scrollAmount moves content right.
            scrollAmount = startScroll - delta;
        }

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';

            // Resume "own zone" movement after 1 second
            resumeTimeout = setTimeout(() => {
                isPaused = false;
            }, 1000);
        }

        // Listeners
        track.addEventListener('mousedown', startDrag);
        // Prevent native drag (ghost image) on links/images
        track.addEventListener('dragstart', (e) => e.preventDefault());

        // Prevent clicks on links if we dragged
        track.addEventListener('click', (e) => {
            if (Math.abs(scrollAmount - startScroll) > 5) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { capture: true });

        // Bind to window to handle drags that leave the element
        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('mouseup', endDrag);

        track.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('touchmove', moveDrag, { passive: false });
        window.addEventListener('touchend', endDrag);

        // Initial cursor
        track.style.cursor = 'grab';

        // Start Animation
        requestAnimationFrame(animate);
    }

    // Initialize
    setupTrack(track1, 1);  // Track 1 moves Left
    setupTrack(track2, -1); // Track 2 moves Right

})();

// Hero Image Tilt Effect
(function () {
    const heroImageContainer = document.querySelector('.hero .image');
    const heroImage = heroImageContainer ? heroImageContainer.querySelector('img') : null;
    const tiltAmount = 15; // Maximum tilt in degrees

    if (!heroImageContainer || !heroImage) return;

    heroImageContainer.addEventListener('mousemove', function (e) {
        const rect = heroImageContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const percentX = (mouseX - centerX) / (rect.width / 2);
        const percentY = (mouseY - centerY) / (rect.height / 2);

        const tiltX = percentY * tiltAmount; // Tilt up/down based on Y position
        const tiltY = -percentX * tiltAmount; // Tilt left/right based on X position (negated for natural feel)

        heroImage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    heroImageContainer.addEventListener('mouseleave', function () {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'; // Reset transform on mouse leave
    });
})();

// Loading functionality
document.addEventListener('DOMContentLoaded', function () {
    const loadingContainer = document.querySelector('.loading-container');
    const heroSection = document.querySelector('.hero');

    // Function to check if hero section is fully loaded
    function isHeroLoaded() {
        const heroImage = heroSection.querySelector('img');
        return heroImage.complete && heroImage.naturalHeight !== 0;
    }

    // Function to hide loading screen
    function hideLoading() {
        loadingContainer.classList.add('fade-out');
        setTimeout(() => {
            loadingContainer.style.display = 'none';
        }, 500);
    }

    // Check if hero section is already loaded
    if (isHeroLoaded()) {
        hideLoading();
    } else {
        // Wait for hero image to load
        const heroImage = heroSection.querySelector('img');
        heroImage.addEventListener('load', hideLoading);

        // Fallback in case image takes too long to load
        setTimeout(hideLoading, 5000);
    }
});



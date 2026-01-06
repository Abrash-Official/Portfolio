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

// --- Infinite Projects Carousel with Drag & Momentum ---
(function () {
    const carousel = document.querySelector('.projects-carousel');
    const track = document.querySelector('.carousel-track');
    if (!carousel || !track) return;

    // 1. Cloning Logic
    function setupClones(catrack) {
        if (!catrack.classList.contains('js-infinite-cloned')) {
            catrack.classList.add('js-infinite-cloned');
            const items = Array.from(catrack.children);
            items.forEach(item => catrack.appendChild(item.cloneNode(true)));
            items.forEach(item => catrack.appendChild(item.cloneNode(true)));
        }
    }

    setupClones(track);

    const defaultSpeed = 0.5;

    function setupTrack(track, direction) {

        let state = {
            scrollAmount: 0,
            isDragging: false,
            startX: 0,
            startScroll: 0,
            velocity: 0,
            lastX: 0,
            lastTime: 0,
            animationId: null
        };

        function animate(time) {
            const maxScroll = track.scrollWidth / 3;
            if (maxScroll <= 0) {
                state.animationId = requestAnimationFrame(animate);
                return;
            }

            if (!state.isDragging) {
                // Deceleration (Friction)
                // Using 0.99 for long smooth slides
                const friction = 0.99;
                const stopThreshold = 0.1;

                if (Math.abs(state.velocity) > stopThreshold) {
                    // --- Momentum Phase ---
                    state.scrollAmount += state.velocity;
                    state.velocity *= friction;
                } else {
                    // --- Normal Phase ---
                    const targetSpeed = defaultSpeed * direction;
                    state.velocity += (targetSpeed - state.velocity) * 0.05; // Ease back to normal speed
                    state.scrollAmount += state.velocity;
                }
            }

            // Wrap Logic
            state.scrollAmount = ((state.scrollAmount % maxScroll) + maxScroll) % maxScroll;

            track.style.transform = `translateX(-${state.scrollAmount}px)`;
            state.animationId = requestAnimationFrame(animate);
        }

        // --- Drag Logic ---

        function getX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        }

        function startDrag(e) {
            if (e.type === 'mousedown' && e.button !== 0) return;

            state.isDragging = true;
            state.startX = getX(e);
            state.startScroll = state.scrollAmount;
            state.lastX = state.startX;
            state.lastTime = performance.now();
            state.velocity = 0;

            track.style.cursor = 'grabbing';
            track.style.transition = 'none';
        }

        function moveDrag(e) {
            if (!state.isDragging) return;
            if (e.type === 'touchmove') e.preventDefault();

            const currentX = getX(e);
            const currentTime = performance.now();
            const deltaX = currentX - state.startX;

            state.scrollAmount = state.startScroll - deltaX;

            // Calculate Velocity
            const deltaTime = currentTime - state.lastTime;
            const dist = state.lastX - currentX;

            if (deltaTime > 0) {
                // Multiplied by 3 for much faster reaction to flick (Expert Mode)
                state.velocity = (dist / (deltaTime / 16)) * 3;
            }

            state.lastX = currentX;
            state.lastTime = currentTime;
        }

        function endDrag() {
            if (!state.isDragging) return;
            state.isDragging = false;
            track.style.cursor = 'grab';

            // Limit max velocity
            const maxV = 120;
            state.velocity = Math.max(Math.min(state.velocity, maxV), -maxV);
        }

        track.addEventListener('mousedown', startDrag);
        track.addEventListener('dragstart', (e) => e.preventDefault());

        track.addEventListener('click', (e) => {
            if (Math.abs(state.scrollAmount - state.startScroll) > 5) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { capture: true });

        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('mouseup', endDrag);

        track.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('touchmove', moveDrag, { passive: false });
        window.addEventListener('touchend', endDrag);

        track.style.cursor = 'grab';

        state.animationId = requestAnimationFrame(animate);
    }

    // Initialize (Direction 1 = Left)
    setupTrack(track, 1);
})();

// --- Infinite Tech Stack Carousel with Drag & Momentum ---
(function () {
    const container = document.querySelector('.js-infinite-tech-stack');
    const track1 = container ? container.querySelector('.tech-stack-track.track-1') : null;
    const track2 = container ? container.querySelector('.tech-stack-track.track-2') : null;
    if (!container || !track1 || !track2) return;

    // 1. Cloning Logic
    function setupClones(track) {
        if (!track.classList.contains('js-infinite-cloned')) {
            track.classList.add('js-infinite-cloned');
            const items = Array.from(track.children);
            items.forEach(item => track.appendChild(item.cloneNode(true)));
            items.forEach(item => track.appendChild(item.cloneNode(true)));
        }
    }

    setupClones(track1);
    setupClones(track2);

    const defaultSpeed = 0.8;

    function setupTrack(track, direction) {
        // direction: 1 = Moves Left (Normal flow for Track 1)
        // direction: -1 = Moves Right (Normal flow for Track 2)

        // State identifiers
        let state = {
            scrollAmount: 0,
            isDragging: false,
            startX: 0,
            startScroll: 0,
            velocity: 0,
            lastX: 0,
            lastTime: 0,
            animationId: null
        };

        function animate(time) {
            const maxScroll = track.scrollWidth / 3;
            if (maxScroll <= 0) {
                state.animationId = requestAnimationFrame(animate);
                return;
            }

            if (state.isDragging) {
                // While dragging, just ensure wrapping for visual consistency
                // Position is set directly by moveDrag
            } else {
                // Not dragging: Check for Momentum or Normal Flow

                // Deceleration (Friction)
                // Lower friction (closer to 1) means it slides for longer (slower deceleration)
                const friction = 0.99;
                // Threshold to switch back to constant speed
                const stopThreshold = 0.1;

                if (Math.abs(state.velocity) > stopThreshold) {
                    // --- Momentum Phase ---
                    state.scrollAmount += state.velocity; // Move by current velocity
                    state.velocity *= friction;           // Decay velocity

                    // If we get close to the normal speed in the correct direction, we can blend/snap to it?
                    // Actually, let's just decay to near zero, then gently ramp up or switch to normal.
                    // For simplicity: Decay until very slow, then switch to normal constant movement.
                } else {
                    // --- Normal Phase ---
                    // "moves normal" means constant speed in the default direction.
                    // We can interpolate velocity towards defaultSpeed * direction if we want it super smooth,
                    // but switching when velocity is low is usually fine using a simple lerp or direct switch.

                    // Let's Lerp back to default speed for smoothness
                    const targetSpeed = defaultSpeed * direction;
                    state.velocity += (targetSpeed - state.velocity) * 0.05; // Ease back to normal speed

                    state.scrollAmount += state.velocity;
                }
            }

            // Wrap Logic
            state.scrollAmount = ((state.scrollAmount % maxScroll) + maxScroll) % maxScroll;

            // Apply Transform
            // Note: We use negative scrollAmount for Left movement logic
            track.style.transform = `translateX(-${state.scrollAmount}px)`;

            state.animationId = requestAnimationFrame(animate);
        }

        // --- Drag Logic ---

        function getX(e) {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        }

        function startDrag(e) {
            if (e.type === 'mousedown' && e.button !== 0) return;

            state.isDragging = true;
            state.startX = getX(e);
            state.startScroll = state.scrollAmount;
            state.lastX = state.startX;
            state.lastTime = performance.now();
            state.velocity = 0;

            track.style.cursor = 'grabbing';
            track.style.transition = 'none';
        }

        function moveDrag(e) {
            if (!state.isDragging) return;
            if (e.type === 'touchmove') e.preventDefault();

            const currentX = getX(e);
            const currentTime = performance.now();
            const deltaX = currentX - state.startX;

            // Direct 1:1 movement
            // Dragging left (negative delta) should increase scrollAmount (moving content left)
            // Dragging right (positive delta) should decrease scrollAmount (moving content right)
            state.scrollAmount = state.startScroll - deltaX;

            // Calculate Velocity
            // Velocity = distance / time
            const deltaTime = currentTime - state.lastTime;
            const dist = state.lastX - currentX; // Distance moved this frame (inverted for scrollAmount logic)

            if (deltaTime > 0) {
                // Higher multiplier = more sensitive "throw"
                // Multiplied by 3 for much faster reaction to flick
                state.velocity = (dist / (deltaTime / 16)) * 3;
            }

            state.lastX = currentX;
            state.lastTime = currentTime;
        }

        function endDrag() {
            if (!state.isDragging) return;
            state.isDragging = false;
            track.style.cursor = 'grab';

            // Limit max velocity to prevent crazy speeds
            const maxV = 120; // Increased max speed significantly
            state.velocity = Math.max(Math.min(state.velocity, maxV), -maxV);

            // Velocity is now passed to the animate loop which handles the decay
        }

        // Listeners
        track.addEventListener('mousedown', startDrag);
        track.addEventListener('dragstart', (e) => e.preventDefault());
        track.addEventListener('click', (e) => {
            if (Math.abs(state.scrollAmount - state.startScroll) > 5) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { capture: true });

        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('mouseup', endDrag);

        track.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('touchmove', moveDrag, { passive: false });
        window.addEventListener('touchend', endDrag);

        track.style.cursor = 'grab';

        // Start Loop
        state.animationId = requestAnimationFrame(animate);
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



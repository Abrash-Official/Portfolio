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
(function() {
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

    contactForm.addEventListener('submit', function(e) {
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
        .then(function(response) {
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
        }, function(error) {
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
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Prevent modal on button click
        if (e.target.closest('.project-btn')) return;
        modalTitle.textContent = card.getAttribute('data-title');
        modalDesc.textContent = card.getAttribute('data-description');
        modal.classList.add('active');
    });
});
if (closeModal) {
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
}
window.addEventListener('click', function(e) {
    if (e.target === modal) modal.classList.remove('active');
});

// --- Infinite Projects Carousel with JavaScript ---
(function() {
    const carousel = document.querySelector('.projects-carousel');
    const track = document.querySelector('.carousel-track');
    if (!carousel || !track) return;
    // Only clone if not already cloned
    if (!track.classList.contains('js-infinite')) {
        track.classList.add('js-infinite');
        // Clone all cards for seamless infinite scroll
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
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
    // Pause on hover
    carousel.addEventListener('mouseenter', () => cancelAnimationFrame(reqId));
    carousel.addEventListener('mouseleave', animate);
})();

// --- Infinite Tech Stack Carousel with JavaScript ---
(function() {
    const container = document.querySelector('.js-infinite-tech-stack');
    const track1 = container ? container.querySelector('.tech-stack-track.track-1') : null;
    const track2 = container ? container.querySelector('.tech-stack-track.track-2') : null;
    if (!container || !track1 || !track2) return;

    // Only clone if not already cloned
    if (!track1.classList.contains('js-infinite-cloned')) {
        track1.classList.add('js-infinite-cloned');
        const items1 = Array.from(track1.children);
        items1.forEach(item => {
            track1.appendChild(item.cloneNode(true));
        });
        // Clone a second time for smoother loop
         items1.forEach(item => {
            track1.appendChild(item.cloneNode(true));
        });
    }
    if (!track2.classList.contains('js-infinite-cloned')) {
        track2.classList.add('js-infinite-cloned');
        const items2 = Array.from(track2.children);
        items2.forEach(item => {
            track2.appendChild(item.cloneNode(true));
        });
         // Clone a second time for smoother loop
         items2.forEach(item => {
            track2.appendChild(item.cloneNode(true));
        });
    }

    let scrollAmount1 = 0;
    let scrollAmount2 = 0;
    let reqId1, reqId2;
    let scrollSpeed = 0.8; // Default speed
    let hoverSpeed = 0.2; // Speed on hover

    function animateTrack1() {
        // Scroll Right to Left
        scrollAmount1 += scrollSpeed; // Use scrollSpeed and increment for right-to-left with negative translateX
        // Reset when scrolled past the width of the original items (1/3 of total width with 2 clones)
        if (scrollAmount1 >= track1.scrollWidth / 3) {
            scrollAmount1 = 0;
        }
        track1.style.transform = `translateX(-${scrollAmount1}px)`; // Negative for right-to-left
        reqId1 = requestAnimationFrame(animateTrack1);
    }

    function animateTrack2() {
        // Scroll Left to Right
        scrollAmount2 -= scrollSpeed; // Decrement for left-to-right movement
        // Reset when scrolled past the beginning of the original items
        if (scrollAmount2 <= -track2.scrollWidth / 3) {
            scrollAmount2 = 0; // Reset to show the beginning of the cloned track
        }
        track2.style.transform = `translateX(${scrollAmount2}px)`; // Apply translation for left-to-right
        reqId2 = requestAnimationFrame(animateTrack2);
    }

    animateTrack1();
    animateTrack2();

    // Pause on hover (now decrease speed)
    container.addEventListener('mouseenter', () => {
        scrollSpeed = hoverSpeed; // Decrease speed
    });

    container.addEventListener('mouseleave', () => {
        scrollSpeed = 0.8; // Restore speed
    });
})();

// Hero Image Tilt Effect
(function() {
    const heroImageContainer = document.querySelector('.hero .image');
    const heroImage = heroImageContainer ? heroImageContainer.querySelector('img') : null;
    const tiltAmount = 15; // Maximum tilt in degrees

    if (!heroImageContainer || !heroImage) return;

    heroImageContainer.addEventListener('mousemove', function(e) {
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

    heroImageContainer.addEventListener('mouseleave', function() {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'; // Reset transform on mouse leave
    });
})();

// Loading functionality
document.addEventListener('DOMContentLoaded', function() {
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
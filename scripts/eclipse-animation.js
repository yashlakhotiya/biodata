// Eclipse animation disabled. Moon remains static and pitch black over the sun.
// Author: GitHub Copilot

(function() {
    // Get DOM elements
    const moon = document.querySelector('.moon');

    // Remove CSS animation for eclipse elements
    if (moon) moon.style.animation = 'none';

    // --- Moon static position ---
    if (moon) {
        // Static moon position: center over the sun, pitch black, fully opaque
        Object.assign(moon.style, {
            transform: 'translate3d(-50%, -50%, 0)',
            background: '#000',
            backgroundColor: '#000',
            boxShadow: 'none',
            opacity: '1',
            zIndex: '1000',
            border: 'none',
            outline: 'none',
            pointerEvents: 'none',
            mixBlendMode: 'normal',
        });
    }
})();

function generateStars(canvas, starCount, size) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * size,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.005
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.opacity += star.twinkleSpeed;
            if (star.opacity >= 1 || star.opacity <= 0.2) {
                star.twinkleSpeed *= -1;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Responsive resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize star layers with different densities
generateStars(document.getElementById('stars1'), 150, 1.5);
generateStars(document.getElementById('stars2'), 100, 1);
generateStars(document.getElementById('stars3'), 80, 0.8);

// Smooth scroll to about section
document.addEventListener('DOMContentLoaded', () => {
    const scrollDown = document.querySelector('.scroll-down');
    const aboutSection = document.querySelector('.about-me-section');
    
    if (!scrollDown || !aboutSection) return;
    
    // Function to handle smooth scrolling
    const scrollToAbout = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - 20;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };
    
    // Add click event to scroll down button
    scrollDown.addEventListener('click', scrollToAbout);
    
    // Make the arrow clickable
    scrollDown.style.cursor = 'pointer';

    // Update scroll arrow visibility
    const handleScroll = () => {
        if (!scrollDown) return;
        
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const aboutSectionTop = aboutSection.offsetTop;
        
        // Hide arrow when scrolled past first screen or when near about section
        if (scrollPosition > windowHeight * 0.3 || 
            scrollPosition > aboutSectionTop - windowHeight * 0.7) {
            scrollDown.classList.add('hidden');
        } else {
            scrollDown.classList.remove('hidden');
        }
    };

    // Initial check
    handleScroll();
    
    // Throttle scroll events for better performance
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 50);
    }, false);
});

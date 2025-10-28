// Enhanced particles with better visibility for both light and dark themes
// This configuration is used by both index.html and portfolio.html

// Wait for DOM to be ready and particles container to exist
function initParticles() {
    // Check if particles container exists
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        console.log('Particles container not found, retrying...');
        setTimeout(initParticles, 100);
        return;
    }

    // Check if particles.js library is loaded
    if (typeof particlesJS === 'undefined') {
        console.log('Particles.js library not loaded, retrying...');
        setTimeout(initParticles, 100);
        return;
    }

    try {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": [
                        "#ffffff",     // Bright white stars
                        "#e8f4fd",     // Light blue-white
                        "#ffd60a",     // Bright gold
                        "#ff9500",     // Orange
                        "#ff6b6b",     // Coral red
                        "#4ecdc4",     // Turquoise
                        "#45b7d1",     // Sky blue
                        "#96ceb4",     // Light green
                        "#feca57",     // Yellow
                        "#ff9ff3"      // Pink
                    ]
                },
                "shape": {
                    "type": ["circle", "star", "text"],
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "star": {
                        "nb_sides": 5
                    },
                    "text": {
                        "value": [
                            "stars", "supernova", "consciousness", "self-awareness", "electron",
                            "proton", "neutron", "energy", "sun", "moon", "earth",
                            "cinematography", "music", "flute", "guitar", "piano",
                            "coding", "AI", "machine learning", "photography", "nature",
                            "creativity", "innovation", "technology", "universe", "cosmos",
                            "quantum", "harmony", "melody", "rhythm", "vision", "imagination",
                            "wisdom", "knowledge", "curiosity", "exploration", "discovery",
                            "inspiration", "passion", "dreams", "reality", "balance",
                            "flow", "light", "shadow", "color", "sound", "silence",
                            "movement", "stillness", "chaos", "order", "beauty", "wonder",
                            "mystery", "magic", "science", "art", "logic", "intuition",
                            "heart", "mind", "soul", "spirit", "journey", "destination",
                            "beginning", "end", "cycle", "evolution", "transformation",
                            "growth", "learning", "teaching", "sharing", "connection",
                            "unity", "diversity", "possibility", "potential", "achievement",
                            "success", "failure", "resilience", "strength", "courage",
                            "compassion", "empathy", "kindness", "love", "peace", "joy",
                            "happiness", "fulfillment", "purpose", "meaning", "existence",
                            "consciousness", "awareness", "perception", "reality", "illusion",
                            "truth", "wisdom", "understanding", "clarity", "focus",
                            "concentration", "meditation", "mindfulness", "presence",
                            "gratitude", "appreciation", "celebration", "reflection",
                            "contemplation", "introspection", "analysis", "synthesis",
                            "creativity", "innovation", "invention", "programming",
                            "guidance", "direction", "strategy", "planning", "execution",
                            "implementation", "evaluation", "assessment", "improvement",
                            "iteration", "refinement", "polish", "perfection", "excellence",
                            "quality", "standards", "best practices", "methodology",
                            "framework", "architecture", "structure", "organization",
                            "system", "process", "workflow", "efficiency", "productivity",
                            "effectiveness", "impact", "influence", "change", "progress",
                            "advancement", "breakthrough", "revolution", "paradigm shift"
                        ],
                        "font": "16px Arial, sans-serif",
                        "weight": "400",
                        "color": "#ffffff",
                        "stroke_width": 0,
                        "stroke_color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.8,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.4,
                        "sync": false
                    }
                },
                "size": {
                    "value": 6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "size_min": 2,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 0.3,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 100,
                        "size": 8,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 2
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    }
                }
            },
            "retina_detect": true
        });

        // Initialize floating text animation
        initFloatingText();

        // Initialize star systems animation
        initStarSystems();

        console.log('Particles.js initialized successfully with text particles');
    } catch (error) {
        console.error('Error initializing particles.js:', error);
        setTimeout(initParticles, 500);
    }
}

// Initialize floating text animation system
function initFloatingText() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Create text particles container
    const textContainer = document.createElement('div');
    textContainer.id = 'floating-text-container';
    textContainer.style.position = 'absolute';
    textContainer.style.top = '0';
    textContainer.style.left = '0';
    textContainer.style.width = '100%';
    textContainer.style.height = '100%';
    textContainer.style.pointerEvents = 'none';
    textContainer.style.zIndex = '1';

    particlesContainer.appendChild(textContainer);

    // Astronomy and consciousness themed words - expanded list
    const words = [
        'stars', 'supernova', 'neutron star', 'black hole', 'pulsar',
        'galaxy', 'nebula', 'quasar', 'dark matter', 'event horizon',
        'consciousness', 'self awareness', 'mindfulness', 'awareness',
        'cosmic energy', 'quantum', 'stardust', 'universe',
        'cosmic consciousness', 'universal mind'
    ];

    // Create floating text elements with even longer delays for maximum sparsity
    words.forEach((word, index) => {
        setTimeout(() => {
            createFloatingText(textContainer, word);
        }, index * 5000); // 5 second delays for very few visible at once
    });
}

function createFloatingText(container, word) {
    const textElement = document.createElement('div');
    textElement.textContent = word;
    textElement.style.position = 'absolute';
    textElement.style.fontSize = Math.random() * 6 + 10 + 'px'; // Smaller size: 10-16px
    textElement.style.fontFamily = "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    textElement.style.fontWeight = Math.random() > 0.5 ? '500' : '400';
    textElement.style.letterSpacing = '0.5px';

    // Enhanced color scheme with gradients
    const hue1 = Math.random() * 360;
    const hue2 = (hue1 + 60) % 360;
    textElement.style.background = `linear-gradient(45deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
    textElement.style.webkitBackgroundClip = 'text';
    textElement.style.webkitTextFillColor = 'transparent';
    textElement.style.backgroundClip = 'text';
    textElement.style.color = `hsl(${hue1}, 70%, 60%)`;

    // Add glow effect
    textElement.style.textShadow = `
        0 0 10px rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8),
        0 0 20px rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5),
        0 0 30px rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)
    `;

    // Glass-like background for depth
    textElement.style.borderRadius = '4px';
    textElement.style.padding = '2px 6px';
    textElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    textElement.style.backdropFilter = 'blur(5px)';

    // Theme-aware border for better visibility
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    if (theme === 'light') {
        textElement.style.border = '1px solid rgba(0, 0, 0, 0.15)'; // Subtle dark border for light mode
    } else {
        textElement.style.border = '1px solid rgba(255, 255, 255, 0.2)'; // Original white border for dark mode
    }

    textElement.style.whiteSpace = 'nowrap';
    textElement.style.pointerEvents = 'none';
    textElement.style.userSelect = 'none';

    // Random starting position
    textElement.style.left = Math.random() * 100 + '%';
    textElement.style.top = Math.random() * 100 + '%';

    // Start invisible and small for fire effect
    textElement.style.opacity = '0';
    textElement.style.transform = 'scale(0.1)';

    container.appendChild(textElement);

    // Animate with fire-like effect
    animateFireText(textElement);
}

function animateFireText(element) {
    const totalDuration = 2000+Math.random() * 1000; // 15-25 seconds total for quicker in/out cycle
    const startTime = Date.now();

    // Get current position as start position
    const startX = parseFloat(element.style.left) || Math.random() * 100;
    const startY = parseFloat(element.style.top) || Math.random() * 100;

    // Calculate end position (drift to a new random location)
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;

    // Rotation animation
    const startRotation = Math.random() * 10 - 5;
    const endRotation = startRotation + (Math.random() * 6 - 3); // +/- 3 degrees from start

    // Create particle container for spreading particles
    const particleContainer = element.parentElement;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);

        // Calculate current position with smooth interpolation
        const currentX = startX + (endX - startX) * easeInOutCubic(progress);
        const currentY = startY + (endY - startY) * easeInOutCubic(progress);
        const currentRotation = startRotation + (endRotation - startRotation) * easeInOutCubic(progress);

        // Modified animation: immediate ease in to out (no hold phase)
        if (progress < 0.5) {
            // Phase 1: Ease in (0-50% of duration)
            const phaseProgress = progress / 0.5;
            const scale = 0.1 + 0.9 * easeOutCubic(phaseProgress);
            const opacity = easeOutCubic(phaseProgress);

            element.style.opacity = opacity.toString();
            element.style.transform = `translate(${currentX - startX}%, ${currentY - startY}%) scale(${scale}) rotate(${currentRotation}deg)`;
            element.style.left = startX + '%';
            element.style.top = startY + '%';

        } else {
            // Phase 2: Immediate ease out (50-100% of duration) - no hold phase
            const phaseProgress = (progress - 0.5) / 0.5;
            const scale = 1 - 0.5 * easeInCubic(phaseProgress);
            const opacity = 1 - easeInCubic(phaseProgress);

            element.style.opacity = opacity.toString();
            element.style.transform = `translate(${currentX - startX}%, ${currentY - startY}%) scale(${scale}) rotate(${currentRotation}deg)`;

            // Update position as it drifts during ease out
            element.style.left = currentX + '%';
            element.style.top = currentY + '%';

            // Add particle spreading during ease out phase
            if (Math.random() < 0.3) {
                createSpreadingParticles(element, particleContainer);
            }
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Remove element and create new one
            if (element.parentElement) {
                element.parentElement.removeChild(element);
            }
            // Create new text after a shorter delay for more frequent cycling
            setTimeout(() => {
                const words = ['stars', 'supernova', 'neutron star', 'black hole', 'pulsar',
                    'galaxy', 'nebula', 'quasar', 'dark matter', 'event horizon',
                    'consciousness', 'self awareness', 'mindfulness', 'awareness',
                    'cosmic energy', 'quantum', 'stardust', 'universe',
                    'cosmic consciousness', 'universal mind'];
                const randomWord = words[Math.floor(Math.random() * words.length)];
                createFloatingText(particleContainer, randomWord);
            }, Math.random() * 5000 + 2000); // 2-7 second delay for more frequent cycling
        }
    }

    animate();
}

function createSpreadingParticles(parentElement, container) {
    const rect = parentElement.getBoundingClientRect();
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Create 2-4 small particles
    const particleCount = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.background = `hsl(${Math.random() * 60 + 15}, 80%, 60%)`; // Warm colors for fire effect
        particle.style.opacity = '0.8';
        particle.style.pointerEvents = 'none';

        // Start from center of text element
        const startX = rect.left + rect.width / 2 - particlesContainer.getBoundingClientRect().left;
        const startY = rect.top + rect.height / 2 - particlesContainer.getBoundingClientRect().top;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';

        container.appendChild(particle);

        // Animate particle spreading outward
        animateSpreadingParticle(particle, startX, startY);
    }
}

function animateSpreadingParticle(particle, startX, startY) {
    const duration = 1500 + Math.random() * 1000; // 1.5-2.5 seconds
    const startTime = Date.now();

    // Random direction and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50; // 50-150px spread
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Move outward
        const currentX = startX + (endX - startX) * easeOutCubic(progress);
        const currentY = startY + (endY - startY) * easeOutCubic(progress);

        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';

        // Fade out over time
        const opacity = 0.8 * (1 - progress);
        particle.style.opacity = opacity.toString();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Remove particle
            if (particle.parentElement) {
                particle.parentElement.removeChild(particle);
            }
        }
    }

    animate();
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t) {
    return t * t * t;
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// ==================== STAR SYSTEM ANIMATIONS ====================

function initStarSystems() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Create 1, 2, and 3 star systems at random positions
    createSingleStarSystem(particlesContainer);
    createBinaryStarSystem(particlesContainer);
    createTripleStarSystem(particlesContainer);
}

function createSingleStarSystem(container) {
    const starSystem = document.createElement('div');
    starSystem.className = 'star-system single-star';
    starSystem.style.position = 'absolute';

    // Random position
    const x = Math.random() * 80 + 10; // 10-90% to avoid edges
    const y = Math.random() * 80 + 10;
    starSystem.style.left = x + '%';
    starSystem.style.top = y + '%';

    // Create the single star
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = '20px';
    star.style.height = '20px';
    star.style.borderRadius = '50%';
    star.style.position = 'absolute';
    star.style.left = '50%';
    star.style.top = '50%';
    star.style.transform = 'translate(-50%, -50%)';

    // Theme-aware star colors
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    if (theme === 'light') {
        star.style.background = 'radial-gradient(circle, #ffd60a 0%, #ff9500 70%, #ff6b35 100%)';
        star.style.boxShadow = '0 0 20px rgba(255, 215, 10, 0.8), 0 0 40px rgba(255, 149, 0, 0.6)';
    } else {
        star.style.background = 'radial-gradient(circle, #ffffff 0%, #e8f4fd 70%, #96ceb4 100%)';
        star.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(232, 244, 253, 0.6)';
    }

    starSystem.appendChild(star);
    container.appendChild(starSystem);

    // Animate single star with pulsing
    animateSingleStar(star, starSystem);
}

function animateSingleStar(star, container) {
    let pulsePhase = 0;

    function animate() {
        pulsePhase += 0.02;

        // Pulsing scale and glow
        const scale = 0.8 + 0.4 * Math.sin(pulsePhase);
        const opacity = 0.7 + 0.3 * Math.sin(pulsePhase * 2);

        star.style.transform = `translate(-50%, -50%) scale(${scale})`;
        star.style.opacity = opacity.toString();

        requestAnimationFrame(animate);
    }

    animate();
}

function createBinaryStarSystem(container) {
    const starSystem = document.createElement('div');
    starSystem.className = 'star-system binary-system';
    starSystem.style.position = 'absolute';
    starSystem.style.zIndex = '10';

    // Set size for proper positioning
    starSystem.style.width = '200px';
    starSystem.style.height = '200px';

    // Random position
    const x = Math.random() * 70 + 15;
    const y = Math.random() * 70 + 15;
    starSystem.style.left = x + '%';
    starSystem.style.top = y + '%';

    // Create two stars
    for (let i = 0; i < 2; i++) {
        const star = document.createElement('div');
        star.className = 'star binary-star-' + (i + 1);
        star.style.width = '15px';
        star.style.height = '15px';
        star.style.borderRadius = '50%';
        star.style.position = 'absolute';

        // Position stars opposite each other
        const angle = (i * Math.PI) + Math.random() * Math.PI;
        const radius = 40;

        // Calculate initial position using container dimensions
        const containerRect = container.getBoundingClientRect();
        const systemRect = {
            left: x * containerRect.width / 100,
            top: y * containerRect.height / 100,
            width: 200,
            height: 200
        };
        const centerX = systemRect.left + systemRect.width / 2;
        const centerY = systemRect.top + systemRect.height / 2;

        const starX = centerX + Math.cos(angle) * radius;
        const starY = centerY + Math.sin(angle) * radius;

        star.style.left = starX + 'px';
        star.style.top = starY + 'px';

        // Theme-aware colors
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        if (theme === 'light') {
            star.style.background = i === 0
                ? 'radial-gradient(circle, #ff6b6b 0%, #ff4757 100%)'
                : 'radial-gradient(circle, #4ecdc4 0%, #26a69a 100%)';
            star.style.boxShadow = `0 0 15px ${i === 0 ? 'rgba(255, 107, 107, 0.8)' : 'rgba(78, 205, 196, 0.8)'}`;
        } else {
            star.style.background = i === 0
                ? 'radial-gradient(circle, #ff9ff3 0%, #f368e0 100%)'
                : 'radial-gradient(circle, #45b7d1 0%, #2980b9 100%)';
            star.style.boxShadow = `0 0 15px ${i === 0 ? 'rgba(255, 159, 243, 0.8)' : 'rgba(69, 183, 209, 0.8)'}`;
        }

        starSystem.appendChild(star);
    }

    container.appendChild(starSystem);

    // Animate binary stars orbiting
    animateBinaryStars(starSystem);
}

function animateBinaryStars(system) {
    const stars = system.querySelectorAll('.star');
    let orbitPhase = Math.random() * Math.PI * 2;

    function animate() {
        orbitPhase += 0.01; // Slow orbital speed

        stars.forEach((star, index) => {
            const angle = orbitPhase + (index * Math.PI); // Opposite positions
            const radius = 40;

            // Calculate position relative to container center
            const containerRect = system.parentElement.getBoundingClientRect();
            const centerX = containerRect.width / 2;
            const centerY = containerRect.height / 2;

            const starX = centerX + Math.cos(angle) * radius;
            const starY = centerY + Math.sin(angle) * radius;

            star.style.left = (starX / containerRect.width * 100) + '%';
            star.style.top = (starY / containerRect.height * 100) + '%';

            // Add slight pulsing
            const pulse = 0.9 + 0.2 * Math.sin(orbitPhase * 3 + index);
            star.style.transform = `scale(${pulse})`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

function createTripleStarSystem(container) {
    const starSystem = document.createElement('div');
    starSystem.className = 'star-system triple-system';
    starSystem.style.position = 'absolute';
    starSystem.style.zIndex = '10'; // Ensure visibility above particles

    // Set size for proper positioning
    starSystem.style.width = '200px';
    starSystem.style.height = '200px';

    // Random position
    const x = Math.random() * 60 + 20; // 20-80% to avoid edges
    const y = Math.random() * 60 + 20;
    starSystem.style.left = x + '%';
    starSystem.style.top = y + '%';

    // Create three stars in a triangular formation
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        star.className = 'star triple-star-' + (i + 1);
        star.style.width = '12px';
        star.style.height = '12px';
        star.style.borderRadius = '50%';
        star.style.position = 'absolute';

        // Position stars in a triangle
        const angles = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];
        const angle = angles[i] + Math.random() * Math.PI / 6; // Add some randomness
        const radius = 35;
        const starX = 50 + Math.cos(angle) * radius / container.offsetWidth * 100;
        const starY = 50 + Math.sin(angle) * radius / container.offsetHeight * 100;

        star.style.left = starX + '%';
        star.style.top = starY + '%';

        // Theme-aware colors
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const colors = theme === 'light'
            ? ['#ffd60a', '#ff6b6b', '#4ecdc4']
            : ['#feca57', '#ff9ff3', '#45b7d1'];

        star.style.background = `radial-gradient(circle, ${colors[i]} 0%, ${colors[i]} 100%)`;
        star.style.boxShadow = `0 0 12px ${colors[i] + 'cc'}`;

        starSystem.appendChild(star);
    }

    container.appendChild(starSystem);

    // Animate triple stars with complex orbits
    animateTripleStars(starSystem);
}

function animateTripleStars(system) {
    const stars = system.querySelectorAll('.star');
    let orbitPhase = Math.random() * Math.PI * 2;

    function animate() {
        orbitPhase += 0.008; // Slower orbital speed for triple system

        // Get system position and size
        const systemRect = system.getBoundingClientRect();
        const centerX = systemRect.left + systemRect.width / 2;
        const centerY = systemRect.top + systemRect.height / 2;

        stars.forEach((star, index) => {
            // Different orbital speeds and radii for each star
            const speeds = [1, 1.3, 0.7];
            const radii = [70, 90, 60]; // Increased from [35, 45, 30] for farther apart

            const angle = orbitPhase * speeds[index] + (index * 2 * Math.PI / 3);
            const radius = radii[index];

            const starX = centerX + Math.cos(angle) * radius;
            const starY = centerY + Math.sin(angle) * radius;

            star.style.left = starX + 'px';
            star.style.top = starY + 'px';

            // Remove pulsing - keep stars at constant size
            star.style.transform = 'scale(1)';
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize particles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

// ==================== PARTICLES.JS CONFIGURATION ====================
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
                    "value": 120,
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
                    "type": ["circle", "star"],
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "star": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.9,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.6,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
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
        console.log('Particles.js initialized successfully');
    } catch (error) {
        console.error('Error initializing particles.js:', error);
        setTimeout(initParticles, 500);
    }
}

// Initialize particles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

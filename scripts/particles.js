// ==================== PARTICLES.JS CONFIGURATION ====================
// Particles.js configuration for twinkle effect with Indian theme
// This configuration is used by both index.html and portfolio.html

particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 150,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#FFD700", "#FF9933", "#005F73", "#0A9396", "#B76E79"]
        },
        "shape": {
            "type": ["circle", "triangle", "polygon", "star"],
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.9,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.3,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 2,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#FF9933",
            "opacity": 0.6,
            "width": 1.5
        },
        "move": {
            "enable": true,
            "speed": 1.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
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
                "distance": 150,
                "size": 10,
                "duration": 2,
                "opacity": 1,
                "speed": 3
            },
            "repulse": {
                "distance": 150,
                "duration": 0.4
            }
        }
    },
    "retina_detect": true
});

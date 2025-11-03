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

// config/env.js
const isProduction = typeof window !== 'undefined' &&
    (window.location.hostname === 'wiggleframes.com' ||
        window.location.hostname === 'www.wiggleframes.com');

export default {
    IS_PRODUCTION: isProduction,
    BASE_URL: isProduction ? 'https://www.wiggleframes.com' : 'http://localhost:8000',
    CDN_URL: 'https://www.wiggleframes.com'
};
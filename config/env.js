// config/env.js
const isProduction = typeof window !== 'undefined' &&
    (window.location.hostname === 'wiggleframes.com' ||
        window.location.hostname === 'www.wiggleframes.com' ||
            window.location.hostname.endsWith('biodata-1ey.pages.dev'));

export default {
    IS_PRODUCTION: isProduction,
    BASE_URL: isProduction ? window.location.hostname : 'http://localhost:8000',
    CDN_URL: window.location.hostname
};
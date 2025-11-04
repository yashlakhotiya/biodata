// config/env.js
const isProduction = typeof window !== 'undefined' &&
    (window.location.hostname === 'wiggleframes.com' ||
        window.location.hostname === 'www.wiggleframes.com' ||
        window.location.hostname.endsWith('biodata-1ey.pages.dev'));

const protocol = window.location.protocol;
const hostname = window.location.hostname;

export default {
    IS_PRODUCTION: isProduction,
    BASE_URL: isProduction ? `${protocol}//${hostname}` : 'http://localhost:8000',
    CDN_URL: isProduction ? `${protocol}//${hostname}` : 'http://localhost:8000'
};
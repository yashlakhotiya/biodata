// Log levels
const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
    TRACE: 4
};

// Default log level (can be overridden)
let currentLogLevel = LOG_LEVELS.INFO;

// Set the current log level
export function setLogLevel(level) {
    if (typeof level === 'string') {
        const upperLevel = level.toUpperCase();
        if (LOG_LEVELS[upperLevel] !== undefined) {
            currentLogLevel = LOG_LEVELS[upperLevel];
        } else {
            console.warn(`Invalid log level: ${level}. Using default: INFO`);
        }
    } else if (typeof level === 'number') {
        if (Object.values(LOG_LEVELS).includes(level)) {
            currentLogLevel = level;
        } else {
            console.warn(`Invalid log level number: ${level}. Using default: INFO`);
        }
    }
    
    // Save to localStorage for persistence
    try {
        localStorage.setItem('logLevel', currentLogLevel);
    } catch (e) {
        // Silently fail if localStorage is not available
    }
}

// Initialize log level from localStorage if available
try {
    const savedLevel = localStorage.getItem('logLevel');
    if (savedLevel !== null) {
        setLogLevel(parseInt(savedLevel, 10));
    }
} catch (e) {
    // Silently fail if localStorage is not available
}

// Logger object
export const logger = {
    error: (message, ...args) => {
        if (currentLogLevel >= LOG_LEVELS.ERROR) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    },
    
    warn: (message, ...args) => {
        if (currentLogLevel >= LOG_LEVELS.WARN) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    },
    
    info: (message, ...args) => {
        if (currentLogLevel >= LOG_LEVELS.INFO) {
            console.log(`[INFO] ${message}`, ...args);
        }
    },
    
    debug: (message, ...args) => {
        if (currentLogLevel >= LOG_LEVELS.DEBUG) {
            console.log(`[DEBUG] ${message}`, ...args);
        }
    },
    
    trace: (message, ...args) => {
        if (currentLogLevel >= LOG_LEVELS.TRACE) {
            console.trace(`[TRACE] ${message}`, ...args);
        }
    },
    
    // Expose the current log level
    getLogLevel: () => {
        return Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === currentLogLevel);
    },
    
    // Expose the log levels
    LOG_LEVELS: Object.freeze(LOG_LEVELS)
};

// Make logger available globally for easy access in browser console
window.appLogger = logger;

// Export default logger
export default logger;

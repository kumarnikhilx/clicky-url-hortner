import rateLimit from "express-rate-limit";

// Rate Limiter for Authentication Routes
// Allows a maximum of 20 authentication requests (e.g. login, register)
// per IP address within a 5-minute time window.
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes in milliseconds
    max: 20, // Limit each IP to 20 requests per windowMs
    standardHeaders: true, // Return standard rate limit info in RateLimit-* headers
    legacyHeaders: false, // Disable X-RateLimit-* headers
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

// Rate Limiter for URL Creation
// Allows a maximum of 20 URL creation requests
// per IP address within a 5-minute time window.
const urlLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes in milliseconds
    max: 20, // Limit each IP to 20 requests per windowMs
    standardHeaders: true, // Return standard rate limit info in RateLimit-* headers
    legacyHeaders: false, // Disable X-RateLimit-* headers
    message: {
        success: false,
        message: "Too many URL creation requests. Please try again later."
    }
});

export { authLimiter, urlLimiter };

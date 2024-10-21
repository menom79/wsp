class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // For distinguishing operational errors
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

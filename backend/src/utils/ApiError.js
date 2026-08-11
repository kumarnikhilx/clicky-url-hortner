export class ApiError extends Error {
    constructor(statusCode,message = "Something went wrong",errors = [],stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class BadRequestError extends ApiError {
    constructor(message = "Bad Request", errors = [], stack = "") {
        super(400, message, errors, stack);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized", errors = [], stack = "") {
        super(401, message, errors, stack);
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = "Forbidden", errors = [], stack = "") {
        super(403, message, errors, stack);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = "Not Found", errors = [], stack = "") {
        super(404, message, errors, stack);
    }
}

export class ConflictError extends ApiError {
    constructor(message = "Conflict", errors = [], stack = "") {
        super(409, message, errors, stack);
    }
}

export class UnprocessableEntityError extends ApiError {
    constructor(message = "Unprocessable Entity", errors = [], stack = "") {
        super(422, message, errors, stack);
    }
}

export class InternalServerError extends ApiError {
    constructor(message = "Internal Server Error", errors = [], stack = "") {
        super(500, message, errors, stack);
    }
}

module.exports = {
    OK: {message: 'You are logged in', code: 200},
    CREATED: {message: 'Created', code: 201},
    NO_CONTENT: {message: 'No Content', code: 204},

    BAD_REQUEST: { message: 'Syntax error in request', code: 400},
    UNAUTHORIZED: { message: 'Invalid token', code: 401},
    FORBIDDEN: { message: 'Access restrictions for the client', code: 403},
    NOT_FOUND: {message: 'No user with this data', code: 404},
    CONFLICT: { message: 'User with such data is already present', code: 409},

    SERVER_ERROR: { message: 'Internal server error', code: 500},
};

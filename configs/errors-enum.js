module.exports = {
    OK: {message: 'You are logged in', status: 200},

    BAD_REQUEST: { message: 'Syntax error in request', status: 400},
    FORBIDDEN: { message: 'Access restrictions for the client', status: 403},
    NOT_FOUND: {message: 'No user with this data', status: 404},
    CONFLICT: { message: 'User with such data is already present', status: 409},

    SERVER_ERROR: { message: 'Internal server error', status: 500},
};

module.exports = {
    BAD_REQUEST: { message: 'Syntax error in request', code: 400},
    FORBIDDEN: { message: 'Access restrictions for the client', code: 403},
    NOT_FOUND: {message: 'Wrong Email or password', code: 404},
    NOT_FOUND_ID: {message: 'No user with this Id', code: 404},
    CONFLICT: { message: 'User with such data is already present', code: 409},

    SERVER_ERROR: { message: 'Internal server error', code: 500},
};

const userNormalizator = (userToNormalize = {}) => {
    const fieldsToRemove = ['password'];

    fieldsToRemove.forEach((field) => {
        delete userToNormalize[field];
    });

    return userToNormalize;
};

class UserNormalize {
    constructor({_id, name, email, role, cars}) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.cars = cars;
    }
}

module.exports = {
    userNormalizator,
    UserNormalize
};

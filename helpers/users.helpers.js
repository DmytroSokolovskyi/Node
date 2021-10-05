const fs = require("fs");
const path = require("path");
const util = require('util');

const mainPath = path.parse(__dirname).dir;
const db = path.join(mainPath, 'dataBase', 'users.json');
const readDbPromise = util.promisify(fs.readFile);
const writeDbPromise = util.promisify(fs.writeFile);

const readDb = () => {
    const read = async () => readDbPromise(db);
    return read();
};

const userById = (id) => {
    const user = async () => readDbPromise(db)
        .then(value => JSON.parse(value)[id - 1]);
    return user();
};

const deleteById = (id) => {
    const userDelete = async () => readDbPromise(db)
        .then(value => JSON.parse(value).filter(item => item.id !== +id));
    return userDelete();
};

const createNewUser = (body) => {
    const pushToArr = async () => readDbPromise(db)
        .then(value => JSON.parse(value))
        .then(value => {
            value.push({...body, id: value[value.length - 1].id + 1});
            const writeNew = async () => writeDbPromise(db, JSON.stringify(value));
            writeNew();
        });
    pushToArr();
    const read = async () => readDbPromise(db);
    return read();
};

const updateUser = (id, data) => {
    const editUser = async () => readDbPromise(db)
        .then(value => JSON.parse(value))
        .then(value => {
            value.splice(value.findIndex(item => item.id === +id), 1, data);
            const writeNew = async () => writeDbPromise(db, JSON.stringify(value));
            writeNew();
        });
    editUser();
    const read = async () => readDbPromise(db);
    return read();
};

module.exports = {
    readDb,
    userById,
    deleteById,
    createNewUser,
    updateUser
};
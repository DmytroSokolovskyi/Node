const path = require("path");
const fs = require("fs");

const dirs = ['manOlder20', 'manYounger20', 'womanOlder20', 'womanYounger20'];

dirs.forEach(dir => {
    fs.mkdir(path.join(__dirname, dir), err => {
        console.log(err)
    });
});

const users = [
    {name: 'Olya', gender: 'female', age: 20},
    {name: 'Anya', gender: 'female', age: 18},
    {name: 'Ira', gender: 'female', age: 19},
    {name: 'Nadia', gender: 'female', age: 23},
    {name: 'Sofia', gender: 'female', age: 24},
    {name: 'Oleg', gender: 'male', age: 25},
    {name: 'Vova', gender: 'male', age: 18},
    {name: 'Max', gender: 'male', age: 23},
    {name: 'Sacha', gender: 'male', age: 19},
    {name: 'Kolya', gender: 'male', age: 20},
];

users.forEach(user => {

    if (user.gender === "male") {

        if (user.age >= 20) {
            fs.writeFile(path.join(__dirname, 'manOlder20', `${user.name}.json`), JSON.stringify(user), err => {
                console.log(err);
            });
            return;
        }
        fs.writeFile(path.join(__dirname, 'manYounger20', `${user.name}.json`), JSON.stringify(user), err => {
            console.log(err)
        })

    }
    if (user.age >= 20) {
        fs.writeFile(path.join(__dirname, 'womanOlder20', `${user.name}.json`), JSON.stringify(user), err => {
            console.log(err);
        });
        return;
    }
    fs.writeFile(path.join(__dirname, 'womanYounger20', `${user.name}.json`), JSON.stringify(user), err => {
        console.log(err)
    })

});




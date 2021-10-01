const sort = require('./helpers/people-sort');
const path = require("path");

const allPeoplesPath = path.join(__dirname, 'peoples');

console.log(sort.sortPeople(allPeoplesPath));




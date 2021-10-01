// const sort = require('./helpers/people-sort');
const newSort = require('./helpers/newPeople-sort');
const path = require("path");

// const allPeoplesPath = path.join(__dirname, 'peoples');
const malePeoplesPath = path.join(__dirname, 'peoples', 'male');
const femalePeoplesPath = path.join(__dirname, 'peoples', 'female');

// console.log(sort.sortPeople(allPeoplesPath));
console.log(newSort.newSortPeople(malePeoplesPath, malePeoplesPath, femalePeoplesPath));
console.log(newSort.newSortPeople(femalePeoplesPath, malePeoplesPath, femalePeoplesPath));





const path = require("path");

const newSort = require('./helpers/newPeople-sort');

const malePeoplesPath = path.join(__dirname, 'peoples', 'male');
const femalePeoplesPath = path.join(__dirname, 'peoples', 'female');

newSort.newSortPeople(malePeoplesPath, malePeoplesPath, femalePeoplesPath);
newSort.newSortPeople(femalePeoplesPath, malePeoplesPath, femalePeoplesPath);
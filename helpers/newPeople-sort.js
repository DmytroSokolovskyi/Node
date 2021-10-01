const fs = require("fs");
const path = require("path");

const newSortPeople = (toSortDir, maleDir, femaleDir) => {
    fs.readdir(toSortDir, (e, files) => {
        if (e) {
            console.log(e);
            return;
        }

        files.forEach(file => {
            fs.readFile(path.join(toSortDir, file), (err, data) => {
                if (e) {
                    console.log(err);
                    return;
                }

                const item = JSON.parse(data);
                const writePath = item.gender === "male" ? maleDir : femaleDir;

                fs.rename(
                    path.join(toSortDir, file),
                    path.join(writePath, file),
                    err => {
                        console.log(err);
                    });
            });
        });
    });
};

module.exports = {
    newSortPeople
};
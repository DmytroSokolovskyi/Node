const fs = require("fs");
const path = require("path");

const sortPeople = (mainDir) => {
    fs.readdir(mainDir, (err, dirsGender) => {

        if (err) {
            console.log(err);
            return;
        }

        dirsGender.forEach(dirGender => {
            fs.readdir(path.join(mainDir, dirGender), (e, files) => {

                    if (e) {
                        console.log(e);
                        return;
                    }

                    files.forEach(file => {
                        fs.readFile(path.join(mainDir, dirGender, file), (err1, data) => {

                            if (e) {
                                console.log(err1);
                                return;
                            }

                            const item = JSON.parse(data);
                            if (item.gender === dirGender) {
                                return;
                            }
                            fs.rename(
                                path.join(mainDir, dirGender, file),
                                path.join(mainDir, item.gender, file),
                                err => {
                                    console.log(err)
                                });
                        });
                    })
                });
        });
    })
};

module.exports = {
    sortPeople
};
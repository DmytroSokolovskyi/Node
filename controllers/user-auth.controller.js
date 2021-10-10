const User = require('../dataBase/User');
const {userUtil} = require('../util');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const {email} = req.body;
            let userNew = await User.findOneAndUpdate({email}, {auth: true}).lean();
            userNew = userUtil.userNormalizator(userNew);

            res.json(userNew);
        } catch (e) {
            res.json(e.message);
        }
    }
};


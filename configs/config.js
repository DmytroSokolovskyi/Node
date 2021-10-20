module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/Node',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "node.js",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ||"node_refresh",
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET ||"node_action",

    EMAIL_LOGIN: process.env.EMAIL_LOGIN,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
};

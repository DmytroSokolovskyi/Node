const cron = require('node-cron');

const oldTokensRemove = require('./old-token-remove.job');

module.exports = () => {
    cron.schedule('1 0 * * *', async () => {
        await oldTokensRemove();
    });
};

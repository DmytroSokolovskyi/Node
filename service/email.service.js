const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {config} = require('../configs/');
const allTemplates = require('../email-templates');
const {ErrorHandler} = require('../errors');
const {statusEnum} = require('../configs');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_LOGIN,
        pass: config.EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, contex = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler({message: 'Template name undefined', status: statusEnum.NOT_FOUND});
    }

    const html = await templateParser.render(templateInfo.templateName, contex);
    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};

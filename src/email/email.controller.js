const express = require('express');
const router = express.Router();
const emailService = require('./email.service');
const mailGunService = require('./mailGun.service');
const sendGridService = require('./sendGrid.service');
const helpers = require('../helpers');

router.get('/', (req, res) => {
    res.status(405).send({
        errorMessage: 'This is not a supported method.'
    });
});

router.post('/', async (req, res) => {
    const data = req.body;

    // preparing email lists
    data.to = emailService.prepareEmailAddresses(data.to);
    data.cc = emailService.prepareEmailAddresses(data.cc);
    data.bcc = emailService.prepareEmailAddresses(data.bcc);

    //validating
    if (!emailService.validate(data)) {
        return res.status(500).send({
            errorMessage: "Invalid data"
        });
    }
    const {
        to,
        subject,
        text,
        cc,
        bcc
    } = data;

    try {
        await mailGunService.send(to, subject, text, cc, bcc);
    } catch (error) { 
        console.log('Mailgun service failed with error');
        helpers.error.handleAxios(error);
        console.log('Retrying with SendGrid');
        try {
            await sendGridService.send(to, subject, text);
        } catch (error) {
            console.log('SendGrid service failed with error');
            helpers.error.handleAxios(error);
        }
    }

    res.send({
        message: 'Email sent successfully'
    });
});

module.exports = router;
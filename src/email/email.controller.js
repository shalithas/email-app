const express = require('express');
const router = express.Router();
const emailService = require('./email.service');
const mailGunService = require('./mailGun.service');

router.get('/', (req, res) => {
    res.status(405).send({
        errorMessage: 'This is not a supported method.'
    });
});

router.post('/', async (req, res) => {
    const data = req.body;
    if (!emailService.validate(data)) {
        return res.status(500).send({
            errorMessage: "Invalid data"
        });
    }

    try {
        await mailGunService.send('Testing mail app', 'shalitha89@gmail.com', 'Test', 'test message');
    } catch (error) { 
        console.log(error.response);
    }

    res.send({
        message: 'Email sent successfully'
    });
});

module.exports = router;
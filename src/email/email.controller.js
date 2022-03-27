const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.status(405).send({
        success: false,
        errorMessage: 'This is not a supported method.'
    });
});

module.exports = router;
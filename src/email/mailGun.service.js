const Axios = require('axios');
const config = require('../config');
console.log(config);
const { url, domain, key } = config.email.mailGun;

const send = (from, to, subject, text) => {
    return Axios({
        url: `${url}/${domain}/messages`,
        method: 'POST',
        auth: {
            username: 'api',
            password: key
        },
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            from: `${from} <noreply@${domain}>`,
            to,
            subject,
            text
        }
    });
}

module.exports = { send };
const Axios = require('axios');
const config = require('../config');
const { url, domain, key } = config.email.mailGun;
const sender = config.email.sender;

const send = (to, subject, text, cc, bcc) => {
  return Axios({
    url: `${url}/${domain}/messages`,
    method: 'POST',
    auth: {
      username: 'api',
      password: key,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      from: `Mail App <${sender}>`,
      to: prepareAddresses(to),
      cc: prepareAddresses(cc),
      bcc: prepareAddresses(bcc),
      subject,
      text,
    },
  });
};

const prepareAddresses = (emailList) => {
  let output = '';

  emailList.forEach((item, index) => {
    output += `${item} <${item}>${index !== emailList.length - 1 ? ', ' : ''}`;
  });

  return output;
};

module.exports = { send };

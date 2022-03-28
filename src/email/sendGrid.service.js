const Axios = require('axios');
const config = require('../config');
const { key, url } = config.email.sendGrid;
const sender = config.email.sender;

const send = (to, subject, text, cc, bcc) => {
  const data = getDataStructure(to, subject, text, cc, bcc);
  return Axios({
    url: `${url}/mail/send`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    data,
  });
};

const prepareAddresses = (emailList) => {
  if (!emailList) {
    return [];
  }
  return emailList.map((item) => ({ email: item }));
};

const getDataStructure = (to, subject, text, cc, bcc) => {
  const personalizations = { to: prepareAddresses(to) };
  if (cc) {
    personalizations.cc = prepareAddresses(cc);
  }
  if (bcc) {
    personalizations.bcc = prepareAddresses(bcc);
  }
  return {
    personalizations: [personalizations],
    from: { email: sender },
    subject: subject,
    content: [
      {
        type: 'text/plain',
        value: text,
      },
    ],
  };
};

module.exports = { send };

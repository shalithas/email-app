'use strict';

// required environment variables
const requiredVars = [
  'NODE_ENV',
  'PORT',
  'MAIL_GUN_API_URL',
  'MAIL_GUN_API_KEY',
  'MAIL_GUN_DOMAIN',
  'SENDGRID_API_KEY',
  'SENDGRID_API_URL',
];

requiredVars.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.BOOLEAN
      ? process.env.BOOLEAN.toLowerCase() === 'true'
      : false,
  },
  server: {
    port: Number(process.env.PORT),
  },
  email: {
    sender: process.env.EMAIL_SENDER,
    mailGun: {
      url: process.env.MAIL_GUN_API_URL,
      key: process.env.MAIL_GUN_API_KEY,
      domain: process.env.MAIL_GUN_DOMAIN,
    },
    sendGrid: {
      key: process.env.SENDGRID_API_KEY,
      url: process.env.SENDGRID_API_URL,
    },
  },
  // ...
};

module.exports = config;

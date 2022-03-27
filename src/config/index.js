'use strict'

// required environment variables
const requiredVars = [
  'NODE_ENV',
  'PORT',
  'MAIL_GUN_API_URL',
  'MAIL_GUN_API_KEY',
  'MAIL_GUN_DOMAIN'
];

requiredVars.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`)
  }
})

const config = {
  env: process.env.NODE_ENV,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.BOOLEAN ? process.env.BOOLEAN.toLowerCase() === 'true' : false
  },
  server: {
    port: Number(process.env.PORT)
  },
  email: {
    mailGun: {
      url: process.env.MAIL_GUN_API_URL,
      key: process.env.MAIL_GUN_API_KEY,
      domain: process.env.MAIL_GUN_DOMAIN,
    }
  }
  // ...
}

module.exports = config;
'use strict';
const helpers = require('../helpers');

const validate = (data) => {
  let valid = true;
  const errors = [];

  if (!helpers.validations.textNotEmpty(data.subject)) {
    errors.push('Subject cannot be empty');
  }

  if (!helpers.validations.textNotEmpty(data.text)) {
    errors.push('Message body cannot be empty');
  }

  if (data.to.length > 0) {
    data.to.forEach((email) => {
      if (!helpers.validations.email(email)) {
        errors.push(`Email address ${email} is not valid`);
      }
    });
  } else {
    errors.push('To cannot be empty');
  }

  if (data.cc.length > 0) {
    data.cc.forEach((email) => {
      if (!helpers.validations.email(email)) {
        errors.push(`Email address ${email} is not valid`);
      }
    });
  }

  if (data.bcc.length > 0) {
    data.bcc.forEach((email) => {
      if (!helpers.validations.email(email)) {
        errors.push(`Email address ${email} is not valid`);
      }
    });
  }

  if (errors.length > 0) {
    valid = false;
  }

  return {
    isValid: valid,
    errors,
  };
};

const prepareEmailAddresses = (emailAddresses) => {
  let items = [];
  if (emailAddresses) {
    items = emailAddresses.split(',');
    items = items.map((item) => item.trim());
  }

  return items;
};

module.exports = {
  validate,
  prepareEmailAddresses,
};

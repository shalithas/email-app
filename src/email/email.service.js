'use strict';
import { validations } from '../helpers';

export const validate = (data) => {
  let valid = true;
  const errors = [];

  if (!validations.textNotEmpty(data.subject)) {
    errors.push('Subject cannot be empty');
  }

  if (!validations.textNotEmpty(data.text)) {
    errors.push('Message body cannot be empty');
  }

  if (data.to.length > 0) {
    data.to.forEach((email) => {
      if (!validations.email(email)) {
        errors.push(`Email address ${email} is not valid`);
      }
    });
  } else {
    errors.push('To cannot be empty');
  }

  if (data.cc.length > 0) {
    data.cc.forEach((email) => {
      if (!validations.email(email)) {
        errors.push(`Email address ${email} is not valid`);
      }
    });
  }

  if (data.bcc.length > 0) {
    data.bcc.forEach((email) => {
      if (!validations.email(email)) {
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

export const prepareEmailAddresses = (emailAddresses) => {
  let items = [];
  if (emailAddresses) {
    items = emailAddresses.split(',');
    items = items.map((item) => item.trim());
  }

  return items;
};

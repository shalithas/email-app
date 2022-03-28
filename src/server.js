const express = require('express');

const emailController = require('./email/email.controller');

module.exports = (app) => {
  app.get('/', (res, req) => {
    req.send('Welcome to the app');
  });

  app.use(express.json());
  app.use('/api/email', emailController);
};

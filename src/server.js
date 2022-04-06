import { json } from 'express';

import emailController from './email/email.controller';

export default (app) => {
  app.get('/', (res, req) => {
    req.send('Welcome to the app');
  });

  app.use(json());
  app.use('/api/email', emailController);
};

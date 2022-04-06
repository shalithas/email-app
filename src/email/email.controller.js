import { Router } from 'express';
import { prepareEmailAddresses, validate } from './email.service';
import { send as sendMailGun } from './mailGun.service';
import { send as sendSendGrid } from './sendGrid.service';
import { error as _error } from '../helpers';

const router = Router();

router.get('/', (req, res) => {
  res.status(405).send({
    errorMessage: 'This is not a supported method.',
  });
});

router.post('/', async (req, res) => {
  const data = req.body;

  // preparing email lists
  data.to = prepareEmailAddresses(data.to);
  data.cc = prepareEmailAddresses(data.cc);
  data.bcc = prepareEmailAddresses(data.bcc);

  //validating
  const validation = validate(data);
  console.log(validation);
  if (!validation.isValid) {
    return res.status(500).send({
      errorMessage: validation.errors.join(', '),
    });
  }
  const { to, subject, text, cc, bcc } = data;

  try {
    await sendMailGun(to, subject, text, cc, bcc);
  } catch (error) {
    console.log('Mailgun service failed with error');
    _error.handleAxios(error);
    console.log('Retrying with SendGrid');
    try {
      await sendSendGrid(to, subject, text);
    } catch (error) {
      console.log('SendGrid service failed with error');
      _error.handleAxios(error);
      return res.status(500).send({
        errorMessage: 'Unable to send email',
      });
    }
  }

  res.send({
    message: 'Email sent successfully',
  });
});

export default router;

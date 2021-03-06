
# Welcome to EmailApp! 

This app provides you with the capability to send emails

## Features

- Send emails
- Supports multiple recipients
- Supports CC and BCC

## Simple installation

1. Clone the project
2. Within the project folder, run `npm install`
3. Make copy of .env-sample and rename it to .env
4. Update .env file to reflect your configuratations to MailGun and SendGrid services
5. Run `npm start`

### Development

To unable code watch, start the project with `npm run dev`.

### Testing

Run `npm run test` to run the unit tests.

## Usage

You can use postman to communicate with the app.

### Sending an email

Send a post request to {Domain}/api/email with following parameters

- to [Required]: Recipient email address the email to be sent. There could be multiple email addresses seperatted by commas.
- subject [Required]: Subject of the email
- text  [Required]: Text to be sent
- cc [Optional]:  Carbon copy recipient email address the email to be sent. There could be multiple email addresses seperatted by commas.
- bcc [Optional]:  Blind carbon copy recipient email address the email to be sent. There could be multiple email addresses seperatted by commas.

## TODO

- Complete unit test coverage
- Secure the app with Helmet
- Add Winston for better logging setup
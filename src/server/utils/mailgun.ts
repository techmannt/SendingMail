import * as mailgunLoader from 'mailgun-js';
import * as privateConfig from '../config/config';

const mailgun = mailgunLoader({
  apiKey: privateConfig.default.apiKey,
  domain: 'sandbox2c65e6f688ba4e18af9417e470e9ec63.mailgun.org'
});

export const sendEmail = (from: string, subject: string, text: string) => {

  const data = {
    from,
    to: privateConfig.default.toEmail,
    subject,
    text
  };

  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (err, body) => {
      if (err) {
        return err;
      } else {
        resolve({body, msg: 'Your email has been sent!'});
      }
    });
  });


};

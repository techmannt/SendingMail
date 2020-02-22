import * as express from 'express';
import { sendEmail } from '../utils/mailgun';

const router = express.Router();

router.post('/', async (req, res) => {
  const message = req.body;
  try {
    let result = await sendEmail(message.from, message.subject, message.text);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'You have an error!', error });
  }

});

export default router;

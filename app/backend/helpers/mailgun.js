import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'f379181e-e8c1-4dc4-a103-3f4d520d8eb9', 
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN || 'who.com', {
      from: `Your App <no-reply@${process.env.MAILGUN_DOMAIN || 'who.com'}>`, // ডোমেইনের সাথে মিল রেখে
      to: [to],
      subject,
      text,
      html,
      // অপশনাল হেডার্স (Service ID যোগ করতে চাইলে)
      headers: {
        'X-Mailgun-Server-ID': '15869726' // আপনার Server ID
      }
    });
    return msg;
  } catch (error) {
    console.error('Mailgun error:', error);
    throw error;
  }
};
import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILGUN_SMTP_HOST,
    port: parseInt(process.env.MAILGUN_SMTP_PORT),
    auth: {
      user: process.env.MAILGUN_SMTP_USER,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: `"Your App" <${process.env.MAILGUN_SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

    transporter.verify((error, success) => {
    if (error) {
      console.error('SMTP connection failed:', error);
    } else {
      console.log('SMTP server is ready to send emails');
    }
  });

  const link = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  console.log(`Verification Link: ${link}`);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click the link below to verify your email:</p>
          <a href="${link}">${link}</a>`,
  };

  await transporter.sendMail(mailOptions).catch((error) => {
    console.error('Error sending email:', error);
  }
  );
};

module.exports = sendVerificationEmail;

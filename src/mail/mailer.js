const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // service: 'Gmail', // You can use other services like SendGrid, Mailgun, etc.
    // auth: {
    //     user: 'your-email@gmail.com',
    //     pass: 'your-email-password'
    // }
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '52fed1bd91ffc8',
        pass: 'de22f6ba175a46'
    }
});

const sendInvitationEmail = (recipientEmail, invitationLink) => {
    const mailOptions = {
        from: 'fahim@gmail.com',
        to: recipientEmail,
        subject: 'Invitation to Signup',
        html: `<p>You have been invited to sign up. Click the link below to create your account:</p>
               <a href="${invitationLink}">Signup Link</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = { sendInvitationEmail };

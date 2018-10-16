'use strict';

const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const emailFromEnv = functions.config().gmail.user;
const passFromEnv = functions.config().gmail.pass;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailFromEnv,
        pass: passFromEnv,
    },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
    if(req.method === 'PUT') {
        return res.status(403).send('Forbidden');
    }

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    
    return cors(req, res, () => {
        sendEmail(name, email, message);
        return res.status(200).send({"message" : "Your message is sent."});
    });
});

async function sendEmail(name, email, message) {
    const mailOptions= {
        to: 'nyerckoma@gmail.com',
        text: `${name} from ${email} has sent a message to you: ${message}`,
        html: `
            <h2>Új üzeneted érkezett a DanielToos.com honlapról</h2>
            <p>Az üzenetet ${name} küldte a ${email} email címről.</p>
            <p>Az üzenet tartalma:</p><br/>
            <p>${message}</p>`,
        subject: 'New message from DanielToos.com',
    }
    await transporter.sendMail(mailOptions);
    return console.log('Message sent from ' + email);
}

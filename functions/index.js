'use strict';

const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tamas.kenessey@gmail.com',
        pass: 'QwertPse5',
    },
});

exports.sendMail = functions.https.onRequest((req, res) => {
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

exports.sendMailNew = functions.https.onRequest((req, res) => {
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
        to: 'tamas.kenessey@gmail.com',
        text: `${name} from ${email} has sent a message to you: 
        ${message}`,
        subject: 'New message from your DanielToos.com',
    }
    await transporter.sendMail(mailOptions);
    return console.log('Message sent to tamas.kenessey from ' + email);
}

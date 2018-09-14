const express = require('express');
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');


// const transporter = nodemailer.createTransport('smtps://username@gmail.com:password@smtp.gmail.com');

exports.sendMail = functions.https.onRequest((req, res) => {
    // if (req.method === `OPTIONS`) {
    //     res.set('Access-Control-Allow-Origin', "http://localhost:5000")
    //        .set('Access-Control-Allow-Methods', 'GET, POST')
    //        .status(200);
    //        return;
    // }
    if(req.method === 'PUT') {
        return res.status(403).send('Forbidden');
    }
    return cors(req, res, () => {
        res.status(200).send('Yay, it works');
    });
});
    // console.log('yay');
    // return res.send('yay');
    // const name = req.body.name;
    // const senderEmail = req.body.email;
    // const message = req.body.message;
    // const mailOptions= {
    //     from: `"${name}" <${senderEmail}>`,
    //     to: 'tamas.kenessey@gmail.com',
    //     text: message,
    // }
    // transporter.sendMail(mailOptions, function(err, res) {
    //     if (err) {
    //         res.status(500).send('Mail not sent');
    //     } else {
    //         res.status(200).send('Mail sent');
    //     }
    // });
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

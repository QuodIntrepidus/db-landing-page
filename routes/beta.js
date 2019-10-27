const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Load Models
require('../models/BetaTester');
require('../models/ReferrelCode');
const BetaTester = mongoose.model('betatesters');
const Referrel = mongoose.model('referel');

// Nodemailer Configuration
const auth = {
    type: 'oauth2',
    user: 'shimasu.beta@gmail.com',
    clientId: '72197361438-1s0saea8tjbgad27en5mhmq5gl5n2opo.apps.googleusercontent.com',
    clientSecret: 'H0gYWAC1GSPwsQkmq3_KCNFH',
    refreshToken: '1/K35hHSpo1xoYD3p3GqyifstKmsGQF5Ist-lWS7Ijrzw',
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: auth,
});

// Routes

router.get('/', (req, res) => {
    res.render('beta/beta', {
        title: "Shimasu | Beta"
    });

});

router.post('/join', (req, res) => {
    let errors = [];
    if(!req.body.firstname){
        errors.push({text: 'Please enter your first name.'})
    }
    if(!req.body.lastname){
        errors.push({text: 'Please enter your last name.'})
    }
    if(!req.body.email){
        errors.push({text: 'Please enter an email.'})
    }
    if(req.body.referralCode){
        // ken yu wurk hear?
      console.log(req.body.referralCode);
        Referrel.find({
                referredBy: req.body.referralCode
            }).populate('referredBy')
            .then(betatester => {
                console.log(betatester);
                if (betatester === null) {
                    errors.push({
                        text: 'Invalid Referral Code'
                    })
                    console.log(`1${betatester}`);
                    res.redirect('/join?error=' + string);
                }
            }).catch((err) => {
                let string = encodeURIComponent('Invalid Request');
                res.redirect('/join?error=' + string);
            });
    }

    if(errors.length > 0){
        res.render('beta/join', {
            errors: errors,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email
        });
    }
    else{
        
        //const referralCode = 'BETA' + Math.floor(Math.random(1000) * 10000);
        const referrelnew = new Referrel.referralCode();
        const newBetaTester = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            referralCode: referrelnew,
            referredBy: req.body.referralCode,
        }
        new BetaTester(newBetaTester)
            .save()
            .then(betatester => {
                let referralcode = betatester.referralCode;
                let mailOptions = {
                    from: '"Shimasu Beta 👋" <shimasu.beta@gmail.com>',
                    to: betatester.email,
                    subject: "You are signed up for Beta, 👌",
                    html: `
                    <p>Hey ${betatester.firstName},</p> <br>
                    <p>You have successfully signed up for the Beta program. You'll be notified once we are ready with Beta. <br>
                    Your referral code is <b>${referralcode}</b>. Ask your friends to signup with this referral code. More information on referral programs can be found <a href="https://shimasu.co/beta">here</a>. </p>
                    
                    <b> - Team Shimasu </b>
                    <br>
                    <small>Proudly made in India, Ireland and US</small>
                `
                }
                transporter.sendMail(mailOptions, (err, res) => {
                    if (err){
                       console.log('Not sent email')
                    }
                })
                let string = encodeURIComponent('You have been successfully registered.')
                res.redirect('/join?success=' + string)
            }).catch((err) => {
                let string = encodeURIComponent('Invalid Request');
                res.redirect('/join?error=' + string);
            });
    }
});

router.post('/forgotCode', (req, res) => {
    let errors = [];

    if(!req.body.forgotEmail){
        errors.push({text: "The email doesn't exist."})
    }
    if(errors.length > 0){
        res.render('beta/join', {
            errors: error,
            forgotEmail: req.body.forgotEmail
        });
    }
    else{
        BetaTester.findOne({
            email: req.body.forgotEmail
        })
        .then(betatester => {
            let mailOptions = {
                from: '"Shimasu Beta 👋" <shimasu.beta@gmail.com>',
                to: betatester.email,
                subject: "Your referral code, 👌",
                html: `
                <p>Hey ${betatester.firstName},</p> <br>
                <p>Your referral code is <b>${betatester.referralCode}</b>. <br>
                Ask your friends to signup with this referral code. More information on referral programs can be found <a href="https://shimasu.co/beta">here</a>. </p>
                
                <b> - Team Shimasu </b>
                <br>
                <small>Proudly made in India, Ireland and US</small>
            `
            }
            transporter.sendMail(mailOptions, (err, res) => {
                if (err){
                   console.log('Not sent email')
                }
            })
            let string = encodeURIComponent('Your code has been sent.');
            res.redirect('/join?success=' + string);
        })
        .catch((err) => {
            let string = encodeURIComponent('Email doesnt exist.');
            res.redirect('/join?error=' + string);
        })
    }
});
module.exports = router;
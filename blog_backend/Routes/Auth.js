
const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const errorHandler = require('../Middlewares/errorMiddleware');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhishek190800@gmail.com',
        pass: 'yftktcmtmrkmmfih',
    }
})

router.get('/test',async (req, res) => {
    res.json ({
        message: "Auth API is working"
    })
})

function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

router.post ('/sendotp', async (req,res) => {
    const { email } = req.body;
    const otp = Math.floor (100000 + Math.random() * 900000);
    try {
        const mailOptions = {
            from: process.env.COMPANY_EMAIL,
            to:email,
            send: 'OTP for verification of blog 3x',
            text: ` Your OTP for verification is ${otp}`
        }

        transporter.sendMail(mailOptions, async (err, info) => {
            if(err) {
                console.log(err);
                res.status(500).json(createResponse(false, err.message));
            }
            else {
                res.json(createResponse(true,'OTP sent successfully', { otp }));
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json(createResponse(false, err.message));
    }
})
router.post('/register',async (req, res, next) => {
    try {
        const { name, email, password} = req.body;
        const existingUser = await User.findOne({email: email});

        if(existingUser) {
            return res.status(409).json({ message: "User-Email already in Use"});
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json(createResponse( true, "User Successfully REGISTERED!"));
    }
    catch(err) {
        next(err);
    }
    
})

router.post('/login',async (req, res, next) => {

    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email});

        if (!user) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json (createResponse(false, 'Invalid credentials'));
        }

        const authToken = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '10m'});
        const refreshToken = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, { expiresIn: '1d'});

        res.cookie('authToken', authToken, { httpOnly: true});
        res.cookie('refreshToken', refreshToken, {httpOnly: true});

        res.status(200).json(createResponse(true, 'Login successful', {
            authToken,
            refreshToken
        }))
    }
    catch(err){
        next(err);
    }
})

router.use(errorHandler);

router.get('/checklogin', authTokenHandler, async (req,res) => {
    res.json({
        ok:true,
        message: 'User authenticated successfully'
    })
})

module.exports = router;


const express = require('express');
const router = express.Router();
const User = require ('../Models/UserSchema')

router.get('/test',async (req, res) => {
    res.json ({
        message: "Auth API is working"
    })
})

router.post('/register', async (req,res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email: email});
            if(existingUser) {
                return res.status(400).json({ message: 'Email already exists'});
            }
           const newUser = new user({
            name,
            password,
            email,
           })

           new newUser.save();

           res.status(201).json ({
            message: 'User registered Successfully'
           })
    }
    catch(err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router;

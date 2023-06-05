const express = require("express")
const User = require("../models/user");
const authRouter = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

authRouter.post('/api/signup', async (req, res) => {
    try {
        // gives us access to name email and passoword
    const {name, email, password} = req.body;

    // findOne is a promise that searches for an email that matches and if so it returns it 
    const existingUser = await User.findOne({ email });
    // if existingUser consists of anything then...
    if (existingUser) {
        // sets status error to 400 if use with the same email already exists
        return res.status(400).json({msg: 'User with the same email already exists!'});
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
        email,
        password: hashedPassword,
        name,
    })
    user = await user.save();
    res.json({user});

    // get the data from the client
    // post that data in database
    // return that data to the user 
    } catch (e) {
        res.status(500).json({error: e.message});
    }
    
});


// Sign In Route 
// 

authRouter.post('/api/signin', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({msg: 'User with this email does not exist!'});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({msg: 'Incorrect Password'});
        }

        const token = jwt.sign({id: user._id}, "PasswordKey");
        res.json({token, ...user._doc})

    } catch (e){
        res.status(500).json({error: e.message})
    }
});
module.exports = authRouter;
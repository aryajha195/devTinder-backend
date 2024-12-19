const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authUser = require("../middlewares/userAuth");

const profileRouter = express.Router();

//get logged user profile
profileRouter.get("/view", authUser, (req, res) => {
    try {
        const user = {
            name: req.user.firstName + " " + req.user.lastName,
            emailId: req.user.emailId,
            gender: req.user.gender,
            skills: req.user.skills,
            photoUrl: req.user.photoUrl
        }
        res.send(user)
    }
    catch(error) {
        res.status(400).send("Error: "+error.message)
    }
    
})

//update logged user
profileRouter.patch("/edit", authUser, async(req, res) => {
    const data = req.body;

    try {

        const updatedKeys = ['gender', 'photoUrl', 'skills'];

        const isValidUpdation =  Object.keys(data).every((val) => 
            updatedKeys.includes(val)
        )

        if(!isValidUpdation) {
            throw new Error('Invalid update')
        }

        const userId = req.user._id;

        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true
        })
        if(user) {
            res.send('User updated successfully.')
        }
        else{
            res.send('User not found.')
        }
    }
    catch(error) {
        res.status(400).send('Error: '+error)
    }
})

//update password
profileRouter.patch("/password", authUser, async(req, res) => {
    try {
        const userId = req.user._id;

        const { password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(userId, {password: hashedPassword}, {
            runValidators: true
        });

        if(!user) {
            throw new Error("password update unsuccessful");
        }
        res.send("password updated");

    }
    catch(error) {
        res.status(400).send("Error: "+error.message)
    }
})

module.exports = profileRouter;


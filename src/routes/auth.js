const express = require("express");
const bcrypt = require("bcrypt");
const { validateSignUp, validateLoginCredentials } = require("../utils/helper");
const User = require("../models/user");

const authRouter = express.Router();

//login user
authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
        //check credentials are of valid format
        validateLoginCredentials(emailId, password);

        //get user form db 
        let user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error('Invalid Credentials.')
        }

        //check password
        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            throw new Error('Invalid Credentials.')
        }

        if (user?.birthday) {
            const dob = new Date(user?.birthday ? user?.birthday : '')
            if (dob) {
                
                const yyyy = dob.getFullYear();
                const mm = String(dob.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                const dd = String(dob.getDate()).padStart(2, "0");
                // Format the date as YYYY-MM-DD
                const formattedDate = `${yyyy}-${mm}-${dd}`
                user.birthday = formattedDate
                
            }
        }
        //get Token and send to response
        const token = await user.generateToken()
        res.cookie("token", token)

        res.send(user)
    }
    catch (error) {
        res.clearCookie("token")
        res.status(400).send("Error: " + error.message)
    }


})

//signup user
authRouter.post("/signup", async (req, res) => {
    try {

        //validate req.body
        validateSignUp(req.body);

        const { firstName, lastName, emailId, password, skills, photoUrl, gender, about, age, birthday } = req.body;
        //generate hashed password
        const passwordHash = await bcrypt.hash(password, 10);

        //create new user instance
        const user = new User({
            firstName,
            lastName,
            emailId,
            skills,
            photoUrl,
            gender,
            about,
            birthday,
            age,
            password: passwordHash
        })


        await user.save();
        const token = await user.generateToken()
        res.cookie("token", token)
        res.json({
            'message': 'User Added Successfully',
            'user': user
        })
    }
    catch (err) {
        res.status(500).send('Error: ' + err.message)
    }

})

//logout user
authRouter.post("/logout", (req, res) => {
    try {
        res.clearCookie("token")
        res.send("Logged out successfuly")
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

module.exports = authRouter;
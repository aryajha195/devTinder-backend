const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authUser = require("../middlewares/userAuth");

const profileRouter = express.Router();

//get logged user profile
profileRouter.get("/view", authUser, (req, res) => {
    try {


        const user = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            emailId: req.user.emailId,
            gender: req.user.gender,
            skills: req.user.skills,
            photoUrl: req.user.photoUrl,
            age: req.user.age,
            // birthday: formattedDate,
            about: req.user.about,
        }
        // console.log(req.user?.birthday)
        if (req.user?.birthday) {
            const dob = new Date(req.user?.birthday ? req.user?.birthday : '')
            if (dob) {
                // console.log(dob)
                const yyyy = dob.getFullYear();
                const mm = String(dob.getMonth() + 1).padStart(2, "0"); // Months are 0-based
                const dd = String(dob.getDate()).padStart(2, "0");
                // Format the date as YYYY-MM-DD
                const formattedDate = `${yyyy}-${mm}-${dd}`
                user.birthday = formattedDate
            }
        }
        res.send(user)
    }
    catch (error) {
        res.status(400).send("Error: " + error.message)
    }

})

//update logged user
profileRouter.patch("/edit", authUser, async (req, res) => {
    const data = req.body;
    // console.log(data)

    try {

        const updatedKeys = ['gender', 'photoUrl', 'birthday', 'skills', 'about', 'age'];

        const isValidUpdation = Object.keys(data).every((val) =>
            updatedKeys.includes(val)
        )

        if (!isValidUpdation) {
            throw new Error('Invalid update')
        }

        const userId = req.user._id;
        // if(data.photoUrl === "")
        //     data.photoUrl = "https://geographyandyou.com/images/user-profile.png";

        const user = await User.findByIdAndUpdate(userId, data, {
            new: true,
            runValidators: true
        })
        if (user) {
            res.send({ data: user, message: 'User updated successfully.' })
        }
        else {
            res.send('User not found.')
        }
    }
    catch (error) {
        res.status(400).send('Error: ' + error)
    }
})

//update password
profileRouter.patch("/password", authUser, async (req, res) => {
    try {
        const userId = req.user._id;

        const { password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, {
            runValidators: true
        });

        if (!user) {
            throw new Error("password update unsuccessful");
        }
        res.send("password updated");

    }
    catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

module.exports = profileRouter;


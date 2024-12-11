const express = require('express');
const { connectDatabase } = require('./config/database');
const User = require('./models/user');

const app = express();

app.post("/signup", async(req, res) => {
    const user = new User({
        firstName: 'Archit',
        lastName: 'Jha',
        emailId: 'archit@dev.com',
        password: 'archit@123'
    });

    await user.save();
    res.send('User Added Successfully.')
})

connectDatabase()
    .then(() => {
        console.log("Database connected successfully.")
        app.listen(3000, () => {
            console.log("Server is successfully listening on port 3000...")
        });
    })
    .catch((error) => {
        console.log("Error: ", error)
    })

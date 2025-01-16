const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { connectDatabase } = require('./config/database');
const User = require('./models/user');
const { validateSignUp, validateLoginCredentials } = require("./utils/helper");
const authUser = require("./middlewares/userAuth");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}))
app.use(express.json())
app.use(cookieParser())


app.use("/profile", profileRouter);
app.use("/requests", requestRouter);
app.use("/user", userRouter)
app.use("/", authRouter);


//get all users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        if(users.length) {
            res.send('Users received successfully.')
        }
        else {
            res.status(404).send('User not found. ')
        }
       

    }
    catch(err) {
        console.log('Error: ', err)
        res.status(400).send('Some error occured')
    }
})

//get user by email
app.get("/user", async(req, res) => {
    const email = req.body.emailId;
    try {
        console.log(email)
        const user = await User.findOne({emailId: email})
        console.log(user)
        res.send(user)
    }
    catch(error) {
        console.log("Error: ", error);
        res.status(400).send("Error: "+error);
    }
})

//get user by id
app.get("/userId", async(req, res) => {
    try {
        const user = await User.findById(req.body.id);
        if(user)
         res.send(user)
        else
            res.status(404).send('User not found')
    }
    catch(error) {
        res.status(400).send("Error" + error)
    }
})

//delete user by id
app.delete("/user", async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.body.id)
        if(user)
            res.send("User deleted successfully.")
        else
            res.send("User not found.")
    }
    catch (error) {
        res.status(400).send("Error: " + error)
    }
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

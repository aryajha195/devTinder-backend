const express = require('express');
const bcrypt = require('bcrypt');
const { connectDatabase } = require('./config/database');
const User = require('./models/user');
const { validateSignUp, validateLoginCredentials } = require("./utils/helper");

const app = express();

app.use(express.json())

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

//add user to db
app.post("/signup", async (req, res) => {
    try {

        validateSignUp(req.body);

        const { firstName, lastName, emailId, password, skills, photoUrl, gender } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            skills,
            photoUrl,
            gender,
            password: passwordHash
        })

        await user.save();
        res.send('User Added Successfully.')
    }
    catch(err) {
        res.status(500).send('Error: '+err)
    }
    
})

//update user
app.patch("/user", async(req, res) => {
    const userId = req.params.id;
    const data = req.body;

    try {
        const updatedKeys = ['password', 'age', 'gender', 'photoUrl'];
        console.log(Object.keys(data))
        const isValidUpdation =  Object.keys(data).every((val) => 
            updatedKeys.includes(val)
        )

        console.log(isValidUpdation)

        if(isValidUpdation) {
            throw new Error('Invalid update')
        }
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: 'after',
            runValidators: true
        })
        if(user) {
            console.log(user)
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

//login user
app.post("/login", async(req, res) => {
    const { emailId, password } = req.body;
    try {
        validateLoginCredentials(emailId, password);
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error('Invalid Credentials.')
        }
        const isValidCredentials = await bcrypt.compare(password, user.password);
        if(!isValidCredentials) {
            throw new Error('Invalid Credentials.')
        }
        else{
            res.send('Login Successful')
        }
    }
    catch(error) {
        res.status(400).send("Error: "+error)
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

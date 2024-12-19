const express = require("express");
const User = require("../models/user");
const ConnectionUser = require("../models/connectionUser");
const authUser = require("../middlewares/userAuth");
const { set } = require("mongoose");

const userRouter = express.Router();
const USER_SAFE_DATA = ["firstName", "lastName", "skills", "photoUrl"];

userRouter.get("/requests", authUser, async(req, res) => {
    const loggedUser = req.user;

    try{
        const connectionRequests = await ConnectionUser.find(
            {
                toUserId: loggedUser._id,
                status: "interested"
            }
        ).populate("fromUserId", ["firstName", "lastName"]);

        res.json(connectionRequests)

    }
    catch(error) {
        res.status(400).send("Error: "+ error.message);
    }
})

userRouter.get("/connections", authUser, async(req, res) => {
    const loggedUser = req.user;

    try {
        const connections = await ConnectionUser.find({
            $or:[
                { fromUserId: loggedUser._id, status: "accepted"},
                { toUserId: loggedUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)

        const data = connections.map(obj => {
            if(obj.fromUserId._id.toString() === loggedUser._id.toString())
                return toUserId;
            return obj.fromUserId;
        })

        res.json(data)
    }
    catch(error) {
        res.status(400).send("Error: "+error.message)
    }
})

userRouter.get("/feed", authUser, async(req, res) => {
    const loggedUser = req.user;

    try{
        const oldRelations = await ConnectionUser.find({
            $or:[
                {toUserId: loggedUser._id},
                {fromUserId: loggedUser._id}
            ]
        }).select("fromUserId toUserId")

        

        const nonIncludingUsers = new Set();

        oldRelations.forEach(obj => {
            nonIncludingUsers.add(obj.toUserId.toString())
            nonIncludingUsers.add(obj.fromUserId.toString())
        })
        console.log(nonIncludingUsers)

        const userFeed = await User.find({
            _id: { $nin: Array.from(nonIncludingUsers)}
        })

        res.json(userFeed)

    }
    catch(error) {
        res.status(400).send("Error: "+error.message);
    }
})

module.exports = userRouter;
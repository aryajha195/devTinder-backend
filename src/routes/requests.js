const express = require("express");
const authUser = require("../middlewares/userAuth");
const User = require("../models/user");
const ConnectionUser = require("../models/connectionUser");

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", authUser, async (req, res) => {
    const fromUserId = req.user._id;
    let toUserId = req.params.toUserId;
    const status = req.params.status;

    try {
        const allowedStatus = ['interested', 'ignored']
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Request: "+status);
        }

        const toUser = await User.findById(toUserId);
        if(!toUser) {
            throw new Error("Requested User not found")
        }


        const existingConnection = await ConnectionUser.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(existingConnection) {
            throw new Error("Request already made")
        }


        const connection = new ConnectionUser ({
            fromUserId,
            toUserId,
            status
        })

        const connectedUser = await connection.save()
        if(status === 'interested'){
             res.send( req.user.firstName+"    is interested in "+toUser.firstName)
        }
        else {
            res.send( req.user.firstName+" ignored "+toUser.firstName)
        }

    }
    catch(error) {
        res.status(400).send("Error: "+ error.message)
    }
})

requestRouter.patch("/review/:status/:reqId", authUser, async(req, res) => {
    const reqId = req.params.reqId;
    const status = req.params.status;
    const loggedUser = req.user;

    try {
        const allowedStatus = ['accepted', 'rejected'];
        if(!allowedStatus.includes(status)){
            throw new Error('Invalid request: '+status);
        }


        const connection = await ConnectionUser.findById(reqId);

        if(!connection || connection.status !== 'interested' || !connection.toUserId.equals(loggedUser._id)){
            throw new Error('No request made');
        }

        connection.status = status;

        const data = await connection.save();



        // const connection = await ConnectionUser.findByIdAndUpdate(connectedValid._id, {status: status});

        res.json({
            message: "Request "+status,
            data: data
        })


    }
    catch(error) {
        res.status(400).send("Error: "+ error.message);
    }
})

module.exports = requestRouter;
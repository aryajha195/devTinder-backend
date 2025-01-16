const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token){
            res.status(401).send("Please log in");
            return;
        }
        const decodedId = await jwt.verify(token, "dev@Tinder790")

        const { _id } = decodedId;

        if (!_id)
            throw new Error("token invalid")

        const user = await User.findById(_id);

        if (!user)
            throw new Error("User not found");

        req.user = user

        next();
    }
    catch(error) {
        res.status(400).send("Error in Authentication User: "+error.message)
    }
}

module.exports = authUser;
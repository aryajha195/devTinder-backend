const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String,
        maxLength: 20
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            if(!validator.isEmail(value))
                throw new Error('Email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value))
                throw new Error('Weak Password')
        }
    },
    gender: {
        type: String,
        validate: (value)=>{
            if(!['male', 'female', 'others'].includes(value)){
                throw new Error('Gender value is not correct: '+value)
            }
        }
    },
    skills: {
        type: [String],
        maxLength: 10
    },
    photoUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw3XKSz8ke5YvSlOYpy_QJQK&ust=1734364080982000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiDyu-PqooDFQAAAAAdAAAAABAE"
    }
},
{ timestamps: true }
);

userSchema.methods.generateToken = function() {
    return jwt.sign({_id: this._id}, "dev@Tinder790", { expiresIn: '7d' })
}

userSchema.methods.comparePassword = async function(passwordFromInput) {
    return await bcrypt.compare(passwordFromInput, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports = User;
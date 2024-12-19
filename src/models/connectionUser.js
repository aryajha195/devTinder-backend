const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ['interested', 'ignored', 'accepted', 'rejected'],
        required: true
    }
},
{
    timestamps: true
});

connectionSchema.pre('save', function() {
    if(this.toUserId.equals(this.fromUserId)){
        throw new Error("Cant send request to yourself")
    }
})

const ConnectionUser = mongoose.model("ConnectionUser", connectionSchema);

module.exports = ConnectionUser;
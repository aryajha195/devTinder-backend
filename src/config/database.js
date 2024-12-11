const mongoose = require('mongoose');

const connectDatabase = async () => {
    await mongoose.connect(
        "mongodb+srv://aryajha:hlL1y2nHOgcCe8gI@namastenode.t90p6.mongodb.net/devTinder"
    );
};


module.exports = { connectDatabase }


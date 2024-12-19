const validator = require('validator');

function validateSignUp(req) {
    if(!req?.firstName || !req?.emailId || !req?.password) {
        throw new Error('FirstName, EmailId and Password is mandatory');
    }
    else if(!validator.isEmail(req?.emailId)){
        throw new Error('Email Id is not correct.');
    }
    else if(!validator.isStrongPassword(req.password)){
        throw new Error("Please enter a strong password.")
    }
    else if(req?.photoUrl && !validator.isURL(req.photoUrl)) {
        throw new Error("Photo is not valid.")
    }
};

function validateLoginCredentials(emailId, password) {
   
    if(!emailId || !password) {
        throw new Error('Please provide credentials to login.')
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error('Email is invalid.')
    }
}


module.exports = { validateSignUp, validateLoginCredentials };
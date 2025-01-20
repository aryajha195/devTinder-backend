const validator = require('validator');

function validateSignUp(req) {
    const dob = new Date(req?.birthday)
    if(!req?.firstName) {
        throw new Error('First Name is mandatory');
    }
    else if(!req?.emailId) {
        throw new Error('Email ID is mandatory')
    }
    else if(!req?.password) {
        throw new Error('Password is mandatory')
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
    else if(!validator.isDate(req?.birthday)){
        throw new Error("Date is not valid.")
    }
    else if(dob){
        if(dob > new Date())
            throw new Error("Date cannot be a future date")
        let yearsTillNow = new Date().getFullYear() - dob.getFullYear();
        if (yearsTillNow < 18) {
            throw new Error('Minimum age limit: 18');
        }
        else if (yearsTillNow > 100) {
            throw new Error('Maximum age limit: 100');
        }
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
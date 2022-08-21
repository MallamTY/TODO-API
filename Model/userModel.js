const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    firstname: {
        type: String,
        maxlength: [50, `First Name can't be more than 50 characters`],
        trim: true,
        required: true

    },

    lastname: {
        type: String,
        maxlength: [50, `Last Name can't be more than 50 characters`],
        trim: true,
        required: true

    },

    username: {
        type: String,
        maxlength: [50, `First Name can't be more than 50 characters`],
        trim: true,
        required: true,
        unique: true

    },

    email: {
        type: String,
        maxlength: [50, `Email can't be more than 50 characters`],
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        minlength: [8, `Password can not be less than 8 characters`],
        required: true,
        
    },

    confirmpassword: {
        type: String,
        minlength: [8, `Confirm password can not be less than 8 characters`],
        required: true,
        
    }
}, {timeseries: true})


module.exports = mongoose.model('User', userSchema)
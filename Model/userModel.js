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
        unique:true

    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    
    email: {
        type: String,
        maxlength: [50, `Email can't be more than 50 characters`],
        trim: true,
        required: true,
        unique: [true, `This phone number is already attached to an account`]
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
        
    },

    phoneOTP: {
        type: String
    },

    confirmedEmail: {
        type: Boolean,
        default: false
    }

}, {timestamps: true}
)
// userSchema.index({createdAt: 1},{expireAfterSeconds: 20})
// createdAt: { type: Date, expires: 20, default: Date.now }
// }


module.exports = mongoose.model('User', userSchema)
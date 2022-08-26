const mongoose = require('mongoose');


const schema = mongoose.Schema
const otpSchema = new schema({

    otp_id: {
        type: String,
        required: true
    },
    
    phoneOTP: {
        type: String,
         
     },
     expireAt: {
        type: Date  
    },

    isAuthenticated: {
        type: Boolean,
        default: false
    }

})  

//otpSchema.index({createdAt: 1},{expireAfterSeconds: 20})

//const Otp = 
module.exports = mongoose.model('OTP', otpSchema);

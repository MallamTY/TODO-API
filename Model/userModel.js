const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    firstName: {
        type: String,
        maxlength: [50, `First Name can't be more than 50 characters`],
        trim: true,
        required: true,
        

    }
})
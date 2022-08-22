const mongoose = require('mongoose')

const schema =  mongoose.Schema

const todoSchema = new schema({
    task_title: {
        type: String,
        trim: true,
        required: [true, `Task title can't be empty !!!!!!!`],
        maxlegth: [50, `Tast tittle can't be more than 50 characters !!!!!!!`]
    },
    status: {
        type: String,
        default: false,
        trim:true
    },

    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})


const Todo = mongoose.model('TODO', todoSchema)

module.exports = Todo
const express = require('express')
const Todo = require('../Model/todoModel')


const createTask = async(req, res) => {
    const {task_title, status} = req.body
    if(!task_title || !status) {
        return res.status(401).json('All fields must be filled')
    }

    try {
        const task = await Todo.create({task_title, status})
         if(!task) {
            return res.status(401).json('Operation not completed')
    }

        return res.status(200).json({
            status: 'Task successfully created',
            task
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed!!!!!!!!!!!!!!!!',
            error: error.message
        })   
    }
} 

module.exports = {
    createTask
   
}

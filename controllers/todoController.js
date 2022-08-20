const express = require('express')
const Todo = require('../Model/todoModel')
const mongoose = require('mongoose')
const { json } = require('express')


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

const getSingleTask = async(req, res) => {
    const {id} = req.params
    const idverifier = mongoose.Types.ObjectId.isValid(id)
    
    if(!idverifier) {
      return res.status(401).json( {error: 'Invalid id supplied !!!!!!!!!'})
    
    }
   
    try {
        
        const task = await Todo.findById(id)
        if (!task) {
            return  res.status(404).json({error: 'Task no found !!!!!!!!!!!!!!'})
        }

        res.status(200).json({
            status: 'Search Succesful !!!!!!!!!!!!!',
            task
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    createTask,
    getSingleTask,
    // getAllTask,
    // getUncompletedTask,
    // getCompletedTask,
    // updateTask,
    // deleteTas
   
}

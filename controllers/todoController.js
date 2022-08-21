const express = require('express')
const Todo = require('../Model/todoModel')
const mongoose = require('mongoose')
const { json } = require('express')


const createTask = async(req, res) => {
    const {task_title, status} = req.body

    if(!task_title || !status) {
        return res.status(403).json({error:'All fields must be filled'})
    }

    try {
            const task = await Todo.create({task_title, status})
            if(!task) {
                return res.status(400).json({error: 'Operation not completed'})
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
      return res.status(403).json( {error: 'Invalid id supplied !!!!!!!!!'} )
    
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

const getAllTask = async(req, res) => {
    try {

        const tasks = await Todo.find().select('-__v') //.select() here is used to prevent the version key (__v) field from being a returning filed
        if (!tasks) {
            return res.status(404).json({error: 'You currently have no task ..............'})
            
        }

        res.status(200).json({
            status: 'Search Succesful !!!!!!!!!!!!!',
            tasks
        })
    } catch (error) {

        res.status(500).json({
            message: 'Failed!!!!!!!!!!!!!!!!',
            error: error.message
        })
    }

}


const getUncompletedTask = async(req, res) => {
    
    const status = req.body.status
   
    try {
        
        const tasks = await Todo.find({status}).select('-__v')
        if (!tasks) {
            return  res.status(404).json({error: 'Task no found !!!!!!!!!!!!!!'})
        }

        res.status(200).json({
            status: 'Search Succesful !!!!!!!!!!!!!',
            tasks
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const getCompletedTask = async(req, res) => {
    
    const status = req.body.status
   
    try {
        
        const tasks = await Todo.find({status}).select('-__v')
        if (!tasks) {
            return  res.status(404).json({error: 'Task no found !!!!!!!!!!!!!!'})
        }

        res.status(200).json({
            status: 'Search Succesful !!!!!!!!!!!!!',
            tasks
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteTask = async(req, res) => {
    const {id} = req.params

    const idverifier = mongoose.Types.ObjectId.isValid(id)

    if(!idverifier) {
        return res.status(403).json( {error: 'Invalid id supplied !!!!!!!!!'} )
    }

    const task = await Todo.findOneAndDelete({_id: id})
    console.log(task);

    if (!task) {
        return res.status(403).json( {error: 'Data Not Found !!!!!!!!!'} )
    }

    res.status(200).json({
        status: 'Succesful deleted .....................',
        task
    })  
}

const updateTask = async(req, res) => {
    const {id} = req.params
    const {task_title, status} = req.body
    const idverifier = mongoose.Types.ObjectId.isValid(id)

    if(!idverifier) {
        return res.status(403).json( {error: 'Invalid id supplied !!!!!!!!!'} )
    }

    const task = await Todo.findByIdAndUpdate({_id:id}, {task_title, status}, {new: true, runValidators: true})
    
    if(!task) {
      
        return res.status(403).json({error: 'Unable to update data due to internal error'})
    }

    res.status(200).json({
        status: 'Data successfully updated .......................',
        task
    }) 
    
}




module.exports = {
    createTask,
    getSingleTask,
    getAllTask,
    getUncompletedTask,
    getCompletedTask,
    deleteTask,
    updateTask  
    
  
   
}


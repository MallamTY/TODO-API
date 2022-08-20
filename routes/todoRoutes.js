const mongoose = require('mongoose')
const express = require('express')
const { createTask, getSingleTask
        } = require('../controllers/todoController')

const router = express.Router()


router.post('/add-task', createTask)

router.route('/:id').get(getSingleTask)



module.exports = router
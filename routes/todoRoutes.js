const mongoose = require('mongoose')
const express = require('express')
const { createTask
        } = require('../controllers/todoController')

const router = express.Router()


router.post('/add-task', createTask)




module.exports = router
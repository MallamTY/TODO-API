const mongoose = require('mongoose')
const express = require('express')
const { createTask,
        getSingleTask,
        getAllTask
        } = require('../controllers/todoController')

const router = express.Router()


router.post('/add-task', createTask)

router.route('/:id').get(getSingleTask)
router.route('/').get(getAllTask)



module.exports = router
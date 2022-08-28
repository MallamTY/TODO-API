const mongoose = require('mongoose')
const express = require('express')
const { createTask,
        getSingleTask,
        getAllTask,
        getUncompletedTask,
        getCompletedTask,
        deleteTask,
        updateTask
        } = require('../controllers/todoController')
const {userAuthentication} = require('../middleware/userAuthentication')

const router = express.Router()

router.use(userAuthentication)


router.post('/add-task', createTask)

router.route('/:id').get(getSingleTask).delete(deleteTask).patch(updateTask)
router.route('/').get(getAllTask)
router.get('/find/uncompleted', getUncompletedTask)
router.get('/find/completed', getCompletedTask)



module.exports = router
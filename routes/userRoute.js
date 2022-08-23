const express = require('express')
const { userLogin, userSignup, verifyOTP } = require('../controllers/userController')
const router = express.Router()


router.post('/login', userLogin)

router.post('/verifyOTP', verifyOTP)

router.post('/signup', userSignup)


module.exports = router
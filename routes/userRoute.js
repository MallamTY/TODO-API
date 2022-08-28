const express = require('express')
const { userLogin, userSignup, verifyOTP, resendOTP } = require('../controllers/userController')
const router = express.Router()


router.post('/login', userLogin)

router.post('/verifyOTP', verifyOTP)

router.get('/resendotp/:id', resendOTP)

router.post('/signup', userSignup)


module.exports = router
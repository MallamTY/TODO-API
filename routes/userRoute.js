const express = require('express')
const { userLogin, userSignup, verifyOTP, resendOTP } = require('../controllers/userController')
const { emailTokenVerify } = require('../middleware/userAuthentication')
const router = express.Router()


router.post('/login', userLogin)

router.post('/verifyOTP', verifyOTP)

router.get('/resendotp/:id', resendOTP)

router.post('/signup', userSignup)

router.get('/confirmation/:token', emailTokenVerify)


module.exports = router
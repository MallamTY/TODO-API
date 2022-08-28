const express = require('express')
const { userLogin, userSignup, verifyOTP, resendOTP, resetPasswordLink, resetPassword } = require('../controllers/userController')
const { emailTokenVerify, passwordRecovery } = require('../middleware/userAuthentication')
const router = express.Router()

router.post('/login', userLogin)

router.post('/verifyOTP', verifyOTP)

router.get('/resendotp/:id', resendOTP)

router.post('/signup', userSignup)

router.get('/confirmation/:token', emailTokenVerify)

router.post('/forget-password', resetPasswordLink)

router.use(passwordRecovery)

router.post('/reset-passkey', resetPassword)




module.exports = router
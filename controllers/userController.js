const User = require('../Model/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const {generateOTP}  = require('../accessories/otpGenerator')
const { createToken } = require('../accessories/tokenGenerator')
const otpModel = require('../Model/otpModel')
const { timeAdder } = require('../accessories/timeAdder')
const { sendOTP } = require('../accessories/otpSender')
const { transporter, emailTokenSender, passwordRecoveryTokenSender, resetTransporter } = require('../accessories/emailSES')
const { PASSWORD_RECOVERY_SECRET } = require('../configuration/configuration')
const jwt = require('jsonwebtoken')




const userSignup = async (req, res) => {
    //firstname, lastname,  username, !username || !firstname || !lastname || firstname, lastname, username,
    const {firstname, lastname, username, email,password, confirmpassword, phone} = req.body
    if (!firstname, !lastname, !username, !email ||  !password || !confirmpassword || !phone) {
        return res.status(401).json('All field must be filled')
    }

    if (!validator.isEmail(email)){
        return res.status(401).json('Please supply a valid email address')
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(401).json('Strong password is required')
    }

    if (!validator.isStrongPassword(confirmpassword)) {
        return res.status(401).json('Strong password is required')
    }

    if (password != confirmpassword) {
        return res.status(401).json('password not match')
    }

    try {
        
        //const user = await User.findOne({email})
        const user = await User.findOne({$or:[{username}, {email}]})

        if (user) {
            return res.status(401).json('Username or Email already taken !!!!!!!!!!!!')
       
        }       
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const hashedconfirmPassword = await bcrypt.hash(confirmpassword, salt)
    
         const registeredUser = await User.create({firstname, lastname, username, 
                                                email, phone, password: hashedPassword, 
                                                confirmpassword: hashedconfirmPassword})
    
        if(!registeredUser) {
            res.status(401).json({
                error: 'Error creating your account, please try again later !!!!!!!'})
        }

        emailTokenSender(transporter, registeredUser.id, registeredUser.email)
        
        res.status(200).json({
            status: 'Awating Email verification',
            message:'Check your email for account account verification link........',
            })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
        

}


const userLogin = async (req, res) => {
    const {username, password, email} = req.body
    if (!(email || username) || !password) {
        return res.status(401).json('All fields are required !!!!!!!!!')
    }
    try {
        const now = new Date()
        const expireAt = timeAdder(now, 3)

        const user = await User.findOne({ $or: [ { username }, { email } ] })

    if(!user) {
        return res.status(401).json('Username or Password not match !!!!!!!!!!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){

        return res.status(401).json('Username or Password not match !!!!!!!!!!')
    }

    if(user.confirmedEmail == false) {
        return res.status(401).json({
            status: 'Login faled !!!!!!!!!',
            message: 'Please verify your email address'
        })
    }
    const genOTP = generateOTP(6);
    sendOTP(user.phone, genOTP)
    await otpModel.create({
                            phoneOTP: genOTP, 
                            otp_id: user.id,
                            expireAt
                        })
    await user.save()
    res.status(200).json({Message:'Your one time password has been sent to your mobile number........',
                                username, 
                                userid: user._id
                            })
    
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

    
}

const resendOTP = async (req, res, next) => {
    try {
        const {id} = req.params
        const now = new Date()
        const expireAt = timeAdder(now, 3)

        const genOTP = generateOTP(6);

        const user = await User.findById(id)
        await otpModel.findOneAndUpdate({
                                        otp_id: user.id}, 
                                        {phoneOTP: genOTP, 
                                        expireAt: expireAt
                                    })
        
        sendOTP(user.phone, genOTP)
        

        res.status(200).json({Message:'Your one time password has been sent to your mobile number........',
                                    username: user.username, 
                                    userid: user._id
                                })
        
    } 
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const resetPasswordLink = async (req, res, next) => {

            const {email} = req.body
            try {
            
            if(!email) {
                return res.status(401).json({
                    status: 'Failed',
                    message: `You must supply the email attached to your account`
                })
            }

            const user = await User.findOne({email})

            if(!user){
                return res.status(401).json({
                    status: 'Failed',
                    message: `You must supply the email attached to your account`
                })
            }
            
            passwordRecoveryTokenSender(resetTransporter, user.id, email)

  
                return res.status(200).json({
                    status: 'Successful ...........',
                    message: `Password rest link has been sent to ${email}`
                })
            
           


        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }


const resetPassword = async(req, res) => {
    try {
    
           const {_id, email} = jwt.verify(req.params.token, PASSWORD_RECOVERY_SECRET)
        console.log(_id, email);
        
        const {password, confirmpassword} = req.body

        if (!_id) {
        
            return res.status(401).json({
                status: 'Operation Unsuccesful !!!!!!!!!!!',
                message: `Invalida Token !!!!!!!!`
            })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(401).json('Strong password is required')
        }

        if (!validator.isStrongPassword(confirmpassword)) {
            return res.status(401).json('Strong password is required')
        }

        if (password != confirmpassword) {
            return res.status(401).json('password not match')
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const hashedconfirmPassword = await bcrypt.hash(confirmpassword, salt)

        const user = await User.findByIdAndUpdate({_id: _id}, {password: hashedPassword, confirmpassword: hashedconfirmPassword})

        
        return res.status(200).json({
            status: `Password Reset Successful .............`,
            message: `You have successfully reset your password .........`
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



const verifyOTP = async(req, res, next) => {
    try {
        var currentDate = new Date();
        const {OTP, userid} = req.body;

        const user = await User.findById(userid)
        if (!user) {
           return next(res.status(400).json({
                message: `User Not Found !!!!!!`
            }))
        }
    
        const dbOTP = await otpModel.findOne({otp_id: userid})
        
        
        
        var dates = {
            convert:function(date) {
                return (
                    date.constructor === Date ? date :
                    date.constructor === Array ? new Date(date[0],date[1],date[2]) :
                    date.constructor === Number ? new Date(date) :
                    date.constructor === String ? new Date(date) :
                    typeof date === "object" ? new Date(date.year,date.month,date.date) :
                    NaN
                );
            },
            compare:function(expireAt,currentTime) {
                return (
                    isFinite(expireAt=this.convert(expireAt).valueOf()) &&
                    isFinite(currentTime=this.convert(currentTime).valueOf()) ?
                    (expireAt>currentTime)-(expireAt<currentTime) :
                    NaN
                );
            }
        
        }

       if (dbOTP != null) {
            if (dbOTP.isAuthenticated != true) {

                if (dates.compare(dbOTP.expireAt, currentDate) == 1) {

                    if (OTP !== dbOTP.phoneOTP) {

                        return next(res.status(400).json({
                            status: 'one-time-password verification failed !!!!!',
                            message: 'Invalid one-time-password!!!!!!!!!!'
                        }))
                    }
                    else{  

                        dbOTP.isAuthenticated = true;
                        dbOTP.save()
                        const token = createToken(userid)

                        return next(res.status(200).json({
                            status: 'one-time-password verification successful ..............',
                            message: 'One-time-password accepted ........',
                            token
                            
                        }))
                    }
                }
                else{
                    return next(res.status(400).json({
                        status: 'one-time-password verification failed !!!!!',
                        message: 'One-time-password expired !!!!!!!!!!'
                    }))
                }
            }
            else {
                return next(res.status(400).json({
                    status: 'one-time-password verification failed !!!!!',
                    message: 'Bad request !!!!!!!!!!'
                }))
            }
                
        }
        else {
            return next(res.status(400).json({
                status: 'one-time-password verification failed !!!!!!!!!!!',
                message: 'Invalid one-time-password'
            }))
        }
    
    } catch (error) {
        next(res.status(500).json({
            error: error.message
        }))
    }
}




module.exports = {
    userSignup,
    userLogin,
    resendOTP, 
    verifyOTP,
    resetPasswordLink,
    resetPassword
}
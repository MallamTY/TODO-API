const User = require('../Model/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { createToken } = require('../accessories/tokenGenerator')


const userSignup = async (req, res) => {
    //firstname, lastname,  username, !username || !firstname || !lastname || firstname, lastname, username,
    const {firstname, lastname, username, email,password, confirmpassword} = req.body
    if (!firstname, !lastname, !username, !email ||  !password || !confirmpassword) {
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

    try {
        const user = await User.findOne({email})

        if (user) {
             return res.status(401).json('You already have an account !!!!!!!!!!!!!!!')
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const hashedconfirmPassword = await bcrypt.hash(confirmpassword, salt)
    
         const registeredUser = await User.create({firstname, lastname, username, 
                                                email, password: hashedPassword, 
                                                confirmpassword: hashedconfirmPassword})
    
        if(!registeredUser) {
            res.status(401).json({
                error: 'Error creating your account, please try again later !!!!!!!'})
        }
        
        res.status(200).json({
            status:'Account successfully created........',
            user: registeredUser})
    } catch (error) {
        res.status(500).json('Internal error encountered, please try again later !!!!!!!!!!')
    }

        

}
    

const userLogin = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(401).json('All fields are required !!!!!!!!!')
    }
    try {
        const user = await User.findOne({username})

    if(!user) {
        return res.status(401).json('Username or Password not match !!!!!!!!!!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        return res.status(401).json('Username or Password not match !!!!!!!!!!')
    }

    const token = createToken(user._id)
    res.status(200).json({status:'Log in successful........',
                                username, token})
    
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

    
}




module.exports = {
    userSignup,
    userLogin
}
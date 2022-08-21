const User = require('../Model/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')


const userSignup = async (req, res) => {
    const {firstname, lastname, email, username, password, confirmpassword} = req.body
    if (!firstname || !lastname || !email || !username || !password || !confirmpassword) {
        throw Error('All field must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error ('Please supply a valid email address')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error ('Strong password is required')
    }

    if (!validator.isStrongPassword(confirmpassword)) {
        throw Error ('Strong password is required')
    }

    try {
        const user = await User.findOne({email})

        if (user) {
            throw Error ('You already have an account !!!!!!!!!!!!!!!1')
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password)
        const hashedconfirmPassword = await bcrypt.hash(confirmpassword)
    
        const registeredUser = await User.create(firstname, lastname, email, username, hashedPassword, hashedconfirmPassword)
    
        if(!registeredUser) {
            res.status(401).json({
                error: 'Error creating your account, please try again later !!!!!!!'})
        }
    
        res.status(200).json({
                            status:'Account successfully created........',
                            user: registeredUser})
        
    } catch (error) {
        res.status(500).json({
            error: `Internal error occur, please try again later !!!!!!!!!`
        })
    }

}


const userLogin = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw Error ('All fields are required !!!!!!!!!')
    }
    try {
        const user = await User.findOne({username})

    if(!user) {
        throw Error ('Username or Password not match !!!!!!!!!!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error ('Username or Password not match !!!!!!!!!!')
    }

    res.status(200).json({status:'Account successfully created........',
    user})
    
    } catch (error) {
        res.status(500).json({
            error: `Internal error occur, please try again later !!!!!!!!!`
        })
    }

    
}



module.exports = {
    userSignup,
    userLogin
}
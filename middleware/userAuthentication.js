const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../configuration/configuration')



const userAuthentication = async(req, res, next) => {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json('Authorization token required !!!!!!!!!!')
    }

    const token = authorization.split(' ')[1]
    
    if(!token) {
       return res.status(401).json('Invalid token !!!!!!!!!!')
    }
    try {
        const{_id} = jwt.verify(token, SECRET)

        req.user = await User.findOne({_id}).select('_id')

        next()

    } catch (error) {
        res.status(500).json({error: error.message})
    }
//kbsvdsdvsjdcsdkskld
}

module.exports = userAuthentication
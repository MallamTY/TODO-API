const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const { SECRET, EMAIL_SECRET, PASSWORD_RECOVERY_SECRET } = require('../configuration/configuration')



const userAuthentication = async(req, res, next) => {
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json('Authorization token required !!!!!!!!!!')
    }

        //Spliting the header request holding the token
    const token = authorization.split(' ')[1]
    
    if(!token) {
       return res.status(401).json('Invalid token !!!!!!!!!!')
    }
    try {
        const{_id} = jwt.verify(token, SECRET)

        req.user = await User.findOne({_id}).select('id')

        next()

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

 const emailTokenVerify = async(req, res, next) => {
     try {
         const{_id} = jwt.verify(req.params.token, EMAIL_SECRET)

         const user = await User.findOneAndUpdate({_id}, {confirmedEmail: true})
        
           return res.status(200).json({
            status: 'Success ................',
            message: 'Your Email has been verified, please proceed to login',
            username: user.username

        })

     } catch (error) {
         res.status(500).json({error: error.message})
     }
 }

//  const passwordRecovery = (req, res, next) => {
     
//         const {_id} = jwt.verify(req.params.token, PASSWORD_RECOVERY_SECRET)
        
//         req.user = id

//         next()
  
//  }

module.exports = {
    userAuthentication,
    emailTokenVerify,
   // passwordRecovery

}
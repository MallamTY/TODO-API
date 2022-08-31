const jwt = require('jsonwebtoken')
const { EMAIL_SECRET } = require('../configuration/configuration')


exports.createToken = (_id) => {
    return token = jwt.sign({_id}, SECRET, {expiresIn: '2d'})
}

exports.createEmailToken = (_id) => {
    return emailToken = jwt.sign({_id}, EMAIL_SECRET, {expiresIn: '1d'})
}

exports.passwordRecoveryToken = (email, recoverySecrete) => {

    return passwordRecoveryToken = jwt.sign({email}, recoverySecrete, {expiresIn: '1h'})

}
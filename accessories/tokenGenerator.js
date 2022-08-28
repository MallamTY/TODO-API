const jwt = require('jsonwebtoken')
const { SECRET, EMAIL_SECRET, PASSWORD_RECOVERY_SECRET } = require('../configuration/configuration')


exports.createToken = (_id) => {
    return token = jwt.sign({_id}, SECRET, {expiresIn: '2d'})
}

exports.createEmailToken = (_id) => {
    return emailToken = jwt.sign({_id}, EMAIL_SECRET, {expiresIn: '1d'})
}

exports.passwordRecoveryToken = (_id, email) => {
    return passwordRecoveryToken = jwt.sign({_id, email}, PASSWORD_RECOVERY_SECRET, {expiresIn: '1h '})
}
const jwt = require('jsonwebtoken')
const { SECRET, EMAIL_SECRET } = require('../configuration/configuration')


exports.createToken = (_id) => {
    return token = jwt.sign({_id}, SECRET, {expiresIn: '2d'})
}

exports.createEmailToken = (_id) => {
    return emailToken = jwt.sign({_id}, EMAIL_SECRET, {expiresIn: '1d'})
}
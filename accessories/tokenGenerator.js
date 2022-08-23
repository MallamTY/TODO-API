const jwt = require('jsonwebtoken')
const { SECRET } = require('../configuration/configuration')


exports.createToken = (_id) => {
    return token = jwt.sign({_id}, SECRET, {expiresIn: '2h'})
}
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required()
})

async function checkUser(request, response, next) {
    const validation = userSchema.validate(request.body)
    if (validation.error) {
        response.status(400).json({ success: false, error: validation.error })
    } else {
        next()
    }
}

async function auth(request, response, next) {
    try {
        const token = request.headers.authorization.replace('Bearer ', '')
        const data = jwt.verify(token, 'a1b1c1')
        next()
    } catch (error) {
        response.status(498).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { checkUser, auth }

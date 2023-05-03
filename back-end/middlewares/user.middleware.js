const Joi = require('joi');

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

module.exports = { checkUser }

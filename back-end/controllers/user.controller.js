const jwt = require('jsonwebtoken')
const { addNewUser, login } = require('../models/user.model')

async function signUpCtrl(request, response) {
    try {
        const addedUser = await addNewUser(request.body)
        response.json({ success: true, message: 'User added successfully!', username: addedUser.username, id: addedUser.id })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

async function loginCtrl(request, response) {
    try {
        const user = await login(request.body)
        const token = jwt.sign({ id: user.id }, 'a1b1c1', {
            expiresIn: "24h" // 
        })
        response.json({ success: true, message: 'User logged in successfully!', username: user.username, id: user.id, token })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

async function verifyTokenCtrl(request, response) {
    const token = request.headers.authorization.replace('Bearer ', '')
    try {
        const data = jwt.verify(token, 'a1b1c1')
        response.json({ success: true, message: 'Token valid' })
    } catch (error) {
        response.status(498).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { signUpCtrl, loginCtrl, verifyTokenCtrl }

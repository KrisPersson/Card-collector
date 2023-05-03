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
        response.json({ success: true, message: 'User logged in successfully!', username: user.username, id: user.id })
    } catch (error) {
        response.json({ success: false, message: error.message })
    }
}

module.exports = { signUpCtrl, loginCtrl }

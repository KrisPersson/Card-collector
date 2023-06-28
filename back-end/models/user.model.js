const { db } = require('../database/database')
const { hashPassword, comparePassword } = require('../bcrypt')
const { v4: uuidv4 } = require('uuid')

async function addNewUser(input) {
    const { username, password } = input
    const hashedPassword = await hashPassword(password)
    const usernameAlreadyExists = await db.user.findOne({ username: username })
    if (usernameAlreadyExists) {
        throw new Error('Username already exists')
    }
    return await db.user.insert({ username, password: hashedPassword, id: uuidv4() })
}

async function login(input) {
    const { username, password } = input
    const userInDb = await db.user.findOne({ username })
    if (!userInDb) {
        throw new Error('Wrong username/password combination')
    }
    const correctPassword = await comparePassword(password, userInDb.password)
    if (!correctPassword) {
        throw new Error('Wrong username/password combination')
    }
    return { username: userInDb.username, id: userInDb.id }
}

async function findUserById(userId) {
    const userFound = await db.user.findOne({ id: userId })
    if (!userFound) {
        throw new Error('User ID not found')
    } else {
        return 
    }
}





module.exports = { addNewUser, login, findUserById }

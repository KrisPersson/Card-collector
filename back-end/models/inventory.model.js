const { db } = require('../database/database')
const { v4: uuidv4 } = require('uuid')


async function addNewCards(input, userId) {

    const docsToBeInserted = input.map(card => {
        return {
            ...card,
            id: uuidv4(),
            userId,
            createdAt: new Date()
        }
    })
    return await db.inventory.insertMany(docsToBeInserted)

}

module.exports = { addNewCards }

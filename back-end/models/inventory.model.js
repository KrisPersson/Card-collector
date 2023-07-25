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

async function getInventory(userId) {
    const result = await db.inventory.find({ userId })
    return result
}

async function editInventory(cardId, userId, updates) {
    const result = await db.inventory.update({ id: cardId, userId }, { $set: {...updates} })
    return result
}

async function deleteInventory(userId, cardId) {
    const result = await db.inventory.remove({ userId, id: cardId })
    return result
}

module.exports = { addNewCards, getInventory, editInventory, deleteInventory }

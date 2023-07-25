const { addNewCards, getInventory, editInventory, deleteInventory } = require('../models/inventory.model')
const { findUserById } = require('../models/user.model')


async function postInventoryCtrl(request, response) {
    try {
        const { userid } = request.headers
        await findUserById(userid)
        const addedNewCards = await addNewCards(request.body, userid)
        response.json({ success: true, addedNewCards })
    } catch (error) {
        response.status(500).json({ success: false, error: error.message })
    }
}

async function getInventoryCtrl(request, response) {
    try {
        const { userid } = request.headers
        const cards = await getInventory(userid)
        response.json({ success: true, cards })
        
    } catch (error) {
        response.status(500).json({ success: false, error: error.message })
    }
}

async function editInventoryCtrl(request, response) {
    try {
        const { userid } = request.headers
        const { cardId, updates } = request.body
        const result = await editInventory(cardId, userid, updates)
        response.json({ success: true, result })
        
    } catch (error) {
        response.status(500).json({ success: false, error: error.message })
    }
}

async function deleteInventoryCtrl(request, response) {
    try {
        const { userid } = request.headers
        const { cardId } = request.body
        const result = await deleteInventory(userid, cardId)
        response.json({ success: true, result })
        
    } catch (error) {
        response.status(500).json({ success: false, error: error.message })
    }
}


module.exports = { postInventoryCtrl, getInventoryCtrl, editInventoryCtrl, deleteInventoryCtrl }

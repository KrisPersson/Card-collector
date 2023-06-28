const { addNewCards } = require('../models/inventory.model')
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


module.exports = { postInventoryCtrl }

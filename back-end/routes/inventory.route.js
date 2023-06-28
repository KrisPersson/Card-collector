const { Router } = require('express')
const router = Router()

const { auth } = require('../middlewares/user.middleware')
const { checkPostInventory } = require('../middlewares/inventory.middleware')
const { postInventoryCtrl } = require('../controllers/inventory.controller')

router.post('/', checkPostInventory, auth, postInventoryCtrl)



module.exports = {  inventoryRouter: router }

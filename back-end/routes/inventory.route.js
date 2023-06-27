const { Router } = require('express')
const router = Router()

const { checkPostInventory } = require('../middlewares/inventory.middleware')
const { postInventoryCtrl } = require('../controllers/inventory.controller')

router.post('/inventory', checkPostInventory, postInventoryCtrl)



module.exports = {  inventoryRouter: router }

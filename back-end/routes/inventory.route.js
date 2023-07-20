const { Router } = require('express')
const router = Router()

const { auth } = require('../middlewares/user.middleware')
const { checkPostInventory, checkEditInventory } = require('../middlewares/inventory.middleware')
const { postInventoryCtrl, getInventoryCtrl, editInventoryCtrl } = require('../controllers/inventory.controller')

router.post('/', checkPostInventory, auth, postInventoryCtrl)
router.get('/', auth, getInventoryCtrl)
router.put('/', checkEditInventory, auth, editInventoryCtrl)


module.exports = {  inventoryRouter: router }

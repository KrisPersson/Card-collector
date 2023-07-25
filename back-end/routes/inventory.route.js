const { Router } = require('express')
const router = Router()

const { auth } = require('../middlewares/user.middleware')
const { checkPostInventory, checkEditInventory, checkDeleteInventory } = require('../middlewares/inventory.middleware')
const { postInventoryCtrl, getInventoryCtrl, editInventoryCtrl, deleteInventoryCtrl } = require('../controllers/inventory.controller')

router.post('/', checkPostInventory, auth, postInventoryCtrl)
router.get('/', auth, getInventoryCtrl)
router.put('/', checkEditInventory, auth, editInventoryCtrl)
router.delete('/', checkDeleteInventory, auth, deleteInventoryCtrl)


module.exports = {  inventoryRouter: router }

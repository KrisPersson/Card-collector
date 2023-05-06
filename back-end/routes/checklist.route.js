const { Router } = require('express')
const router = Router()

const { getSpecificChecklistCtrl, createNewChecklistCtrl, getChecklistByIdCtrl, updateChecklistCtrl, deleteChecklistCtrl } = require('../controllers/checklist.controller')
const { checkGetSpecificChecklist, checkCreateNewChecklist, checkGetChecklistById, checkUpdateChecklist, checkDeleteChecklist } = require('../middlewares/checklists.middleware')
const { auth } = require('../middlewares/user.middleware')

router.get('/specific', checkGetSpecificChecklist, getSpecificChecklistCtrl)
router.get('/', checkGetChecklistById, auth, getChecklistByIdCtrl)
router.post('/', checkCreateNewChecklist, auth, createNewChecklistCtrl)
router.put('/', checkUpdateChecklist, auth, updateChecklistCtrl)
router.delete('/', checkDeleteChecklist, auth, deleteChecklistCtrl)

module.exports = {  checklistRouter: router }

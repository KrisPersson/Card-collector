const { Router } = require('express')
const router = Router()

const { getSpecificChecklistCtrl, createNewChecklistCtrl, getChecklistByIdCtrl, updateChecklistCtrl, deleteChecklistCtrl } = require('../controllers/checklist.controller')
const { checkGetSpecificChecklist, checkCreateNewChecklist, checkGetChecklistById, checkUpdateChecklist, checkDeleteChecklist } = require('../middlewares/checklists.middleware')

router.get('/specific', checkGetSpecificChecklist, getSpecificChecklistCtrl)
router.get('/', checkGetChecklistById, getChecklistByIdCtrl)
router.post('/', checkCreateNewChecklist, createNewChecklistCtrl)
router.put('/', checkUpdateChecklist, updateChecklistCtrl)
router.delete('/', checkDeleteChecklist, deleteChecklistCtrl)




module.exports = {  checklistRouter: router }

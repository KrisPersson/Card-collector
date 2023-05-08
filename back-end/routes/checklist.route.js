const { Router } = require('express')
const router = Router()

const { getSpecificChecklistCtrl, createNewChecklistCtrl, getChecklistByIdCtrl, updateChecklistCtrl, deleteChecklistCtrl, getChecklistCollectionCtrl } = require('../controllers/checklist.controller')
const { checkGetSpecificChecklist, checkCreateNewChecklist, checkGetChecklistById, checkUpdateChecklist, checkDeleteChecklist, checkGetChecklistCollection } = require('../middlewares/checklists.middleware')
const { auth } = require('../middlewares/user.middleware')

router.get('/specific', checkGetSpecificChecklist, getSpecificChecklistCtrl)
router.get('/', checkGetChecklistById, auth, getChecklistByIdCtrl)
router.post('/', checkCreateNewChecklist, auth, createNewChecklistCtrl)
router.put('/', checkUpdateChecklist, auth, updateChecklistCtrl)
router.delete('/', checkDeleteChecklist, auth, deleteChecklistCtrl)

router.get('/collection', checkGetChecklistCollection, auth, getChecklistCollectionCtrl)


module.exports = {  checklistRouter: router }

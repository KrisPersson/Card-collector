const { getSpecificChecklist, createNewChecklist, getChecklistById, updateChecklist, deleteChecklist } = require('../models/checklist.model')

async function getSpecificChecklistCtrl(request, response) {
    try {
        const { headers } = request
        const input = { userId: headers.userid, company: headers.company, season: headers.season, product: headers.product, setName: headers.setname }
        const checklistFromDb = await getSpecificChecklist(input)
        response.json({ success: true, checklist: checklistFromDb.personalChecklist })
    } catch (error) {
        response.status(404).json({ success: false, message: error.message })
    }
}

async function getChecklistByIdCtrl(request, response) {
    try {
        const { headers } = request
        const checklist = await getChecklistById(headers.id)
        response.json({ success: true, checklist: checklist.personalChecklist })
    } catch (error) {
        response.status(404).json({ success: false, message: error.message })
    }
}

async function createNewChecklistCtrl(request, response) {
    try {
        const { body } = request
        const input = { userId: body.userId, company: body.company, season: body.season, product: body.product, setName: body.setName }
        const addedChecklist = await createNewChecklist(input)
        response.json({ success: true, message: 'New checklist created', newChecklistId: addedChecklist.id })
    } catch (error) {
        response.status(400).json({ success: false, message: error.message })
    }
}

async function updateChecklistCtrl(request, response) {
    try {
        await updateChecklist(request.body)
        const updatedChecklist = await getChecklistById(request.body.checklistId)
        response.json({ success: true, message: 'Checklist updated successfully', updatedChecklist: updatedChecklist.personalChecklist })
    } catch (error) {
        response.status(404).json({ success: false, message: error.message })
    }
}

async function deleteChecklistCtrl(request, response) {
    try {
        await deleteChecklist(request.body)
        response.json({ success: true, message: 'Successfully deleted checklist' })
    } catch (error) {
        response.status(404).json({ success: false, message: error.message })
    }
}

module.exports = { getSpecificChecklistCtrl, createNewChecklistCtrl, getChecklistByIdCtrl, updateChecklistCtrl, deleteChecklistCtrl }

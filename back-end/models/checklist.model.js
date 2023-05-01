const { db } = require('../database/database')
const { v4: uuidv4 } = require('uuid');


async function getSpecificChecklist(input) {
    const { userId, company, season, setName } = input
    const foundChecklist = await db.checklist.findOne({ userId, company, season, setName})
    if (foundChecklist) {
        return foundChecklist
    } else {
        throw new Error('Checklist not found')
    }
}

async function getChecklistById(id) {
    const checklistInDb =  await db.checklist.findOne({ id })
    if (!checklistInDb) {
        throw new Error('Checklist not found')
    }
    return checklistInDb
}

async function createNewChecklist(input) {
    const { userId, company, season, product, setName } = input
    return await db.checklist.insert({ userId, company, season, product, setName, personalChecklist: [], id: uuidv4() })
}

async function updateChecklist(input) {
    const updatedChecklist = await db.checklist.update({ id: input.checklistId }, { $set: { personalChecklist: [...input.updatedChecklist] } })
    if (updatedChecklist == 1) {
        return updatedChecklist
    } else {
        throw new Error('Could not update checklist - checklist ID might not exist, or internal server error')
    }
}

async function deleteChecklist(input) {
    const deletedChecklist = await db.checklist.remove({ id: input.checklistId })
    if (deletedChecklist == 1) {
        return deletedChecklist
    } else {
        throw new Error('Could not delete checklist - checklist ID might not exist, or internal server error')
    }}

module.exports = { getSpecificChecklist, createNewChecklist, getChecklistById, updateChecklist, deleteChecklist }

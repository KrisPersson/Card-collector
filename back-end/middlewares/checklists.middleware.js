const Joi = require('joi');

const specificChecklistSchema = Joi.object({
    userid: Joi.string()
        .min(20)
        .max(40)
        .required(),
    company: Joi.string()
        .min(3)
        .max(30)
        .required(),
    season: Joi.string()
        .min(3)
        .max(30)
        .required(),
    product: Joi.string()
        .min(3)
        .max(30)
        .required(),
    setname: Joi.string()
        .min(3)
        .max(30)
        .required(),
})

const createNewChecklistSchema = Joi.object({
    userId: Joi.string()
        .min(20)
        .max(40)
        .required(),
    company: Joi.string()
        .min(3)
        .max(30)
        .required(),
    season: Joi.string()
        .min(3)
        .max(30)
        .required(),
    product: Joi.string()
        .min(3)
        .max(30)
        .required(),
    setName: Joi.string()
        .min(3)
        .max(30)
        .required(),
})

const getChecklistByIdSchema = Joi.string().min(10).required()

const getChecklistCollectionSchema = Joi.string().min(10).required()

const updateChecklistSchema = Joi.object({
    checklistId: Joi.string()
        .min(10)
        .required(),
    updatedChecklist: Joi.array().items(Joi.number())
})

const deleteChecklistSchema = Joi.object({
    checklistId: Joi.string()
        .min(10)
        .required()
})


async function checkGetSpecificChecklist(request, response, next) {
    try {
        const { userid, company, season, product, setname } = request.headers
        const input = { userid, company, season, product, setname }
        const validation = specificChecklistSchema.validate(input)
        if (!validation.error) {
            next()
        } else {
            response.status(400).json({ success: false, error: validation.error })
        }
    } catch (error) {
        response.status(400).json({ success: false, message: error.message })
    }
}

async function checkGetChecklistById(request, response, next) {
    try {
        const { id } = request.headers
        const validation = getChecklistByIdSchema.validate(id)
        if (!validation.error) {
            next()
        } else {
            response.status(400).json({ success: false, error: validation.error })
        }
    } catch (error) {
        response.status(400).json({ success: false, message: error.message })
    }
}

async function checkCreateNewChecklist(request, response, next) {
    try {
        const { userId, company, season, product, setName } = request.body
        const input = { userId, company, season, product, setName }
       
        const validation =  createNewChecklistSchema.validate(input)
        console.log(validation)
        if (!validation.error) {
            next()
        } else {
            response.status(400).json({ success: false, error: validation.error })
        }
    } catch (error) {
        response.status(400).json({ success: false, message: error.message })
    }
}

async function checkUpdateChecklist(request, response, next) {
    const validation = updateChecklistSchema.validate(request.body)
    if (!validation.error) {
        next()
    } else {
        response.status(400).json({ success: false, error: validation.error })
    }
}

async function checkDeleteChecklist(request, response, next) {
    const validation = deleteChecklistSchema.validate(request.body)
    if (!validation.error) {
        next()
    } else {
        response.status(400).json({ success: false, error: validation.error })
    }
}

async function checkGetChecklistCollection(request, response, next) {
    try {
        const { userid } = request.headers
        const validation = getChecklistCollectionSchema.validate(userid)
        if (!validation.error) {
            next()
        } else {
            response.status(400).json({ success: false, error: validation.error })
        }
    } catch (error) {
        response.status(400).json({ success: false, message: error.message })
    }
}




module.exports = { checkGetSpecificChecklist, checkCreateNewChecklist, checkGetChecklistById, checkUpdateChecklist, checkDeleteChecklist, checkGetChecklistCollection }

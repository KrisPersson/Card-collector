const Joi = require('joi');

const postInventoryBodySchema = Joi.array().items(
    Joi.object({
        cardTempId: Joi.number(),
        players: Joi.array().items(Joi.object({
            firstname: Joi.string(), 
            lastname: Joi.string(), 
            teamname: Joi.string(),
            role: Joi.string(),
            tempId: Joi.number()
        })
        ),
        manufacturer: Joi.string(),
        season: Joi.string(),
        product: Joi.string(),
        setName: Joi.string(),
        setType: Joi.string(),
        grade: Joi.string().min(0),
        grader: Joi.string().min(0),
        competition: Joi.string(),
        clNum: Joi.string().min(0),
        location: Joi.string().min(0),
        serial: Joi.string().min(0),
        numberedTo: Joi.string().min(0),
        origin: Joi.string().min(0),
        rookie: Joi.boolean(),
        autograph: Joi.boolean(),
        memorabilia: Joi.boolean(),
        jerseyNumMatch: Joi.boolean(),
        colorMatch: Joi.boolean(),
        printingError: Joi.boolean(),
        checklistCard: Joi.boolean(),
        stickerCard: Joi.boolean(),
        promoCard: Joi.boolean(),
        firstOwner: Joi.boolean(),
        pc: Joi.boolean(),
        comment: Joi.string().min(0),
        copies: Joi.number().min(1),
        price: Joi.number()
    }).required()
)

async function checkPostInventory(request, response, next) {
    const { body, headers } = request
    const validation = postInventoryBodySchema.validate(body)
    if (!validation.error && headers.userid && typeof headers.userid === 'string') {
        next()
    } else {
        response.status(400).json({ success: false, error: validation.error })
    }
}


module.exports = { checkPostInventory }

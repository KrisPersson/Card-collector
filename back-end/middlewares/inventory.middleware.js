const Joi = require('joi');

const postInventoryBodySchema = Joi.array().items(
    Joi.object({
        players: Joi.array().items(Joi.object({
            firstname: Joi.string(), 
            lastname: Joi.string(), 
            teamname: Joi.string()
        })
        ),
        manufacturer: Joi.string(),
        season: Joi.string(),
        product: Joi.string(),
        setName: Joi.string(),
        setType: Joi.string(),
        numberedTo: Joi.string().min(0),
        rookie: Joi.boolean(),
        autograph: Joi.boolean(),
        memorabilia: Joi.boolean(),
        jerseyNumMatch: Joi.boolean(),
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

const nedb = require('nedb-promises')
const db = {
    checklist: new nedb({ filename: 'checklist.db', autoload: true}),
    inventory: new nedb({ filename: 'inventory.db', autoload: true}),
    user: new nedb({ filename: 'user.db', autoload: true})
}

module.exports = { db }

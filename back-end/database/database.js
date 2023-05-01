const nedb = require('nedb-promises')
const db = {
    checklist: new nedb({ filename: 'checklist.db', autoload: true})
}

module.exports = { db }

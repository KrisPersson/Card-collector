const { Router } = require('express')
const router = Router()

const { checkUser } = require('../middlewares/user.middleware')
const { signUpCtrl, loginCtrl } = require('../controllers/user.controller')

router.post('/signup', checkUser, signUpCtrl)
router.post('/login', checkUser, loginCtrl)


module.exports = {  userRouter: router }

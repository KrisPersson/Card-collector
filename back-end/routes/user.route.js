const { Router } = require('express')
const router = Router()

const { checkUser } = require('../middlewares/user.middleware')
const { signUpCtrl, loginCtrl, verifyTokenCtrl } = require('../controllers/user.controller')

router.post('/signup', checkUser, signUpCtrl)
router.post('/login', checkUser, loginCtrl)
router.get('/verify', verifyTokenCtrl)


module.exports = {  userRouter: router }

﻿const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)
router.get('/:id',userController.getOneUser)
router.get('/',authMiddleware,userController.getCountRegDates)


module.exports = router
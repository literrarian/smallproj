const Router = require('express')
const router = new Router()
const gameController = require('../controller/gameController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), gameController.create)
router.get('/', gameController.getAll)
router.get('/:id', gameController.getOne)
module.exports = router
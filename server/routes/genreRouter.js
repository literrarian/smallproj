const Router = require('express')
const router = new Router()
const genreController = require('../controller/genreController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), genreController.create)
router.get('/', genreController.getAll)
router.get('/stat', genreController.getGenreCount)
router.get('/:id',checkRole('ADMIN'), genreController.getOne)
router.put('/:id',checkRole('ADMIN'),genreController.update)

module.exports = router
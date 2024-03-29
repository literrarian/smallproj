const Router = require('express')
const router = new Router()
const meetingController = require('../controller/meetingController')

router.post('/',meetingController.create)
router.get('/',meetingController.getAll)
router.get('/:id',meetingController.getOne)
router.put('/:id',meetingController.update)
router.delete('/:id',meetingController.remove)

module.exports = router
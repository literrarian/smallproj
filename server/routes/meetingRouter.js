const Router = require('express')
const router = new Router()
const meetingController = require('../controller/meetingController')
const meetingAlteringRestriction = require('../middleware/meetingAlteringRestrictionMiddleware')

router.post('/',meetingController.create)
router.get('/',meetingController.getAll)
router.get('/:id',meetingController.getOne)
router.put('/:id',meetingAlteringRestriction,meetingController.update)
router.delete('/:id',meetingAlteringRestriction,meetingController.remove)

module.exports = router
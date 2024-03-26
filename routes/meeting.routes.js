const Router = require('express')
const router = new Router()
const meetingController = require('../controller/meeting.controller')

router.post('/meeting',meetingController.createMeeting)
router.get('/meeting',meetingController.getMeetingsByUser)


//router.put('/user',userController.updateUser)
//router.delete('/user/:id',userController.deleteUser)

module.exports = router
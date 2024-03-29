const Router = require('express')
const router = new Router()
const gameRouter = require('./gameRouter')
const genreRouter = require('./genreRouter')
const meetingRouter = require('./meetingRouter')
const userRouter = require('./userRouter')

router.use('/user',userRouter)
router.use('/meeting', meetingRouter)
router.use('/game', gameRouter)
router.use('/genre', genreRouter)

module.exports = router
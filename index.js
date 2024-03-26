const express = require('express')
const userRouter = require('./routes/user.routes')
const meetingRouter = require('./routes/meeting.routes')
const PORT = process.env.PORT || 8080

const app = express()
app.get('/',(req,res)=>{
    res.status(200).json('работает')
})
app.use(express.json())
app.use('/api', userRouter) //адрес, по которому отрабатывает роутер
app.use('/api', meetingRouter)
app.listen(PORT, () => console.log(`PORT: ${PORT}`))
require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors') 
const morgan = require('morgan')
const PORT = process.env.PORT || 8080
const router = require('./routes/baseRouter')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(morgan('combined'));

//обработка ошибок
app.use(errorHandler)


const start = async()=> {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`PORT: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

//
//app.use('/api', userRouter) //адрес, по которому отрабатывает роутер
//app.use('/api', meetingRouter)
start()
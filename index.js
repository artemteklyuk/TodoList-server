import {config} from 'dotenv'
import express from "express"
import sequelize from './db.js'
import './models/models.js'
import router from "./routes/index.js";
import "./middleware/cors.middleware.js"
import errorHandler from './middleware/ErrorHandlingMiddleware.js'

import cors from 'cors'

config()
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()
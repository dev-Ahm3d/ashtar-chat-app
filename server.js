require('dotenv').config()
const cluster = require('cluster')
const os = require('os')
const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const globalError = require('./middlewares/errorMiddleware')
const applicationRouter = require('./routes/application.router')
const chatRouter = require('./routes/chat.router')
const messageRouter = require('./routes/message.router')
const { dbConnect } = require('./config/database')
const ApiError = require('./utils/apiError')

// relations
require('./models/relations')

// db connection
dbConnect()

// middlewares
app.use(cors())
app.use(express.json())



// routers
app.use('/api', [applicationRouter, chatRouter, messageRouter])

// not found route
app.all('*', (req, res, next) => {
    next(new ApiError("can't find this route !!", 404))
})

// global error handling middleware by express
app.use(globalError)


// cluster
if (cluster.isMaster) {
    const numWorkers = os.cpus().length
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }
    cluster.on('exit', () => {
        cluster.fork()
    })
} else {
  // run the server
    const port = process.env.PORT
    server.listen(port, () => console.log(`Server is running on port ${port}`))
    // handling rejections out of express
    process.on('unhandledRejection', (err) => {
        // console.log(err)
        // console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`)
        server.close(() => {
            console.error('Shutting down ..')
            process.exit(1)
        })
    })
}
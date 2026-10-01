import cors from 'cors'
import express from 'express'
import { errorHandler } from './middleware/errorHandler.js'
import { notFound } from './middleware/notFound.js'
import { apiRouter } from './routes/index.js'

export function createApp() {
    const app = express()

    app.use(cors())
    app.use(express.json())

    app.get('/', (_req, res) => {
        res.json({
            name: 'desktop-backend',
            status: 'ok'
        })
    })

    app.use('/api', apiRouter)

    app.use(notFound)
    app.use(errorHandler)

    return app
}

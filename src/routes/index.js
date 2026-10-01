import { Router } from 'express'
import { authRouter } from './auth.js'
import { configRouter } from './health.js'
import { usersRouter } from './users.js'

export const apiRouter = Router()

apiRouter.get('/', (_req, res) => {
    res.json({
        message: 'API is running',
        version: '1.0.0'
    })
})

apiRouter.use('/config', configRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/users', usersRouter)

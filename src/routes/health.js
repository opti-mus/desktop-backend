import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { configStore } from '../store/configs.ts'

export const configRouter = Router()

configRouter.use(requireAuth)

configRouter.post('/create', (req, res, next) => {
    try {
        const isExist = configStore.findConfigByID(req.body?.id)
        console.log('@user', req.user)

        if (isExist) {
            res.status(400).json({ error: 'Config already exists' })
            return
        }

        const newConfig = configStore.createConfig(req.user.id, req.body)
        res.json({
            data: newConfig
        })
    } catch (error) {
        next(error)
    }
})
configRouter.put('/update', (req, res, next) => {
    try {
        const { id, data } = req.body

        if (!configStore.findConfigByID(String(id))) {
            res.status(404).json({ error: 'Config not found' })
            return
        }
        configStore.updateConfig(req.body)

        res.json({
            data: true
        })
    } catch (error) {
        next(error)
    }
})
configRouter.get('/', (req, res, next) => {
    try {
        const config = configStore.findConfigByUserId(Number(req.user.id))

        if (!config) {
            res.status(404).json({ error: 'Config not found' })
            return
        }

        res.json({
            data: config
        })
    } catch (error) {
        next(error)
    }
})

configRouter.get('/:id', (req, res, next) => {
    try {
        const config = configStore.findConfigByID(String(req.params.id))

        if (!config) {
            res.status(404).json({ error: 'Config not found' })
            return
        }

        res.json({
            data: config
        })
    } catch (error) {
        next(error)
    }
})

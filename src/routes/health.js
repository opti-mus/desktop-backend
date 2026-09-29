import { Router } from 'express'
import { configs, createConfig, findConfigById, updateConfig } from '../store/configs.js'

export const configRouter = Router()

configRouter.post('/create', (req, res, next) => {
    try {
        const newConfig = createConfig(req.body)
        res.json({
            data: newConfig.id
        })
    } catch (error) {
        next(error)
    }
})
configRouter.put('/update', (req, res, next) => {
    try {
        const { id, data } = req.body

        if (!findConfigById(Number(id))) {
            res.status(404).json({ error: 'Config not found' })
            return
        }
        updateConfig(Number(id), data)

        res.json({
            data: true
        })
    } catch (error) {
        next(error)
    }
})
configRouter.get('/:id', (req, res, next) => {
    console.log('@configs', configs, req.params.id)

    try {
        const config = findConfigById(Number(req.params.id))

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

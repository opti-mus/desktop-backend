import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { signToken } from '../auth/token.js'
import { requireAuth } from '../middleware/auth.js'
import { usersStore } from '../store/users.ts'

export const authRouter = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

function parseCredentials(body) {
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const password = typeof body?.password === 'string' ? body.password : ''
    const name = typeof body?.name === 'string' ? body.name.trim() : ''

    return { email, password, name }
}

authRouter.post('/register', async (req, res, next) => {
    try {
        const { email, password, name } = parseCredentials(req.body)

        if (!EMAIL_RE.test(email)) {
            res.status(400).json({ error: 'Valid email is required' })
            return
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            res.status(400).json({
                error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
            })
            return
        }

        if (!name) {
            res.status(400).json({ error: 'Name is required' })
            return
        }

        if (usersStore.findUserByEmail(email)) {
            res.status(409).json({ error: 'Email is already registered' })
            return
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user = usersStore.createUser({ email, name, passwordHash })

        res.status(201).json({
            data: user,
            token: signToken(user)
        })
    } catch (err) {
        next(err)
    }
})

authRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = parseCredentials(req.body)

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' })
            return
        }

        const user = usersStore.findUserByEmail(email)
        const passwordOk = user ? await bcrypt.compare(password, user.passwordHash) : false

        if (!user || !passwordOk) {
            res.status(401).json({ error: 'Invalid email or password' })
            return
        }

        res.json({
            data: usersStore.toPublicUser(user),
            token: signToken(user)
        })
    } catch (err) {
        next(err)
    }
})

authRouter.get('/me', requireAuth, (req, res) => {
    res.json({ data: usersStore.toPublicUser(req.user) })
})

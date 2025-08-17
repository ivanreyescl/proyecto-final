import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import productRoutes from './routes/products.routes.js'
import userRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

app.use(productRoutes)
app.use('/', userRoutes)
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`🔥 Server on 🔥 http://localhost:${PORT}`)
})

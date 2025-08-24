import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import productRoutes from './routes/products.routes.js'
import userRoutes from './routes/users.routes.js'
import usercartRoutes from './routes/usercarts.routes.js'
import categoryRoutes from './routes/categories.routes.js'


const PORT = process.env.PORT || 5000
const FRONTPORT = process.env.FRONTPORT || 5173


const app = express()

app.use(cors({
    // ${FRONTPORT} == frontend (5173 x defecto en vite)
    // ${PORT} == backend (5000 x defecto)
    origin: `http://localhost:${FRONTPORT}`,
    credentials: true
}))

app.use(express.json())

app.use(productRoutes)

app.use('/', userRoutes)
app.use(categoryRoutes)

app.use(usercartRoutes)


app.listen(PORT, () => {
    console.log(`🔥 Server on 🔥 http://localhost:${PORT}`)
})

export default app
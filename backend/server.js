import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import productRoutes from './routes/products.routes.js'
import userRoutes from './routes/users.routes.js'
import usercartRoutes from './routes/usercarts.routes.js'
import userfavoriteRoutes from './routes/userfavorites.routes.js'
import categoryRoutes from './routes/categories.routes.js'


const PORT = process.env.PORT || 5000
const FRONTPORT = process.env.FRONTPORT || 5173

const app = express()

const allowedOrigins = [
  `http://localhost:${FRONTPORT}`, //local
  'https://proyecto-final-bice-one.vercel.app' //prod
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json())

app.use(productRoutes)

app.use('/', userRoutes)
app.use(categoryRoutes)
app.use(userfavoriteRoutes)

app.use(usercartRoutes)


app.listen(PORT, () => {
    console.log(`🔥 Server on 🔥 http://localhost:${PORT}`)
})

export default app
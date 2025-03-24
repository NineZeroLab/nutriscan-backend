import express from 'express'
import productRoutes from './routes/productRoutes'
import authRoutes from './routes/authRoutes'
import notFound from './routes/404'
import serverError from './routes/500'
import userRoutes from './routes/userRoutes'
import { loggerMiddleware } from './middleware/loggerMiddleware'

const app = express()

//Middleware
app.use(express.json())

app.use(loggerMiddleware)

//Routes
app.use('/auth', authRoutes)
app.use('/api', productRoutes)
app.use('/users', userRoutes)

app.use(notFound, serverError)

export default app

import express from 'express'
import productRoutes from './routes/productRoutes'
import authRoutes from './routes/authRoutes'
import notFound from './routes/404'
import serverError from './routes/500'

const app = express()

//Middleware
app.use(express.json())

//Routes
app.use('/api', productRoutes)
app.use('/auth', authRoutes)

app.use(notFound, serverError)

export default app

import express from 'express'
import cookieParser from 'cookie-parser'

//Rutas de uso
import clientsRoute from './src/routes/clients.js'

const app = express()
app.use(express.json)
app.use(cookieParser())
app.use('/api/clients', clientsRoute)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' })
})

export default app;
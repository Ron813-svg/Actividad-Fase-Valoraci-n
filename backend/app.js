import express from 'express'
import cookieParser from 'cookie-parser'

//Rutas de uso
import clientsRoute from './src/routes/clients.js'
import bookingRoute from './src/routes/booking.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/clients', clientsRoute)
app.use('/api/booking', bookingRoute)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' })
})

export default app;
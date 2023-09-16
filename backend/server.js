const { urlencoded } = require('body-parser')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', '*'),
    res.header('Access-Control-Allow-Methods', '*')
    next();
}) 

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/teams', require('./routes/teamRoutes'))
app.use('/api/players', require('./routes/playerRoutes'))
app.use('/api/positions', require('./routes/positionRoutes'))
app.use('/api/fixtures', require('./routes/fixtureRoutes'))
app.use('/api/matchdays', require('./routes/matchdayRoutes'))
app.use('/api/picks', require('./routes/pickRoutes'))
app.use('/api/leagues', require('./routes/leagueRoutes'))
app.use('/api/managerinfo', require('./routes/managerInfoRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
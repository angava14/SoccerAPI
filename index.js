require('dotenv').config()
require('./connection')
const express = require('express') // servidor
const app = express() // Inicializa el servidor
const cors = require('cors')
const usersRouter = require('./controllers/users.js')
const equiposRouter = require('./controllers/equipos.js')
const partidosRouter = require('./controllers/partidos.js')
const loginRouter = require('./controllers/login.js')
const auth = require('./middlewares/auth.js')
app.use(express.json()) // Nueva forma de usar el body-parser
app.use(cors())

app.use((request, response, next) => {
  console.log('New Request Type: ' + request.method + ' --- URL:' + request.path + ' --- ' + Date('2021-01-01'))
  next()
})

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Soccer API </h1>')
})

app.use('/api/login', loginRouter)
app.use('/api/equipos', auth, equiposRouter)
app.use('/api/partidos', auth, partidosRouter)
app.use('/api/users', auth, usersRouter)

app.use((error, request, response, next) => {
  console.log(error)
  response.status(404).json({ error: error.message })
})

const PORT = 3000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at http://localhost:${PORT}`)
})

module.exports = { app, server }

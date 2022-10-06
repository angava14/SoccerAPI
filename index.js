require('dotenv').config()
require('./connection')
const express = require('express') // servidor
const app = express() // Inicializa el servidor
const cors = require('cors')
const Equipo = require('./models/Equipo.js')
const Partido = require('./models/Partido.js')

app.use(express.json()) // Nueva forma de usar el body-parser
app.use(cors())

const requestTime = function (request, response, next) {
  console.log(Date('2021-01-01'))
  next()
}

app.use(requestTime)

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Soccer API </h1>')
})

app.get('/api/equipos', (request, response) => {
  Equipo.find({}).then(result => {
    response.json(result)
  }).catch(error => {
    response.json(error)
  })
})

app.get('/api/equipos/:nombre', (request, response) => {
  const nombre = String(request.params.nombre)
  Equipo.find({ name: nombre }).then(result => {
    if (result.length > 0) {
      response.json(result)
    } else {
      response.send('<h5>No hay equipos con este nombre</h5>')
    }
  }).catch(error => {
    response.status(404).json({
      error
    })
  })
})

app.post('/api/equipos', (request, response) => {
  const data = request.body
  const equipo = new Equipo({
    name: data.name,
    country: data.country,
    players: data.players,
    coach: data.coach
  })

  equipo.save().then(result => {
    response.json(result)
  }).catch(error => {
    response.status(201).json(error)
  })
})

app.delete('/api/equipos/:nombre', (request, response) => {
  const nombre = String(request.params.nombre)
  Equipo.deleteOne({ name: nombre }).then(result => {
    response.json(result)
  }).catch(error => {
    response.json({
      error
    })
  })
})

app.get('/api/partidos', (request, response) => {
  Partido.find({}).then(result => {
    response.json(result)
  }).catch(error => {
    response.json({
      error
    })
  })
})

app.post('/api/partidos', (request, response) => {
  const data = request.body
  const partido = new Partido({
    equipo1: data.equipo1,
    equipo2: data.equipo2,
    goles1: data.goles1,
    goles2: data.goles2,
    ciudad: data.ciudad,
    fecha: data.fecha,
    jugado: data.jugado
  })

  partido.save().then(result => {
    response.json(result)
  }).catch(error => {
    response.status(201).json(error)
  })
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

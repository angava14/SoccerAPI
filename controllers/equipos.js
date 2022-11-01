const equiposRouter = require('express').Router()
const Equipo = require('../models/Equipo')

equiposRouter.get('/', (request, response) => {
  Equipo.find({}).then(result => {
    response.json(result)
  }).catch(error => {
    response.json(error)
  })
})

equiposRouter.get('/:nombre', (request, response, next) => {
  const nombre = String(request.params.nombre)
  Equipo.find({ name: nombre }).then(result => {
    if (result.length > 0) {
      response.json(result)
    } else {
      response.send('<h5>No hay equipos con este nombre</h5>')
    }
  }).catch(error => {
    next(error)
  })
})

equiposRouter.post('/', (request, response) => {
  const data = request.body
  const equipo = new Equipo({
    name: data.name,
    country: data.country,
    players: data.players,
    coach: data.coach
  })

  equipo.save().then(result => {
    response.status(201).json(result)
  }).catch(error => {
    response.status(400).json(error)
  })
})

equiposRouter.delete('/:nombre', (request, response, next) => {
  const nombre = String(request.params.nombre)
  Equipo.deleteOne({ name: nombre }).then(result => {
    response.json(result)
  }).catch(error => {
    next(error)
  })
})

module.exports = equiposRouter

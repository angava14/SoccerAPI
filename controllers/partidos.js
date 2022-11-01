const partidosRouter = require('express').Router()
const Partido = require('../models/Partido')

partidosRouter.get('/', (request, response) => {
  Partido.find({}).then(result => {
    response.json(result)
  }).catch(error => {
    response.json({
      error
    })
  })
})

partidosRouter.post('/', (request, response) => {
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
    response.status(201).json(result)
  }).catch(error => {
    response.status(400).json(error)
  })
})

module.exports = partidosRouter

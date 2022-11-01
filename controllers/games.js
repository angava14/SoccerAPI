const gamesRouter = require('express').Router()
const Game = require('../models/Game')

gamesRouter.get('/', (request, response) => {
  Game.find({}).then(result => {
    response.json(result)
  }).catch(error => {
    response.json({
      error
    })
  })
})

gamesRouter.post('/', (request, response) => {
  const data = request.body
  const game = new Game({
    equipo1: data.equipo1,
    equipo2: data.equipo2,
    goles1: data.goles1,
    goles2: data.goles2,
    ciudad: data.ciudad,
    fecha: data.fecha,
    jugado: data.jugado
  })

  game.save().then(result => {
    response.status(201).json(result)
  }).catch(error => {
    response.status(400).json(error)
  })
})

module.exports = gamesRouter

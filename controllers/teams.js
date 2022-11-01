const teamsRouter = require('express').Router()
const Team = require('../models/Team')

teamsRouter.get('/', (request, response) => {
  Team.find({}).then(result => {
    response.json(result)
  }).catch(error => {
    response.json(error)
  })
})

teamsRouter.get('/:nombre', (request, response, next) => {
  const nombre = String(request.params.nombre)
  Team.find({ name: nombre }).then(result => {
    if (result.length > 0) {
      response.json(result)
    } else {
      response.send('<h5>No hay equipos con este nombre</h5>')
    }
  }).catch(error => {
    next(error)
  })
})

teamsRouter.post('/', (request, response) => {
  const data = request.body
  const team = new Team({
    name: data.name,
    country: data.country,
    players: data.players,
    coach: data.coach
  })

  team.save().then(result => {
    response.status(201).json(result)
  }).catch(error => {
    response.status(400).json(error)
  })
})

teamsRouter.delete('/:nombre', (request, response, next) => {
  const nombre = String(request.params.nombre)
  Team.deleteOne({ name: nombre }).then(result => {
    response.json(result)
  }).catch(error => {
    next(error)
  })
})

module.exports = teamsRouter

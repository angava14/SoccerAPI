const supertest = require('supertest')
const { app, server } = require('../index.js')
const api = supertest(app)
const mongoose = require('mongoose')

test('Equipos son retornados como json', async () => {
  await api
    .get('/api/equipos')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Numero de equipos', async () => {
  const response = await api.get('/api/equipos')
  expect(response.body.length).toBeGreaterThan(0)
})

test('Un equipo valido para insertar', async () => {
  const equipo = {
    name: 'Manchester City',
    country: 'England',
    players: [{ Ederson: 1, 'Ruben Dias': 1, KDB: 1, Haaland: 1 }],
    coach: 'Pep Guardiola'
  }
  await api.post('/api/equipos').send(equipo)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/equipos')
  const contents = response.body.map(equipo => equipo.name)
  expect(contents).toContain(equipo.name)
})

test('Un equipo invalido para guardar', async () => {
  const equipo = {
    coach: 'Jose Mourinho'
  }
  await api.post('/api/equipos').send(equipo)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/equipos')
  const contents = response.body.map(equipo => equipo.name)
  expect(contents).not.toContain(equipo.coach)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

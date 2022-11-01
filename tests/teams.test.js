const supertest = require('supertest')
const { app, server } = require('../index.js')
const api = supertest(app)
const mongoose = require('mongoose')

test('Teams returned as json', async () => {
  await api
    .get('/api/teams')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Number of teams', async () => {
  const response = await api.get('/api/teams')
  expect(response.body.length).toBeGreaterThan(0)
})

test('Valid team to insert', async () => {
  const equipo = {
    name: 'Manchester City',
    country: 'England',
    players: [{ Ederson: 1, 'Ruben Dias': 1, KDB: 1, Haaland: 1 }],
    coach: 'Pep Guardiola'
  }
  await api.post('/api/teams').send(equipo)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/teams')
  const contents = response.body.map(equipo => equipo.name)
  expect(contents).toContain(equipo.name)
})

test('Valid team to save', async () => {
  const equipo = {
    coach: 'Jose Mourinho'
  }
  await api.post('/api/teams').send(equipo)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/teams')
  const contents = response.body.map(equipo => equipo.name)
  expect(contents).not.toContain(equipo.coach)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

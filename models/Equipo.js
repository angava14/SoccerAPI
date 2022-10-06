const mongoose = require('mongoose')
const idPlugin = require('mongoose-id')
const equipoSchema = mongoose.Schema({
  name: String,
  country: String,
  players: Array,
  coach: String
})
equipoSchema.plugin(idPlugin)
const Equipo = mongoose.model('Equipo', equipoSchema) // Nombre de la coleccion y schema

module.exports = Equipo

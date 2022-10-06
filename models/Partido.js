const mongoose = require('mongoose')
const idPlugin = require('mongoose-id')
const partidoSchema = mongoose.Schema({
  equipo1: String,
  equipo2: String,
  goles1: Number,
  goles2: Number,
  ciudad: String,
  fecha: Date,
  jugado: Boolean
})
partidoSchema.plugin(idPlugin)
const Partido = mongoose.model('Partido', partidoSchema) // Nombre de la coleccion y schema

module.exports = Partido

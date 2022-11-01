const mongoose = require('mongoose')

const partidoSchema = mongoose.Schema({
  equipo1: String,
  equipo2: String,
  goles1: Number,
  goles2: Number,
  ciudad: String,
  fecha: Date,
  jugado: Boolean
})

partidoSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Partido = mongoose.model('Partido', partidoSchema) // Nombre de la coleccion y schema

module.exports = Partido

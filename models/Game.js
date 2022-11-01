const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  equipo1: String,
  equipo2: String,
  goles1: Number,
  goles2: Number,
  ciudad: String,
  fecha: Date,
  jugado: Boolean
})

gameSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

const Game = mongoose.model('Partido', gameSchema) // Nombre de la coleccion y schema

module.exports = Game

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  players: {
    type: Array,
    required: true
  },
  coach: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

teamSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
teamSchema.plugin(uniqueValidator)
const Team = mongoose.model('Equipo', teamSchema) // Nombre de la coleccion y schema

module.exports = Team

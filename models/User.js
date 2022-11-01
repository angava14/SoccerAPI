const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  equipos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }
})

userSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    ret.id = ret._id
    delete ret._id
    delete ret.passwordHash
    delete ret.__v
  }
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema) // Nombre de la coleccion y schema

module.exports = User

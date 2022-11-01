const loginRouter = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  User.find({ username: request.body.username }).then(user => {
    if (user.length > 0) {
      const hashedpass = user.map(user => user.passwordHash)
      const id = user.map(user => user._id)
      bcrypt.compare(request.body.password, hashedpass[0], function (err, result) {
        if (err) {
          response.json(err.message)
        }
        if (result) {
          const userForToken = {
            username: request.body.username,
            id: id[0],
            expiresIn: 3600
          }

          const token = jwt.sign(userForToken, process.env.SECRET)
          response.json({
            username: request.body.username,
            token
          })
        } else { response.status(401).json({ success: false, message: 'Invalid Username or Password' }) } // Invalid Pass
      })
    } else {
      response.status(401).json({ message: 'Invalid Username or Password' }) // Invalid Username
    }
  }).catch(error => {
    response.json({ error })
  })
})

module.exports = loginRouter

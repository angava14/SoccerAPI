const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.header('Authorization')
  let token = null
  let decodedToken = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  } else {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (e) {
    return response.json(e)
  }

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }
  const expiresIn = decodedToken.expiresIn
  const iat = decodedToken.iat
  const time = (Date.now() / 1000 | 0)
  if (iat + expiresIn < time) {
    return response.status(401).json({ error: 'Token Expired' })
  }
  next()
}

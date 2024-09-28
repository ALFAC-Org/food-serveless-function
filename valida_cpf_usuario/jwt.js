// Ref: https://medium.com/xp-inc/node-js-criando-um-token-jwt-sem-plugin-b267a76f6c2b
// further reading: https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken")

const JWT_KEY = process.env.JWT_KEY_TOKEN || ".food-application" // chave secreta
const JWT_TOKEN_EXPIRATION_TIME = 60 // tempo de expiração do token em minutos

const generate = (payload) => {
  const jwtPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + 60 * JWT_TOKEN_EXPIRATION_TIME
  }

  const token = jwt.sign(jwtPayload, JWT_KEY)

  return token
}

const validate = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY)
    return decoded
  } catch (error) {
    return false
  }
}

exports.generate = generate
exports.validate = validate
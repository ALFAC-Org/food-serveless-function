// Ref: https://medium.com/xp-inc/node-js-criando-um-token-jwt-sem-plugin-b267a76f6c2b
// further reading: https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken")

const JWT_KEY = ".food-application" // chave secreta
const JWT_TOKEN_EXPIRATION_TIME = 60 // tempo de expiração do token em minutos

module.exports.generate = (payload) => {
  const jwtPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + 60 * JWT_TOKEN_EXPIRATION_TIME
  }

  const token = jwt.sign(jwtPayload, JWT_KEY)

  return token
}

module.exports.validate = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY)
    return decoded
  } catch (error) {
    return false
  }
}

// const data = generate({ who: "AUTHENTICATED", cpf: "123456789" })
// console.log(data)

// console.log(validate(data))
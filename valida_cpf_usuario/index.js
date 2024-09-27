const { whois } = require("./whois.js")
const { generate, validate } = require("./jwt.js")
const { validateCPFInRDS } = require("./database.js")

exports.handler = async (event) => {
  const authorization = event.headers && event.headers.auth
  const deny = {
    isAuthorized: false,
    context: {}
  }

  console.log("FRAGA - EVENT", event)
  console.log("FRAGA - AUTHORIZATION", authorization)
  // SCENARIO 1: User is already authenticated
  // So let's keep the current token
  if (authorization) {
    const token = authorization.split(" ")[1]
    const decoded = validate(token)
    console.log("FRAGA - DECODED", decoded)

    if (decoded) {
      return {
        isAuthorized: true,
        context: {
          jwt: authorization
        }
      }
    } else {
      // TODO: refresh token?
      return deny
    }
  }

  const cpf = event.headers && event.headers.cpf
  const who = whois(cpf) // ANONYMOUS, AUTHENTICATED, INVALID
  console.log("FRAGA - WHO ln-36", who)

  // SCENARIO 2: Someone is trying to authenticate with invalid data
  if (who === "INVALID") {
    return deny
  }

  // SCENARIO 3: Someone is trying to authenticate as ANONYMOUS
  if (who === "ANONYMOUS") {
    const jwt = generate({ who })

    return {
      isAuthorized: true,
      context: {
        jwt: `Bearer ${jwt}`
      }
    }
  }

  // SCENARIO 4: Someone is trying to authenticate as AUTHENTICATED
  if (who === "AUTHENTICATED") {
    try {
      const isValid = await validateCPFInRDS(cpf)
      console.log("FRAGA - IS VALID", isValid)

      if (isValid) {
        const jwt = generate({ who })

        return {
          isAuthorized: true,
          context: {
            jwt: `Bearer ${jwt}`
          }
        }
      } else {
        return deny
      }
    } catch (error) {
      return deny
    }
  }

  // ANY OTHER SCENARIO SHOULD BE CONSIDERED AS UNAUTHORIZED
  return deny
}

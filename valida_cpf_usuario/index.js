const { generate, validate } = require("./jwt.js")
const { validateCPFInRDS } = require("./database.js")

const log = (message) => {
  console.log(`[valida_cpf_usuario] ${message}`)
}

const handler = async (event) => {
  const headers = event.headers
  const authorization = headers && headers.auth
  const deny = {
    isAuthorized: false,
    context: {}
  }

  log(`Received request with headers: ${JSON.stringify(headers)}`)

  // SCENARIO 1: User is already authenticated
  // So let's keep the current token
  if (authorization.startsWith("Bearer")) {
    const token = authorization.split(" ")[1]
    const decoded = validate(token)

    log(`We have a Bearer token`)

    if (decoded) {
      log(`Authorizing token`)

      return {
        isAuthorized: true,
        context: {
          jwt: authorization
        }
      }
    } else {
      log(`The Bearer token is expired or invalid`)

      // TODO: refresh token?
      return deny
    }
  }

  // SCENARIO 2: Someone is trying to authenticate as ANONYMOUS
  if (authorization.toUpperCase() === "ANONYMOUS") {
    log(`We have an ANONYMOUS user`)

    const jwt = generate({ who: "ANONYMOUS" })

    log(`Generating a token for it`)

    return {
      isAuthorized: true,
      context: {
        jwt: `Bearer ${jwt}`
      }
    }
  }

  const isValidCpf = authorization.length === 11

  // SCENARIO 3: Someone is trying to authenticate with invalid data
  if (!isValidCpf) {
    log(`Invalid cpf`)

    return deny
  }

  // SCENARIO 4: Someone is trying to authenticate as AUTHENTICATED
  try {
    log(`Let's get the client id for the CPF`)

    const getClientId = await validateCPFInRDS(authorization)

    if (getClientId) {
      log(`We got the client id for the CPF`)

      const jwt = generate({ who: "AUTHENTICATED", id: getClientId })

      log(`Generating a token for it`)

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
  } finally {
    log(`Finishing the request`)
  }
}

exports.handler = handler

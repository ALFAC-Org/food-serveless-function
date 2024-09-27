const { generate, validate } = require("./jwt.js")
const { validateCPFInRDS } = require("./database.js")

exports.handler = async (event) => {
  const authorization = event.headers && event.headers.auth
  const deny = {
    isAuthorized: false,
    context: {}
  }

  // SCENARIO 1: User is already authenticated
  // So let's keep the current token
  if (authorization.startWith("Bearer")) {
    const token = authorization.split(" ")[1]
    const decoded = validate(token)

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

  const isValidCpf = authorization.length === 11

  // SCENARIO 2: Someone is trying to authenticate with invalid data
  if (!isValidCpf) {
    return deny
  }

  // SCENARIO 3: Someone is trying to authenticate as ANONYMOUS
  if (authorization.toUpperCase() === "ANONYMOUS") {
    const jwt = generate({ who: "ANONYMOUS" })

    return {
      isAuthorized: true,
      context: {
        jwt: `Bearer ${jwt}`
      }
    }
  }

  // SCENARIO 4: Someone is trying to authenticate as AUTHENTICATED

  try {
    const isValid = await validateCPFInRDS(authorization)

    if (isValid) {
      const jwt = generate({ who: "AUTHENTICATED", cpf: authorization })

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
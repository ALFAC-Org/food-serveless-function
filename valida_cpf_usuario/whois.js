module.exports.whois = (cpf) => {
  const types = {
    ANONYMOUS: "ANONYMOUS",
    AUTHENTICATED: "AUTHENTICATED",
    INVALID: "INVALID"
  }

  if (cpf && cpf.length === 11) {
    return types["AUTHENTICATED"]
  }

  if (cpf === "ANONYMOUS") {
    return types["ANONYMOUS"]
  }

  return types["INVALID"]
}

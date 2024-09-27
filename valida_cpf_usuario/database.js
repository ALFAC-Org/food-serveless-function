const mysql = require("mysql2/promise")

module.exports.getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
}

module.exports.validateCPFInRDS = async (cpf) => {
  try {
    const connection = await getConnection()
    const [rows] = await connection.execute(
      "SELECT 1 FROM cliente WHERE cpf = ?",
      [cpf]
    )
    await connection.end()
    return rows.length > 0
  } catch (error) {
    console.error("[validateCPFInRDS] error", error)
    return false
  }
}

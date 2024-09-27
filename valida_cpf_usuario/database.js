const mysql = require("mysql2/promise")

const getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
}

const validateCPFInRDS = async (cpf) => {
  try {
    const connection = await getConnection()
    const [rows] = await connection.execute(
      "SELECT id FROM cliente WHERE cpf = ?",
      [cpf]
    )
    
    await connection.end()

    return rows.length > 0 ? rows[0].id : false
  } catch (error) {
    console.error("[validateCPFInRDS] error", error)
    return false
  }
}

exports.getConnection = getConnection;
exports.validateCPFInRDS = validateCPFInRDS;
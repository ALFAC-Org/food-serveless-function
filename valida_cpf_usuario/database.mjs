import mysql from "mysql2/promise"

export const getConnection = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
}

export const validateCPFInRDS = async (cpf) => {
  try {
    const connection = await getConnection()
    const [rows] = await connection.execute(
      "SELECT 1 FROM users WHERE cpf = ?",
      [cpf]
    )
    await connection.end()
    return rows.length > 0
  } catch (error) {
    console.error("[validateCPFInRDS] error", error)
    return false
  }
}

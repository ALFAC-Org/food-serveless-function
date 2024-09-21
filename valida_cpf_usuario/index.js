const mysql = require('mysql2/promise');

exports.handler = async (event) => {

    // Extrai o CPF dos atributos do usuário
    const cpf = event.request.userAttributes['custom:cpf'];

    if (!cpf) {
        // TODO: Retornar um token sem CPF
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "CPF is required" }),
        };
    }

    const isValid = await validateCPFInRDS(cpf);

    if (isValid) {
        return {
            statusCode: 200,
            body: JSON.stringify({ token: callCognito(cpf) }),
        };
    } else {
        // TODO: Call cognito to insert CPF in User Pool
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "CPF not found" }),
        };
    }
};

async function validateCPFInRDS(cpf) {
    let connection
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }
    catch (error) {
        console.error('Error Creating db-connection:', error);
    }

    try {
        const [rows] = await connection.execute('SELECT 1 FROM users WHERE cpf = ?', [cpf]);
        return rows.length > 0;
    } catch (error) {
        console.error('Error validating CPF in RDS:', error);
    } finally {
        await connection.end();
    }
}

function callCognito(cpf) {
    // Implementar a lógica para gerar um JWT contendo o CPF
}
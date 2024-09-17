const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    // Loga o evento completo para depuração
    console.log("Received event:", JSON.stringify(event, null, 2));

    // Extrai o CPF dos atributos do usuário
    const cpf = event.request.userAttributes.cpf;

    // Loga o CPF para validação
    console.log("Received CPF:", cpf);

    if (!cpf) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "CPF is required" }),
        };
    }

    // Lógica para validar o CPF no RDS
    const isValid = await validateCPFInRDS(cpf);

    if (isValid) {
        return {
            statusCode: 200,
            body: JSON.stringify({ token: generateJWT(cpf) }),
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "CPF not found" }),
        };
    }
};

async function validateCPFInRDS(cpf) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    try {
        const [rows] = await connection.execute('SELECT 1 FROM users WHERE cpf = ?', [cpf]);
        return rows.length > 0;
    } catch (error) {
        console.error('Error validating CPF in RDS:', error);
        return false;
    } finally {
        await connection.end();
    }
}

function generateJWT(cpf) {
    // Implementar a lógica para gerar um JWT contendo o CPF
}
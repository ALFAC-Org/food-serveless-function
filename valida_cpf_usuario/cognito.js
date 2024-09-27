// BY PASS BY NOW
// const {
//   CognitoIdentityProviderClient,
//   InitiateAuthCommand,
//   AdminCreateUserCommand
// } = require("@aws-sdk/client-cognito-identity-provider")

// const CLIENT_ID = process.env.CLIENT_ID
// const USER_POOL_ID = process.env.USER_POOL_ID

// const client = new CognitoIdentityProviderClient({ region: "us-east-1" })

// const log = (message) => console.log(`[cognito] ${message}`)

// export const authenticate = async (cpf) => {
//   const params = {
//     AuthFlow: "CUSTOM_AUTH",
//     ClientId: CLIENT_ID,
//     AuthParameters: {
//       USERNAME: "cpf_user",
//       "custom:cpf": cpf
//     }
//   }

//   try {
//     const command = new InitiateAuthCommand(params)
//     const response = await client.send(command)
//     const accessToken = response.AuthenticationResult.AccessToken

//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         Authorization: accessToken
//       },
//       body: JSON.stringify({ message: "Authentication successful" })
//     }
//   } catch (error) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({
//         message: "Authentication failed",
//         error: error.message
//       })
//     }
//   }
// }

// export const register = async (cpf) => {
//   const params = {
//     UserPoolId: USER_POOL_ID,
//     Username: "cpf_user", // Nome de usuário temporário
//     UserAttributes: [
//       {
//         Name: "custom:cpf",
//         Value: cpf
//       }
//     ]
//   }

//   try {
//     const command = new AdminCreateUserCommand(params)
//     const response = await client.send(command)

//     log("User registration successful:", response)
//   } catch (error) {
//     log("Error registering user:", error)
//   }
// }

;(async () => {
  const { handler } = require(".")

  console.log(
    (
      await handler({
        headers: {
          auth: "ANONYMOUS"
        }
      })
    ).context.jwt
  )

  console.log(
    (
      await handler({
        headers: {
          auth: "11111111111",
          mock: true
        }
      })
    ).context.jwt
  )
})()

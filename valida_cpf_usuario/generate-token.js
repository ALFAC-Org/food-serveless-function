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
})()

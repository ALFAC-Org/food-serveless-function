// const { jest } = require("@jest/globals")

// https://github.com/jestjs/jest/issues/13135#issuecomment-1221468526
// jest.unstable_mockModule("../src/database.js", () => ({
//   __esModule: true,
//   getConnection: jest.fn().mockRejectedValue(true),
//   validateCPFInRDS: jest.fn().mockRejectedValue(true)
// }))

// const { validateCPFInRDS } = await import("../src/database.js")

// const { default: handler } = await import("../src/validate.js")

jest.mock("../database.js", () => ({
  getConnection: jest.fn().mockRejectedValue(true),
  validateCPFInRDS: jest.fn().mockRejectedValue(true)
}))

const { validateCPFInRDS } = require("../database.js")

const { handler } = require("../index.js")

// Date 25/09/2024
const validAnonymousToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3aG8iOiJBTk9OWU1PVVMiLCJjcGYiOiIxMjM0NTY3ODkiLCJpYXQiOjE3MjcyNzEyNDgsImV4cCI6MTcyNzI3NDg3OH0.XhZTTjVgj3a4CzEyIUWYI1IAF1BkKaPQ9gy5sX-zPaI"
const validAuthenticatedToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3aG8iOiJBVVRIRU5USUNBVEVEIiwiY3BmIjoiMTIzNDU2Nzg5IiwiaWF0IjoxNzI3Mjc0MTk1LCJleHAiOjE3MjcyNzc4MjV9.RRwUWQnYmLk-OL1u01ryFFhXfp3oLjZBDxwhu_QH3Cc"

describe("index.js", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern")
    jest.setSystemTime(new Date("2024-09-25T03:24:00"))
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("# SCENARIO 1: User is already authenticated", () => {
    describe("when the token is with ANONYMOUS", () => {
      it("returns authorized as true", async () => {
        const result = await handler({
          headers: {
            Auth: validAnonymousToken
          }
        })

        expect(result).toEqual({
          isAuthorized: true,
          context: {
            jwt: validAnonymousToken
          }
        })
      })
    })

    describe("when the token is with AUTHENTICATED", () => {
      it("returns authorized as true", async () => {
        const result = await handler({
          headers: {
            Auth: validAuthenticatedToken
          }
        })

        expect(result).toEqual({
          isAuthorized: true,
          context: {
            jwt: validAuthenticatedToken
          }
        })
      })
    })
  })

  describe("# SCENARIO 2: Someone is trying to authenticate with invalid data", () => {
    it("returns authorized as false", async () => {
      const result = await handler({
        headers: {
          Cpf: ""
        }
      })

      expect(result).toEqual({
        isAuthorized: false,
        context: {}
      })
    })
  })

  describe("# SCENARIO 3: Someone is trying to authenticate as ANONYMOUS", () => {
    it("returns authorized as true", async () => {
      const result = await handler({
        headers: {
          Cpf: "ANONYMOUS"
        }
      })

      expect(result).toEqual({
        isAuthorized: true,
        context: {
          jwt: expect.stringMatching(/^Bearer .+$/)
        }
      })
    })
  })

  describe("SCENARIO 4: Someone is trying to authenticate as AUTHENTICATED", () => {
    describe("when the CPF is valid", () => {
      it("returns authorized as true", async () => {
        validateCPFInRDS.mockResolvedValue(true)

        const result = await handler({
          headers: {
            Cpf: "12345678911"
          }
        })

        expect(result).toEqual({
          isAuthorized: true,
          context: {
            jwt: expect.stringMatching(/^Bearer .+$/)
          }
        })
      })
    })

    describe("when the CPF is invalid", () => {
      it("returns authorized as false", async () => {
        validateCPFInRDS.mockResolvedValue(false)

        const result = await handler({
          headers: {
            Cpf: "12345678911"
          }
        })

        expect(result).toEqual({
          isAuthorized: false,
          context: {}
        })
      })
    })
  })
})

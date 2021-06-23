export const Http = {
  ok: (body, header = {}) => ({
    statusCode: 200,
    body,
    header
  }),
  created: () => ({
    statusCode: 201,
    body: null
  }),
  noContent: () => ({
    statusCode: 204,
    body: null
  }),
  badRequest: (body) => ({
    statusCode: 400,
    body
  }),
  serverError: (body) => ({
    statusCode: 500,
    body
  })
}
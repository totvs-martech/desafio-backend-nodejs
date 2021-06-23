const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const jwtVerify = promisify(jwt.verify)

const access = (role = []) => async (ctx, next) => {
  if (role.length > 0) {
    try {
      const header = ctx.header.authorization || ctx.header['x-token']
      if (!header) {
        ctx.body = { error: 'Você não está enviando o token de autorização' }
        ctx.status = 401
        return
      }
      if (header.split(' ').length !== 2) {
        ctx.body = { error: 'Você não formatou o token corretamente, por favor verificar' }
        ctx.status = 401
        return
      }
      const [prefix, token] = header.split(' ')

      if (!/^Bearer$/i.test(prefix)) {
        ctx.body = { error: 'Você não formatou o token corretamente, por favor verificar' }
        ctx.status = 401
        return
      }
      const decoded = await jwtVerify(token, "JWT_SECRET")

      const hasPermission = decoded.roles.some(rule => role.includes(rule))

      if (!hasPermission) {
        ctx.body = { error: 'Você não esta autorizado para utilizar este recurso' }
        ctx.status = 401
        return
      }
      ctx.auth = decoded
      await next()
      return
    } catch (error) {
      ctx.body = { error: 'Você forneceu um token invalido' }
      ctx.status = 401
      return
    }
  }
  await next()
}


export const  userRole = access(['user']),
  superRole = access(['superUser']),
  allRole = access(['user', 'superUser']),
  nonRole = access([])



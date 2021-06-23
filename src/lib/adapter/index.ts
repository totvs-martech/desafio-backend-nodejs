import { Context, Next } from 'koa'
import { HttpRequest } from './http.request.interface'

export const Adapter = (controller, methodName) => async (ctx, next) => {
  try {

    // todo: filter ajuste
    const { page = 1, per_page = 10, status = 'all', active = true, ...query } = ctx.query
    const httpRequest: HttpRequest = {
      body: {
        ...ctx.request.body,
        ...ctx.request.files,
        ...ctx.file
      },
      params: ctx.params,
      filter: {
        page,
        limit: per_page > 1000 ? 1000 : per_page
      },
      query,
      headers: ctx.request.headers,
      cache: ctx.cache,
      logger: ctx.log,
      auth: ctx.auth,
      method: ctx.method,
      url: ctx.path,
      io: ctx.io
    }

    const instance = new controller('Teste')
    const response = await instance[methodName](httpRequest)
    
    ctx.body = response.body
    ctx.status = response.statusCode

  } catch (error) {
    console.log(error)
    return next(error)
  }
}

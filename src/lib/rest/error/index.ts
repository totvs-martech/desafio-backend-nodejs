import { Http } from '../status'
import { ValidationError } from './validation.error'


const errorCatch = (error, ctx) => {
  if (error instanceof ValidationError) {
    return Http.badRequest({ type: error.name, errors: error.errors })
  }
  if (error instanceof SyntaxError) {
    return Http.badRequest({ error: 'Verifique sua request' })
  }
  if (error instanceof Error) {
    return Http.badRequest({ error: error.message })
  }
  ctx.app.emit('error', error, ctx)
  return Http.serverError({ error: 'Tente novamente. Se persistir, entre em contato com email@email.com' })
}
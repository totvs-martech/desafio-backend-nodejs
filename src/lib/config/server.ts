import * as Koa from 'koa'
import * as http from 'http'
import { Routes } from '../routes'
import * as Logger from 'koa-logger'
import * as Json from 'koa-json'
import * as Cors from 'koa-cors'
import * as BodyParser from 'koa-bodyparser'


export const Server = async () => {
   
   const app = new Koa()
   const routes = await Routes()

   // Middleweres
   app.use(Json())
   app.use(Cors())
   app.use(BodyParser({}))
   app.use(Logger())

   // Routes
   app.use(routes.routes())
      .use(routes.allowedMethods())


   return http.createServer(app.callback())
}
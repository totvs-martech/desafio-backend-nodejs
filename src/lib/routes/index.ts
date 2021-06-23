import * as Router from 'koa-router'
import 'reflect-metadata'
import { Controllers } from '../../app/controllers'
import { RouteDefinition } from '../decorators/route.definition';
import { Adapter } from '../adapter';
import Middleware from '../../app/http/middlewares';

export const Routes = async () => {

  
  const router = new Router()

  const controllers = await Controllers()


  for (const controller of controllers) {

    
    if(controller){
  
    // This is our instantiated class
   //  console.log('aqui', controller)
    // The prefix saved to our controller
    const prefix = Reflect.getMetadata('prefix', controller);
    // Our `routes` array containing all our routes for this controller
    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);

    // Iterate over all routes and register them to our express application 
    for (const route of routes) {
      
      // It would be a good idea at this point to substitute the `app[route.requestMethod]` with a `switch/case` statement
      // since we can't be sure about the availability of methods on our `app` object. But for the sake of simplicity
      // this should be enough for now.
      router[route.requestMethod](prefix + route.path, ...route.middlewares, Adapter(controller, route.methodName));
    }
    }
  
   
  }
  console.log(router.stack.map(i => i.path));
  return router
}

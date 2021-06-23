import { Controller, Post, Get, Delete, Put } from "../../lib/decorators";
import { HttpRequest } from "../../lib/adapter/http.request.interface";
import { Http } from '../../lib/rest/status';
import {sqlData} from '../../lib/database';
import {userRole, superRole, nonRole, allRole} from '../http/middlewares/acl';

@Controller('/sso')
export class SsoController {

    constructor() {
      
    }
    
    @Post('/login', [nonRole])
     public async superUser(HttpRequest: HttpRequest) {

        try {
            const { body } = HttpRequest
            return Http.ok(body)

          } catch (error) {
            return Http.badRequest({ error: error.message });
          }
     
    }
    @Get('/login', [nonRole])
     public async superGetUser(HttpRequest: HttpRequest) {

        try {
            const { body } = HttpRequest
            return Http.ok(body)

          } catch (error) {
            return Http.badRequest({ error: error.message });
          }
     
    }

}
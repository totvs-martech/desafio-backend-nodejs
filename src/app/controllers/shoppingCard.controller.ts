import { Controller, Post, Get, Delete, Put } from "../../lib/decorators";
import { HttpRequest } from "../../lib/adapter/http.request.interface";
import { Http } from '../../lib/rest/status';
import {sqlData} from '../../lib/database';
import {userRole, superRole, nonRole, allRole} from '../http/middlewares/acl';

@Controller('/shoppingcard')
export class ShoppingCardController {

    constructor() {
      
    }
    @Get('/:id', [nonRole])
     public async get(HttpRequest: HttpRequest) {

        try {
            const { params, filter } = HttpRequest
            const result = "hello word shoppingcard"
            console.log(result)
            return Http.ok(result)
          } catch (error) {
            return Http.badRequest({ error: error.message });
          }
     
    }

}
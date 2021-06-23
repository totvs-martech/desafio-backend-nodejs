import { Controller, Post, Get, Delete, Put } from "../../lib/decorators";
import { HttpRequest } from "../../lib/adapter/http.request.interface";
import { Http } from '../../lib/rest/status';
import {userRole, superRole, nonRole, allRole} from '../http/middlewares/acl';

@Controller('/product')
export class ProductController {

    constructor() {
      
    }
    @Get('/:id', [nonRole])
     public async get(HttpRequest: HttpRequest) {

        try {
            const { params, filter } = HttpRequest
            const result = "hello word product"
            console.log(result)
            return Http.ok(result)
          } catch (error) {
            return Http.badRequest({ error: error.message });
          }
     
    }

}
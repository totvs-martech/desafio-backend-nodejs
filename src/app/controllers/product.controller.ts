import { Controller, Post, Get, Delete, Put } from "../../lib/decorators";
import { HttpRequest } from "../../lib/adapter/http.request.interface";
import { Http } from '../../lib/rest/status';
import {userRole, superRole, nonRole, allRole} from '../http/middlewares/acl';
import {create, findAll, findById} from '../repository/product'

@Controller('/product')
export class ProductController {

    constructor() {
      
    }

    @Get('', [nonRole])
     public async findAll(HttpRequest: HttpRequest) {

        try {
            const { params, filter, body } = HttpRequest
            const result = await findAll();
            return Http.ok(result)
          } catch (error) {
            return Http.badRequest({ error: error.message });
          }
     
    }

    @Get('/:id', [nonRole])
     public async get(HttpRequest: HttpRequest) {

        try {
            const { params, filter } = HttpRequest
            const result = await findById(params.id);
            return Http.ok(result)
          } catch (error) {
            return Http.badRequest({ error: error.message });
          }
     
    }

    @Post('', [nonRole])
    public async Post(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await create(body);
          return Http.ok(result)

        } catch (error) {
          return Http.badRequest({ error: error.message });
        }
   
  }


}
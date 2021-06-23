import { Controller, Post, Get, Delete, Put } from "../../lib/decorators";
import { HttpRequest } from "../../lib/adapter/http.request.interface";
import { Http } from '../../lib/rest/status';
import {userRole, superRole, nonRole, allRole} from '../http/middlewares/acl';
import {create} from '../repository/customer';

@Controller('/shoppingcard')
export class ShoppingCardController {

    constructor() {
      
    }

    @Post('', [nonRole])
    public async create(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await create(body);
          return Http.ok("")
        } catch (error) {
          return Http.badRequest({ error: error.message });
        }
   
  }

  @Put('', [nonRole])
    public async update(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await create(body);
          return Http.ok("")
        } catch (error) {
          return Http.badRequest({ error: error.message });
        }
   
  }
  @Delete('', [nonRole])
    public async delete(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await create(body);
          return Http.ok("")
        } catch (error) {
          return Http.badRequest({ error: error.message });
        }
   
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
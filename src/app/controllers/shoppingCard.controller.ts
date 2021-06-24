import { Controller, Post, Get, Delete, Put } from "../../lib/decorators";
import { HttpRequest } from "../../lib/adapter/http.request.interface";
import { Http } from '../../lib/rest/status';
import {userRole, superRole, nonRole, allRole} from '../http/middlewares/acl';
import {addProduct, create, removeProduct, payment} from '../repository/shoppingcard';

@Controller('/shoppingcard')
export class ShoppingCardController {

    constructor() {
      
    }

    @Post('', [nonRole])
    public async create(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await create(body);
          return Http.ok(result)
        } catch (error) {
          return Http.badRequest({ error: error.message });
        }
   
  }

  @Post('/payment/:id', [nonRole])
    public async payment(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await payment(body);
          return Http.ok(result)
        } catch (error) {
          return Http.badRequest({ error: error.message });
        }
   
  }

  @Put('/:id', [nonRole])
    public async update(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await addProduct(body, params.id);
          return Http.ok(result)
        } catch (error) {
          return Http.badRequest({ error: error.message });
        }
   
  }
  @Delete('/:id', [nonRole])
    public async delete(HttpRequest: HttpRequest) {

      try {
          const { params, filter, body } = HttpRequest
          const result = await removeProduct(body, params.id);
          return Http.ok(result)
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
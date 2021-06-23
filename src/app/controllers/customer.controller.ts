import { Controller, Post, Get, Delete, Put } from "../../lib/decorators";
import { HttpRequest } from "../../lib/adapter/http.request.interface";
import { Http } from '../../lib/rest/status';
import {userRole, superRole, nonRole, allRole} from '../http/middlewares/acl';
import {create} from '../repository/customer'


@Controller('/customer')
export class CustomerController {

    constructor() {
      
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
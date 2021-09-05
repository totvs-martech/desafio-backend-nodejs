import { CartItem } from '../schemas/cartItem';

export class CreateCartDto {
  total: number;
  count: number;
  items: CartItem[];
}

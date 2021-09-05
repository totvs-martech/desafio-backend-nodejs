import { Product } from 'src/products/schemas/product.schema';

export class CartItem {
  count: number;
  product: Product;

  constructor(count: number, product: Product) {
    this.count = count;
    this.product = product;
  }
}

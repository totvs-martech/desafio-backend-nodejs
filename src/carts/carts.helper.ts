import { Cart } from './schemas/cart.schema';
import { CartItem } from './schemas/cartItem';

const MAX_DISCOUNT_PERCENTAGE = 0.3;

const discountConfig = [
  {
    factor: 'A',
    discount: 0.01,
    limit: 0.05,
  },
  {
    factor: 'B',
    discount: 0.05,
    limit: 0.15,
  },
  {
    factor: 'C',
    discount: 0.1,
    limit: 0.3,
  },
];

function calculateProductPercentageDiscount(CartItem: CartItem): number {
  const {
    count,
    product: { factor },
  } = CartItem;

  const { discount, limit } = discountConfig.find(
    (cfg) => cfg.factor === factor,
  );

  let totalDiscount = 0;

  for (let i = 0; i < count; i++) {
    const nextTotalDiscount = +(totalDiscount + discount).toFixed(2);
    if (nextTotalDiscount <= limit) {
      totalDiscount = nextTotalDiscount;
    }
  }

  return totalDiscount;
}

export function calculateProductPriceWithDiscount(CartItem: CartItem): number {
  const percentageDiscount = calculateProductPercentageDiscount(CartItem);
  const {
    count,
    product: { value },
  } = CartItem;

  const valueWithDiscount = (1 - percentageDiscount) * (count * value);
  return valueWithDiscount;
}

export function calculateCartPriceWithDiscount(cart: Cart): number {
  const mappedCartProducts = cart.items.map((item) => ({
    ...item,
    value_with_no_discount: item.count * item.product.value,
    percentage_discount: calculateProductPercentageDiscount(item),
  }));

  const totalValueWithoutDiscount = mappedCartProducts.reduce(
    (acc, curr) => acc + curr.value_with_no_discount,
    0,
  );

  const maxAbsoluteDiscount =
    MAX_DISCOUNT_PERCENTAGE * totalValueWithoutDiscount;

  const discounts = mappedCartProducts.map(
    (product) => product.value_with_no_discount * product.percentage_discount,
  );

  const discountBeforeApplyingLimit = discounts.reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const discount =
    discountBeforeApplyingLimit <= maxAbsoluteDiscount
      ? discountBeforeApplyingLimit
      : maxAbsoluteDiscount;

  const finalValue = totalValueWithoutDiscount - discount;

  return finalValue;
}

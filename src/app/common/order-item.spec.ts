import { CartItem } from './cart-item';
import { OrderItem } from './order-item';
import { Product } from './product';

describe('OrderItem', () => {
  it('should create an instance', () => {
    expect(new OrderItem(new CartItem(new Product('id', 'sku', 'name', 'description', 0, 'imageUrl', true, 1, new Date(), new Date())))).toBeTruthy();
  });
});

import { CartItem } from './cart-item';
import { Product } from './product';

describe('CartItem', () => {
  it('should create an instance', () => {
    expect(new CartItem(new Product('id', 'sku', 'name', 'description', 0, 'imageUrl', true, 1, new Date(), new Date()))).toBeTruthy();
  });
});

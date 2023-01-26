import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('id', 'sku', 'name', 'description', 0, 'imageUrl', true, 1, new Date(), new Date())).toBeTruthy();
  });
});

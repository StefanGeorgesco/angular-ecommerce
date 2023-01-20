import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductDetails();
    });
  }

  getProductDetails(): void {
    let id = Number(this.route.snapshot.paramMap.get('id')!);

    this.productService.getProduct(id).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(): void {
    this.cartService.addToCart(new CartItem(this.product));
  }
}

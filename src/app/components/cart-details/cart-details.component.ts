import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(): void {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(price => this.totalPrice = price);
    this.cartService.totalQuantity.subscribe(quantity => this.totalQuantity = quantity);
  }

  incrementQuantity(cartItem: CartItem):void {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem):void {
    this.cartService.removeOneFromCart(cartItem);
  }

  remove(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }
}

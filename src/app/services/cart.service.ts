import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject(0);
  totalQuantity: Subject<number> = new BehaviorSubject(0);

  constructor() { }

  addToCart(cartItem: CartItem): void {
    let existingCartItem = this.cartItems.find(item => item.product.id === cartItem.product.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeAndPublishTotals();
  }

  removeOneFromCart(cartItem: CartItem): void {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeFromCart(cartItem);
    }
    else {
      this.computeAndPublishTotals();
    }
  }

  removeFromCart(cartItem: CartItem) {
    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    this.computeAndPublishTotals();
  }

  computeAndPublishTotals() {
    let totalCartPrice: number = this.cartItems.reduce((tot, curr) => tot + curr.product.unitPrice * curr.quantity, 0);
    let totalCartQuantity: number = this.cartItems.reduce((tot, curr) => tot + curr.quantity, 0);
    this.totalPrice.next(totalCartPrice);
    this.totalQuantity.next(totalCartQuantity);
  }
}

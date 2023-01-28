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

  storage: Storage = localStorage;

  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data) {
      this.cartItems = data;
      this.computeAndPublishTotals(false);
    }
  }

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

  resetCart() {
    this.cartItems = [];
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
    this.persistCartItems();
  }

  computeAndPublishTotals(persist: boolean = true) {
    let totalCartPrice: number = this.cartItems.reduce((tot, curr) => tot + curr.product.unitPrice * curr.quantity, 0);
    let totalCartQuantity: number = this.cartItems.reduce((tot, curr) => tot + curr.quantity, 0);
    this.totalPrice.next(totalCartPrice);
    this.totalQuantity.next(totalCartQuantity);
    if (persist)
      this.persistCartItems();
  }

  persistCartItems(): void {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}

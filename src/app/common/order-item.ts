import { CartItem } from "./cart-item";

export class OrderItem {
    productId: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(cartItem: CartItem) {
        this.productId = cartItem.product.id;
        this.imageUrl = cartItem.product.imageUrl;
        this.unitPrice = cartItem.product.unitPrice;
        this.quantity = cartItem.quantity;
    }
}

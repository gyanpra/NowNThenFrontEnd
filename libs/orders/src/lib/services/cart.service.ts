import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  //initializing the cart with the cartItems in the local storage, fixed the reload restore cart items issue.
  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if(!cart){
      const initialCart = {
        // @ts-ignore
        items: []
      } 
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJson);
  };
  // else {
  //   this.cart$.next(cart);
  // }
  }

  //getting the cartItems from the local storage as a Cart object.
  getCart(): Cart {
    let cartJsonString: string = localStorage.getItem(CART_KEY) || '{}';
    console.log(cartJsonString);
    const cart :Cart =  JSON.parse(cartJsonString);
    return cart;   //returning the cart object
  }




  //seting the type cart to store the cartItems in the local storage, pushing the cartItem to the cartItems array
  //and returning the cart, increasing the quantity if same product is added again.

  setCartItem(cartItem: CartItem, updateCartItem?:boolean): Cart{
    const cart = this.getCart();
    const cartItemExists = cart.items.find((items) => items.productId === cartItem.productId);
    if (cartItemExists) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          if(updateCartItem){
            item.quantity = cartItem.quantity;
        }
        else{
          item.quantity += cartItem.quantity;
        }
        }
      });
    } else {
      cart.items.push(cartItem);
    }
    const CartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, CartJson);
    this.cart$.next(cart);
    return cart;

  }

  deleteCartItem(productId: string): Cart {
    const cart = this.getCart();
    const cartItemIndex = cart.items.findIndex((item) => item.productId === productId);
    cart.items.splice(cartItemIndex, 1);
    const CartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, CartJson);
    this.cart$.next(cart);
    return cart;
  }

  clearCart(): Cart {
    const cart = this.getCart();
    cart.items = [];
    const CartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, CartJson);
    this.cart$.next(cart);
    return cart;
  }

}

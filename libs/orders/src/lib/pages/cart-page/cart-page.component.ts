import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '@nownthenfrontend/products';
import {CartItemDetails} from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{

  cartCount: number = 0;
  CartItemsDetails: CartItemDetails[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private cartService: CartService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }


  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe(
      (responseCartItems) => { 
        this.CartItemsDetails = [];
        this.cartCount = responseCartItems?.items.length??0;
        responseCartItems.items.forEach((cartItem:any) => {
          this.productsService.getProduct(cartItem.productId).subscribe(
            (responseProduct) => {
              this.CartItemsDetails.push({
                product: responseProduct,
                quantity: cartItem.quantity
              });
            }
          );
        });
      }
    );
  }

  removeItem(cartitem: CartItemDetails) {
    this.cartService.deleteCartItem(cartitem.product.id);
    this.CartItemsDetails = this.CartItemsDetails.filter(item => item !== cartitem);

  }

  updateCartItemQuantity(event: any, cartitem: CartItemDetails) {
    console.log(event);
    this.cartService.setCartItem({
      productId: cartitem.product.id,
      quantity: event.value
    },true)
  }

}

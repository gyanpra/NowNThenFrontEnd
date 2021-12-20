import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@nownthenfrontend/orders';
import { ProductsService } from '@nownthenfrontend/products';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  totalPrice: number = 0;
  isCheckOut: boolean =false;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrdersService,
    private productsService: ProductsService
  ) { 
    this.router.url.includes('checkout') ? (this.isCheckOut = true) : (this.isCheckOut = false);
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _getOrderSummary() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.productsService
            .getProduct(item.productId)
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

}

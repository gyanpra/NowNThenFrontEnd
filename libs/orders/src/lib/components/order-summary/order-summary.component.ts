import { Component, OnInit } from '@angular/core';
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

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _getOrderSummary() {
    this.cartService.cart$.subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.productsService
            .getProduct(item.productId)
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }
}

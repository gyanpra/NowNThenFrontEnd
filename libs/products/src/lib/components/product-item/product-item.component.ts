import { Component, OnInit,Input } from '@angular/core';
import { Product } from '@nownthenfrontend/products';
import { CartService } from 'libs/orders/src/lib/services/cart.service';
import { CartItem } from 'libs/orders/src/lib/models/cart';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  providers: [MessageService]
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product | any;

  constructor(private cartService: CartService, private messageService:MessageService) { }

  ngOnInit(): void {
  }

  addProductToCart() {

    const CartItem : CartItem = {
      productId : this.product.id,
      quantity : 1,
    }  
    this.cartService.setCartItem(CartItem);
  }

}


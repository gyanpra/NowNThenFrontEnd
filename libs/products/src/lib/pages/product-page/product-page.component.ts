import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'libs/orders/src/lib/services/cart.service';
import { Product } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { CartItem } from 'libs/orders/src/lib/models/cart';


@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product | any;

  

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params.productid){
        this._getProduct(params.productid);

      }
  }
  )
};

  private _getProduct(productid: string){
    this.productsService.getProduct(productid).subscribe(
      resproduct => {
        this.product = resproduct;
        console.log(this.product);
      });

  }

  addProductToCart() {

    const CartItem : CartItem = {
      productId : this.product.id,
      quantity : 1,
    }  
    this.cartService.setCartItem(CartItem);
  }
}

import { Component, OnInit } from '@angular/core';
import {ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.js';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {

  featuredproducts:Product[] = [];

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts(){
    this.productsService.getFeaturedProducts(4).subscribe(products => {
      this.featuredproducts = products;
    });
  }

}

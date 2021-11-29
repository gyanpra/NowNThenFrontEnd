import { Component, OnInit } from '@angular/core';
import { Product } from '@nownthenfrontend/products';
import { Input } from '@angular/core';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}


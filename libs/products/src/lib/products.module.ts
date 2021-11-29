import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoryBannerComponent } from "./components/category-banner/category-banner.component";
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [CommonModule, RouterModule,ButtonModule],
  declarations: [
    ProductSearchComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,

  ],
  exports: [
    ProductSearchComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
  ]
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoryBannerComponent } from "./components/category-banner/category-banner.component";
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import {ButtonModule} from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';


const routes: Routes = [
  {path:'products',component:ProductsListComponent},
  {path:'category/:categoryid',component:ProductsListComponent},
  {path:'products/:productid',component:ProductPageComponent}
]
@NgModule({
  imports: [CommonModule,CheckboxModule, RouterModule.forChild(routes),ButtonModule,FormsModule],
  declarations: [
    ProductSearchComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent,

  ],
  exports: [
    ProductSearchComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent,
  ]
})
export class ProductsModule {}

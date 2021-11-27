import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthguardGuard } from "@nownthenfrontend/users";
import { AddCategoryComponent } from "./pages/categories/add-category/add-category.component";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { OrderDetailComponent } from "./pages/orders/order-detail/order-detail.component";
import { OrdersListComponent } from "./pages/orders/orders-list/orders-list.component";
import { AddProductComponent } from "./pages/products/add-product/add-product.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { AddUserComponent } from "./pages/users/add-user/add-user.component";
import { UserListComponent } from "./pages/users/user-list/user-list.component";
import { MainComponent } from "./shared/main/main.component";


const routes: Routes = [
    {
      path: '',
      component: MainComponent, canActivate: [AuthguardGuard],
      children: [
        { path: '', component: DashboardComponent },
        { path: 'categories', component: CategoriesListComponent },
        { path: 'categories/add', component: AddCategoryComponent },
        { path: 'categories/add/:id', component: AddCategoryComponent },
        { path: 'products', component: ProductsListComponent },
        { path: 'products/add', component: AddProductComponent },
        { path: 'products/add/:id', component: AddProductComponent },
        { path: 'users', component: UserListComponent },
        { path: 'users/add', component: AddUserComponent },
        { path: 'users/add/:id', component: AddUserComponent },
        { path: 'orders', component: OrdersListComponent },
        { path: 'orders/:id', component: OrderDetailComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ],
    },
  ];
  
  
@NgModule({

    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})


export class AppRoutingModule { }
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './shared/main/main.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DockModule } from 'primeng/dock';
import { CategoriesService, ProductsService } from '@nownthenfrontend/products';
import { AddCategoryComponent } from './pages/categories/add-category/add-category.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UsersService } from '@nownthenfrontend/users';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';


const primeModules = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  DockModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  ToggleButtonModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule

];

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoriesListComponent },
      { path: 'categories/add', component: AddCategoryComponent },
      { path: 'categories/add/:id', component: AddCategoryComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/add/:id', component: AddProductComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/add', component: AddUserComponent },
      { path: 'users/add/:id', component: AddUserComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    SidenavComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    ProductsListComponent,
    AddProductComponent,
    AddUserComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...primeModules,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [CategoriesService, MessageService,   ConfirmationService, ProductsService, UsersService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

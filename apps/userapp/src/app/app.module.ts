import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UiModule} from '@nownthenfrontend/ui';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavmenuComponent } from './shared/navmenu/navmenu.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import {ProductsModule} from '@nownthenfrontend/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {OrdersModule} from '@nownthenfrontend/orders';
import { JwtInterceptor, UsersModule } from '@nownthenfrontend/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavmenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ButtonModule,
    AccordionModule,
    BrowserAnimationsModule,
    ProductsModule,
    UiModule,
    OrdersModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

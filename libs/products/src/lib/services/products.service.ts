import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/products';
import { map, Observable } from 'rxjs';
import { environment } from 'environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productAPI = environment.apiURL + 'products';

  constructor(private http: HttpClient) { 

  }

  getProducts(categoryFilter?:string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoryFilter) {
      params = params.append('categories', categoryFilter.join(','));
    }
    return this.http.get<Product[]>(this.productAPI, {params: params});
  }

  getProduct(productid: string): Observable<Product> {
    return this.http.get<Product>(`${this.productAPI}/${productid}`);
  }

  addProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.productAPI, productData);
  }

  deleteProduct(productid: string): Observable<Product> {
    return this.http.delete<Product>(`${this.productAPI}/${productid}`);
  }

  updateProduct(productData: FormData, productid: string, ): Observable<Product> {
    return this.http.put<Product>(`${this.productAPI}/${productid}`, productData);
  }

  getProductCount(): Observable<number> {
    return this.http.get<number>(`${this.productAPI}/get/totalcount`).pipe(map((objectValue: any) => objectValue.count));
  }
  
  getFeaturedProducts(count:number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productAPI}/get/featured/${count}`);
  }


}

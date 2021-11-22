import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/categories';
import { Observable } from 'rxjs';
import { environment } from 'environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoryAPI = environment.apiURL + 'categories';

  constructor(private http: HttpClient) { 

  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryAPI);
  }

  getCategory(categoryid: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryAPI}/${categoryid}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryAPI, category);
  }

  deleteCategory(categoryid: string): Observable<any> {
    return this.http.delete<Category>(`${this.categoryAPI}/${categoryid}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.categoryAPI}/${category.id}`, category);
  }

  

}

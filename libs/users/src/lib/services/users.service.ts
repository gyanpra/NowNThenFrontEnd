import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { environment } from 'environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userAPI = environment.apiURL + 'users';

  constructor(private http: HttpClient) { 

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userAPI);
  }

  getUser(userid: string): Observable<User> {
    return this.http.get<User>(`${this.userAPI}/${userid}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.userAPI, user);
  }

  deleteUser(userid: string): Observable<any> {
    return this.http.delete<any>(`${this.userAPI}/${userid}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userAPI}/${user.id}`, user);
  }
  

}

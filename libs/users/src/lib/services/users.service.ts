import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { map, Observable } from 'rxjs';
import { environment } from 'environment/environment.prod';
import { UsersFacade } from '../state/users.facade';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userAPI = environment.apiURL + 'users';

  constructor(private http: HttpClient, private usersFacade: UsersFacade) { }


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

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.userAPI}/get/totalcount`).pipe(map((objectValue: any) => objectValue.count));
  }

  //for ngrg init app session
  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  //observer current User
  observeCurrentUser(): Observable<User> {
    console.log(this.observeCurrentUser);
    return this.usersFacade.currentUser$;
  }

  //observer current User if authenticated
  isCurrentUserAuthenticated(): Observable<boolean> {
    return this.usersFacade.isAuthenticated$;
  }
  

}

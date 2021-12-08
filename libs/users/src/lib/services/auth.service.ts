import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment/environment.prod';
import { User } from '@nownthenfrontend/users';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAPI = environment.apiURL + 'users';

  constructor(private http: HttpClient, private localstorageService: LocalstorageService, private router: Router) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.userAPI + '/login', { email, password });
  }

  logOut(){
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }



}






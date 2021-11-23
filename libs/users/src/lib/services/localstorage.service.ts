import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  

  constructor() { }

  setToken(data: any) {
    localStorage.setItem(TOKEN_KEY, data);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}

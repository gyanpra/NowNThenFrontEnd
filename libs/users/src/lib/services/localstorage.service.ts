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

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const DecodedToken = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(DecodedToken.exp);   //token not expired
    }
    else{
      return false;
    }
  }

  getUserIdByToken() {
    const token = this.getToken();
    if (token) {
      const DecodedToken = JSON.parse(atob(token.split('.')[1]));
      if(DecodedToken){
        return DecodedToken.userId;
      }
      else{
        return null;
      }
    }
    else{
      return null;
    }
  }

  private _tokenExpired(expiry: any): boolean {
    return Math.floor(Date.now() / 1000) >= expiry;

  }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserauthGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalstorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const token = this.localStorageService.getToken();
    if (token) {
      const DecodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log(DecodedToken.exp);
      
      if (DecodedToken.isAdmin==false && !this._tokenExpired(DecodedToken.exp)) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }


  private _tokenExpired(expiry: any): boolean {
    return Math.floor(Date.now() / 1000) >= expiry;

  }
  
  
  
}

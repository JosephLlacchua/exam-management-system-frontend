import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthenticationApiService} from "./authentication-api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authApi: AuthenticationApiService, private router: Router) {}

  canActivate(): boolean {
    const userId = this.authApi.getUserId();
    if (userId) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

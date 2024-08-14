import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, Subscription} from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../model/user.model';
import { BaseService } from '../../shared/services/base.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends BaseService<User> {
  private authStatus = new Subject<boolean>();



  constructor(
    http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(http);
    this.extraUrl = environment.userURL;
  }

  setUserId(user_id: number) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_id', user_id.toString());
    }
  }

  getUserId(): number {
    if (isPlatformBrowser(this.platformId)) {
      const user_id = localStorage.getItem('user_id');
      return user_id ? parseInt(user_id) : 0;
    }
    return 0;
  }

  getUserById(userId: number): Observable<User> {
    this.setToken();
    return this.http.get<User>(`${this.buildPath()}/${userId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      this.authStatus.next(false);
    }
    this.router.navigate(['/login']);

  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const tokenStr = localStorage.getItem('token');
      return tokenStr !== undefined && tokenStr !== '' && tokenStr !== null;
    }
    return false;
  }

    updateUser(id: number, user: User): Observable<User> {
    return this.update(id, user);
  }

  deleteUser(userId: number): Observable<User> {
    return this.delete(userId);
  }

  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr !== null) {
        return JSON.parse(userStr);
      } else {
        this.logout();
        return null;
      }
    }
    return null;
  }

  getId() {
    return undefined;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseService } from '../shared/services/base.service';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../user/model/user.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService extends BaseService<User> {
  private authStatusSubject = new Subject<boolean>();
  authStatus$ = this.authStatusSubject.asObservable();
  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.authenticationURL;
  }

  signUp(username: string, password: string, name: string, lastname: string, email: string, phone: string, roles: string[]): Observable<any> {
    const user = {
      "username": username,
      "password": password,
      "name": name,
      "lastname": lastname,
      "email": email,
      "phone": phone,
      "roles": ["ROLE_USER"]
    };
    return this.http.post(this.buildPath() + '/sign-up', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  signIn(username: string, password: string): Observable<any> {
    const user = {
      "username": username,
      "password": password,
    };
    return this.http.post(this.buildPath() + '/sign-in', user, this.httpOptions)
      .pipe(catchError(this.handleError))
      .pipe(tap((response: any) => {
        this.newToken(response["token"]);
        localStorage.setItem('user_id', response["id"].toString());
        localStorage.setItem('user', JSON.stringify(user));
        this.authStatusSubject.next(true);
      }));
  }
  getUserId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user_id = localStorage.getItem('user_id');
      return user_id ? parseInt(user_id) : 0;
    }
    return 0;
  }
}

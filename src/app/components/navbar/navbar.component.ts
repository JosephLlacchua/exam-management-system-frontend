import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";
import { AuthenticationApiService } from "../../pages/services/authentication-api.service";
import { UserApiService } from "../../user/services/user-api.service";
import { NgIf } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private authApi: AuthenticationApiService,
    private userApi: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userApi.isLoggedIn();
    if (this.isLoggedIn) {
      const userId = this.userApi.getUserId();
      this.userApi.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    }
    this.authSubscription = this.authApi.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        const userId = this.userApi.getUserId();
        this.userApi.getUserById(userId).subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  navigateToProfile() {
    if (this.user) {
      const role = this.user.roles[0]; // Asume que el usuario tiene al menos un rol
      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin-dashboard/profile']);
      } else if (role === 'ROLE_USER') {
        this.router.navigate(['/user-dashboard/profile']);
      }
    }
  }

  logout(): void {
    this.userApi.logout();
    this.isLoggedIn = false;
    this.user = null;
  }
}

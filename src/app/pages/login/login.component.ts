import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { AuthenticationApiService } from "../services/authentication-api.service";
import { User } from "../../user/model/user.model";
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from "@angular/router";
import { UserApiService } from "../../user/services/user-api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData = {
    "username": '',
    "password": ''
  };

  constructor(
    private authApi: AuthenticationApiService,
    private snack: MatSnackBar,
    private router: Router,
    private userApi: UserApiService,
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.userData.username.trim() === '' || this.userData.username.trim() === null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    if (this.userData.password.trim() === '' || this.userData.password.trim() === null) {
      this.snack.open('La contraseña es requerida !!', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    this.authApi.signIn(this.userData.username, this.userData.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.userApi.getUserById(response.id).subscribe(
          (user) => {
            const role = user.roles[0]; // Asume que el usuario tiene al menos un rol
            if (role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin-dashboard']);
            } else if (role === 'ROLE_USER') {
              this.router.navigate(['/user-dashboard']);
            }
          },
          (error) => {
            console.log(error);
            this.snack.open('Detalles inválidos, vuelva a intentar !!', 'Aceptar', {
              duration: 3000
            });
          }
        );
      },
      (error) => {
        console.log(error);
        this.snack.open('Error de inicio de sesión, vuelva a intentar !!', 'Aceptar', {
          duration: 3000
        });
      }
    );
  }
}

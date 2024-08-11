import {Component, OnInit} from '@angular/core';
import  Swal  from 'sweetalert2';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar,} from '@angular/material/snack-bar';
import {MatCard} from "@angular/material/card";
import {AuthenticationApiService} from "../services/authentication-api.service";
import {User} from "../../user/model/user.model";


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCard,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user: User = new User('', '', '', '', '', '', []);

  constructor(
    private authService: AuthenticationApiService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {


  }

  formSubmit() {
    if (this.user.username.trim() === '' || this.user.password.trim() === '') {
      this.snack.open('El nombre de usuario y la contraseña son requeridos !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    this.authService.signUp(this.user.username, this.user.password, this.user.name, this.user.lastname, this.user.email, this.user.phone, ['ROLE_USER']).subscribe(
      (data) => {
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },
      (error) => {
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {UserApiService} from "../../user/services/user-api.service";
import {User} from "../../user/model/user.model";
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardActions,
    MatButton,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;

  user: User ;

  constructor(
    private userApiService: UserApiService,
    private router: Router,
  ) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    const userId = this.userApiService.getUserId();
    if (userId) {
      this.userApiService.getUserById(userId).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  updateProfile() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres actualizar el perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = this.userApiService.getUserId();
        this.userApiService.updateUser(userId, this.user).subscribe(updatedUser => {
          this.user = updatedUser;
          Swal.fire('Actualizado', 'El perfil ha sido actualizado.', 'success').then(() => {
            window.location.reload();
          } );
          });
      }
    });
  }

  deleteProfile() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres eliminar el perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = this.userApiService.getUserId();
        this.userApiService.deleteUser(userId).subscribe(() => {
          Swal.fire('Eliminado', 'El perfil ha sido eliminado.', 'success').then(() => {
            this.userApiService.logout();
            this.isLoggedIn = false;
            this.user = {} as User;
            window.location.reload();
          });
        });
      }
    });
  }
}

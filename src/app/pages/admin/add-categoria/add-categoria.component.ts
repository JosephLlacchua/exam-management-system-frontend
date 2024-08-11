import {Component, OnInit} from '@angular/core';
import { MatCardModule, MatCardContent } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import {Category} from "../../model/category.model";
import {CategoryApiService} from "../../services/category-api.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-categoria',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css'
})
export class AddCategoriaComponent implements OnInit{
public category: Category=new Category(0,'' ,'', );

constructor(
  private categoryApiService: CategoryApiService,
  private snack: MatSnackBar,
  private router: Router
) {
}
  ngOnInit(): void {
  }

  formSubmit() {
    if(this.category.title.trim() == '' || this.category.description == null){
      this.snack.open("El título es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    this.categoryApiService.addCategory(this.category).subscribe(
      (data) => {
        console.log('Category added successfully', data);
        Swal.fire('Categoría agregada','La categoría ha sido agregada con éxito','success');
        this.router.navigate(['/admin-dashboard/categories']);
      },
      (error) => {
        console.error('Error adding category', error);
        Swal.fire('Error !!','Error al guardar la categoría','error')
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import { Exam } from '../../model/exam.model';
import { ExamApiService } from '../../services/exam-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../../model/category.model';
import { CategoryApiService } from '../../services/category-api.service';

@Component({
  selector: 'app-actualizar-examen',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './actualizar-examen.component.html',
  styleUrl: './actualizar-examen.component.css'
})
export class ActualizarExamenComponent implements OnInit {
  public exam: Exam = {
    id: 0,
    title: '',
    description: '',
    maxPoints: '',
    numberOfQuestions: '',
    active: true,
    categoryId: 0
  };
  categories: Category[] = [];
  id = 0;
  constructor(
    private examApiService: ExamApiService,
    private categoryApiService: CategoryApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.examApiService.getExamById(this.id).subscribe(
        (data: Exam) => {
          this.exam = data;
          console.log(this.exam);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('No se pudo obtener el ID del examen.');
    }
    this.categoryApiService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        alert('Error al cargar las categorías');
      }
    );
  }



  updateExam() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que quieres actualizar el perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.id = this.route.snapshot.params['id'];
        this.examApiService.updateExam(this.id, this.exam).subscribe(
          updatedExam => {
            this.exam = updatedExam;
            Swal.fire('Actualizado', 'El examen ha sido actualizado.', 'success').then(() => {
              this.router.navigate(['/admin-dashboard/exams']);
            });
          },
          (error) => {
            Swal.fire('Error en el sistema', 'No se ha podido actualizar el examen', 'error');
            console.log(error);
          }
        );
      }
    });
  }
}

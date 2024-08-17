// src/app/pages/admin/add-examen/add-examen.component.ts
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { Category } from '../../model/category.model';
import { Exam } from '../../model/exam.model';
import { ExamApiService } from '../../../services/exam-api.service';
import { Router } from '@angular/router';
import { CategoryApiService } from '../../../services/category-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {
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

  constructor(
    private examApiService: ExamApiService,
    private categoryApiService: CategoryApiService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryApiService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveExam() {
    console.log(this.exam);
    if (this.exam.title.trim() === '' || this.exam.title === null) {
      this.snack.open('El título es requerido !!', '', {
        duration: 3000
      });
      return;
    }

    this.examApiService.addExam(this.exam).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Examen guardado','El examen ha sido guardado con éxito','success');
        this.exam = {
          id: 0,
          title: '',
          description: '',
          maxPoints: '',
          numberOfQuestions: '',
          active: true,
          categoryId: 0
        };
        this.router.navigate(['/admin-dashboard/exams']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al guardar el examen', 'error');
      }
    );
  }
}

// src/app/pages/admin/view-examenes/view-examenes.component.ts
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { Exam } from "../../model/exam.model";
import { ExamApiService } from "../../services/exam-api.service";
import Swal from "sweetalert2";
import { Category } from "../../model/category.model";
import { CategoryApiService } from "../../services/category-api.service";

@Component({
  selector: 'app-view-examenes',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit {

  exams: Exam[] = [];
  categories: Category[] = [];

  constructor(
    private examApiService: ExamApiService,
    private categoryApiService: CategoryApiService
  ) {}

  ngOnInit(): void {
    this.examApiService.getAllExams().subscribe(
      (data) => {
        this.exams = data;
        console.log(this.exams);
        this.loadCategories();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los exámenes', 'error');
      }
    );
  }

  loadCategories(): void {
    this.categoryApiService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.assignCategoriesToExams();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las categorías', 'error');
      }
    );
  }

  assignCategoriesToExams(): void {
    this.exams.forEach(exam => {
      exam.category = this.categories.find(category => category.id === exam.categoryId);
    });
  }
  deleteExam(examId: number) {
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Estás seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examApiService.deleteExam(examId).subscribe(
          (data) => {
            this.exams = this.exams.filter((examen: any) => examen.id !== examId);
            Swal.fire('Examen eliminado', 'El examen ha sido eliminado de la base de datos', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el examen', 'error');
          }
        );
      }
    });
  }

}

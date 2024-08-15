import {Component, OnInit} from '@angular/core';
import {Exam} from "../../pages/model/exam.model";
import {ExamApiService} from "../../services/exam-api.service";
import {CategoryApiService} from "../../services/category-api.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent, MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {Category} from "../../pages/model/category.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-load-exam',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    NgIf,
    NgForOf,
    MatCardAvatar,
    MatCardHeader
  ],
  templateUrl: './load-exam.component.html',
  styleUrl: './load-exam.component.css'
})
export class LoadExamComponent implements OnInit {
  exams: Exam[] = [];
  categories: Category[] = [];
  catId: any;

  constructor(
    private examService: ExamApiService,
    private categoryService: CategoryApiService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId==0) {
        console.log("Cargando todos los exámenes");
        this.examService.getAllExamActive().subscribe(
          (data) => {
            this.exams = data;
            console.log(this.exams);
            this.loadCategories();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log(`Cargando exámenes de la categoría ${this.catId}`);
        this.examService.getExamsByCategoryAndActive(this.catId).subscribe(
          (data) => {
            this.exams = data;
            console.log(this.exams);
            this.loadCategories();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
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
}

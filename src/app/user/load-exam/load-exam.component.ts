import {Component, OnInit} from '@angular/core';
import {Exam} from "../../pages/model/exam.model";
import {ExamApiService} from "../../services/exam-api.service";
import {CategoryApiService} from "../../services/category-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-load-exam',
  standalone: true,
  imports: [],
  templateUrl: './load-exam.component.html',
  styleUrl: './load-exam.component.css'
})
export class LoadExamComponent implements OnInit{
  exams: Exam[] = [];
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

      if (this.catId == 0) {
        console.log("Cargando todos los exámenes");
        this.examService.getAllExamActive().subscribe(
          (data) => {
            this.exams = data;
            console.log(this.exams);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log(`Cargando exámenes de la categoría ${this.catId}`);
        this.examService.getExamsByCategory(this.catId).subscribe(
          (data) => {
            this.exams = data;
            console.log(this.exams);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}

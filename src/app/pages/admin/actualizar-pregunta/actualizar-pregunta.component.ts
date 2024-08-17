import {Component, OnInit} from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from "@angular/common";
import {Question} from "../../model/question.model";
import {QuestionApiService} from "../../../services/question-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Exam} from "../../model/exam.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-actualizar-pregunta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './actualizar-pregunta.component.html',
  styleUrl: './actualizar-pregunta.component.css'
})
export class ActualizarPreguntaComponent implements OnInit {
  exam: Exam = {
    id: 0,
    title: '',
    description: '',
    maxPoints: '',
    numberOfQuestions: '',
    active: true,
    categoryId: 0
  }
  question: Question = {
    id: 0,
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    examId: 0
  }
  id = 0;


  constructor(
    private questionService: QuestionApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.exam.id = this.route.snapshot.params['examId'];
    this.exam.title = this.route.snapshot.params['title'];
    if (this.id) {
      this.questionService.getQuestionById(this.id).subscribe(
        (data: Question) => {
          this.question = data;
          console.log(this.question);
        }, (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("No se puedo obtener el ID de la pregunta");
    }
  }

  updateQuestion(): void {
    Swal.fire({
      title: 'Actualizar pregunta',
      text: '¿Estás seguro de que quieres actualizar esta pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.id = this.route.snapshot.params['id'];
        this.questionService.updateQuestion(this.id, this.question).subscribe(
          updateQuestion => {
            this.question = updateQuestion;
            Swal.fire('Pregunta actualizada', 'La pregunta ha sido actualizada con éxito', 'success').then((e) => {
              console.log('Navigating to:', this.exam.id, this.exam.title);  // Debugging line

              this.router.navigate(['/admin-dashboard/questions', this.exam.id, this.exam.title]);
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al actualizar la pregunta', 'error');
            console.log(error);
          }
        );
      }
    });
  }
}

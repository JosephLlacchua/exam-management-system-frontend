import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule, NgForOf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Exam} from "../../model/exam.model";
import {Question} from "../../model/question.model";
import {QuestionApiService} from "../../../services/question-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-pregunta',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgForOf,
    CommonModule
  ],
  templateUrl: './add-pregunta.component.html',
  styleUrl: './add-pregunta.component.css'
})
export class AddPreguntaComponent implements OnInit {

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

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionApiService,
    private router: Router,
    private snack: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.exam.id = this.route.snapshot.params['examId'];  //esto es para obtener el id del examen
    this.exam.title = this.route.snapshot.params['title'];
    this.question.examId = this.exam.id;
  }

  formSubmit(): void {
    console.log(this.question);
    if (this.question.content == '' || this.question.option1 == '' || this.question.option2 == '' || this.question.option3 == '' || this.question.option4 == '' || this.question.correctAnswer == '') {
      this.snack.open('Todos los campos son obligatorios !!!!', '', {
        duration: 3000
      });
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Pregunta añadida', 'Pregunta añadida correctamente', 'success');
        this.question = {
          id: 0,
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: '',
          examId: 0
        };
        this.router.navigate(['/admin-dashboard/questions', this.exam.id, this.exam.title]);      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al añadir la pregunta', 'error');
      }
    );
  }
}

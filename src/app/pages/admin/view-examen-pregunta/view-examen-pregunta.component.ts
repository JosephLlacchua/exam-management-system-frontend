import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Question} from '../../model/question.model';
import {QuestionApiService} from '../../../services/question-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Exam} from '../../model/exam.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-examen-pregunta',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDividerModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './view-examen-pregunta.component.html',
  styleUrls: ['./view-examen-pregunta.component.css']
})
export class ViewExamenPreguntaComponent implements OnInit {
  public exam: Exam = {
    id: 0,
    title: '',
    description: '',
    maxPoints: '',
    numberOfQuestions: '',
    active: true,
    categoryId: 0
  };
  questions: Question[] = [];

  constructor(
    private questionService: QuestionApiService,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.exam.id = this.route.snapshot.params['id'];
    this.exam.title = this.route.snapshot.params['title'];

    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestionsByExamId(this.exam.id).subscribe({
      next: (data) => {
        this.questions = data;
        console.log('Questions:', this.questions); // Agrega esta línea


      },
      error: (err) => {
        this.snack.open('Error al cargar preguntas', '', {
          duration: 3000
        });
      }
    });
  }

  deleteQuestions(questionId: number) {
    console.log('ID recibido en deleteQuestions:', questionId); // Verifica que el ID está siendo pasado correctamente
    if (questionId === undefined || questionId === null) {
      this.snack.open('Error: ID de la pregunta no válido', '', {
        duration: 3000
      });
      return;
    }
    Swal.fire({
      title: 'Eliminar pregunta',
      text: '¿Estás seguro de eliminar la pregunta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(questionId).subscribe(
          (data) => {
            this.loadQuestions();
            Swal.fire('Pregunta eliminada', 'La pregunta ha sido eliminada con éxito', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la pregunta', 'error');
          }
        );
      }
    });
  }

}

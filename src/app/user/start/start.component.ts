import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {LocationStrategy, NgForOf, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Question} from "../../pages/model/question.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {QuestionApiService} from "../../services/question-api.service";
import {FormsModule} from "@angular/forms";
import {Exam} from "../../pages/model/exam.model";
import {MatButton} from "@angular/material/button";
import Swal from "sweetalert2";
import {ExamApiService} from "../../services/exam-api.service";

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    NgIf,
    MatCardContent,
    MatDivider,
    MatCardHeader,
    MatProgressSpinner,
    MatCardActions,
    FormsModule,
    NgForOf,
    MatButton,
    RouterLink
  ],
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  pointsAchieved = 0;
  correctAnswers = 0;
  exam: Exam = {
    id: 0,
    title: '',
    description: '',
    maxPoints: '0',
    numberOfQuestions: '0',
    active: true,
    categoryId: 0
  };
  questions: Question[] = [];
  esEnviado: any;
  timer: number = 0;

  constructor(
    private locationSt: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionApiService,
    private examService: ExamApiService
  ) {}

  ngOnInit() {
    this.bypassTheBackButton();
    this.exam.id = this.route.snapshot.params['examId'];
    this.exam.title = this.route.snapshot.params['title'];
    this.examService.getExamById(this.exam.id).subscribe(
      (data) => {
        console.log(data);
        this.exam = data;
        this.getQuestions(); // Move this inside the subscribe block
      },
      (error) => {
        console.log(error);
      }
    );
  }

  startTimer() {
    let t = window.setInterval(() => {
      if(this.timer <= 0){
        this.evaluarExamen();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  bypassTheBackButton() {
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,null!,location.href);
    })
  }

  getQuestions() {
    this.questionService.getAllQuestionsByExamId(this.exam.id).subscribe(
      (data: any) => {
        this.questions = data.map((question: Question) => {
          return {
            ...question,
            exam: question.exam || { title: '', description: '', maxPoints: '0', numberOfQuestions: '0', active: true, id: 0, categoryId: 0 }
          };
        });
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} : min : ${ss} seg`;
  }

  sendQuestionnaire() {
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Enviar',
      icon:'info'
    }).then((e) => {
      if(e.isConfirmed){
        this.evaluarExamen();
      }
    })
  }

  imprimirPagina() {
    window.print();
  }

  evaluarExamen() {
    this.pointsAchieved = 0;
    this.correctAnswers = 0;

    // Convertir maxPoints a número
    const maxPoints = parseFloat(this.exam.maxPoints);

    if (isNaN(maxPoints) || maxPoints <= 0) {
      console.error("maxPoints es inválido o menor o igual a 0:", maxPoints);
      return;
    }

    const puntosPorPregunta = maxPoints / this.questions.length;

    console.log("Puntos por pregunta:", puntosPorPregunta);

    this.questions.forEach(question => {
      if (question.selectedAnswer === question.correctAnswer) {
        this.correctAnswers++;
        this.pointsAchieved += puntosPorPregunta;
        console.log("Respuesta correcta. Puntos acumulados:", this.pointsAchieved);
      } else {
        console.log("Respuesta incorrecta.");
      }
    });

    console.log("Puntaje final:", this.pointsAchieved);
    this.esEnviado = true;
  }



}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExamApiService} from "../../services/exam-api.service";
import {Exam} from "../../pages/model/exam.model";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import Swal from "sweetalert2";

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatDivider,
    MatCardActions,
    MatButton
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit {
  examId: any;
  exam: Exam = {
    id: 0,
    title: '',
    description: '',
    maxPoints: '',
    numberOfQuestions: '',
    active: true,
    categoryId: 0
  }
  constructor(
    private route: ActivatedRoute,
    private examService: ExamApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.examId= this.route.snapshot.params['examId'];
    this.examService.getExamById(this.examId).subscribe(
      (data) => {
        console.log(data);
        this.exam = data;
      },
      (error) => {
        console.log(error);
      }
    )


  }

  empezarExamen() {
    Swal.fire({
      title:'¿Quieres comenzar el examen?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Empezar',
      icon:'info'
    }).then((result:any) => {
      if(result.isConfirmed){
        this.router.navigate(['/start/'+this.exam.id,this.exam.title]);
      }
    })
  }

}

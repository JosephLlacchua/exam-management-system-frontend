import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Exam } from '../model/exam.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamApiService extends BaseService<Exam> {

  constructor(http: HttpClient,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {
    super(http);
    this.extraUrl = environment.examURL;
  }

  getExamId(): number {
    if (isPlatformBrowser(this.platformId)) {
      const exam_id = localStorage.getItem('exam_id');
      return exam_id ? parseInt(exam_id) : 0;
    }
    return 0;
  }

  getExamById(examId: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.buildPath()}/${examId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllExams() {
    return this.getAll();
  }

  deleteExam(examId: number) {
    return this.delete(examId);
  }

  addExam(exam: Exam) {
    return this.create(exam);
  }

  updateExam(examId: number, exam: Exam) {
    return this.update(examId, exam);
  }
}

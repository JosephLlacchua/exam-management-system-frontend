import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Question} from "../model/question.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService extends BaseService<Question>{

  constructor(http :HttpClient) {
    super(http);
    this.extraUrl = environment.questionURL;
  }

  getQuestionById(questionId: number) {
    return this.http.get<Question>(`${this.buildPath()}/${questionId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAllQuestionsByExamId(examId: number) {
    this.setToken();
    return this.http.get<Question[]>(`${this.buildPath()}/exam/${examId}`, this.httpOptions);
  }


  addQuestion(question: Question) {
    return this.create(question);
  }

  deleteQuestion(questionId: number) {
    return this.delete(questionId);
  }

  updateQuestion(questionId: number, question: Question) {
    return this.update(questionId, question);
  }

}

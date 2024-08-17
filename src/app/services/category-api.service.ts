// src/app/pages/services/category-api.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from "../shared/services/base.service";
import { Category } from "../pages/model/category.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService extends BaseService<Category> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.categoryURL;
  }
  addCategory(category: Category) {
    return this.create(category);
  }
  getAllCategories(): Observable<Category[]> {
    return this.getAll();
  }
}

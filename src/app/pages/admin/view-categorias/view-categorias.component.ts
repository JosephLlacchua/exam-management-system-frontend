import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { Category } from '../../model/category.model';
import { CategoryApiService } from '../../services/category-api.service';
import { NgForOf } from '@angular/common';
import {MatLine} from "@angular/material/core";
import {MatChip} from "@angular/material/chips";

@Component({
  selector: 'app-view-categorias',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    NgForOf,
    MatLine,
    MatChip
  ],
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryApiService: CategoryApiService) {}

  ngOnInit(): void {
    this.categoryApiService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log(this.categories); // Verifica la estructura de los datos
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
}

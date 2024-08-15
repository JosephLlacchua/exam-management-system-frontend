import {Component, NgIterable, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatActionList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {UserApiService} from "../services/user-api.service";
import {CategoryApiService} from "../../services/category-api.service";
import {Category} from "../../pages/model/category.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sidebar-user',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    RouterLink,
    MatListSubheaderCssMatStyler,
    MatListItem,
    MatActionList,
    NgForOf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    public login: UserApiService,
    public categoriesService: CategoryApiService,
    public snack: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      }, error => {
        this.snack.open('Error al cargar las categorías', '', {
          duration: 3000
        })
        console.log(error);
      }
    )
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }


}

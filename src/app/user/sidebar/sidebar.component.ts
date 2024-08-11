import {Component, NgIterable, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatActionList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {UserApiService} from "../services/user-api.service";

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
export class SidebarComponent implements OnInit{
  constructor(public login:UserApiService) { }

  ngOnInit(): void {
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }


}

import {Component, OnInit} from '@angular/core';
import {MatActionList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatCard} from "@angular/material/card";
import {AuthenticationApiService} from "../../services/authentication-api.service";
import {UserApiService} from "../../../user/services/user-api.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatActionList,
    MatIcon,
    MatCard,
    RouterLink,
    MatListItem,
    MatListSubheaderCssMatStyler
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(public login:UserApiService) { }

  ngOnInit(): void {

  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}

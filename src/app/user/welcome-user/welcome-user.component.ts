import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-welcome-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatDivider,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.css'
})
export class WelcomeUserComponent {

}

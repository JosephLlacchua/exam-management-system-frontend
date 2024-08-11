import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatDivider,
    MatCardContent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}

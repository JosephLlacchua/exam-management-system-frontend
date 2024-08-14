import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf, ViewportScroller} from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {UserApiService} from "../../user/services/user-api.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCard,
    MatCardContent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  items = [
    { src: 'assets/exam1.png', title: 'Ecuaciones Básicas', examType: 'Matemáticas', isPremium: false },
    { src: 'assets/exam2.png', title: 'Química Avanzada', examType: 'Ciencias', isPremium: true },
    { src: 'assets/exam3.png', title: 'Literatura Clásica', examType: 'Lenguaje', isPremium: false },
    { src: 'assets/exam1.png', title: 'Historia Universal', examType: 'Historia', isPremium: false },
    { src: 'assets/exam1.png', title: 'Física Cuántica', examType: 'Física', isPremium: true },
  ];

  text: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserApiService,
              private viewportScroller: ViewportScroller) { }

  scrollToSection(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit() {

  }
}

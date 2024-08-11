import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './pages/services/auth-guard.service';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import {ProfileComponent} from "./pages/profile/profile.component";
import {WelcomeUserComponent} from "./user/welcome-user/welcome-user.component";
import {AddCategoriaComponent} from "./pages/admin/add-categoria/add-categoria.component";
import {ViewCategoriasComponent} from "./pages/admin/view-categorias/view-categorias.component";
import {AddExamenComponent} from "./pages/admin/add-examen/add-examen.component";
import {ViewExamenesComponent} from "./pages/admin/view-examenes/view-examenes.component";
import {ActualizarPreguntaComponent} from "./pages/admin/actualizar-pregunta/actualizar-pregunta.component";
import {ViewExamenPreguntaComponent} from "./pages/admin/view-examen-pregunta/view-examen-pregunta.component";
import {ActualizarExamenComponent} from "./pages/admin/actualizar-examen/actualizar-examen.component";
import {AddPreguntaComponent} from "./pages/admin/add-pregunta/add-pregunta.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      { path: '', component: WelcomeComponent },
      {path:'profile', component:ProfileComponent},
      {path: 'categories', component: ViewCategoriasComponent},
      {path: 'exams', component: ViewExamenesComponent},
      {path: 'add-exam', component: AddExamenComponent},
      {path: 'add-category', component: AddCategoriaComponent},
      {path:'questions/:id/:title',component: ViewExamenPreguntaComponent},
      {path:'update-questions/:id/:examId/:title',component:ActualizarPreguntaComponent},
      { path:'update-exam/:id', component: ActualizarExamenComponent },
      {path: 'add-question/:examId/:title', component: AddPreguntaComponent},
    ]
  },

  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard], data: { roles: ['ROLE_USER'] },
    children:[
      {path: '', component: WelcomeUserComponent},
      {path:'profile', component:ProfileComponent},
    ]},



  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

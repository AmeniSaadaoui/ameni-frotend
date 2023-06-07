import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListEmployeComponent } from './components/employe/list-employe/list-employe.component';
import { ListEquipeComponent } from './components/equipe/list-equipe/list-equipe.component';
import { ListSuperviseurComponent } from './components/superviseur/list-superviseur/list-superviseur.component';
import { ListSuccursaleComponent } from './components/succursale/list-succursale/list-succursale.component';
import { ListPointeuseComponent } from './components/pointeuse/list-pointeuse/list-pointeuse.component';
import { ListPlanningComponent } from './components/planning/list-planning/list-planning.component';
import { ListAutorisationSortieComponent } from './components/autorisationSortie/list-autorisation-sortie/list-autorisation-sortie.component';
import { ListPointageComponent } from './components/pointage/list-pointage/list-pointage.component';
import { ListCongeComponent } from './components/conge/list-conge/list-conge.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'employe', component: ListEmployeComponent },
  {path: 'equipe', component: ListEquipeComponent},
  {path:'superviseur', component: ListSuperviseurComponent},
  {path:'succursale',component: ListSuccursaleComponent},
  {path:'pointeuse',component:ListPointeuseComponent},
  {path:'planning', component:ListPlanningComponent},
  {path:'autorisationSortie', component:ListAutorisationSortieComponent},
  {path:'pointage', component:ListPointageComponent},
  {path:'conge', component:ListCongeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'dashboard', component: DashboardComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
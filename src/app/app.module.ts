import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListEmployeComponent } from './components/employe/list-employe/list-employe.component';
import { ListSuccursaleComponent } from './components/succursale/list-succursale/list-succursale.component';
import { ListEquipeComponent } from './components/equipe/list-equipe/list-equipe.component';
import { ListSuperviseurComponent } from './components/superviseur/list-superviseur/list-superviseur.component';
import { ListPointeuseComponent } from './components/pointeuse/list-pointeuse/list-pointeuse.component';
import { ListPointageComponent } from './components/pointage/list-pointage/list-pointage.component';
import { ListAutorisationSortieComponent } from './components/autorisationSortie/list-autorisation-sortie/list-autorisation-sortie.component';
import { ListPlanningComponent } from './components/planning/list-planning/list-planning.component';
import { ListCongeComponent } from './components/conge/list-conge/list-conge.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    
      
    AppComponent,
    ListEmployeComponent,
    ListSuccursaleComponent,
    ListEquipeComponent,
    ListSuperviseurComponent,
    ListPointeuseComponent,
    ListPointageComponent,
    ListAutorisationSortieComponent,
    ListPlanningComponent,
    ListCongeComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    
    
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

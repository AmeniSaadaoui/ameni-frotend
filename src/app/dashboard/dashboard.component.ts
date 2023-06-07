import { Component } from '@angular/core';
//import { PointageService } from 'src/app/services/pointage.service';

interface Succursale {
  nom: string;
  pointeuses: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //pointages: any;

  employes: any[] = [
    { succursale: 'Netadvisor Sfax', nombre: 2 },
    { succursale: 'Netadvisor Tunis', nombre: 1 },
    { succursale: 'Netadvisor sousse', nombre: 0 },
    { succursale: 'Netadvisor nabeul', nombre: 0},
    
    // Ajoutez d'autres employés selon vos besoins
  ];

  calculerTotalEffectifs(): number {
    let totalEffectifs = 0;
    for (const employe of this.employes) {
      totalEffectifs += employe.nombre;
    }
    return totalEffectifs;
  }

  succursales: Succursale[] = [
    { nom: 'Netadvisor Sfax', pointeuses: 2 },
    { nom: 'Netadvisor Tunis', pointeuses: 2},
    { nom: 'Netadvisor sousse', pointeuses: 2 },
    { nom: 'Netadvisor nabeul', pointeuses: 1 },
    
  ];

  getTotalPointeuses(): number {
    return this.succursales.reduce((total, succursale) => total + succursale.pointeuses, 0);
  }

  

}

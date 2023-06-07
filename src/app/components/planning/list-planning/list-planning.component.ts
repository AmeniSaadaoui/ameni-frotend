import { Component, OnInit } from '@angular/core';
import { PlanningService } from 'src/app/services/planning.service';
declare var $: any;

@Component({
  selector: 'app-list-planning',
  templateUrl: './list-planning.component.html',
  styleUrls: ['./list-planning.component.css']
})
export class ListPlanningComponent implements OnInit {
  dataSend = {
    description: '',
    date_debut: '',
    date_fin: '',
    heure_debut: '',
    heure_fin: '',
    published: false
  };

  dataUpdate = {
    description: '',
    date_debut: '',
    date_fin: '',
    heure_debut: '',
    heure_fin: '',
    published: false
  };

  dataDelete = {
    published: false
  };

  submitted = false;
  listAll: any;
  currentItem = null;
  currentIndex = -1;
  idItem = 0;
  title = '';
  name = '';

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.retrievelist();
    this.styleTable();
  }

  saveData(): void {
    var ret = '';
    const data = {
      description: this.dataSend.description,
      date_debut: this.dataSend.date_debut,
      date_fin: this.dataSend.date_fin,
      heure_debut: this.dataSend.heure_debut,
      heure_fin: this.dataSend.heure_fin
    };

    ret = this.verifData(data);
    if (ret.length > 0) {
      $.toast().reset('all');
      $.toast({
        heading: 'Error',
        text: ret,
        position: 'bottom-right',
        showHideTransition: 'fade',
        icon: 'error'
      });
    } else {
      $.toast().reset('all');
      this.planningService.create(data).subscribe(
        response => {
          console.log(response);
          this.refreshList();
          this.newData();
          this.submitted = true;
          $.toast().reset('all');
          $.toast({
            heading: 'Success',
            position: 'bottom-right',
            text: 'Planning ajouté avec succès',
            showHideTransition: 'slide',
            icon: 'success'
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  newData(): void {
    this.submitted = false;
    this.dataSend = {
      description: '',
      date_debut: '',
      date_fin: '',
      heure_debut: '',
      heure_fin: '',
      published: false
    };
  }

  retrievelist(): void {
    this.planningService.getAll().subscribe(
      data => {
        this.listAll = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  styleTable(): void {
    setTimeout(() => {
      $('#dataTable-1').DataTable({
        autoWidth: true,
        lengthMenu: [
          [16, 32, 64, -1],
          [16, 32, 64, 'All']
        ]
      });
    }, 100);
  }

  refreshList(): void {
    this.retrievelist();
    this.currentItem = null;
    this.currentIndex = -1;
  }

  setItem(data: any): void {
    this.reset();
    this.idItem = data.id.id;
    this.submitted = false;
    this.dataUpdate = {
      description: data.description,
      date_debut: data.date_debut,
      date_fin: data.date_fin,
      heure_debut: data.heure_debut,
      heure_fin: data.heure_fin,
      published: false
    };
  }

  deleteItem(id: any): void {
    this.reset();
    this.idItem = id.id;
    this.submitted = false;
    var d = new Date();
    this.name = id.description + ' ';
  }

  saveUpdate(id: any): void {
    var ret = '';
    const data = {
      description: this.dataUpdate.description,
      date_debut: this.dataUpdate.date_debut,
      date_fin: this.dataUpdate.date_fin,
      heure_debut: this.dataUpdate.heure_debut,
      heure_fin: this.dataUpdate.heure_fin
    };
    ret = this.verifData(data);
    if (ret.length > 0) {
      $.toast().reset('all');
      $.toast({
        heading: 'Error',
        text: ret,
        position: 'bottom-right',
        showHideTransition: 'fade',
        icon: 'error'
      });
    } else {
      $.toast().reset('all');
      this.planningService.update(id, data).subscribe(
        response => {
          this.refreshList();
          this.newData();
          this.submitted = true;
          $.toast().reset('all');
          $.toast({
            heading: 'Success',
            position: 'bottom-right',
            text: 'Planning modifié avec succès',
            showHideTransition: 'slide',
            icon: 'success'
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
  
  
  
  
  
  
  
  saveDelete(id: any): void {
    this.planningService.get(id).subscribe(
      data2 => {
        this.planningService.delete(id).subscribe(
          data => {
            this.refreshList();
            $.toast({
              heading: 'Success',
              position: 'bottom-right',
              text: 'Planning ' + this.name + ' supprimé',
              showHideTransition: 'slide',
              icon: 'success'
            });
          },
          error => {
            $.toast({
              heading: 'Error',
              text: 'Erreur ! ',
              position: 'bottom-right',
              showHideTransition: 'fade',
              icon: 'error'
            });
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  verifData(data: any) {
    var ret = '';
    if (data.description == '') {
      ret += 'Description invalide<br>';
      $('.description').css('border', '1px solid red');
    } else {
      $('.description').css('border', '1px solid green');
    }

    if (data.date_debut == '') {
      ret += 'Date début invalide<br>';
      $('.date_debut').css('border', '1px solid red');
    } else {
      $('.date_debut').css('border', '1px solid green');
    }

    if (data.date_fin == '') {
      ret += 'Date_fin invalide<br>';
      $('.date_fin').css('border', '1px solid red');
    } else {
      $('.date_fin').css('border', '1px solid green');
    }

    if (data.heure_debut == '') {
      ret += 'Heure debut invalide<br>';
      $('.heure_debut').css('border', '1px solid red');
    } else {
      $('.heure_debut').css('border', '1px solid green');
    }

    if (data.heure_fin == '') {
      ret += 'Heure_fin invalide<br>';
      $('.heure_fin').css('border', '1px solid red');
    } else {
      $('.heure_fin').css('border', '1px solid green');
    }

    return ret;
  }

  reset(): void {
    $('.description').css('border', 'none');
    $('.date_debut').css('border', 'none');
    $('.date_fin').css('border', 'none');
    $('.heure_debut').css('border', 'none');
    $('.heure_fin').css('border', 'none');
  }
}

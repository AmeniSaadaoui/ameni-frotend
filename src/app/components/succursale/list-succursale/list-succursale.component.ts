import { Component, OnInit } from '@angular/core';
import { SuccursaleService } from 'src/app/services/succursale.service';
declare var $: any;

@Component({
  selector: 'app-list-succursale',
  templateUrl: './list-succursale.component.html',
  styleUrls: ['./list-succursale.component.css']
})
export class ListSuccursaleComponent implements OnInit {
  listeIntermidiare: any;
  searchText: any;
  datafilter = {
    name: "Sfax"
  }

  dataSend = {
    nom: '',
    adresse: '',
    ville: '',
    email: '',
    telephone: 0,
    date_creation: new Date(),
    published: false
  };

  dataUpdate = {
    nom: '',
    adresse: '',
    ville: '',
    email: '',
    telephone: 0,
    date_creation: new Date(),
    published: false
  };

  dataDelete = {
    succursale: '',
    published: false
  };

  submitted = false;
  listAll: any;
  currentItem = null;
  currentIndex = -1;
  idItem = 0;
  title = '';
  name = "";

  constructor(private succursaleService: SuccursaleService) { }

  ngOnInit(): void {
    this.retrieveList();
    this.styleTable();
  }

  /****** création des données */
  saveData(): void {
    var ret = "";
    const data = {
      nom: this.dataSend.nom,
      adresse: this.dataSend.adresse,
      ville: this.dataSend.ville,
      telephone: this.dataSend.telephone,
      email: this.dataSend.email,
      date_creation: this.dataSend.date_creation
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
      this.succursaleService.create(data)
        .subscribe(
          response => {
            console.log(response);
            this.refreshList();
            this.newData();
            this.submitted = true;
            $.toast().reset('all');
            $.toast({
              heading: 'Success',
              position: 'bottom-right',
              text: 'Succursale ajoutée avec succès',
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
      nom: '',
      adresse: '',
      ville: '',
      email: '',
      telephone: 0,
      date_creation: new Date(),
      published: false
    };
  }

  retrieveList(): void {
    this.succursaleService.getAll()
      .subscribe(
        data => {
          this.listAll = data;
          this.listeIntermidiare = data;
          this.countSuccursales(); // Appel de la fonction pour compter le nombre de succursales
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
        "lengthMenu": [
          [16, 32, 64, -1],
          [16, 32, 64, "All"]
        ]
      });
    }, 100);
  }

  refreshList(): void {
    this.retrieveList();
    this.currentItem = null;
    this.currentIndex = -1;
  }

  setItem(data: any): void {
    this.reset();
    this.idItem = data.id;
    this.submitted = false;
    this.dataUpdate = {
      nom: data.nom,
      adresse: data.adresse,
      ville: data.ville,
      telephone: data.telephone,
      date_creation: data.date_creation,
      email: data.email,
      published: false
    };
  }

  deleteItem(id: any): void {
    this.reset();
    this.idItem = id;
    this.submitted = false;
    var d = new Date();
    this.name = id.nom + " ";
  }

  saveUpdate(id: any, ville: any): void {
    var ret = "";
    const data = {
      nom: this.dataUpdate.nom,
      adresse: this.dataUpdate.adresse,
      telephone: this.dataUpdate.telephone,
      date_creation: this.dataUpdate.date_creation,
      email: this.dataUpdate.email
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
      this.succursaleService.update(id, data)
        .subscribe(
          response => {
            this.refreshList();
            this.newData();
            this.submitted = true;
            $.toast().reset('all');
            $.toast({
              heading: 'Success',
              position: 'bottom-right',
              text: 'Succursale modifiée avec succès',
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
    this.succursaleService.get(id)
      .subscribe(
        data2 => {
          this.succursaleService.delete(id).subscribe(
            data => {
              this.refreshList();
              $.toast({
                heading: 'Success',
                position: 'bottom-right',
                text: 'Succursale ' + this.name + ' supprimée',
                showHideTransition: 'slide',
                icon: 'success'
              });
            },
            error => {
              $.toast({
                heading: 'Error',
                text: "Erreur ! ",
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

  verifData(data: any): string {
    var ret = "";
    if (data.nom == "") {
      ret += "Nom invalide<br>";
      $(".nom").css("border", "1px solid red");
    } else {
      $(".nom").css("border", "1px solid green");
    }

    if (data.adresse == "") {
      ret += "Adresse invalide<br>";
      $(".adresse").css("border", "1px solid red");
    } else {
      $(".adresse").css("border", "1px solid green");
    }

    if (data.ville == "") {
      ret += "Ville invalide<br>";
      $(".ville").css("border", "1px solid red");
    } else {
      $(".ville").css("border", "1px solid green");
    }

    if (data.telephone == 0) {
      ret += "Telephone invalide<br>";
      $(".telephone").css("border", "1px solid red");
    } else {
      $(".telephone").css("border", "1px solid green");
    }

    if (data.date_creation == "" ) {
      ret += "Date de création invalide<br>";
      $(".date_creation").css("border", "1px solid red");
    } else {
      $(".date_creation").css("border", "1px solid green");
    }

    if (data.email == "") {
      ret += "Email invalide<br>";
      $(".email").css("border", "1px solid red");
    } else {
      $(".email").css("border", "1px solid green");
    }

    return ret;
  }

  reset(): void {
    $(".nom").css("border", "none");
    $(".adresse").css("border", "none");
    $(".telephone").css("border", "none");
    $(".date_creation").css("border", "none");
    $(".email").css("border", "none");
  }

  filterAvance(): void {
    this.listAll = this.listeIntermidiare;
    let list = new Array();
    for (var i = 0; i < this.listAll.length; i++) {
      if (this.listAll[i].ville == this.datafilter.name) {
        list.push(this.listAll[i]);
      }
    }
    this.listAll = list;
  }

  countSuccursales(): number {
    return this.listAll.length;
  }
}

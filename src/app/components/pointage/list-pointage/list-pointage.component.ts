import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/employe.service';
import { HeureprevueService } from 'src/app/services/heureprevue.service';
import { PointageService } from 'src/app/services/pointage.service';
import { PointeuseService } from 'src/app/services/pointeuse.service';
import { SuccursaleService } from 'src/app/services/succursale.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-list-pointage',
  templateUrl: './list-pointage.component.html',
  styleUrls: ['./list-pointage.component.css']
})
export class ListPointageComponent implements OnInit {
  listeEmploye: any;
  listeSuccursale: any;
  listePointeuse: any;
  listeHeureprevue: any;
  listeIntermidiare: any;
  searchText: any;
  datafilter = {
    name: "NetAdvisor-Sfax"
  }

  dataSend = {
    employe: '',
    date: '',
    heureprevue: '',
    pointage: '',
    pointeuse: '',
    succursale: '',
    retard:'',
    published: false
  };

  dataUpdate = {
    employe: '',
    pointage: '',
    pointeuse: '',
    date: '',
    heureprevue: '',
    succursale: '',
    retard:'',
    published: false
  };

  dataDelete = {
    published: false
  };

  submitted = false;
  listAll: any[] = [];
  currentItem = null;
  currentIndex = -1;
  idItem = 0;
  title = '';
  name = "";

  constructor(
    private pointageService: PointageService,
    private pointeuseService: PointeuseService,
    private employeService: EmployeService,
    private heureprevueService: HeureprevueService,
    private succursaleService: SuccursaleService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.retrieveList();
    this.recuperationListeSelect();
    this.styleTable();
  }

  /****** creation data  */
  saveData(): void {
    var ret = "";
    const data = {
      employe: JSON.parse(JSON.stringify(this.dataSend.employe)),
      pointage: this.dataSend.pointage,
      pointeuses: JSON.parse(JSON.stringify(this.dataSend.pointeuse)),
      heureprevues: JSON.parse(JSON.stringify(this.dataSend.heureprevue)),
      succursales: JSON.parse(JSON.stringify(this.dataSend.succursale)),
      date: this.dataSend.date,
      retard:this.dataSend.retard
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
      })
    } else {
      $.toast().reset('all');
      this.pointageService.create(data).subscribe(
        response => {
          console.log(response);
          this.refreshList();
          this.newData();
          this.submitted = true;
          $.toast().reset('all');
          $.toast({
            heading: 'Success',
            position: 'bottom-right',
            text: 'Pointage ajouté avec succès',
            showHideTransition: 'slide',
            icon: 'success'
          })
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
      employe: '',
      date: '',
      heureprevue: '',
      pointage: '',
      pointeuse: '',
      succursale: '',
      retard:'',
      published: false
    };
  }

  retrieveList(): void {
    this.pointageService.getAll().subscribe(
      data => {
        this.listAll = data;
        this.listeIntermidiare = data;
        this.countPointages();
      },
      error => {
        console.log(error);
      }
    );
  }

  styleTable(): void {
    setTimeout(() => {
      const table =$('#dataTable-1').DataTable({
        autoWidth: true,
        lengthMenu: [
          [16, 32, 64, -1],
          [16, 32, 64, "All"]
        ]
      });
      table.cells('.retard-green').nodes().to$().addClass('retard-green');
    table.
   
cells('.retard-red').nodes().to$().addClass('retard-red');
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
      employe: data.employe,
      pointage: data.pointage,
      pointeuse: data.pointeuse,
      date: data.date,
      heureprevue: data.heureprevue,
      succursale: data.succursale,
      retard:data.retard,
      published: false
    };
  }

  deleteItem(id: any): void {
    this.reset();
    this.idItem = id;
    this.submitted = false;
    var d = new Date();
    this.name = id.employes.nom + " " + id.employes.prenom;
  }

  saveUpdate(id: any): void {
    var ret = "";
    const data = {
      employe: this.dataUpdate.employe,
      pointage: this.dataUpdate.pointage,
      pointeuse: this.dataUpdate.pointeuse,
      date: this.dataUpdate.date,
      heureprevue: this.dataUpdate.heureprevue,
      succursale: this.dataUpdate,
      published: false
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
      this.pointageService.update(id, data).subscribe(
        response => {
          this.refreshList();
          this.newData();
          this.submitted = true;
          $.toast().reset('all');
          $.toast({
            heading: 'Success',
            position: 'bottom-right',
            text: 'Pointage modifié avec succès',
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
    this.pointageService.get(id).subscribe(
      data2 => {
        this.pointageService.delete(id).subscribe(
          data => {
            this.refreshList();
            $.toast({
              heading: 'Success',
              position: 'bottom-right',
              text: 'Pointage ' + this.name + ' supprimé',
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

  verifData(data: any) {
    var ret = "";
    if (data.employe == "") {
      ret += "Employe invalide<br>";
      $(".employe").css("border", "1px solid red");
    } else {
      $(".employe").css("border", "1px solid green");
    }
    if (data.date == '') {
      ret += "date invalide<br>";
      $(".date").css("border", "1px solid red");
    } else {
      $(".date").css("border", "1px solid green");
    }
    if (data.heureprevue == '') {
      ret += "heureprevue invalide<br>";
      $(".heureprevue").css("border", "1px solid red");
    } else {
      $(".heureprevue").css("border", "1px solid green");
    }
    if (data.pointage == '') {
      ret += "pointage invalide<br>";
      $(".pointage").css("border", "1px solid red");
    } else {
      $(".pointage").css("border", "1px solid green");
    }
    if (data.pointeuse == "") {
      ret += "pointeuse is invalide<br>";
      $(".pointeuse").css("border", "1px solid red");
    } else {
      $(".pointeuse").css("border", "1px solid green");
    }
    if (data.succursale == '') {
      ret += "succursale invalide<br>";
      $(".succursale").css("border", "1px solid red");
    } else {
      $(".succursale").css("border", "1px solid green");
    }
    return ret;
  }

  reset(): void {
    $(".nom").css("border", "none");
    $(".pointage").css("border", "none");
    $(".pointeuse").css("border", "none");
    $(".date").css("border", "none");
    $(".heuresortie").css("border", "none");
  }

  recuperationListeSelect(): void {
    this.employeService.getAll().subscribe(
      response => {
        this.listeEmploye = response;
      },
      error => {
        console.log(error);
      }
    );
    this.pointeuseService.getAll().subscribe(
      response => {
        this.listePointeuse = response;
      },
      error => {
        console.log(error);
      }
    );
    this.heureprevueService.getAll().subscribe(
      response => {
        this.listeHeureprevue = response;
      },
      error => {
        console.log(error);
      }
    );
    this.succursaleService.getAll().subscribe(
      response => {
        this.listeSuccursale = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  filterAvance(): void {
    this.listAll = this.listeIntermidiare;
    let list = [];
    for (var i = 0; i < this.listAll.length; i++) {
      if (this.listAll[i].succursales.nom == this.datafilter.name) list.push(this.listAll[i]);
    }
    this.listAll = list;
  }

  countPointages(): number {
    return this.listAll.length;
  }
  getRetardClass(retard: number): string {
  
 
    if (retard < 0) {
        return 'retard-green';
      } 
     
    else if (retard > 0) {
        return 'retard-red';
      } 
      
    else {
        return '';
    }
  }


}

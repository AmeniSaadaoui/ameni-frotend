import { Component, OnInit } from '@angular/core';
declare var $: any;
import { EmployeService } from 'src/app/services/employe.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { DatePipe } from '@angular/common'
import { SuperviseurService } from 'src/app/services/superviseur.service';
import { PointeuseService } from 'src/app/services/pointeuse.service';
import { PlanningService } from 'src/app/services/planning.service';
import { SexeService } from 'src/app/services/sexe.service';
import { SuccursaleService } from 'src/app/services/succursale.service';
import { TypeContratService } from 'src/app/services/type-contrat.service';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})

export class ListEmployeComponent implements OnInit {
  listeEquipe:any ;
  listeSuperviseur:any;
  listePointeuse:any;
  listePlanning:any;
  listeSexe:any;
  listeSuccursale:any;
  listeTypeContrat:any;
  listeIntermidiare:any;
  searchText: any;
  datafilter={
    name:"Sfax"
  }
  

  dataSend = {
    nom: '',
    prenom: '',
    date_naissance: '',
    sexe:'',
    adresse:"",
    telephone:0,
    email: '',
    equipe:'',
    superviseur:'',
    typeContrat:'',
    debutcontrat:'',
    matricule:'',
    pointeuse:'',
    planning:'',
    succursale:'',
  
    published: false

  };
  dataUpdate = {
    nom: '',
    prenom: '',
    date_naissance: '',
    sexe:'',
    adresse:"",
    telephone:0,
    email: '',
    equipe:'',
    superviseur:'',
    typeContrat:'',
    debutcontrat:'',
    matricule:'',
    pointeuse:'',
    planning:'',
    succursale:'',
     
    published: false

  };
  dataDelete = {
  
  
    
    published: false

  };
  submitted = false;

  listAll: any;
  currentItem = null;
  currentIndex = -1;
  idItem=0;
  title = '';
  name="";
  datepipe: any;
  

constructor(private employeService: EmployeService,private equipeService:EquipeService,private superviseurService:SuperviseurService,private pointeuseService:PointeuseService, private planningService:PlanningService,private sexeService:SexeService, private succursaleService: SuccursaleService,private typeContratService: TypeContratService) { }




ngOnInit(): void {
 

  this.retrievelist();
 this.recuperationListeSelect();
  this.styleTable();
 

}
/****** creation data  */
saveData(): void {
  var ret="";
  const data = {
   
    nom: this.dataSend.nom,
    prenom: this.dataSend.prenom,
    date_naissance:this.dataSend.date_naissance,
    sexs:JSON.parse(JSON.stringify(this.dataSend.sexe)),
    adresse:this.dataSend.adresse,
    telephone:this.dataSend.telephone,
    email: this.dataSend.email,
    matricule:this.dataSend.matricule,
    equipes:JSON.parse(JSON.stringify(this.dataSend.equipe)),
    superviseurs:JSON.parse(JSON.stringify(this.dataSend.superviseur)),
    pointeuses:JSON.parse(JSON.stringify(this.dataSend.pointeuse)),
    plannings:JSON.parse(JSON.stringify(this.dataSend.planning)),
    succursales:JSON.parse(JSON.stringify(this.dataSend.succursale)),
    typeContrats:JSON.parse(JSON.stringify(this.dataSend.typeContrat)),
    debutcontrat:this.dataSend.debutcontrat,
    
   
  };

  ret=this.verifData(data);
if(ret.length>0)
{
  $.toast().reset('all');
  $.toast({
    heading: 'Error',
    text: ret,
    position: 'bottom-right',
    showHideTransition: 'fade',
    icon: 'error'
  })
}else
{
  $.toast().reset('all');
  this.employeService.create(data)
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
        text: 'Employer ajouter avec succeess',
        showHideTransition: 'slide',
        icon: 'success'
    })
    },
    error => {
      console.log(error);
    });
}

 
}
newData(): void {
  this.submitted = false;
  this.dataSend = {
    nom: '',
    prenom: '',
    date_naissance: '',
    sexe:'',
    adresse:"",
    telephone:0,
    email: '',
    equipe:'',
    superviseur:'',
    typeContrat:'',
    debutcontrat:'',
    matricule:'',
    pointeuse:'',
    planning:'',
    succursale:'',
    
    published: false
    
  };
}
retrievelist():void {
  
  this.employeService.getAll()
      .subscribe(
        data => {
          this.listAll = data;
          this.listeIntermidiare=data;
          this.countEmployes();
         
          
        },
        error => {
         
          
        });
  
  }
  styleTable():void{
    setTimeout(() => {
      $('#dataTable-1').DataTable({
        autoWidth: true,
        "lengthMenu": [
            [16, 32, 64, -1],
            [16, 32, 64, "All"]
        ]
      });
    },100);
  
  }
  refreshList(): void {
   
    this.retrievelist();
    this.currentItem = null;
    this.currentIndex = -1;
  
  }
  showItem(data: any): void {
    this.reset();
  
    this.idItem = data.id;
    this.submitted = false;
    this.dataUpdate = {
      nom: data.nom,
      prenom: data.prenom,
      date_naissance: data.date_naissance,
      sexe: data.sexe,
      adresse: data.adresse,
      telephone: data.telephone,
      email: data.email,
      equipe: data.equipe,
      superviseur: data.superviseur,
      typeContrat: data.typeContrat,
      debutcontrat: data.debutcontrat,
      matricule: data.matricule,
      pointeuse: data.pointeuse,
      planning: data.plannings,
      succursale: data.succursale,
      published: false
    };
  
  }
  setItem(data:any):void{
    this.reset();
   
       this.idItem=data.id;
       this.submitted = false;
       this.dataUpdate = {
         nom:data.nom,
         prenom: data.prenom,
         date_naissance: data.date_naissance,
         sexe:data.sexe,
         adresse:data.adresse,
         telephone:data.telephone,
         email: data.email,
         equipe:data.equipe,
         superviseur:data.superviseur,
         typeContrat:data.typeContrat,
         debutcontrat:data.debutcontrat,
         matricule:data.matricule,
         pointeuse:data.pointeuse,
         planning:data.plannings,
         succursale:data.succursale,
         
         published: false
       };
     
      
  }
  deleteItem(id:any):void{
    this.reset();
    this.idItem=id;
       this.submitted = false;
       var d =new Date();
     this.name=id.employes.nom+" "+id.employes.prenom;
    };

  saveUpdate(id:any):void{
    var ret="";
    const data = {
      nom: this.dataUpdate.nom,
      prenom: this.dataUpdate.prenom,
      date_naissance:this.dataUpdate.date_naissance,
      adresse:this.dataUpdate.adresse,
      telephone:this.dataUpdate.telephone,
      email: this.dataUpdate.email,
      equipes:this.dataUpdate.equipe,
      superviseurs:this.dataUpdate.superviseur,
      typeContrats:this.dataUpdate.typeContrat,
      pointeuses:this.dataUpdate.pointeuse,
      plannings:this.dataUpdate.planning,
      debutcontrat:this.dataUpdate.debutcontrat,
     
      
    };
    ret=this.verifData(data);
  if(ret.length>0)
  {
    $.toast().reset('all');
    $.toast({
      heading: 'Error',
      text: ret,
      position: 'bottom-right',
      showHideTransition: 'fade',
      icon: 'error'
    })
  }else
  {
    $.toast().reset('all');
    this.employeService.update(id,data)
    .subscribe(
      response => {
        this.refreshList();
        this.newData();
        this.submitted = true;
        $.toast().reset('all');
        $.toast({
          heading: 'Success',
          position: 'bottom-right',
          text: 'Employe modifier avec success',
          showHideTransition: 'slide',
          icon: 'success'
      })
      },
      error => {
        console.log(error);
      });
  }
  }
  saveDelete(id:any):void{
    this.employeService.get(id)
    .subscribe(
      data2 => {
                  this.employeService.delete(id).subscribe(
                    data=>{
                    
                      this.refreshList();
                      $.toast({
                        heading: 'Success',
                        position: 'bottom-right',
                        text: 'Employe '+this.name+' supprimer',
                        showHideTransition: 'slide',
                        icon: 'success'
                   
                     });
                         
                    },error => {
                      $.toast({
                        heading: 'Error',
                        text:"Erreur ! " ,
                        position: 'bottom-right',
                        showHideTransition: 'fade',
                        icon: 'error'
                      })
                     
                    });
                
      },
      error => {
        console.log(error);
      });
  }
  verifData(data:any)
{
  var ret="";
  if(data.nom==""  )
{
  ret+="Nom invalide<br>";
  $(".nom").css("border","1px solid red");
 
}else
{
  $(".nom").css("border","1px solid green");
  
}

if(data.prenom==""  )
{
  ret+="Prenom non valide<br>";
  $(".prenom").css("border","1px solid red");

}else
{
  $(".prenom").css("border","1px solid green");
  
}
if(data.date_naissance=="" )
{
  ret+="Date de Naissance non valide<br>";
  $(".date_naissance").css("border","1px solid red");

}else
{
  $(".Date_naissance").css("border","1px solid green");
  
}
if(data.sexe==""  )
{
  ret+="Sexe non valide<br>";
  $(".sexe").css("border","1px solid red");
 
}else
{
  $(".sexe").css("border","1px solid green");
  
}
if(data.adresse==""  )
{
  ret+="Adresse non valide<br>";
  $(".adresse").css("border","1px solid red");
 
}else
{
  $(".adresse").css("border","1px solid green");
  
}
if(data.telephone==0 )
{
  ret+="Téléphone non valide <br>";
  $(".telephone").css("border","1px solid red");

}else
{
  $(".telephone").css("border","1px solid green");
  
}
if(data.email=="")
{
  ret+="Email non valide<br>";
  $(".email").css("border","1px solid red");

}else
{
  $(".email").css("border","1px solid green");
  
}
if(data.equipe=="" )
{
  ret+="Equipe non valide<br>";
  $(".equipe").css("border","1px solid red");
 
}else
{
  $(".equipe").css("border","1px solid green");
  
}
if(data.superviseur==""  )
{
  ret+="Superviseur non valide<br>";
  $(".superviseur").css("border","1px solid red");
 
}else
{
  $(".superviseur").css("border","1px solid green");
  
}
if(data.typeContrat=="")
{
  ret+="typeContrat non valide<br>";
  $(".typeContrat").css("border","1px solid red");
 
}else
{
  $(".typeContrat").css("border","1px solid green");
  
}
if(data.debutcontrat=="")
{
  ret+="debutcontrat non valide<br>";
  $(".debutcontrat").css("border","1px solid red");
 
}else
{
  $(".debutcontrat").css("border","1px solid green");
  
}
if(data.matricule=='' )
{
  ret+="Matricule non valide<br>";
  $(".matricule").css("border","1px solid red");
 
}else
{
  $(".matricule").css("border","1px solid green");
  
}
if(data.pointeuse=="" )
{
  ret+="Pointeuse non valide<br>";
  $(".pointeuse").css("border","1px solid red");
 
}else
{
  $(".pointeuse").css("border","1px solid green");
  
}
if(data.planning=="" )
{
  ret+="Planning non valide<br>";
  $(".planning").css("border","1px solid red");
 
}else
{
  $(".planning").css("border","1px solid green");
  
}
if(data.succursale=="" )
{
  ret+="Succursale non valide<br>";
  $(".succursale").css("border","1px solid red");
 
}else
{
  $(".succursale").css("border","1px solid green");
  
}

return ret;
}
reset():void{
  $(".nom").css("border","none");
  $(".prenom").css("border","none");
  $(".date_naissance").css("border","none");
  $(".sexe").css("border","none"),
  $(".adresse").css("border","none");
  $(".telephone").css("border","none");
  $(".email").css("border","none");
  $(".equipe").css("border","none");
  $(".superviseur").css("border","none");
  $(".typeContrat").css("border","none");
  $(".matricule").css("border","none");
  $(".pointeuse").css("border","none");
  $(".pointage").css("border","none");
  $(".planning").css("border","none");
  $(".succursale").css("border","none");
  $(".debutcontrat").css("border","none");
  


}
recuperationListeSelect():void{
  this.equipeService.getAll()
  .subscribe(
    response => {
        this.listeEquipe=response;
    },
    error => {
      console.log(error);
    });
    this.superviseurService.getAll()
  .subscribe(
    response => {
        this.listeSuperviseur=response;
    },
    error => {
      console.log(error);
    });
    this.pointeuseService.getAll()
    .subscribe(
      response => {
          this.listePointeuse=response;
      },
      error => {
        console.log(error);
      });
      this.planningService.getAll()
    .subscribe(
      response => {
          this.listePlanning=response;
      },
      error => {
        console.log(error);
      });
      this.sexeService.getAll()
      .subscribe(
        response => {
            this.listeSexe=response;
        },
        error => {
          console.log(error);
        });
        this.succursaleService.getAll()
      .subscribe(
        response => {
            this.listeSuccursale=response;
        },
        error => {
          console.log(error);
        });
        this.typeContratService.getAll()
        .subscribe(
          response => {
              this.listeTypeContrat=response;
          },
          error => {
            console.log(error);
          });

    
}
filterAvance():void{
  this.listAll=this.listeIntermidiare;
  let list=new Array(); 
  for(var i=0;i<this.listAll.length;i++)
  {
    if(this.listAll[i].equipes.nom==this.datafilter.name) list.push(this.listAll[i]);
     
  }
  this.listAll=list;
}
countEmployes(): number {
  return this.listAll.length;
}


}

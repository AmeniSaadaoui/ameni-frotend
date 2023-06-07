import { Component, OnInit } from '@angular/core';
import { EquipeService } from 'src/app/services/equipe.service';
import { PlanningService } from 'src/app/services/planning.service';
import { SuccursaleService } from 'src/app/services/succursale.service';
import { SuperviseurService } from 'src/app/services/superviseur.service';
declare var $: any;

@Component({
  selector: 'app-list-equipe',
  templateUrl: './list-equipe.component.html',
  styleUrls: ['./list-equipe.component.css']
})
export class ListEquipeComponent implements OnInit {
  listeSuccursale:any;
  listeSuperviseur:any;
  listePlanning:any;
  listeIntermidiare:any;
  searchText: any;
  datafilter={
    name:"NetAdvisor-Sfax"
  }
  dataSend = {
    nom: '',
    succursale:'',
    superviseur:'',
    planning:'',
    date_creation:'',

    published: false

  };
  dataUpdate = {
    nom: '',
    succursale:'',
    superviseur:'',
    planning:'',
    date_creation:'',
     
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
  

constructor(private equipeService: EquipeService, private succursaleService:SuccursaleService, private superviseurService:SuperviseurService,private planningService:PlanningService) { }




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
    succursales:JSON.parse(JSON.stringify(this.dataSend.succursale)),
    superviseurs:JSON.parse(JSON.stringify(this.dataSend.superviseur)),
    date_creation:this.dataSend.date_creation,
    plannings: JSON.parse(JSON.stringify(this.dataSend.planning)),
   
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
  this.equipeService.create(data)
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
        text: 'Equipe ajouter avec success',
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
    succursale:'',
    superviseur:'',
    planning:'',
    date_creation:'',
    
    
    published: false
    
  };
}
retrievelist():void {
  
  this.equipeService.getAll()
      .subscribe(
        data => {
          this.listAll = data;
          this.listeIntermidiare=data;
          this.countEquipes();
         
          
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
  setItem(data:any):void{
    this.reset();
   
       this.idItem=data.id;
       this.submitted = false;
       this.dataUpdate = {
         nom:data.nom,
         succursale:data.succursale,
         superviseur:data.superviseur,
         date_creation: data.date_creation,
         planning: data.planning,
      
         published: false
       };
      
  }
  
  deleteItem(id:any):void{
    this.reset();
    this.idItem=id;
       this.submitted = false;
       var d =new Date();
     this.name=id.equipes.nom+" ";
  }
  
  saveUpdate(id:any,date_creation:any):void{
    var ret="";
    const data = {
      nom: this.dataUpdate.nom,
      succursales:this.dataUpdate.succursale,
      superviseurs: this.dataUpdate.superviseur,
      plannings:this.dataUpdate.planning
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
    this.equipeService.update(id,data)
    .subscribe(
      response => {
        this.refreshList();
        this.newData();
        this.submitted = true;
        $.toast().reset('all');
        $.toast({
          heading: 'Success',
          position: 'bottom-right',
          text: 'Equipe modifier avec success',
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
    this.equipeService.get(id)
    .subscribe(
      data2 => {
                  this.equipeService.delete(id).subscribe(
                    data=>{
                    
                      this.refreshList();
                      $.toast({
                        heading: 'Success',
                        position: 'bottom-right',
                        text: 'Equipe '+this.name+' supprimer',
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

if(data.succursale=="")
{
  ret+="Succursale invalide<br>";
  $(".succursale").css("border","1px solid red");

}else
{
  $(".succursale").css("border","1px solid green");
  
}
if(data.superviseur=="")
{
  ret+="Superviseur invalide<br>";
  $(".superviseur").css("border","1px solid red");

}else
{
  $(".superviseur").css("border","1px solid green");
  
}
if(data.date_creation==""  )
{
  ret+="Date de Creation invalide<br>";
  $(".date_creation").css("border","1px solid red");

}else
{
  $(".Date_creation").css("border","1px solid green");
  
}

if(data.planning=="" )
{
  ret+="Planning invalide<br>";
  $(".planning").css("border","1px solid red");
 
}else
{
  $(".planning").css("border","1px solid green");
  
}

return ret;
}
reset():void{
  $(".nom").css("border","none");
  $(".succursale").css("border","none");
  $(".superviseur").css("border","none");
  $(".date_creation").css("border","none");
  $(".planning").css("border","none");
  
}
recuperationListeSelect():void{
  this.succursaleService.getAll()
  .subscribe(
    response => {
        this.listeSuccursale=response;
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
      this.planningService.getAll()
    .subscribe(
      response => {
          this.listePlanning=response;
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
    if(this.listAll[i].succursales.nom==this.datafilter.name) list.push(this.listAll[i]);
     
  }
  this.listAll=list;
}
countEquipes(): number {
  return this.listAll.length;
}


}
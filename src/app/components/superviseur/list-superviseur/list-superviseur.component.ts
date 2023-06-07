import { Component, OnInit } from '@angular/core';
import { SuccursaleService } from 'src/app/services/succursale.service';
import { SuperviseurService } from 'src/app/services/superviseur.service';
declare var $: any;

@Component({
  selector: 'app-list-superviseur',
  templateUrl: './list-superviseur.component.html',
  styleUrls: ['./list-superviseur.component.css']
})
export class ListSuperviseurComponent implements OnInit {
  listeSuccursale:any;
  selectedItem:any;
  dataSend = {
  
    prenom: '',
    nom:'',
    succursale:'',

    published: false

  };
  dataUpdate = {
    prenom: '',
    nom:'',
    succursale:'',
    
    published: false

  };
  dataDelete = {
    equipe:0,
  
    
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
  
  

constructor(private superviseurService: SuperviseurService, private succursaleService:SuccursaleService) { }




ngOnInit(): void {
 

  this.retrievelist();
  this.recuperationListeSelect();
   this.styleTable();
 

}
/****** creation data  */
saveData(): void {
  var ret="";
  const data = {
   
    prenom: this.dataSend.prenom,
    nom:this.dataSend.nom,
    succursales:JSON.parse(JSON.stringify(this.dataSend.succursale)),
   
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
  this.superviseurService.create(data)
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
        text: 'Superviseur ajouter avec succeess',
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
    prenom: '',
    nom:'',
    succursale:'',
    
    published: false
    
  };
}
retrievelist():void {
  
  this.superviseurService.getAll()
      .subscribe(
        data => {
          this.listAll = data;
          this.countSuperviseurs();
         
          
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
 /** showItem(id: any): void {
    this.reset();  
   
this.superviseurService.get(id).subscribe(
      data => {
        this.selectedItem = data; // Assigner la valeur de data à selectedItem
        this.idItem = id;
        
       
this.submitted = false;
        this.dataUpdate = {
          prenom: data.prenom,
          nom: data.nom,
          succursale: data.succursale,
          published: false
        };
  
        // Code supplémentaire pour afficher le modal avec les détails de l'élément
        $('#myModal4').modal('show');
      },
      error => {
        console.log(error);
      }
    );
  }

  */ 

  setItem(data:any):void{
    this.reset();
    
       this.idItem=data.id;
       this.submitted = false;
       this.dataUpdate = {
         prenom:data.prenom,
         nom:data.nom,
         succursale:data.succursale,
      
         published: false
       };
     ;
  }
  deleteItem(id:any):void{
    this.reset();
    this.superviseurService.get(id)
    .subscribe(
      data => {
       this.idItem=id;
       this.submitted = false;
     this.name=data.prenom+" ";
     this.dataDelete = {
      equipe:0,
      published: false
    };
      },
      error => {
        console.log(error);
      });
  }
  
  
  
  saveUpdate(id:any,succursale:any):void{
    var ret="";
    const data = {
      nom:this.dataUpdate.nom,
      prenom: this.dataUpdate.prenom,
      succursale: succursale,
      
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
    this.superviseurService.update(id,data)
    .subscribe(
      response => {
        this.refreshList();
        this.newData();
        this.submitted = true;
        $.toast().reset('all');
        $.toast({
          heading: 'Success',
          position: 'bottom-right',
          text: 'Superviseur modifier avec success',
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
    this.superviseurService.get(id)
    .subscribe(
      data2 => {
                  this.superviseurService.delete(id).subscribe(
                    data=>{
                    
                      this.refreshList();
                      $.toast({
                        heading: 'Success',
                        position: 'bottom-right',
                        text: 'Superviseur '+this.name+' supprimer',
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
  if(data.prenom==""  )
{
  ret+="Prenom invalide<br>";
  $(".prenom").css("border","1px solid red");
 
}else
{
  $(".prenom").css("border","1px solid green");
  
}
if(data.nom==""  )
{
  ret+="nom invalide<br>";
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


return ret;
}
reset():void{
  $(".prenom").css("border","none");
  $(".nom").css("border","none");
  $(".succursale").css("border","none");

  
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
  }

  countSuperviseurs(): number {
    return this.listAll.length;
  }
}

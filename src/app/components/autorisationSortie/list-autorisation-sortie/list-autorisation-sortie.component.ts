import { Component, OnInit } from '@angular/core';
import { AutorisationSortieService } from 'src/app/services/autorisation-sortie.service';
import { EmployeService } from 'src/app/services/employe.service';
declare var $: any;

@Component({
  selector: 'app-list-autorisation-sortie',
  templateUrl: './list-autorisation-sortie.component.html',
  styleUrls: ['./list-autorisation-sortie.component.css']
})
export class ListAutorisationSortieComponent implements OnInit {
  listeEmploye:any ;
  listeIntermidiare:any;
  searchText: any;
datafilter={
  name:""
}
  dataSend = {
    employe: '',
    motif: '',
    date_debut: '',
    date_fin: '',
    date_retour: '',
    
    published: false

  };
  dataUpdate = {
    employe: '',
    motif: '',
    date_debut: '',
    date_fin: '',
    date_retour: '',
    
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
  

constructor(private autorisationSortieService: AutorisationSortieService,private employeService:EmployeService) { }




ngOnInit(): void {
 

  this.retrievelist();
  this.recuperationListeSelect();
  this.styleTable();
 

}
/****** creation data  */
saveData(): void {
  var ret="";
  const data = {
    employes:JSON.parse(JSON.stringify(this.dataSend.employe)),
    motif: this.dataSend.motif,
    date_debut:this.dataSend.date_debut,
    date_fin:this.dataSend.date_fin,
    date_retour:this.dataSend.date_debut,

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
  this.autorisationSortieService.create(data)
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
        text: 'Congé ajouter avec succeess',
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
    employe: '',
    motif: '',
    date_debut: '',
    date_fin: '',
    date_retour: '',
    published: false
    
  };
}
retrievelist():void {
  
  this.autorisationSortieService.getAll()
      .subscribe(
        data => {
          this.listAll = data;
          this.listeIntermidiare=data;
          console.log(data);
          
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
         employe:data.nom,
         date_debut: data.date_debut,
         date_fin: data.date_fin,
         date_retour: data.date_retour,
         motif:data.motif,
         
         published: false
       };
     
      
  }
  deleteItem(id:any):void{
    this.reset();
    this.idItem=id;
       this.submitted = false;
       var d =new Date();
     this.name=id.employes.nom+" "+id.employes.prenom;
  }
  
  saveUpdate(id:any):void{
    var ret="";
    const data = {
      employe: this.dataUpdate.employe,
      motif: this.dataUpdate.motif,
      date_debut:this.dataUpdate.date_debut,
      date_fin:this.dataUpdate.date_fin,
      date_retour:this.dataUpdate.date_retour,
      
      
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
    this.autorisationSortieService.update(id,data)
    .subscribe(
      response => {
        this.refreshList();
        this.newData();
        this.submitted = true;
        $.toast().reset('all');
        $.toast({
          heading: 'Success',
          position: 'bottom-right',
          text: 'Conge modifier avec success',
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
    this.autorisationSortieService.delete(id.id).subscribe(
      data=>{
      
        this.refreshList();
        $.toast({
          heading: 'Success',
          position: 'bottom-right',
          text: 'Conge '+this.name+' supprimer',
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
  }
  verifData(data:any)
{
  var ret="";
  if(data.employe==""  )
{
  ret+="Employe invalide<br>";
  $(".employe").css("border","1px solid red");
 
}else
{
  $(".employe").css("border","1px solid green");
  
}

if(data.motif=="")
{
  ret+="motif invalide<br>";
  $(".motif").css("border","1px solid red");

}else
{
  $(".motif").css("border","1px solid green");
  
}
if(data.date_debut=="")
{
  ret+="date_debut invalide<br>";
  $(".date_debut").css("border","1px solid red");

}else
{
  $(".date_debut").css("border","1px solid green");
  
}
if(data.date_fin=="")
{
  ret+="date_fin invalide<br>";
  $(".date_fin").css("border","1px solid red");

}else
{
  $(".date_fin").css("border","1px solid green");
  
}
if(data.date_retour=="")
{
  ret+="date_retour invalide<br>";
  $(".date_retour").css("border","1px solid red");

}else
{
  $(".date_retour").css("border","1px solid green");
  
}

return ret;
}
reset():void{
  $(".employe").css("border","none");
  $(".motif").css("border","none");
  $(".date_debut").css("border","none");
  $(".date_fin").css("border","none");
  $(".date_retour").css("border","none");
  


}
recuperationListeSelect():void{
  this.employeService.getAll()
  .subscribe(
    response => {
        this.listeEmploye=response;
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
    if(this.listAll[i].motif==this.datafilter.name) list.push(this.listAll[i]);
     
  }
  this.listAll=list;
}

}



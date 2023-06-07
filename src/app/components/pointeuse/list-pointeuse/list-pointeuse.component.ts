import { Component, OnInit } from '@angular/core';
import { PointeuseService } from 'src/app/services/pointeuse.service';
import { SuccursaleService } from 'src/app/services/succursale.service';
declare var $: any;

@Component({
  selector: 'app-list-pointeuse',
  templateUrl: './list-pointeuse.component.html',
  styleUrls: ['./list-pointeuse.component.css']
})
export class ListPointeuseComponent implements OnInit {
  
  listeSuccursale:any;
  listeIntermidiare:any;
  searchText: any;
datafilter={
  name:"NetAdvisor-Sfax"
}
 

  dataSend = {
    nom: '',
    ip: '',
    numero: 0,
    port:0,
    mot_passe:"",
    bauds:0,
    numero_serie:0,
    status:'',
    succursale:'',
    
    published: false

  };
  dataUpdate = {
    nom: '',
    ip: '',
    numero: 0,
    port:0,
    mot_passe:"",
    bauds:0,
    numero_serie:0,
    status:'',
    succursale:'',
    
    published: false

  };
  dataDelete = {
    superviseur: '',
  
    
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
  

constructor(private pointeuseService: PointeuseService, private succursaleService: SuccursaleService){}



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
    ip: this.dataSend.ip,
    numero:this.dataSend.numero,
    port:this.dataSend.port,
    mot_passe:this.dataSend.mot_passe,
    bauds: this.dataSend.bauds,
    numero_serie:this.dataSend.numero_serie,
    status:this.dataSend.status,
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
  this.pointeuseService.create(data)
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
        text: 'Pointeuse ajouter avec success',
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
    ip: '',
    numero: 0,
    port:0,
    mot_passe:"",
    bauds:0,
    numero_serie:0,
    status:'',
    succursale:'',
    published: false
    
  };
}
retrievelist():void {
  
  this.pointeuseService.getAll()
      .subscribe(
        data => {
          this.listAll = data;
          this.listeIntermidiare=data;
          this.countPointeuses();
         
          
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
         ip: data.ip,
         numero: data.numero,
         port:data.port,
         mot_passe:data.mot_passe,
         bauds:data.bauds,
         numero_serie:data.numero,
         status:data.status,
         succursale:data.succursale,
         published: false
       };
     
      
  }
  deleteItem(id:any):void{
    this.reset();
    this.idItem=id;
       this.submitted = false;
       var d =new Date();
     this.name=id.nom+" ";
  }
  saveUpdate(id:any):void{
    var ret="";
    const data = {
      nom: this.dataUpdate.nom,
      ip: this.dataUpdate.ip,
      numero: this.dataUpdate.numero,
      port:this.dataUpdate.port,
      mot_passe:this.dataUpdate.mot_passe,
      bauds:this.dataUpdate.bauds,
      numero_serie:this.dataUpdate.numero,
      status:this.dataUpdate.status,
      succursale:this.dataUpdate.succursale,
      published: false
      
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
    this.pointeuseService.update(id,data)
    .subscribe(
      response => {
        this.refreshList();
        this.newData();
        this.submitted = true;
        $.toast().reset('all');
        $.toast({
          heading: 'Success',
          position: 'bottom-right',
          text: 'Pointeuse modifier avec success',
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
    this.pointeuseService.get(id)
    .subscribe(
      data2 => {
                  this.pointeuseService.delete(id).subscribe(
                    data=>{
                    
                      this.refreshList();
                      $.toast({
                        heading: 'Success',
                        position: 'bottom-right',
                        text: 'Pointeuse '+this.name+' supprimer',
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

if(data.ip==""  )
{
  ret+="ip invalide<br>";
  $(".ip").css("border","1px solid red");

}else
{
  $(".ip").css("border","1px solid green");
  
}
if(data.numero==0 )
{
  ret+="numero is invalide<br>";
  $(".numero").css("border","1px solid red");

}else
{
  $(".numero").css("border","1px solid green");
  
}
if(data.numero_serie==0 )
{
  ret+="numero serie is invalide<br>";
  $(".numero_serie").css("border","1px solid red");

}else
{
  $(".numero_serie").css("border","1px solid green");
  
}
if(data.port==0  )
{
  ret+="Port invalide<br>";
  $(".port").css("border","1px solid red");
 
}else
{
  $(".port").css("border","1px solid green");
  
}
if(data.mot_passe==""  )
{
  ret+="Mot de passe invalide<br>";
  $(".mot_passe").css("border","1px solid red");
 
}else
{
  $(".mot_passe").css("border","1px solid green");
  
}
if(data.bauds==0  )
{
  ret+="bauds invalide<br>";
  $(".bauds").css("border","1px solid red");

}else
{
  $(".bauds").css("border","1px solid green");
  
}
if(data.status==0  )
{
  ret+="Status invalide<br>";
  $(".status").css("border","1px solid red");

}else
{
  $(".status").css("border","1px solid green");
  
}
if(data.succursale=="" )
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
  $(".nom").css("border","none");
  $(".ip").css("border","none");
  $(".numero").css("border","none");
  $(".port").css("border","none"),
  $(".mot_passe").css("border","none");
  $(".bauds").css("border","none");
  $(".numero_serie").css("border","none");
  $(".status").css("border","none");
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
filterAvance():void{
  this.listAll=this.listeIntermidiare;
  let list=new Array(); 
  for(var i=0;i<this.listAll.length;i++)
  {
    if(this.listAll[i].succursales.nom==this.datafilter.name) list.push(this.listAll[i]);
     
  }
  this.listAll=list;
}
countPointeuses(): number {
  return this.listAll.length;
}
}



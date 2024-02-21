import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { Role } from 'src/app/TypeDto/Role';

@Component({
  selector: 'app-lecturewatch',
  templateUrl: './lecturewatch.component.html',
  styleUrls: ['./lecturewatch.component.css']
})
export class LecturewatchComponent  {
  selected:any;
  IdParams!: any;
  lectures:any 
  theLecture:any
  myScriptElement:any;
  StudentID:any
  UserData: any
  udpate:any
  videoparts:any
  saved:any =false
  savedf:any= false
  udpatef:any 

  AddVideoForm : FormGroup =new FormGroup({
    PartHeader: new FormControl ("" ,[ Validators.required, Validators.minLength(3)]),
    link: new FormControl ("", [ Validators.required, Validators.minLength(3)]),
    partNumber: new FormControl ("" ,[ Validators.required]),

   } )


   AddfileForm : FormGroup =new FormGroup({
    PartHeader: new FormControl ("" ,[ Validators.required, Validators.minLength(3)]),
    link: new FormControl ("", [ Validators.required, Validators.minLength(3)]),
    partNumber: new FormControl ("" ,[ Validators.required]),

   } )



constructor( private fileupload : FilesService  ,  private  lectureservice : GetAllLectureService , myRoute: ActivatedRoute ,private toastservice: ToastrService
  ){
    this.IdParams = myRoute.snapshot.paramMap.get('id');

this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({

next:(data)=> {

  this.theLecture=data
  console.log(data)
}


})

  
}


SelectPart(part :any ){
  this.selected=part
  }
  
  Addvideo(AddVideoForm:any){
let v= this.AddVideoForm.value
 let  newv =  {  lectureId:this.IdParams , url:v.link , number:v.partNumber , partHeader:v.PartHeader}
this.lectureservice.addvideo(newv).subscribe({



  next :(data)=>{
    this.toastservice.success("video added")
    console.log(newv)
    this.AddVideoForm.reset();
    console.log("affect "+data);
    this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({
      next:(data)=> {
      
        this.theLecture=data
        console.log(data)
       } }
    )      
  }
})
  }


  deletevideo(part:any){
this.lectureservice.deletevideo(part).subscribe({


  next :(data)=> {


    this.toastservice.success(" video deleted")
    this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({
      next:(data)=> {
      
        this.theLecture=data
        console.log(data)
       } }
    )      

  }
})
  }


  saveupdate(partid :any,number  :any, lvalue:any , header:any){

    this.udpate=0 ;this.saved = false
if (partid  ==null || number ==null || lvalue ==null || header == null){


  this.toastservice.error("data cannot be empty ")
}
else{
var n = {id:partid , url:lvalue , number : number, partHeader:header}
this.lectureservice.updatevideo(n).subscribe({


  next: (data)=> {
this.toastservice.success("data are updated")
    this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({
      next:(data)=> {
      
        this.theLecture=data
        console.log(data)
       } }
    )      

    
  }
})
}
  }


  saveupdatefile(partid :any,number  :any, lvalue:any , header:any){

    this.udpatef=0 ;this.savedf = false
if (partid  ==null || number ==null || lvalue ==null || header == null){


  this.toastservice.error("data cannot be empty ")
}
else{
var n = {id:partid , url:lvalue , number : number, partHeader:header}
this.lectureservice.updatefile(n).subscribe({


  next: (data)=> {
this.toastservice.success("data are updated")
    this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({
      next:(data)=> {
      
        this.theLecture=data
        console.log(data)
       } }
    )      

    
  }
})
}
  }

  Uplodfile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;
    this.fileupload.Upload(file).subscribe((response) => {
      console.log(response);
      this.AddfileForm.get('link')?.setValue(response.url)
    })
  }
  Addfile(AddfileForm:any){


    let v= this.AddfileForm.value
    let  newv =  {  lectureId:this.IdParams , url:v.link , number:v.partNumber , partHeader:v.PartHeader}
    console.log(newv)
   this.lectureservice.addfile(newv).subscribe({
   
   
   
     next :(data)=>{
       this.toastservice.success("file added")
       console.log(newv)
       this.AddfileForm.reset();
       console.log("affect "+data);
       this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({
         next:(data)=> {
         
           this.theLecture=data
           console.log(data)
          } }
       )      
     }
   })
    


  }



  deletefile(partid:any){

    this.lectureservice.deletefile(partid).subscribe({


      next :(data)=> {
        console.log(data)

    
        this.toastservice.success(" video deleted")
        this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({
          next:(data)=> {
          
            this.theLecture=data
            console.log(data)
           } }
        )      
    
      }
    })
    
  }
}

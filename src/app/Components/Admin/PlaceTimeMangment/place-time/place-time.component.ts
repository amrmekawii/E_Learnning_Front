import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/Components/Lecture/add-user-access/add-user-access.component';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { SharedService } from 'src/app/Services/Shared/shared.service';
import { AddUserAccessDto } from 'src/app/TypeDto/AddUserAccessDto';
import { ClassActive } from 'src/app/TypeDto/ClassIdActive';
import { EditOrDetailsDto } from 'src/app/TypeDto/EditOrDetailsDto';
@Component({
  selector: 'app-place-time',
  templateUrl: './place-time.component.html',
  styleUrls: ['./place-time.component.css']
})


export class PlaceTimeComponent implements  OnInit {
  Places:any;
usertoquiz:any
classes:any;
  searchText = '';
  accesedStudents : any;
emp : any= "";
  idpram:any

  objectUserForAccessService: AddUserAccessDto[]=[]

  
  constructor(private ShareService: SharedService, private GetAllActive: GetAllLectureService,    private toastr: ToastrService
   , private  myRoute :ActivatedRoute  ) { 


   }
  ngOnInit(): void {

    this.idpram = 3


    this.GetAllActive.GetAllClass().subscribe({
      next:(data)=>{
        this.classes=data

      }
    })
    
    this.GetAllActive.GetAllPlaces().subscribe({

      next:(data)=> {this.Places=data
        console.log(this.Places);
       

      
      },
      error:(err)=>{

      }
      
      
      })
  

      this.GetAllActive.GetAlltimePlaces().subscribe({

        next:(data)=> {this.usertoquiz=data
          console.log(this.usertoquiz);
         
  
        
        },
        error:(err)=>{
  
        }
        
        
        })
  
    


}

B(place:any){
console.log(place);

}

EditPlace(Id:any ,placeId:any ,start:any,end:any, day:any,type:any,classsid:any,  del:any){

let y = 

{
  "id": Id,
  "delete": del,
  "placeId": placeId,
  "start": start,
  "end": end,
  "day": day,
  "type": type,
  "classid": classsid
}

console.log(y);
if (false )
{

  this.toastr.warning("enter Valid Name")

}else{

this.GetAllActive.Addedittimeplace(y).subscribe({

  next:(data)=>{

    if (del==true){
      this.toastr.success("Done Delete")

    }else if (Id !=null){
      this.toastr.success("Updated successfully")

    } else{
      this.toastr.success("Added successfully")

    }
    this.ngOnInit();
    this.emp= "";
  }
})
}
}}

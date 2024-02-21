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
  selector: 'app-place-mangment',
  templateUrl: './place-mangment.component.html',
  styleUrls: ['./place-mangment.component.css']
})
export class PlaceMangmentComponent implements OnInit {
  Places:any;
usertoquiz:any
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



    
    this.GetAllActive.GetAllPlaces().subscribe({

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

EditPlace(quizz:any ,nname:any , del:any){
let x = {
  "id": quizz,
  "name": nname,
  "delete": del
}
let nam=  nname.trim()
if (nam.indexOf(' ')>=0 || nam.length<4 && del !=true )
{

  this.toastr.warning("enter Valid Name")

}else{

this.GetAllActive.Addeditplace(x).subscribe({

  next:(data)=>{

    if (del==true){
      this.toastr.success("Done Delete")

    }else if (quizz !=null){
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

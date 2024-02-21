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
  selector: 'app-quizentry',
  templateUrl: './quizentry.component.html',
  styleUrls: ['./quizentry.component.css']
})
export class QuizentryComponent implements OnInit {
  Places:any;
usertoquiz:any
  searchText = '';
  accesedStudents : any;


  idpram:any

  objectUserForAccessService: AddUserAccessDto[]=[]

  
  constructor(private ShareService: SharedService, private GetAllActive: GetAllLectureService,    private toastr: ToastrService
   , private  myRoute :ActivatedRoute  ) { 


   }
  ngOnInit(): void {

    this.idpram = this.myRoute.snapshot.paramMap.get('id');



    
    this.GetAllActive.Getquizattendancee(this.idpram).subscribe({

      next:(data)=> {this.usertoquiz=data
        console.log(this.usertoquiz);
       

      
      },
      error:(err)=>{

      }
      
      
      })
  


      this.GetAllActive.GetPlacess(this.idpram).subscribe({

        next:(data)=> {this.Places=data
       
          console.log(this.Places)
          
        
        },
        error:(err)=>{
  
        }
        
        
        })
    


}

B(place:any){
console.log(place);

}

updateGrade(id :any, userid:any ,quizeid:any, grade:any , start:any , end:any , Places:any ,attend:any){

  let x : any  =  {
    "id": 0,
    quizeid: 0,
    "userid":  userid,
    "startTime": "2024-01-27T19:09:23.807Z",
    "endTiem": "2024-01-27T19:09:23.807Z",
    "attend": true,
    "grade": 0,
    "placeid": 0
  }
  userid=x.userid
  x.id=id;
  x.quizeid=quizeid
  x.startTime = start;
  x.endTiem=  end;
  x.placeid=Places
  x.attend=attend
  x.grade=grade
console.log(x);
  this.GetAllActive.AddUpdateDeleteQuizz(x).subscribe({

    next:(data)=>{
      this.toastr.success("Done")

      this.ngOnInit();

    },
    error:(err)=>{
      this.toastr.error("Somthing Went Wrong")

      this.ngOnInit();

    }
    
  })
}


}

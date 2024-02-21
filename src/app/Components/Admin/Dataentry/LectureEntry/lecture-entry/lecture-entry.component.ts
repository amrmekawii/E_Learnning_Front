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
  selector: 'app-lecture-entry',
  templateUrl: './lecture-entry.component.html',
  styleUrls: ['./lecture-entry.component.css']
})
export class LectureEntryComponent implements OnInit {
  Places:any;
usertoquiz:any
  searchText = '';
  accesedStudents : any;
     
  offline:any
placename : any 
  idpram:any
  StudAud:any;
  objectUserForAccessService: AddUserAccessDto[]=[]

  
  constructor(private ShareService: SharedService, private GetAllActive: GetAllLectureService,    private toastr: ToastrService
   , private  myRoute :ActivatedRoute  ) { 


   }
  ngOnInit(): void {

    this.idpram = this.myRoute.snapshot.paramMap.get('id');

    this.GetAllActive.GetPlacess(this.idpram).subscribe({

      next:(data)=> {this.Places=data
     
        console.log(this.Places)
        
      
      },
      error:(err)=>{

      }
      
      
      })


    
    this.GetAllActive.GetLectureattendancee(this.idpram , false  , null).subscribe({

      next:(data)=> {
        this.offline=true

        
        this.usertoquiz=data
        this.placename = "All Places "
       let x = this.usertoquiz as any [];
        x.sort(y=>y.placeid)
      
        this.usertoquiz=x;
        console.log(this.usertoquiz);
       

      
      },
      error:(err)=>{

      }
      
      
      })
  


    


}

getStudents (  none  :any, place:any , online:any){
  this.placename = null;

  if (online == true ){
    this.GetAllActive.userAttendances(this.idpram).subscribe({
      next: (data) => {
        console.log(data);
        this.offline = false
        this.StudAud = data
        console.log(this.StudAud);

        this.placename = "Online "


      },
      error: (ERR) => {
        console.log(ERR)
        this.toastr.warning("This Lec Has No audience")

      }
    })


  }else { 
  this.GetAllActive.GetLectureattendancee(this.idpram , none  , place).subscribe({

    next:(data)=> {
      this.offline = true

      
      this.usertoquiz=data
       if (none == true ){
        this.placename =  "Student With no Centers "
       }else { 
        if (place == null){
          this.placename="All Places"
        }
        this.placename =  this.Places.find((x :any) =>x.id == place).name

       }
     let x = this.usertoquiz as any [];
      x.sort(y=>y.placeid)
      this.usertoquiz=x;
      console.log(this.usertoquiz);
     

    
    },
    error:(err)=>{

    }
    
    
    })}

}


B(place:any){
console.log(place);

}

updateGrade(id :any, userid:any ,lectureid:any, attend:any , quizAttend :any  ,assateend :any,quizgrade:any  ,assighmentGrade:any , note:any, Places:any , remove :any ){

  let x : any  =  {
    "id": 0,
    "lectureid": 0,
    "userid": userid,
    "startTime": "2024-01-27T20:53:43.817Z",
    "endTiem": "2024-01-27T20:53:43.817Z",
    "attend": Boolean,
    "placeid": 0
  }

   let y :any = {
    "id": id,
    "lectureid": lectureid,
    "userid": userid,
    "attend": attend,
    "quizAttend": quizAttend,
    "delete": remove,
    "quizGrade": quizgrade,
    "assighmentGrade": assighmentGrade,
    "assighmentAttend": assateend,
    "note": note,
    "placeid": Number
  }

  if (Places == null  || Places =="null"){
y.placeid = null
  }else{

    y.placeid = Places
  }
if ( quizgrade == ""){
  y.quizGrade = null
}

if ( assighmentGrade == ""){
  y.assighmentGrade = null
}


  
console.log(y);
  this.GetAllActive.AddUpdateDeleteLecturee(y).subscribe({

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

UpdateOinline(lectureid :any, assonlinevalue :any , onlineattendchecked :any ){
 let x = {
    "id": lectureid,
    "grade": null  ,
    "attend": onlineattendchecked
  }


  if(assonlinevalue==""){

x.grade =null
  }else{
x.grade =assonlinevalue 
  }
  console.log(x)

this.GetAllActive.AddGradeOnline(x).subscribe({

 
    next: (data) => {
    
      this.GetAllActive.userAttendances(this.idpram).subscribe({
        next: (data) => {
          console.log(data);
          this.offline = false
          this.StudAud = data
          console.log(this.StudAud);
  
          this.placename = "Online "
  
  
        },
        error: (ERR) => {
          console.log(ERR)
          this.toastr.warning("This Lec Has No audience")
  
        }
      })
  

    },
    error: (ERR) => {
      
    }
  })


  
}
}

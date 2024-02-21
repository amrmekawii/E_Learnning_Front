import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { UserService } from 'src/app/Services/UserService/user.service';
@Component({
  selector: 'app-child-grades',
  templateUrl: './child-grades.component.html',
  styleUrls: ['./child-grades.component.css']
})
export class ChildGradesComponent {
  searchText = '';

  open=true; 
  view :boolean =true;
studentData: any ;
userAttendance: any ;
QuizGrades: any;
UserAssighment:any
IdParams:any
StudentId:any;
UserData: any
  all_lectures: any;

constructor(  private UserService: UserService, private Auth: AuthenticationServiceService
  ,private myRoute: ActivatedRoute ,private QuizServ: QuizService ){
    this.UserData = this.Auth.UserData

  this.StudentId = myRoute.snapshot.paramMap.get('id');
this.userAttendance=null;
this.QuizGrades=null;
this.UserAssighment=null




this.UserService.GetStudentDetails(this.StudentId).subscribe({


  next: (data)=> {this.studentData =data;
  

  
  }

   ,
  error:(err)=> console.log(err)
});







}



   GetUserattendance (){
this.UserAssighment=null;
this.QuizGrades=null
this.UserService.GetUserLectureAttedance(this.StudentId).subscribe({

  next:(data)=> {

this.userAttendance=data

  }
})
   }



   GetSolvedQuiz(){

this.UserAssighment=null;
this.userAttendance=null;

this.QuizServ.GetUserQuizesResult(this.StudentId).subscribe({


  next: (data)=>{


    this.QuizGrades=data
  }
})

   }


   GetAssighmentResult(){

    this.QuizGrades=null;
    this.userAttendance=null;

    this.UserService.GetUserAssighments(this.StudentId).subscribe({


      next: (data)=> {


        this.UserAssighment=data;
        
      }
    })


    
   }


}


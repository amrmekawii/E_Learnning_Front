import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { UserService } from 'src/app/Services/UserService/user.service';
@Component({
  selector: 'app-userresult',
  templateUrl: './userresult.component.html',
  styleUrls: ['./userresult.component.css']
})
export class UserresultComponent {
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

  this.StudentId = this.Auth.UserData.Id

this.userAttendance=null;
this.QuizGrades=null;
this.UserAssighment=null

this.UserAssighment=null;
this.QuizGrades=null
this.UserService.GetUserLectureAttedance(this.StudentId).subscribe({

  next:(data)=> {

this.userAttendance=data

  }
})



this.UserService.GetStudentDetails(this.StudentId).subscribe({


  next: (data)=> {this.studentData =data;
  
    this.RegisterForm.get("firstName")?.setValue(this.studentData.firstName)
    this.RegisterForm.get("secondName")?.setValue(this.studentData.secondName)
    this.RegisterForm.get("lastName")?.setValue(this.studentData.lastName)
    this.RegisterForm.get("phoneNumber")?.setValue(this.studentData.phoneNumber)
    this.RegisterForm.get("parentPhoneNumber")?.setValue(this.studentData.parentPhoneNumber)
    this.RegisterForm.get("password")?.setValue(this.studentData.password)
    this.RegisterForm.get("username")?.setValue(this.studentData.username)
    this.RegisterForm.get("id")?.setValue(this.studentData.id)


  
  }

   ,
  error:(err)=> console.log(err)
});


  this.RegisterForm.disable();





}
RegisterForm : FormGroup =new FormGroup({
  firstName: new FormControl ("" ,[ Validators.required, Validators.minLength(3)]),
  secondName: new FormControl ("", [ Validators.required, Validators.minLength(3)]),
  lastName: new FormControl ("",[ Validators.required, Validators.minLength(3)]),
  phoneNumber: new FormControl ("" ,[ Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
  parentPhoneNumber: new FormControl ("" ,[ Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
  password: new FormControl ("" ,[ Validators.required, Validators.minLength(5)]),
  id: new FormControl ("" ,[ Validators.required ]),
  username: new FormControl ("",[ Validators.required]),


 } )

   UpdateStudent(RegisterForm :any){

    this.UserService.UpdateUser(RegisterForm.value).subscribe({



      next: ()=> {
        this.UserService.GetStudentDetails(this.IdParams).subscribe({


          next: (data)=> {this.studentData =data;
          
            this.RegisterForm.get("firstName")?.setValue(this.studentData.firstName)
            this.RegisterForm.get("secondName")?.setValue(this.studentData.secondName)
            this.RegisterForm.get("lastName")?.setValue(this.studentData.lastName)
            this.RegisterForm.get("phoneNumber")?.setValue(this.studentData.phoneNumber)
            this.RegisterForm.get("parentPhoneNumber")?.setValue(this.studentData.parentPhoneNumber)
            this.RegisterForm.get("password")?.setValue(this.studentData.password)
            this.RegisterForm.get("username")?.setValue(this.studentData.username)
            this.RegisterForm.get("id")?.setValue(this.studentData.id)
        
        
          
          }
        
           ,
          error:(err)=> console.log(err)
        });
        



      }
    })



    this.RegisterForm.disable();
   }

   CancelUpdate(){

    this.RegisterForm.get("firstName")?.setValue(this.studentData.firstName)
    this.RegisterForm.get("secondName")?.setValue(this.studentData.secondName)
    this.RegisterForm.get("lastName")?.setValue(this.studentData.lastName)
    this.RegisterForm.get("phoneNumber")?.setValue(this.studentData.phoneNumber)
    this.RegisterForm.get("parentPhoneNumber")?.setValue(this.studentData.parentPhoneNumber)
    this.RegisterForm.get("password")?.setValue(this.studentData.password)

    this.RegisterForm.disable();


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


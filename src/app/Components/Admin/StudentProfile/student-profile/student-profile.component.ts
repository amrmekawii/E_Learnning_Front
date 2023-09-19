import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/TypeDto/Role';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {
  searchText = '';

  id= "5a8da54b-7ce6-40dd-9238-47c1286d1dcb";
  open=true; 
  view :boolean =true;
studentData: any ;
userAttendance: any ;
QuizGrades: any;
UserAssighment:any
constructor(  private UserService: UserService ){
this.userAttendance=null;
this.QuizGrades=null;
this.UserAssighment=null
this.UserService.GetStudentDetails(this.id).subscribe({


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
        this.UserService.GetStudentDetails(this.id).subscribe({


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

this.UserService.GetUserLectureAttedance(this.studentData.id).subscribe({

  next:(data)=> {

this.userAttendance=data

  }
})
   }



   GetSolvedQuiz(){

this.UserAssighment=null;
this.userAttendance=null;

   }


   GetAssighmentResult(){

    this.QuizGrades=null;
    this.userAttendance=null;

    this.UserService.GetUserAssighments(this.studentData.id).subscribe({


      next: (data)=> {


        this.UserAssighment=data;
        
      }
    })


    
   }
}

export interface StudentData{

  
    "id": string ;
    "username": string;
    "firstName": string;
    "secondName": string;
    "lastName": string;
    "phoneNumber": string;
    "parentPhoneNumber": string;
    "password": string;
  } 



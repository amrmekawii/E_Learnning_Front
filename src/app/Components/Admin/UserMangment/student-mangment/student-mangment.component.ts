import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AddUserDto } from 'src/app/TypeDto/AddUserDto';
import { Role } from 'src/app/TypeDto/Role';
import { GenralServiceService } from 'src/app/Services/GenralServices/genral-service.service';
import { UserYearDTO } from 'src/app/TypeDto/YearsDto';
import { userClassDTOs } from 'src/app/TypeDto/Register';
import { UserClassDTO } from 'src/app/TypeDto/UserClassDTO';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';
import { Event } from '@angular/router';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-student-mangment',
  templateUrl: './student-mangment.component.html',
  styleUrls: ['./student-mangment.component.css']
})
export class StudentMangmentComponent {
 _GenralService;

 classes:any;
 AvtiveStudents:any;
 
  constructor( private readonly GenralService : GenralServiceService ,
    private AuthenticationServiceService : AuthenticationServiceService,
    private GetAllLectureService:GetAllLectureService,
    config: NgbModalConfig, private modalService: NgbModal,
    private  UserService: UserService
    
    ){		config.backdrop = 'static';
		config.keyboard = false;


this._GenralService= GenralService

  }



  allyears :  any ;

  ClassesByYear:any;
  deleteUser:any;
  ngOnInit() {

    this._GenralService.GetAllYears().subscribe({


      next: (data)=> { console.log(data)
console.log(this.allyears)

this.allyears=data
      },

    error : (err)=> console.log(console.error("THere iS NO "))
    })


    this.GetAllLectureService.GetAllClass().subscribe({


      next :(data :ClassAllDto)  => this.classes= data
    })

  }



  data = [
    { id: 1, name: "Angular" },
    { id: 2, name: "React" },
    { id: 3, name: "Vue" },
    { id: 4, name: "Bootstrap" },
    { id: 5, name: "Foundation" },
  ]

  searchText = '';
NewUser :AddUserDto = new AddUserDto();



  RegisterForm : FormGroup =new FormGroup({
    firstName: new FormControl ("" ,[ Validators.required, Validators.minLength(3)]),
    secondName: new FormControl ("", [ Validators.required, Validators.minLength(3)]),
    lastName: new FormControl ("",[ Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl ("" ,[ Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
    parentPhoneNumber: new FormControl ("" ,[ Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
    yearid: new FormControl (0 , Validators.required ),
    role:new FormControl (Role.Student),
    userClassDTOs: new FormArray( [] ) ,
    active: new FormControl(true)

   } )


   //<mat-checkbox *ngFor="let class of  ClassesByYear"  value={{class.Id}}>{{class.Name}}</mat-checkbox>


   ChangeYear(year :any ){
    const formArray: FormArray = this.RegisterForm.get('userClassDTOs') as FormArray;
formArray.clear();
    this._GenralService.GetAllClassesByYear(year).subscribe({


      next: (data)=> { console.log(data)
console.log(this.ClassesByYear)
this.ClassesByYear=data;
      },

    error : (err)=> console.log(console.error("THere iS NO "))
    });


  }



  onCheckChange(event: any) {
    const formArray: FormArray = this.RegisterForm.get('userClassDTOs') as FormArray;
  console.log(event);
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      let x :number =event.target.value;
      
    let z = {id :Number}
    
      formArray.push(new FormControl( { id : x }));

      console.log(formArray);
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          console.log("SGgs");
                    return;
        }
  
        i++;
      });}
}
Responce:any;
AddStudent(RegisterForm: FormGroup,content: any){

if (RegisterForm.valid){
  let form = RegisterForm.value;


let adduser2: AddUserDto=form
this.AuthenticationServiceService.AddUser(adduser2).subscribe({


  next: (data)=> {console.log(data)
    this.Responce=data;

console.log(this.Responce)
this.modalService.open(content)
//this.Responce=null;
    RegisterForm.reset();
    this.ClassesByYear=null
  
  } ,

  error:(Error)=> console.log(Error)
});
}
  
}


GetStudents(id:number ){
  console.log(id);
  type  x = {classid:number}
  let s:x  = {
    classid:id
  }; 
  console.log(s);
this.UserService.GetStudents(s).subscribe({



  next: (data)=> { 
    this.AvtiveStudents= data
    console.log(this.AvtiveStudents)


  },
  error  : (err)=>console.log(err)
})

}
DeleteForm : FormGroup =new FormGroup({
  Password: new FormControl ("" , Validators.required)
})
DeleteStudent(student:any ,Delete:any){
this.deleteUser=student;
this.modalService.open(Delete)
}

DeleteFinal(){




}
Canceldelete(Delete:any){

  this.modalService.dismissAll(Delete)
  this.DeleteForm.reset();
}
DeleteFromClass(Class: number,Student:string ){
 type z =  {
    classId: Number  ,
    userid: String
  }
  
let u :z = { classId:Class, userid:Student }
  console.log(u)
this.UserService.DeleteStudentFromClass({
  "classId": Class ,
  "userid": Student
}
).subscribe({



  next: (data)=> {console.log("DELETED")
 
this.GetStudents(Class)
}
})
}



}

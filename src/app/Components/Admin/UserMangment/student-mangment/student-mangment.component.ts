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
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-mangment',
  templateUrl: './student-mangment.component.html',
  styleUrls: ['./student-mangment.component.css']
})
export class StudentMangmentComponent {
 _GenralService;
Active =true;
 classes:any;
 AvtiveStudents:any;
 lastClass:any;
 places:any;
  constructor( private readonly GenralService : GenralServiceService ,
    private AuthenticationServiceService : AuthenticationServiceService,
    private GetAllLectureService:GetAllLectureService,
    config: NgbModalConfig, private modalService: NgbModal,
    private  UserService: UserService , private toastr: ToastrService ,private allclass :GetAllLectureService
    
    ){
      
      
      this.places = this.allclass.GetPlacessuser(0).subscribe({
        next: (data)=>{this.places = data
        
        console.log(this.places)
        
        }
      
      })


      config.backdrop = 'static';
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


      next :(data :ClassAllDto[])  => this.classes= data
    })

  }

  searchText = '';
NewUser :AddUserDto = new AddUserDto();



  RegisterForm : FormGroup =new FormGroup({
    firstName: new FormControl ("" ,[ Validators.required, Validators.minLength(3)]),
    secondName: new FormControl ("", [ Validators.required, Validators.minLength(3)]),
    lastName: new FormControl ("",[ Validators.required, Validators.minLength(3)]),
    phoneNumber: new FormControl ("" ,[ Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
    parentPhoneNumber: new FormControl ("" ,[ Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
    yearid: new FormControl (0 , Validators.required ),
    role:new FormControl (Role.Student  ),
    userClassDTOs: new FormArray( [] ,Validators.required) ,
    active: new FormControl(true) ,
    placeTimeId: new FormControl(null)

   } )


   //<mat-checkbox *ngFor="let class of  ClassesByYear"  value={{class.Id}}>{{class.Name}}</mat-checkbox>


   ChangeYear(year :any ){
    const formArray: FormArray = this.RegisterForm.get('userClassDTOs') as FormArray ;
formArray.clear();
this.RegisterForm.get('userClassDTOs')?.reset()
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
if( adduser2.role==null){
adduser2.role= Role.Student
adduser2.active=true
}
console.log(adduser2+"sadasdasddsd")
this.AuthenticationServiceService.AddUser(adduser2).subscribe({


  next: (data)=> {console.log(data)
    this.Responce=data;

console.log(this.Responce)
this.modalService.open(content)
    this.ClassesByYear=null
  
  } ,

  error:(Error :HttpErrorResponse)=>         this.toastr.error(Error.error.error)

});
}
RegisterForm.reset();

}


GetStudents(id:number ){
  this.Active = true ;
  console.log(id);
  type  x = {classid:number}
  this.lastClass=id;
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
  adminPassword: new FormControl ("c" , Validators.required)
})
DeleteStudent(student:any ,Delete:any){
this.deleteUser=student;
this.modalService.open(Delete)
}

DeleteFinal(Delete:any){

  let x:any  = this.DeleteForm.value
  let  y= x.adminPassword
let d = {   "userId": this.deleteUser.id,
 "adminPassword" : y}
console.log (d)
this.UserService.DeleteStuudent(d).subscribe({


  next: (data)=> {

    this.modalService.dismissAll(Delete)

    
  },
error:  (err)=>{ console.log(err)  

  this.modalService.dismissAll(Delete)
} 
});

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

GetUserRequist(){
  this.Active= false ;
  
  
  type  z = {active:boolean}
  let s:z  = {
    active:false
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
  
  
  
  Statue(id:any, b:any ){
  
    let x = {
      id: id ,
      active :b}
  
  console.log(x)
      this.UserService.changestatue(x).subscribe({
  
  next:(data)=> {
  
    type  z = {active:boolean}
    let s:z  = {
      active:false
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
  
  
  
  
      })
  
  }
  

  AddParent(id : any , Parentcontent:any ){

    this.UserService.add_parent(id).subscribe({
  
      next:(data)=> {
      
        this.Responce=data;

        console.log(this.Responce)
        this.modalService.open(Parentcontent)
        
      this.GetStudents(this.lastClass);
      }, error:(err)=> {

        this.toastr.error(err.error)
      }
      
      
      
      
          })
      
    
  }

}

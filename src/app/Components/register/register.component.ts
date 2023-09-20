import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GenralServiceService } from 'src/app/Services/GenralServices/genral-service.service';
import { RegisterDto } from 'src/app/TypeDto/Register';
import {  FormControl, FormArray } from '@angular/forms';
import { AddUserDto } from 'src/app/TypeDto/AddUserDto';
import { Role } from 'src/app/TypeDto/Role';
import { UserYearDTO } from 'src/app/TypeDto/YearsDto';
import { userClassDTOs } from 'src/app/TypeDto/Register';
import { UserClassDTO } from 'src/app/TypeDto/UserClassDTO';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';
import { Event } from '@angular/router';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { ModalDismissReasons, NgbDatepickerModule, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit ,OnDestroy  {


  private video!: HTMLVideoElement;
  _GenralService;

  classes:any;
  AvtiveStudents:any;
  allyears :  any ;

  ClassesByYear:any;
  deleteUser:any;

 constructor(private toastr: ToastrService,private authService :AuthenticationServiceService, private router: Router, private formBuilder: FormBuilder 
 , private readonly GenralService : GenralServiceService ,
    private AuthenticationServiceService : AuthenticationServiceService,
    private GetAllLectureService:GetAllLectureService,
    config: NgbModalConfig, private modalService: NgbModal,
    private  UserService: UserService
  
  ) { 
    config.backdrop = 'static';
		config.keyboard = false;


this._GenralService= GenralService






 }

  


  ngOnInit(): void {



    this.video = document.querySelector('#video') as HTMLVideoElement;
    this.video.play();


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
    role:new FormControl (Role.Student),
    
    active: new FormControl(false)

   } )


  ngOnDestroy(): void {
    this.video.pause();
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
  

  

  // register(rgister: FormGroup): void {
  //   console.log(rgister.value);
  //   if (rgister.valid) {
  //     this.Rdto["firstName"] = rgister.value["firstName"];
  //     this.Rdto["secondName"] = rgister.value["secondName"];
  //     this.Rdto["lastttName"] = rgister.value["lastttName"];
  //     this.Rdto["password"] = rgister.value["password"];
  //     this.Rdto["phoneNumber"] = rgister.value["phoneNumber"];
  //     this.Rdto["parentPhoneNumber"] = rgister.value["parentPhoneNumber"];
  //     this.Rdto["yearid"] = rgister.value["yearid"];
  //     this.Rdto["userClassDTO"].id = rgister.value["userClassId"];
  //     this.Rdto["userClassDTO"].name = rgister.value["userClassName"];

  //     this.authService.AddUser(this.Rdto).subscribe(
  //       {
  //         next: (data) => {

  //           this.toastr.success("Done", "success Register")
  //           setTimeout(() => this.router.navigateByUrl('Login'), 3000)

  //         },
  //         error: (err) => {
  //           console.log(err)
  //           console.log(err.error.length)

  //           for (var i = 0; i < err.error.length; i++) {

  //             this.toastr.warning(err.error[i].code)
  //             this.toastr.warning(err.error[i].description)


  //           }
  //         }
  //       }
  //     )
  //   }
  // }
}

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
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';

interface childusernames{
  username:string
}

@Component({
  selector: 'app-parent-mangment',
  templateUrl: './parent-mangment.component.html',
  styleUrls: ['./parent-mangment.component.css']
})
export class ParentMangmentComponent {
  _GenralService;
  Active =true;
   classes:any;
   Parents:any;
   lastClass:any;
   ouneuser:any
updatep:any;
   addchildren: childusernames []=[]
   
    constructor( private readonly GenralService : GenralServiceService ,
      private AuthenticationServiceService : AuthenticationServiceService,
      private GetAllLectureService:GetAllLectureService,
      config: NgbModalConfig, private modalService: NgbModal,
      private  UserService: UserService , private toastr: ToastrService , private client : HttpClient
      
      ){
        
        
        config.backdrop = 'static';
      config.keyboard = false;
  
  
  this._GenralService= GenralService
  
    }
   allyears :  any ;
   addchildusername:any='';
  
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
  
  
  Addchild : FormGroup =new FormGroup({
    childname: new FormControl("",[Validators.required, Validators.minLength(8)])
  })
    RegisterForm : FormGroup =new FormGroup({
      firstName: new FormControl ("" ,[ Validators.required, Validators.minLength(3)]),
      secondName: new FormControl ("", [ Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl ("" ,[ Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]),
      children:new FormControl(null, Validators.required)
  
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

  let out :any =  {
    "parent": {
      "firstName": adduser2.firstName,
      "secondName": adduser2.secondName,
      "phoneNumber":adduser2.phoneNumber,
      "active": true,
      "role": 3,
     
    },
    "childusernames": this.addchildren
  }
  
  this.client.post("https://amrbackend.azurewebsites.net/api/User/AddNewParent", out).subscribe({
  
  
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
  this.addchildren=[];
  
  }
  
  
  GetParents(id:number ){
    
    this.client.get("https://amrbackend.azurewebsites.net/api/User/GetAllParents/"+id). subscribe({
    next: (data)=> { 
      this.Parents= data
      console.log(this.Parents)
  this.lastClass = id;
  
    },
    error  : (err)=>console.log(err)
  })
  
  }

  DeleteChildFromParent(parentId :any, childId : any ){

    this.client.delete("https://amrbackend.azurewebsites.net/api/User/DeleteChild/"+parentId+"/"+childId).subscribe({

   next:(data)=>{
    this.toastr.success("Deleted")
this.GetParents(this.lastClass);

   },error:(erro :HttpErrorResponse)=>{
this.toastr.error(erro.error.error)

   }
    })
  }

  DeleteForm : FormGroup =new FormGroup({
    adminPassword: new FormControl ("c" , Validators.required)
  })
  DeleteStudent(student:any ,Delete:any){
  this.deleteUser=student;
  console.log(this.deleteUser)
  this.modalService.open(Delete)
  }
  
  DeleteFinal(Delete:any){
  
    let x:any  = this.DeleteForm.value
    let  y= x.adminPassword
  let d = {   "userId": this.deleteUser,
   "adminPassword" : y}
  console.log (d)
  this.client.post("https://amrbackend.azurewebsites.net/api/User/DeleteParent",d ).subscribe({
  
  
    next: (data)=> {
  
      this.modalService.dismissAll(Delete)
      this.toastr.success("Deleted")
  this.GetParents(this.lastClass);
      
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
  
    AddParent(id : any , Parentcontent:any ){
  
      this.UserService.add_parent(id).subscribe({
    
        next:(data)=> {
        
          this.Responce=data;
  
          console.log(this.Responce)
          this.modalService.open(Parentcontent)
          
        this.GetParents(this.lastClass);
        }, error:(err)=> {
  
          this.toastr.error(err.error)
        }
        
        
        
        
            })
        
      
    }
  
    Deleteunsavechild( username:any){

 let index =  this.addchildren.indexOf( this.addchildren.find(x=>x.username==username) as childusernames)

 this.addchildren.splice(index,1)
 if (this.addchildren.length==0){
  this.RegisterForm.get("children")?.setValue(null)


 }
    }

    addtochildlist(userame:string){
    let x=  userame = userame.trim()
      if (this.ouneuser.indexOf(' ')>=0 || this.ouneuser.length<8 )
      {


      }else{
        this.ouneuser = userame;
        let p :childusernames = {"username": this.ouneuser} ;
  this.addchildren.push(p)
  this.RegisterForm.get("children")?.setValue(this.addchildren)
  console.log(this.RegisterForm.get("children")?.value)
  console.log(this.RegisterForm.get("children")?.valid)
  console.log(this.RegisterForm.valid)
  console.log(this.RegisterForm.value)

  this.ouneuser=null;
  
      }

    }


    AddChildToParent(parentId :any , addchildusername:any){

      console.log(addchildusername)
if (addchildusername.length<8 ||addchildusername.trim()==' ' ){
this.toastr.error("write a valid username")
}else{


      this.client.post("https://amrbackend.azurewebsites.net/api/User/AddChildToParent",{
        "childId":parentId,
        "childName": addchildusername
      }).subscribe({


        next:(data)=>{


          this.toastr.success("Child Added successfully")
          this.GetParents(this.lastClass)

this.addchildusername='';
        },
        error:(eror:HttpErrorResponse)=>{

          this.toastr.error(eror.error.error)
        }
      })
    }
 
  }



  savedata(fname: any, lname:any, number:any, parentId:any){

if (fname == null || fname.length<3  || lname==null || lname.length<3   || number == null || number.length<11 || parentId == null ){

  this.toastr.error("enter  Valid Data ");

}else{
this.client.post("https://amrbackend.azurewebsites.net/api/User/updateParent" , {
  "parentId":parentId ,
  "parentFirstName": fname,
  "parentuserName": "string",
  "parentSecondName": lname,
  "parentPhoneNumber": number
}
).subscribe({

  next:(data)=>{

    this.toastr.success("Updated Successfully")
    this.updatep=null
    this.GetParents(this.lastClass);
  }, error:(ero:HttpErrorResponse)=>{


    this.toastr.error(ero.error.error)
  }
})
}

  }
}

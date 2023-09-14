import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AddUserDto } from 'src/app/TypeDto/AddUserDto';
import { Role } from 'src/app/TypeDto/Role';
import { GenralServiceService } from 'src/app/Services/GenralServices/genral-service.service';
import { UserYearDTO } from 'src/app/TypeDto/YearsDto';
import { userClassDTOs } from 'src/app/TypeDto/Register';
import { UserClassDTO } from 'src/app/TypeDto/UserClassDTO';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';
import { Event } from '@angular/router';
@Component({
  selector: 'app-student-mangment',
  templateUrl: './student-mangment.component.html',
  styleUrls: ['./student-mangment.component.css']
})
export class StudentMangmentComponent {
 _GenralService;
  constructor( private readonly GenralService : GenralServiceService){

this._GenralService= GenralService

  }



  allyears :  any ;

  ClassesByYear:any;
  ngOnInit() {

    this._GenralService.GetAllYears().subscribe({


      next: (data)=> { console.log(data)
console.log(this.allyears)

this.allyears=data
      },

    error : (err)=> console.log(console.error("THere iS NO "))
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
    firstName: new FormControl (null),
    secondName: new FormControl (null),
    lastName: new FormControl (null),
    phoneNumber: new FormControl (null),
    parentPhoneNumber: new FormControl (null),
    yearid: new FormControl (0),
    role:new FormControl (Role.Student),
    userClassId: new FormArray([]) 
    

   } )


   //<mat-checkbox *ngFor="let class of  ClassesByYear"  value={{class.Id}}>{{class.Name}}</mat-checkbox>


   ChangeYear(year :any ){
    const formArray: FormArray = this.RegisterForm.get('userClassId') as FormArray;
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
    const formArray: FormArray = this.RegisterForm.get('userClassId') as FormArray;
  console.log(event);
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));

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



}

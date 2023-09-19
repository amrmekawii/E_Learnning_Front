import { Component, OnInit  } from '@angular/core';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-class-mangment',
  templateUrl: './class-mangment.component.html',
  styleUrls: ['./class-mangment.component.css']
})
export class ClassMangmentComponent  implements OnInit {
  classes:any;
  searchText="";
  ClassesRequists : any ;

constructor ( private GetAllLectureService: GetAllLectureService , private  UserService :UserService){



}
ngOnInit(){
  this.GetAllLectureService.GetAllClass().subscribe({


    next :(data :ClassAllDto)  => this.classes= data
  })
  this.UserService.GetClassRequists(1).subscribe({
    next: (data)=> {this.ClassesRequists=data
    
    }
    
    })
}

GetStudents(c :any) 
  {
    this.UserService.GetClassRequists(c).subscribe({
      next: (data)=> {this.ClassesRequists=data
      
      }
      
      })
  
  }


  Decline(user:any , c:any){


this.UserService.AcceptOrDeclineClassRequist([
  {
    "userid": user,
    "classid": c,
    "state": false
  }
]).subscribe({



  next: (data)=> {
    
    this.UserService.GetClassRequists(c).subscribe({
      next: (data)=> {this.ClassesRequists=data
      
      }
      
      })

  }})
  }

  Accept(user:any, c:any){

    this.UserService.AcceptOrDeclineClassRequist([
      {
        "userid": user,
        "classid": c,
        "state": true
      }
    ]).subscribe({
    
      next: (data)=> {
        this.UserService.GetClassRequists(c).subscribe({
          next: (a)=> {this.ClassesRequists=a
 }
          
          })      }


    
  })
}}

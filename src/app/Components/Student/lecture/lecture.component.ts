import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject , OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent  implements OnInit  {
  searchText ="";
  selected:any;
  IdParams!: any;
  lectures:any 
  theLecture:any
  myScriptElement:any;
  StudentID:any
  UserData: any
all_lectures:any
code : any=''
nolecture:boolean =true;
constructor(private myRoute: ActivatedRoute, private  UserService: UserService , private sanitizer: DomSanitizer ,private Auth :AuthenticationServiceService ,    @Inject(DOCUMENT)  private   document: Document  ,private toastr: ToastrService ){
  
  
  this.IdParams = myRoute.snapshot.paramMap.get('id');
  this.StudentID= this.Auth.UserData.Id
console.log(this.IdParams);




this.UserService.GetLectowatch( this.StudentID,  this.IdParams).subscribe({


  next:(data)=>{ this.lectures=data 

    if (this.lectures[0]!=null){

      this.nolecture=false
      console.log(this.nolecture)


      this.UserService.GetTheLecture(this.lectures[0].id).subscribe({


        next : (data)=> {this.theLecture=data
  
  
          console.log(data)
        }      
      })
  

    }
    console.log(this.nolecture);
    console.log(data)
  
  
    
  
  }
})


}



ngOnInit(): void{
  this.UserData = this.Auth.UserData


  this.UserService.GetlistofLectureForStudent(this.IdParams).subscribe({


    next: (data)=> {
  
  this.all_lectures=data;
  console.log(data);
  console.log (this.all_lectures[0].lecturename)
  
    }
  })


}
GetLectur(id:any){
this.theLecture= null;
this.UserService.GetTheLecture(id).subscribe({


  next :  (data)=> {this.theLecture=data
  
    console.log(data)

  
  }
})
}

print(Id:any){
  console.log(Id);

}

startPlaying(lectureid:any){
this.UserService.StartWatch(lectureid).subscribe({

next :(data)=>{
  this.UserService.GetTheLecture(lectureid).subscribe({


    next : (data)=>this.theLecture=data
  })
  


}


})


}



SelectPart(part :any ){
this.selected=part
}

GetLectureAcess( c:any , l:any , CH: any){
CH.value=''
  this.UserService.addacessservice(this.StudentID,  c , l, this.IdParams ).subscribe({


    next: (data)=> {
this.toastr.success("lecture added")
this.code=''
      this.UserService.GetLectowatch( this.StudentID,  this.IdParams).subscribe({


        next:(data)=>{ this.lectures=data 
      
          if (this.lectures[0]!=null){
      
            this.nolecture=false
            console.log(this.nolecture)
      
      
            this.UserService.GetTheLecture(this.lectures[0].id).subscribe({
      
      
              next : (data)=> {this.theLecture=data
        
        
                console.log(data)
              }      
            })
        
      
          }
          console.log(this.nolecture);
          console.log(data)
        
        
          
        
        }
      })    },



      error: (errr : HttpErrorResponse)=>{
      this.toastr.warning(errr.error.error)
      this.code=''
      }
  })




}

}

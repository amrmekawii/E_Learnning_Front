import { DOCUMENT } from '@angular/common';
import { Component, Inject , OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent  implements OnInit  {
  IdParams!: any;
  lectures:any 
  theLecture:any
  myScriptElement:any;
  StudentID:any
constructor(private myRoute: ActivatedRoute, private  UserService: UserService , private sanitizer: DomSanitizer ,private Auth :AuthenticationServiceService ,    @Inject(DOCUMENT)  private   document: Document  ){
  this.IdParams = myRoute.snapshot.paramMap.get('id');
  this.StudentID= this.Auth.UserData.Id
console.log(this.IdParams);





this.UserService.GetLectowatch( this.StudentID,  this.IdParams).subscribe({


  next:(data)=>{ this.lectures=data 

    console.log(data)
  
  
    this.UserService.GetTheLecture(this.lectures[0].id).subscribe({


      next : (data)=> {this.theLecture=data


        console.log(data)
      }      
    })
    
  
  }
})

}



ngOnInit(): void{


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

}

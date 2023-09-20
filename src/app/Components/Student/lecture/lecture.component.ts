import { DOCUMENT } from '@angular/common';
import { Component, Inject , OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
  safeUrl: SafeHtml ='';
  myScriptElement:any;
constructor(private myRoute: ActivatedRoute, private  UserService: UserService , private sanitizer: DomSanitizer ,    @Inject(DOCUMENT)  private   document: Document  ){
  this.IdParams = myRoute.snapshot.paramMap.get('id');
console.log(this.IdParams);

this.safeUrl =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/VKM4PPv3UPA");




this.UserService.GetLectowatch("1fdd718d-d679-438c-96b3-b40156f13418", 2).subscribe({


  next:(data)=>{ this.lectures=data 
  
  
    this.UserService.GetTheLecture(this.lectures[0].id).subscribe({


      next : (data)=>this.theLecture=data
    })
    
  
  }
})




}

ngOnInit(): void{


}
GetLectur(id:any){

this.UserService.GetTheLecture(id).subscribe({


  next : (data)=>this.theLecture=data
})



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

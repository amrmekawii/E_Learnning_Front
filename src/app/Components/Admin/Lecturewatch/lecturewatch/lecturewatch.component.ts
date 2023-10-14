import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';

@Component({
  selector: 'app-lecturewatch',
  templateUrl: './lecturewatch.component.html',
  styleUrls: ['./lecturewatch.component.css']
})
export class LecturewatchComponent  {
  selected:any;
  IdParams!: any;
  lectures:any 
  theLecture:any
  myScriptElement:any;
  StudentID:any
  UserData: any
constructor( private  lectureservice : GetAllLectureService , myRoute: ActivatedRoute
  ){
    this.IdParams = myRoute.snapshot.paramMap.get('id');

this.lectureservice.GettheLectureToadmin(this.IdParams).subscribe({

next:(data)=> {

  this.theLecture=data
  console.log(data)
}


})
}


SelectPart(part :any ){
  this.selected=part
  }
  

}

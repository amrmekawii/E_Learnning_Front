import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';

@Component({
  selector: 'app-lec-audeance',
  templateUrl: './lec-audeance.component.html',
  styleUrls: ['./lec-audeance.component.css']
})
export class LecAudeanceComponent implements OnInit{
  IdParams! :any;
StudAud:any  
  constructor(private StudentAud: GetAllLectureService,private myRoute: ActivatedRoute){
    this.IdParams = myRoute.snapshot.paramMap.get('id')  ;

  }
  ngOnInit(): void {
    console.log(  this.IdParams+"gggggggggggggggggggg");
    
    this.StudentAud.userAttendances( this.IdParams).subscribe({
      next:(data)=>{
      console.log(data);
      this.StudAud=data
      console.log(this.StudAud);

      },
      error:(ERR)=>{

      }
    })
  }

}

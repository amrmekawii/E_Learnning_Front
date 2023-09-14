import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';

@Component({
  selector: 'app-lec-audeance',
  templateUrl: './lec-audeance.component.html',
  styleUrls: ['./lec-audeance.component.css']
})
export class LecAudeanceComponent implements OnInit {
  IdParams!: any;
  StudAud: any
  Headershow = false;
  searchText = '';

  constructor(private StudentAud: GetAllLectureService, private myRoute: ActivatedRoute, private toastr: ToastrService) {
    this.IdParams = myRoute.snapshot.paramMap.get('id');

  }
  ngOnInit(): void {
    console.log("this is id lecture   --->" + this.IdParams);

    this.StudentAud.userAttendances(this.IdParams).subscribe({
      next: (data) => {
        console.log(data);
        this.Headershow = true
        this.StudAud = data
        console.log(this.StudAud);



      },
      error: (ERR) => {
        console.log(ERR)
        this.toastr.warning("This Lec Has No audience")

      }
    })
  }

}

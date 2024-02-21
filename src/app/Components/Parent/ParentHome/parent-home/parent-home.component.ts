import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { StudentService } from 'src/app/Services/Student/student.service';
import { StudentHomeDto } from 'src/app/TypeDto/StudentHomeDto';
import { AddClassRequestdTO } from 'src/app/TypeDto/AddClassRequestDto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PopUpCangePassComponent } from 'src/app/Components/Admin/pop-up-cange-pass/pop-up-cange-pass.component';
import { LectureCodeComponent } from 'src/app/Components/Student/lecture-code/lecture-code.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-parent-home',
  templateUrl: './parent-home.component.html',
  styleUrls: ['./parent-home.component.css']
})
export class ParentHomeComponent implements OnInit {
  constructor(private dialog: MatDialog,
    private auth: AuthenticationServiceService,
    private stud: StudentService,
    private toastr: ToastrService,
    private route: Router, private client:HttpClient
  ) {

  }
  UserData: any
  parents: any;
  ClassRequestdTO = new AddClassRequestdTO()
  ngOnInit(): void {
    this.UserData = this.auth.UserData
    this.client.get("https://amrbackend.azurewebsites.net/api/User/GetParentHome").subscribe({
      next: (data) => {
        this.parents = data
        console.log(this.parents)
      },
      error: () => {

      }
    })
  }
  logout() {


    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      this.auth.isLoggedIn$.next(false);

      this.route.navigate([''])

      console.log(this.route.url)
    }


  }

  Openpopup2() {

    var _popup = this.dialog.open(PopUpCangePassComponent, {
      width: '60%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      disableClose: true,

    });
  }


}

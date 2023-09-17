import { Component, OnInit } from '@angular/core';
import { PopUpCangePassComponent } from '../../Admin/pop-up-cange-pass/pop-up-cange-pass.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { StudentService } from 'src/app/Services/Student/student.service';
import { StudentHomeDto } from 'src/app/TypeDto/StudentHomeDto';
import { AddClassRequestdTO } from 'src/app/TypeDto/AddClassRequestDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  constructor(private dialog: MatDialog,
    private auth: AuthenticationServiceService,
    private stud: StudentService,
    private toastr: ToastrService,

  ) {

  }
  UserData: any
  StudentHomeData = new StudentHomeDto()
  ClassRequestdTO = new AddClassRequestdTO()
  ngOnInit(): void {
    this.UserData = this.auth.UserData
    this.stud.GetAssimentBtId(this.UserData.Id).subscribe({
      next: (data) => {
        this.StudentHomeData = data
      },
      error: () => {

      }
    })
  }

  EnrollReq(ClassId: any ) {
    this.ClassRequestdTO.classId = ClassId
    this.ClassRequestdTO.userid = this.UserData.Id
    console.log(this.ClassRequestdTO);
    
    this.stud.AddClassrequest(this.ClassRequestdTO).subscribe({
      next: (data) => {
        this.toastr.success("Done", "Send Class Request Wait Binding Request")

        this.stud.GetAssimentBtId(this.UserData.Id).subscribe({
          next: (data) => {
            this.StudentHomeData = data
          },
          error: () => {
    
          }
        })
      },
      error: (error) => {
        this.toastr.error(error)
        console.log(error);
        

      }
    })
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

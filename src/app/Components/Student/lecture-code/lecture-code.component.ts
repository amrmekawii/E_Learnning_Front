import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';

@Component({
  selector: 'app-lecture-code',
  templateUrl: './lecture-code.component.html',
  styleUrls: ['./lecture-code.component.css']
})
export class LectureCodeComponent implements OnInit {

  inputdata: any;
  form!: FormGroup; // Define a FormGroup
  StudentId: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<LectureCodeComponent>,
    private formBuilder: FormBuilder,
    private location: Location,
    private QuizServ: QuizService,
    private Auth: AuthenticationServiceService,
    private Toaster: ToastrService
  ) {
    this.StudentId = this.Auth.UserData.Id
  }
  Texts:any
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Code: ['', [Validators.required]],
    });

    this.inputdata = this.data.title;
    console.log(this.inputdata)
    console.log("lllaaaaaaaaaaaaaaaaaaaaaa");

  }
  closepopup() {
    setTimeout(() => {
    }, 1000);
    this.ref.close('Closed using function');
  }
  onSubmit() {
    if (this.form.valid) {
console.log(this.form.value);

      this.QuizServ.AcessLectureByCode(this.StudentId, this.form.value.Code).subscribe({
        next: (data) => {
          console.log(data);
          if(data ==2){
            this.ref.close('Closed using function');
            this.Toaster.success("Lucture Access Done")

          }
          if(data ==-1){
            this.Texts="This Not Valid"
            this.Toaster.error("Lucture Access Deny", "Check Code")

          }

        },
        error: () => {
          this.Toaster.error("Lucture Access Deny", "Check Code")

        }
      })
    }
  }
}

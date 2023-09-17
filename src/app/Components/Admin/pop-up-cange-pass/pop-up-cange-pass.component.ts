import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChangePassService } from 'src/app/Services/ChangePassword/change-pass.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { ChangePassDto } from 'src/app/TypeDto/ChangePassDto';

@Component({
  selector: 'app-pop-up-cange-pass',
  templateUrl: './pop-up-cange-pass.component.html',
  styleUrls: ['./pop-up-cange-pass.component.css']
})
export class PopUpCangePassComponent  implements OnInit{
  changePassForm!: FormGroup; 
  UserDataPop :any

  constructor(private fb: FormBuilder , private ref: MatDialogRef<PopUpCangePassComponent>, private CangePass: ChangePassService   ,private toastr: ToastrService,private auth: AuthenticationServiceService ) { }

  ngOnInit(): void {
    
      this.UserDataPop =  this.auth.UserData
      console.log(this.UserDataPop)
      this.createForm(this.UserDataPop.Id);
  }
  onSubmit() {
    if (this.changePassForm.valid) {
      const formData = this.changePassForm.value as ChangePassDto;
      // formData.Id =this.UserDataPop.Id;
      console.log(formData)
this.CangePass.UpUser(formData).subscribe({
  next: (data) => {
    console.log(data);
    this.toastr.success("Done", "success Change Password")

    this.ref.close('Closed using function');

  },
  error: (err) => {
    console.log(err)
    this.toastr.error(err.error[0].code,err.error[0].description)
    this.toastr.error(err.error[1].code,err.error[1].description)

  }})
    } else {
      this.toastr.error("Data Not Valid/Require")

    }
  }
  closepopup() {
    this.ref.close('Closed using function');
  }
  
  createForm(id:string) {
    this.changePassForm = this.fb.group({
      Id: [id],
      OldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required]
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { RegisterDto } from 'src/app/TypeDto/Register';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 constructor(private toastr: ToastrService,private authService :AuthenticationServiceService, private router: Router, private formBuilder: FormBuilder ) { }

  form1?: FormGroup;

  public Rdto: RegisterDto
    = {
      firstName: "string",
      secondName: "string",
      lastttName: "string",
      password: "string",
      phoneNumber: "string",
      parentPhoneNumber: "string",
      yearid: 0,
      role: 0,
      userClassDTO: {},
    };

  ngOnInit(): void {
    this.form1 = this.formBuilder.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      lastttName: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      parentPhoneNumber: ['', Validators.required],
      yearid: ['', Validators.required],
      role: ['', Validators.required],
      userClassId: ['', Validators.required],
      userClassName: ['', Validators.required],
    })
  }

  // register(rgister: FormGroup): void {
  //   console.log(rgister.value);
  //   if (rgister.valid) {
  //     this.Rdto["firstName"] = rgister.value["firstName"];
  //     this.Rdto["secondName"] = rgister.value["secondName"];
  //     this.Rdto["lastttName"] = rgister.value["lastttName"];
  //     this.Rdto["password"] = rgister.value["password"];
  //     this.Rdto["phoneNumber"] = rgister.value["phoneNumber"];
  //     this.Rdto["parentPhoneNumber"] = rgister.value["parentPhoneNumber"];
  //     this.Rdto["yearid"] = rgister.value["yearid"];
  //     this.Rdto["userClassDTO"].id = rgister.value["userClassId"];
  //     this.Rdto["userClassDTO"].name = rgister.value["userClassName"];

  //     this.authService.AddUser(this.Rdto).subscribe(
  //       {
  //         next: (data) => {

  //           this.toastr.success("Done", "success Register")
  //           setTimeout(() => this.router.navigateByUrl('Login'), 3000)

  //         },
  //         error: (err) => {
  //           console.log(err)
  //           console.log(err.error.length)

  //           for (var i = 0; i < err.error.length; i++) {

  //             this.toastr.warning(err.error[i].code)
  //             this.toastr.warning(err.error[i].description)


  //           }
  //         }
  //       }
  //     )
  //   }
  // }
}

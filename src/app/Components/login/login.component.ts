import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/TypeDto/LoginDto';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private video!: HTMLVideoElement;
  constructor(
    private authService: AuthenticationServiceService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  form!: FormGroup;
  public credentials: LoginDto = {
    UserName: "string",
    Password: "string",
  };
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.video = document.querySelector('#video') as HTMLVideoElement;
    this.video.play();


  }
  ngOnDestroy(): void {
    this.video.pause();
  }


  handleSubmit(login: FormGroup) {
    if (login.valid) {

      this.credentials.UserName = login.value["username"];
      this.credentials.Password = login.value["password"];
      console.log(this.credentials);

      this.authService.login(this.credentials).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success("Done", "success Register")
          console.log(data.token);

        },
        error: (err) => {
          console.log(err)
          this.toastr.error(err.error)
        }

      }




      )
    }
  }
}
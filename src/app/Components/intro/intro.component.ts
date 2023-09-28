import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { HostListener } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';




@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent implements OnInit {

  constructor(private auth: AuthenticationServiceService) { }
  Islogin!: boolean
  role?: any
  
  ngOnInit(): void {
    Aos.init();
    this.Islogin = this.auth.isLoggedIn$.value
    this.role = this.auth.UserData.role
  
  }
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100; }// Adjust the scroll threshold
}

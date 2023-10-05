import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isExpanded:boolean =false ;  
 constructor(private auth:AuthenticationServiceService ,private route: Router,){}
  
  logout() {


    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      this.auth.isLoggedIn$.next(false);

      this.route.navigate([''])

      console.log(this.route.url)
    }


  }

}

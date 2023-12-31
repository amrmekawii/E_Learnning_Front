import { Component  , OnInit, Inject} from '@angular/core';
import { AuthenticationServiceService } from './Services/UserAuthentication/authentication-service.service';
import jwtDecode from 'jwt-decode';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'amrfront';
  safeUrl: SafeHtml ='';

  private authenticationService: AuthenticationServiceService
  constructor(authenticationService: AuthenticationServiceService,private sanitizer: DomSanitizer ,    @Inject(DOCUMENT)  private   document: Document  ){
   this.authenticationService =authenticationService

  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authenticationService.isLoggedIn$.next(true);

      let encoseToken = JSON.stringify(localStorage.getItem('token'));
      let decodeToken: any = jwtDecode(encoseToken);
      this.authenticationService.UserData.Id = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      this.authenticationService.UserData.name = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      this.authenticationService.UserData.role = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log( this.authenticationService.UserData)
   
   
   
   
   
    }
   
    this.document.addEventListener('contextmenu', (e:any) => e.preventDefault());
    this.document.onkeydown = (e:any) => {
      // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
      if (
        e.keyCode === 123 ||
        this.ctrlShiftKey(e, 'I') ||
       this. ctrlShiftKey(e, 'J') ||
       this. ctrlShiftKey(e, 'C') ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
      )
        return false; 
        else{
          return true;
        }
    };


    
  
  
  }
  ctrlShiftKey(e:any, keyCode:any) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { AdminInfoService } from 'src/app/Services/AdminInfo/admin-info.service';
import { PopUpCangePassComponent } from '../pop-up-cange-pass/pop-up-cange-pass.component';

@Component({
  selector: 'app-global-screen',
  templateUrl: './global-screen.component.html',
  styleUrls: ['./global-screen.component.css']
})
export class GlobalScreenComponent implements OnInit {
  UserDataPop :any

  constructor( private dialog: MatDialog ,private auth: AuthenticationServiceService ,private info: AdminInfoService) {
  }

  ngOnInit(): void {
   this.UserDataPop =  this.auth.UserData
   console.log(this.UserDataPop)
  }
  Openpopup() {
    this.info.GetUser(this.UserDataPop.Id).subscribe({
      next: (data) => {
        console.log(data);
        var _popup = this.dialog.open(PopUpComponent, {
          width: '60%',
          exitAnimationDuration: '1000ms',
          enterAnimationDuration:'1000ms',
          disableClose: true,
          data: {
            title: data,
          }
        });
      },
      error: (err) => {
        console.log(err)
        
      }

    }
    )
  
}


Openpopup2() {

  var _popup = this.dialog.open(PopUpCangePassComponent, {
    width: '60%',
    exitAnimationDuration: '1000ms',
    enterAnimationDuration:'1000ms',
    disableClose: true,
   
  });
}
}

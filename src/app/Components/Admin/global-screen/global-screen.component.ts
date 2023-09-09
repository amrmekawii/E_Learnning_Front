import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-global-screen',
  templateUrl: './global-screen.component.html',
  styleUrls: ['./global-screen.component.css']
})
export class GlobalScreenComponent {
  constructor( private dialog: MatDialog) {
  }

  Openpopup() {
    var _popup = this.dialog.open(PopUpComponent, {
      width: '50%',
      data: {
        title: "AMR KOTP",
      }
    });
}
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit{

  inputdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopUpComponent>) {
  }
  ngOnInit(): void {
    this.inputdata = this.data;
  }
  closepopup() {
    this.ref.close('Closed using function');
  }

}

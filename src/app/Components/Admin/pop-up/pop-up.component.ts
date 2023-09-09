import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminInfoService } from 'src/app/Services/AdminInfo/admin-info.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit{

  inputdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopUpComponent>  ) {
  }
  ngOnInit(): void {
    this.inputdata = this.data.title;
    console.log(this.inputdata)
  }
  closepopup() {
    this.ref.close('Closed using function');
  }
  

}

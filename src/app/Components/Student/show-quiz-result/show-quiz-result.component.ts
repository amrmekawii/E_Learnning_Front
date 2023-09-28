import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-quiz-result',
  templateUrl: './show-quiz-result.component.html',
  styleUrls: ['./show-quiz-result.component.css']
})
export class ShowQuizResultComponent implements OnInit{

  inputdata: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ShowQuizResultComponent> ,  private location: Location  ) {
  }
  ngOnInit(): void {
    this.inputdata = this.data.title;
    console.log(this.inputdata)
    console.log("lllaaaaaaaaaaaaaaaaaaaaaa");
    
  }
  closepopup() {
    setTimeout(() => {
      this.location.back();
    }, 1000);
    this.ref.close('Closed using function');
  }
  
}

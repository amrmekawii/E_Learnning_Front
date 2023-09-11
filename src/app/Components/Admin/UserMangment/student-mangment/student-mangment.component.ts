import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-student-mangment',
  templateUrl: './student-mangment.component.html',
  styleUrls: ['./student-mangment.component.css']
})
export class StudentMangmentComponent {
  breadCrumbItems: Array<{}> | undefined; 
  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Elements', active: true }];
  }

}

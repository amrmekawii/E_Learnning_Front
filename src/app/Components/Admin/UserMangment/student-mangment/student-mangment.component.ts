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


  data = [
    { id: 1, name: "Angular" },
    { id: 2, name: "React" },
    { id: 3, name: "Vue" },
    { id: 4, name: "Bootstrap" },
    { id: 5, name: "Foundation" },
  ]

  searchText = '';

  

}

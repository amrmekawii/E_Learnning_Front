import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent {
  IdParams!: any;

constructor(private myRoute: ActivatedRoute){
  this.IdParams = myRoute.snapshot.paramMap.get('id');
console.log(this.IdParams);

}
}

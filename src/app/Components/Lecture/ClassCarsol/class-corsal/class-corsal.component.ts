import { Component,ViewChild ,OnInit, Output, EventEmitter} from '@angular/core';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';

@Component({
  selector: 'app-class-corsal',
  templateUrl: './class-corsal.component.html',
  styleUrls: ['./class-corsal.component.css']
})
export class ClassCorsalComponent  implements OnInit  {
  @ViewChild('elFilter') elFilter: any
  isFullyScrolledRight: boolean = false
  isFullyScrolledLeft: boolean = false
  ClassList!: any
  selectedItemIndex: number = -1;

  selectItem(index: number) {
    if (this.selectedItemIndex === index) {
        // Clicked on the same item again, so unselect it
        this.selectedItemIndex = -1;
    } else {
        // Clicked on a different item, update the selection
        this.selectedItemIndex = index;
    }
    // Emit the selected item's index using the Task EventEmitter if needed
    if (this.selectedItemIndex !== -1) {
        this.Task.emit(this.ClassList[this.selectedItemIndex].id);
    }
}


@Output() Task =new EventEmitter<number>()

SendId(id:number){
  this.Task.emit(id)
  console.log(id)
}


constructor(    private Getcalsss: GetAllLectureService  ){}

ngOnInit(): void {
  this.Getcalsss.GetAllClass().subscribe({
    next: (data) => {
      this.ClassList = data
      console.log(   this.ClassList[0])

    },
    error: (err) => {
      console.log(err)
    }
  })

}

  onScroll(direction: number): void {
    if (this.elFilter.nativeElement) {
      this.elFilter.nativeElement.scrollLeft += 500 * direction
        this.calcIsFullyScrolled()
    }
  }

  calcIsFullyScrolled() {

    const calc = Math.ceil(this.elFilter.nativeElement?.scrollLeft) - Math.ceil(this.elFilter.nativeElement?.scrollWidth - this.elFilter.nativeElement?.clientWidth)

    if (this.elFilter.nativeElement) {
      this.isFullyScrolledRight = Math.abs(calc) <= 1
      this.isFullyScrolledLeft = this.elFilter.nativeElement?.scrollLeft === 0

    }
  }
}

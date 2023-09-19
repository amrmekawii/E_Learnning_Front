import { Component ,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { QuizAllDto } from 'src/app/TypeDto/GetAllQuiz';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';
@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.css']
})
export class QuizHomeComponent implements OnInit {
  constructor(  private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private Getcalsss: GetAllLectureService,
    private QuizService: QuizService,
    ){
  
  }
  isLinear = false;
  ClassList!: any
  ClassLecId: QuizAllDto[] = []
  FiristId: any
  searchText = '';
  
  firstFormGroup = this._formBuilder.group({
    ClassId: ['', Validators.required],
  });
    secondFormGroup = this._formBuilder.group({
    Header: ['', [Validators.required, Validators.minLength(5)]],
  });
  quizForm = this._formBuilder.group({
    quizRequirement: [1, Validators.required],
  });
  Duration = this._formBuilder.group({
    timer: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  });
  timeForm  = this._formBuilder.group({
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
  });


  ngOnInit() {


    this.Getcalsss.GetAllClass().subscribe({
      next: (data) => {
        this.ClassList = data
        console.log(this.ClassList[0].id)
        this.FiristId = this.ClassList[0].id;
        this.QuizService.GetClassByClassId(this.ClassList[0].id).subscribe({
          next: (data) => {
            console.log(data)
            this.ClassLecId = data as QuizAllDto[]
            console.log(this.ClassLecId)
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

    ////////////////////////////////////////////FireWhenSelectClass
    onMyVariableChange(ClassID: number) {
      this, this.FiristId = ClassID
      console.log('myVariable changed in the child component:', ClassID);
      this.QuizService.GetClassByClassId(ClassID).subscribe({
        next: (data) => {
          console.log(data)
          if (data.length!=0) {
            this.ClassLecId = data as QuizAllDto[]
            console.log(this.ClassLecId)
          } else {
            this.ClassLecId = data as QuizAllDto[]
            console.log(this.ClassLecId)
            this.toastr.warning("This Class (" + ClassID + ") Has No Data")
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  
}

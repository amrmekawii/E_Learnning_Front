import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GetAllLectureService } from 'src/app/Services/Lecture/get-all-class.service';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { QuizAllDto } from 'src/app/TypeDto/GetAllQuiz';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';
import { QuizAddDto } from 'src/app/TypeDto/QuizAddDto';
@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.css']
})
export class QuizHomeComponent implements OnInit {
  constructor(private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private Getcalsss: GetAllLectureService,
    private QuizService: QuizService,
    private modalservice: NgbModal,

  ) {

  }
  @ViewChild('content') popupview!: ElementRef;

  isLinear = false;
  ClassList!: any[]
  ClassLecId: QuizAllDto[] = []
  FiristId: any
  searchText = '';
  AddQuiz = new QuizAddDto()
  QuizIdForDelete!:number
  //////forms for steper 
  firstFormGroup = this._formBuilder.group({
    ClassId: [0, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    Header: ['', [Validators.required, Validators.minLength(5)]],
  });
  quizForm = this._formBuilder.group({
    quizRequirement: [1, Validators.required],
  });
  Duration = this._formBuilder.group({
    timer: [0, [Validators.required, Validators.pattern('^[0-9]+$')]],
  });
  timeForm = this._formBuilder.group({
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
  });
  AddQuizForm = this._formBuilder.group({
    header: ['', Validators.required],
    startTime: [DateAdapter, Validators.required],
    classid: [0, Validators.required],
    endTime: [DateAdapter, Validators.required],
    duration: [0, Validators.required],
    quizType: [0, Validators.required]
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
        if (data.length != 0) {
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
  ////////////////////// Addquiz
  print() {

    this.AddQuizForm.patchValue({
      classid: this.firstFormGroup.value.ClassId,
      header: this.secondFormGroup.value.Header,
      quizType: this.quizForm.value.quizRequirement,
      duration: this.Duration.value.timer,
    });
    if (this.quizForm.value.quizRequirement == 0) {
      console.log("Lecture Month +++");
      
      this.AddQuizForm.patchValue({
        startTime: this.timeForm.value.startTime,
        endTime: this.timeForm.value.endTime,
      });
    }
    this.AddLecture(this.AddQuizForm);
  }

  AddLecture(data: FormGroup) {
    if (data.valid) {
      console.log(data.value)
      this.AddQuiz.classid = data.value.classid
      this.AddQuiz.header = data.value.header
      this.AddQuiz.quizType = data.value.quizType
      this.AddQuiz.duration = data.value.duration
    
      if (this.quizForm.value.quizRequirement == 0) {
        console.log("Lecture Month +++");

        this.AddQuiz.endTime = data.value.endTime
        this.AddQuiz.startTime = data.value.startTime
      }else{
        this.AddQuiz.endTime = new Date()
        this.AddQuiz.startTime = new Date()
      }
      console.log(this.AddQuiz)
      this.QuizService.AddQuiz(this.AddQuiz).subscribe({

        next: (data) => {
          console.log(data);
          this.toastr.success("Done", "success Added")
        },
        error: (err) => {
          console.log(err)
          this.toastr.error(err.error)
        },
      })
    }
    else {
      console.log(data.valid);
      console.log(data);

      this.toastr.warning("Enter Full Data First")

    }

  }


  /////////////////////////Delate quiz
  Delete( Id: number) {
this.QuizIdForDelete =Id
    this.modalservice.open(this.popupview, { size: 'lg' });
  }

  Delete2() {

    this.QuizService.DeleteQuiz(this.QuizIdForDelete).subscribe({
      next: (data) => {
        this.toastr.success('Quiz Deleted');

        // Remove the deleted assignment from the list
        const index = this.ClassList.findIndex(
          (assignment) => assignment.id === this.QuizIdForDelete
        );
  
        this.modalservice.dismissAll()

        setTimeout(() => {
          if (index !== -1) {
            console.log("delete +++++++++++");
            console.log(index);
            
            this.ClassList.splice(index, 1);
          }
        }, 1500);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
      },
    });
  }
}

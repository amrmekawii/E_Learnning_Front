import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { QuizAddQuationDto } from 'src/app/TypeDto/QuizAddQuatioDto';
import { GetQustionWithAnswersDto, QuestionType } from 'src/app/TypeDto/QuizDetailsDto';
enum QuizType {
  month,
  lecture
}


@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css']
})
export class QuizDetailsComponent implements OnInit {
  constructor(private myRoute: ActivatedRoute,
    private QuizServ: QuizService,
    private _formBuilder: FormBuilder,
    private fileUplode: FilesService,
    private toastr: ToastrService,
    private modalservice: NgbModal,


  ) {
    this.IdParams = myRoute.snapshot.paramMap.get('id');
    console.log(this.IdParams);
  }
  @ViewChild('content') popupview!: ElementRef;

  QuiationUdForDelete:any|number
  IdParams!: any;
  DataQuiz = new GetQustionWithAnswersDto()
  //
  QuizAddQuation=new QuizAddQuationDto()
  isLinear = false;
  myFormGroup!: FormGroup;

  secondFormGroup = this._formBuilder.group({
    Header: ['', [Validators.required,]],
  });
  quizForm = this._formBuilder.group({
    quizRequirement: [0, Validators.required], 
    Grade :[1, Validators.required]
  });
  LastForm = this._formBuilder.group({
      header: ['', Validators.required],
      type: [0, Validators.required],
      quizId: [0, Validators.required],
      Grade :[1, Validators.required],
      answerDTOs:  [[], Validators.required]
  });
  //


  ngOnInit(): void {
    this.QuizServ.GetQuizId(this.IdParams).subscribe({
      next: (data) => {
        this.DataQuiz = data
        console.log(this.DataQuiz);
    

      },
      error: (err) => { }
    })
    this.myFormGroup = this._formBuilder.group({
      addvideos: this._formBuilder.array([])
    })
  }

  //////////////////////////////////handelfile
  Uplodfile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;
    this.fileUplode.Upload(file).subscribe((response) => {
      console.log(response);
      this.secondFormGroup.get('Header')?.setValue(response.url)
    })
  }
  //////


  addVideo() {
    const videoFormGroup = this._formBuilder.group({
      header: ['', Validators.required],
      rightAnswer: [false, Validators.required]
    });

    if (this.myFormGroup.get('addvideos')?.valid || this.addvideos.controls.length == 0) {
      this.addvideos.push(videoFormGroup);
    }
  }

  get addvideos(): FormArray { return this.myFormGroup.get('addvideos') as FormArray; }
  removeVideo(index: number) {
    this.addvideos.removeAt(index);
  }

  print() {

    // this.LastForm.value.header = this.secondFormGroup.value.Header
    // this.LastForm.value.type = this.quizForm.value.quizRequirement
    // this.LastForm.value.quizId =this.IdParams
    // this.LastForm.value.answerDTOs = this.myFormGroup.get('addvideos')?.value
    this.LastForm.patchValue({
      header: this.secondFormGroup.get('Header')?.value,
      type: this.quizForm.get('quizRequirement')?.value,
      quizId: this.IdParams, Grade : this.quizForm.get('Grade')?.value ,
      answerDTOs: this.myFormGroup.get('addvideos')?.value
    });
    this.AddLecture(this.LastForm);
  }

    /////////////////////ForAddLect2
    AddLecture(data: FormGroup) {
      if (data.valid) {
      console.log(data.value)
      this.QuizAddQuation.header = data.value.header
      this.QuizAddQuation.type = data.value.type
      this.QuizAddQuation.quizId = data.value.quizId
      this.QuizAddQuation.grade=data.value.Grade;
      this.QuizAddQuation.answerDTOs = data.value.answerDTOs
      console.log(this.QuizAddQuation)
      this.QuizServ.AddQuizQuation(this.QuizAddQuation).subscribe({
  
        next: (data) => {
          console.log(data);
          this.toastr.success("Done", "success Added")
this.ngOnInit()
        },
        error: (err) => {
          console.log(err)
          this.toastr.error(err.error)
  
        },
      })}
      else{
        this.toastr.warning("Enter Full Data First")

      }
    }



    Delete( Id: any) {
      this.QuiationUdForDelete =Id
          this.modalservice.open(this.popupview, { size: 'lg' });
        }
      
        Delete2() {
      
          this.QuizServ.DeleteQuaition(this.QuiationUdForDelete).subscribe({
            next: (data) => {
              this.toastr.success('Quiz Deleted');
      
              // Remove the deleted assignment from the list
              const index = this.DataQuiz.getQuestionsDtos.findIndex(
                (assignment) => assignment.questionID === this.QuiationUdForDelete
              );
        
              this.modalservice.dismissAll()
      
              setTimeout(() => {
                if (index !== -1) {
                  console.log("delete +++++++++++");
                  console.log(index);
                  
                  this.DataQuiz.getQuestionsDtos.splice(index, 1);
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



///////////////////


import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilesService } from 'src/app/Services/FileUp/files.service';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { QuizAddAnswerDto } from 'src/app/TypeDto/QuizAddQuatioDto';
import { GetQuestionsDto, UpdateAnswersDto, UpdateQuestionsDto } from 'src/app/TypeDto/QuizDetailsDto';

@Component({
  selector: 'app-update-quation-answer',
  templateUrl: './update-quation-answer.component.html',
  styleUrls: ['./update-quation-answer.component.css']
})
export class UpdateQuationAnswerComponent implements OnInit {
  constructor(private myRoute: ActivatedRoute,
    private QuizServ: QuizService,
    private _formBuilder: FormBuilder,
    private fileUplode: FilesService,
    private toastr: ToastrService,

  ) {
    this.IdParams = myRoute.snapshot.paramMap.get('id');
  }
  IdParams!: any;
  QutionType: any
  QuationDat = new GetQuestionsDto()
  QuizAddAnswer = new QuizAddAnswerDto()
  QuationUpdateData = new UpdateQuestionsDto()
  updateForm = this._formBuilder.group({
    id: [0],
    header: ['', Validators.required],
    Grade: [1, Validators.required],
    answerDTOs: this._formBuilder.array([]),
  });

  ngOnInit(): void {
    this.QuizServ.GetQuationId(this.IdParams).subscribe({
      next: (data) => {
        this.QuationDat = data
        console.log(this.QutionType + "0000000000");

        this.QutionType = data.questionType
        console.log(this.QutionType + "0000000000");

        console.log(this.QuationDat);
        this.updateForm.patchValue({
          id: data.questionID,
          header: data.questionHeader,
          Grade:data.grade, 
          answerDTOs: data.getAnswersDtos,
        })
        // Populate existing answer data
        const existingAnswers = data.getAnswersDtos;
        if (existingAnswers && existingAnswers.length > 0) {
          const answersFormArray = this.updateForm.get('answerDTOs') as FormArray;
          existingAnswers.forEach((answer: any) => {
            answersFormArray.push(
              this._formBuilder.group({
                id: answer.answerID,
                header: answer.header,
                rightAnswer: answer.right,
              })
            );
          });
        }
      },

      error: (err) => {
        console.log(err);
      }
    })

  }

  //////////////////////////////////handelfile
  Uplodfile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;
    this.fileUplode.Upload(file).subscribe((response) => {
      console.log(response);
      this.updateForm.get('header')?.setValue(response.url)
    })
  }
  //////
  get answers(): FormArray {
    return this.updateForm.get('answerDTOs') as FormArray;
  }

  addAnswer() {
    // this.answers.push(
    //   this._formBuilder.group({
    //     id: [0],
    //     header: ['', Validators.required],
    //     rightAnswer: [false, Validators.required],
    //   })
    // );
    this.QuizAddAnswer.questionid = this.IdParams
    this.QuizServ.AddQuizAnswer(this.QuizAddAnswer).subscribe({
      next: () => {
        this.toastr.success("Done", "success Add Answer")
        this.answers.clear()
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);

      },
    })

  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
    console.log(this.answers.value);
    
    this.QuizServ.DeleteAnswer(index).subscribe({
      next: () => {
        this.toastr.success("Done", "success Delete Answer")
        this.answers.clear()
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err);

      },
    })
  }

  updateQuestion() {
    if (this.updateForm.valid) {
      console.log("lplppllplplplplplp");
      this.QuationUpdateData.id = this.updateForm.value.id as number
      this.QuationUpdateData.Grade = this.updateForm.value.Grade 
      this.QuationUpdateData.header = this.updateForm.value.header as string
      this.QuationUpdateData.answerDTOs = this.updateForm.value.answerDTOs as UpdateAnswersDto[]
      console.log(this.QuationUpdateData);

      this.QuizServ.UpdateQuation(this.QuationUpdateData).subscribe({
        next: (data) => {
          this.toastr.success("Done", "success Update")

        },
        error: (err) => {
          console.log(err);

          this.toastr.error(err.error[0])

        }
      })

    } else {
      this.toastr.warning("Finish Data Full First !!")

    }
  }
}
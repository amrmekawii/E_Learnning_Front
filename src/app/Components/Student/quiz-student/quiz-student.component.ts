import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { color } from 'html2canvas/dist/types/css/types/color';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { CheckQuizIssolvedDto, GetQuizToSolveDto, GetUserQuizAnswersDto, QuizResult, SubmitQuizDto, UserAnswerDto } from 'src/app/TypeDto/QuizDetailsDto';
import { ShowQuizResultComponent } from '../show-quiz-result/show-quiz-result.component';

@Component({
  selector: 'app-quiz-student',
  templateUrl: './quiz-student.component.html',
  styleUrls: ['./quiz-student.component.css']
})
export class QuizStudentComponent implements OnInit {
  constructor(private myRoute: ActivatedRoute,
    private QuizServ: QuizService,
    private Auth: AuthenticationServiceService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.IdParams = myRoute.snapshot.paramMap.get('id');
    this.StudentId = this.Auth.UserData.Id
    console.log(this.IdParams);
    this.quizForm = this._formBuilder.group({});
  }
  quizResult=new QuizResult(); 
  quizForm: FormGroup;
  timeRemaining: string = '';
  IdParams!: any;
  StudentId!: any
  Solve!: boolean
  Show!: boolean
  CheckQuiz = new CheckQuizIssolvedDto()
  QuizToSolv = new GetQuizToSolveDto()
  StudentSolve = new SubmitQuizDto()
  UserData: any

  GetUserQuizAnswer= new GetUserQuizAnswersDto()
  ngOnInit(): void {
    this.UserData = this.Auth.UserData

    this.CheckQuiz.userid = this.StudentId
    this.CheckQuiz.quizid = this.IdParams
    this.QuizServ.CheckQuizIssolved(this.CheckQuiz).subscribe({
      next: (data) => {
        console.log(data);
        this.Solve = data.solved
        this.Show = data.show
        if (this.Show == false && this.Solve == false) {
          this.GetQuizToSolve()
        }
        if (this.Show == true && this.Solve == true) {
          this.GetUserQuizAnswers()
        }

      },
      error: (error) => {

      }
    })
  }

  GetQuizToSolve() {
    this.QuizServ.GetQuizToSolve(this.CheckQuiz).subscribe({
      next: (data) => {
        this.QuizToSolv = data
        console.log(this.QuizToSolv);
        this.toastr.success("Start Quiz")

        console.log(this.QuizToSolv.start as Date)

        this.setupTimer()

      },
      error: (error) => {
        this.toastr.error("Some Thing Wrong")

      }
    })
  }

  GetUserQuizAnswers(){
    this.QuizServ.GetUserQuizAnswers(this.CheckQuiz).subscribe({
      next:(data)=>{
        this.GetUserQuizAnswer =data
      }
      ,error:()=>{}
    })
  }

  selectedAnswers2: UserAnswerDto[] = [];
  saveAnswer(questionId: any, answerID: any) {
    const existingIndex = this.selectedAnswers2.findIndex(item => item.questionId === questionId);

    if (existingIndex !== -1) {
      if (answerID) {
        this.selectedAnswers2[existingIndex].answerID = answerID;
      } else {
        this.selectedAnswers2.splice(existingIndex, 1);
      }
    } else {
      this.selectedAnswers2.push({ questionId: questionId, answerID: answerID });
    }
  }


  SubmitQuiz() {
    console.log(this.selectedAnswers2);
    this.StudentSolve.userid = this.StudentId
    this.StudentSolve.quizid = this.IdParams
    this.StudentSolve.userAnswerDtos = this.selectedAnswers2
    console.log(this.StudentSolve);
    console.log("123455555555555555555555555");
    
    
    this.QuizServ.StudentSolveZ(this.StudentSolve).subscribe({
      next: (data) => {
        console.log(data);
        this.quizResult.numberOfQuestions = data.numberofQuistion
        this.quizResult.colEfected = data.colEfected
        this.quizResult.userGrade = data.userGrade
        this.toastr.success("submited Quiz")

        this.Openpopup(this.quizResult)

      },
      error: (err) => {
        console.log(err);
        
        this.toastr.error("Some Thing Wrong", err.error[0])

      }
    })
  }

  Openpopup(data:QuizResult) {
        var _popup = this.dialog.open(ShowQuizResultComponent, {
          width: '45%',
          exitAnimationDuration: '1000ms',
          enterAnimationDuration:'1000ms',
          disableClose: true,
          data: {
            title: data,
          }
        });
      


    }
    
  

  setupTimer() {
    const startDate1 = new Date(this.QuizToSolv.start as Date);
    const startDate =  new Date();

    const endDate = new Date(this.QuizToSolv.end as Date);
    const timeDifferenceInMilliseconds = endDate.getTime() - startDate.getTime();
        console.log(timeDifferenceInMilliseconds);

    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

    console.log(timeDifferenceInMinutes);

    let remainingTime = timeDifferenceInMinutes * 60 * 1000; // Convert minutes to milliseconds
    console.log(remainingTime);

    const timerInterval = setInterval(() => {
      remainingTime -= 1000; // Subtract one second

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        this.timeRemaining = 'Time is up!';
        this.SubmitQuiz()
      } else {
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        this.timeRemaining = `${minutes} min ${seconds} sec`;
      }
    }, 1000);

  }


  // submitQuiz() {
  //   const selectedAnswers = [];

  //   for (let i = 0; i < this.QuizToSolv.quiestions!.getQuestionsDtos.length; i++) {
  //     const selectedAnswerID = this.quizForm.get('question_' + i)?.value;
  //     const questionID = this.QuizToSolv.quiestions?.getQuestionsDtos[i].questionID;

  //     if (selectedAnswerID !== null && questionID !== null) {
  //       selectedAnswers.push({
  //         questionID,
  //         answerID: selectedAnswerID,
  //       });
  //     }
  //   }

  //   console.log(selectedAnswers);
  // }

}

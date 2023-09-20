import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/Services/Quiz/quiz.service';
import { AuthenticationServiceService } from 'src/app/Services/UserAuthentication/authentication-service.service';
import { QuizMonthInfoDto, UserQuizDto } from 'src/app/TypeDto/QuizDetailsDto';

@Component({
  selector: 'app-quizs-available',
  templateUrl: './quizs-available.component.html',
  styleUrls: ['./quizs-available.component.css']
})
export class QuizsAvailableComponent implements OnInit {
  constructor(private QuizServ: QuizService, private Auth: AuthenticationServiceService) {
    this.StudentId = this.Auth.UserData.Id

  }
  StudentId!: any
  searchText = '';

  GetUserQuizesRes: UserQuizDto[] = []
  QuizMonthInfo: QuizMonthInfoDto[] = []
  ngOnInit(): void {

    this.QuizServ.GetUserQuizesResult(this.StudentId).subscribe({
      next: (data) => {

        this.GetUserQuizesRes = data
      },
      error: () => { }
    })
    this.QuizServ.GetMonthExams(this.StudentId).subscribe({

      next: (data) => {

        this.QuizMonthInfo = data
        console.log(this.QuizMonthInfo);

      },
      error: () => { }
    })

  }


}

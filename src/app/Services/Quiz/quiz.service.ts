import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizAllDto } from 'src/app/TypeDto/GetAllQuiz';
import { QuizAddDto } from 'src/app/TypeDto/QuizAddDto';
import { QuizAddQuationDto } from 'src/app/TypeDto/QuizAddQuatioDto';
import { CheckQuizIssolvedDto, GetQuestionsDto, GetQuizToSolveDto, GetQustionWithAnswersDto, GetUserQuizAnswersDto, QuizMonthInfoDto, QuizResult, SubmitQuizDto, UpdateQuestionsDto, UserQuizDto } from 'src/app/TypeDto/QuizDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class QuizService {


  constructor(private client: HttpClient) { }
  private readonly Base_URL = "https://localhost:7206/api/Quiz/GetAllQuizsByClass?Classid=";
  private readonly Base_URL2 = "https://localhost:7206/api/Quiz/AddQuiz";
  private readonly Base_URL3 = "https://localhost:7206/api/Quiz/GetAllQAByQuiz/";
  private readonly Base_URL4 = "https://localhost:7206/api/Quiz/AddQuestion";
  private readonly Base_URL5 = "https://localhost:7206/api/Quiz/GetQId/";
  private readonly Base_URL6 = "https://localhost:7206/api/Quiz/UpdateQuestion";
  private readonly Base_URL7 = "https://localhost:7206/api/Quiz/CheckQuizIssolved";
  private readonly Base_URL8 = "https://localhost:7206/api/Quiz/GetQuizToSolve";
  private readonly Base_URL9 = "https://localhost:7206/api/Quiz/StudentSolveQuiz";
  private readonly Base_URL910 = "https://localhost:7206/api/Quiz/GetUserQuizAnswers";
  private readonly Base_URL911 = "https://localhost:7206/api/Quiz/GetUserQuizesResult/";
  private readonly Base_URL912 = "https://localhost:7206/api/Quiz/GetMonthExams/";
  private readonly Base_URL913 = "https://localhost:7206/api/Lecture/AcessLectureByCode/";




  public GetClassByClassId(id: number): Observable<QuizAllDto[]> {

    return this.client.get<QuizAllDto[]>(this.Base_URL + id);

  }
  public GetQuationId(id: number): Observable<any> {

    return this.client.get<QuizAllDto>(this.Base_URL5+id);

  }
  public GetQuizId(id: number): Observable<GetQustionWithAnswersDto> {

    return this.client.get<GetQustionWithAnswersDto>(this.Base_URL3+id);

  }
  public AddQuiz(Obj: QuizAddDto): Observable<any> {

    return this.client.post(this.Base_URL2 , Obj);

  }
  public AddQuizQuation(Obj: QuizAddQuationDto): Observable<any> {

    return this.client.post(this.Base_URL4 , Obj);

  }
  public UpdateQuation(Obj: UpdateQuestionsDto): Observable<any> {

    return this.client.put(this.Base_URL6 , Obj);

  }
  public CheckQuizIssolved(Obj: CheckQuizIssolvedDto): Observable<any> {

    return this.client.post(this.Base_URL7 , Obj);

  }
  public GetQuizToSolve(Obj: CheckQuizIssolvedDto): Observable<any> {

    return this.client.post<GetQuizToSolveDto>(this.Base_URL8 , Obj);

  }
  public StudentSolveZ(Obj: SubmitQuizDto): Observable<any> {

    console.log("Here..........");
    
    console.log(Obj);

    console.log("Here..........");

    return this.client.post<QuizResult>(this.Base_URL9 , Obj);

  }
  public GetUserQuizAnswers(Obj: CheckQuizIssolvedDto): Observable<any> {

    return this.client.post<GetUserQuizAnswersDto>(this.Base_URL910 , Obj);

  }
  public GetUserQuizesResult(id: string): Observable<any> {

    return this.client.get<UserQuizDto[]>(this.Base_URL911+id);

  }
  public GetMonthExams(id: string): Observable<any> {

    return this.client.get<QuizMonthInfoDto[]>(this.Base_URL912+id);

  }
  public AcessLectureByCode(Userid: string,Code :string): Observable<any> {

    console.log(Userid+ Code);
    
    return this.client.post(this.Base_URL913+Userid+'/'+Code,null);

  }



}

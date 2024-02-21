import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizAllDto } from 'src/app/TypeDto/GetAllQuiz';
import { QuizAddDto } from 'src/app/TypeDto/QuizAddDto';
import { QuizAddAnswerDto, QuizAddQuationDto } from 'src/app/TypeDto/QuizAddQuatioDto';
import { CheckQuizIssolvedDto, GetQuestionsDto, GetQuizToSolveDto, GetQustionWithAnswersDto, GetUserQuizAnswersDto, QuizMonthInfoDto, QuizResult, SubmitQuizDto, UpdateQuestionsDto, UserQuizDto } from 'src/app/TypeDto/QuizDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class QuizService {


  constructor(private client: HttpClient) { }
  private readonly Base_URL = "https://amrbackend.azurewebsites.net/api/Quiz/GetAllQuizsByClass?Classid=";
  private readonly Base_URL2 = "https://amrbackend.azurewebsites.net/api/Quiz/AddQuiz";
  private readonly Base_URL3 = "https://amrbackend.azurewebsites.net/api/Quiz/GetAllQAByQuiz/";
  private readonly Base_URL4 = "https://amrbackend.azurewebsites.net/api/Quiz/AddQuestion";
  private readonly Base_URL5 = "https://amrbackend.azurewebsites.net/api/Quiz/GetQId?QId=";
  private readonly Base_URL6 = "https://amrbackend.azurewebsites.net/api/Quiz/UpdateQuestion";
  private readonly Base_URL7 = "https://amrbackend.azurewebsites.net/api/Quiz/CheckQuizIssolved";
  private readonly Base_URL8 = "https://amrbackend.azurewebsites.net/api/Quiz/GetQuizToSolve";
  private readonly Base_URL9 = "https://amrbackend.azurewebsites.net/api/Quiz/StudentSolveQuiz";
  private readonly Base_URL910 = "https://amrbackend.azurewebsites.net/api/Quiz/GetUserQuizAnswers2";
  private readonly Base_URL911 = "https://amrbackend.azurewebsites.net/api/Quiz/GetUserQuizesResult/";
  private readonly Base_URL912 = "https://amrbackend.azurewebsites.net/api/Quiz/GetMonthExams/";
  private readonly Base_URL913 = "https://amrbackend.azurewebsites.net/api/Lecture/AcessLectureByCode/";
  private readonly Base_URL914 = "https://amrbackend.azurewebsites.net/api/Quiz/DeleteQuiz/";
  private readonly Base_URL915 = "https://amrbackend.azurewebsites.net/api/Quiz/DeleteQuestion/";
  private readonly Base_URL91 = "https://amrbackend.azurewebsites.net/api/Quiz/AddAnswer";
  private readonly Base_URL96 = "https://amrbackend.azurewebsites.net/api/Quiz/DeleteAnswer/";

  private readonly Base_URL9111 = "https://amrbackend.azurewebsites.net/api/Quiz/GetQuizResult/"

  private readonly Base_saveuseranswer = "https://amrbackend.azurewebsites.net/api/Quiz/Adduseranswer"
  private readonly delteuserquiz = " https://amrbackend.azurewebsites.net/api/Quiz/deleteuserquiz/"

  private readonly getquizlecacess = "https://amrbackend.azurewebsites.net/api/Quiz/GetQuizAcessToStudent/"

  public GetQuizAcessToStudent(id: any) {

    return this.client.get(this.getquizlecacess+id);

  }


  public GetClassByClassId(id: number): Observable<QuizAllDto[]> {

    return this.client.get<QuizAllDto[]>(this.Base_URL + id);

  }
  public delteuserquizm(id: number) {

    return this.client.delete(this.delteuserquiz + id);

  }



  public SaveAnswer(Answer: any) {

    return this.client.post(this.Base_saveuseranswer , Answer);

  }
  public GetQuationId(id: number): Observable<any> {

    return this.client.get<GetQuestionsDto>(this.Base_URL5+id);

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
  public AddQuizAnswer(Obj: QuizAddAnswerDto): Observable<any> {

    return this.client.post(this.Base_URL91 , Obj);

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


  public GetQuizesResult(id: any): Observable<any> {

    return this.client.get(this.Base_URL9111+id);

  }

  public GetMonthExams(id: string): Observable<any> {

    return this.client.get<QuizMonthInfoDto[]>(this.Base_URL912+id);

  }
  public AcessLectureByCode(Userid: string,Code :string): Observable<any> {

    console.log(Userid+ Code);
    
    return this.client.post(this.Base_URL913+Userid+'/'+Code,null);

  }

  public DeleteQuiz(Id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Define the custom options object
    const options = {
      headers: headers,
    };

    return this.client.delete<any>(this.Base_URL914+Id);
  }
  public DeleteQuaition(Id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Define the custom options object
    const options = {
      headers: headers,
    };

    return this.client.delete<any>(this.Base_URL915+Id);
  }
  public DeleteAnswer(Id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Define the custom options object
    const options = {
      headers: headers,
    };

    return this.client.delete<any>(this.Base_URL96+Id);
  }

}

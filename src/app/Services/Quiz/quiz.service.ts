import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizAllDto } from 'src/app/TypeDto/GetAllQuiz';
import { QuizAddDto } from 'src/app/TypeDto/QuizAddDto';
import { QuizAddQuationDto } from 'src/app/TypeDto/QuizAddQuatioDto';
import { GetQuestionsDto, GetQustionWithAnswersDto, UpdateQuestionsDto } from 'src/app/TypeDto/QuizDetailsDto';

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



}

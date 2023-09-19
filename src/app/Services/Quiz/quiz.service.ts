import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizAllDto } from 'src/app/TypeDto/GetAllQuiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {


  constructor(private client: HttpClient) { }
  private readonly Base_URL = "https://localhost:7206/api/Quiz/GetAllQuizsByClass?Classid=";




  public GetClassByClassId(id: number): Observable<QuizAllDto[]> {

    return this.client.get<QuizAllDto[]>(this.Base_URL + id);

  }



}

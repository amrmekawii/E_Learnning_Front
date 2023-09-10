import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassAddDto } from 'src/app/TypeDto/ClassAddDto';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';

@Injectable({
  providedIn: 'root'
})
export class GetAllClassService {

  constructor(private client: HttpClient) { }
  private readonly Base_URL = "https://localhost:7206/api/Class/GetAllClasses";
  private readonly Base_URL2 = "https://localhost:7206/api/Lecture/addLecture";

  public  GetAllClass(): Observable<ClassAllDto> {

    return this.client.get(this.Base_URL);

  }


  public  AddClass(Object: ClassAddDto): Observable<any> {
    console.log(Object)
    return this.client.post(this.Base_URL2,Object);

  }

}

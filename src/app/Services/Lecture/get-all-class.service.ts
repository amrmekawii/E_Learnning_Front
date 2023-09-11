import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LectuterAddDto } from 'src/app/TypeDto/ClassAddDto';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';

@Injectable({
  providedIn: 'root'
})
export class GetAllLectureService {

  constructor(private client: HttpClient) { }
  private readonly Base_URL = "https://localhost:7206/api/Class/GetAllClasses";
  private readonly Base_URL2 = "https://localhost:7206/api/Lecture/addLecture";
  private readonly Base_URL3 = "https://localhost:7206/api/Lecture/GetLectureList/";

  public  GetAllClass(): Observable<ClassAllDto> {

    return this.client.get(this.Base_URL);

  }


  public  AddLec(Object: LectuterAddDto): Observable<any> {
    console.log(Object)
    return this.client.post(this.Base_URL2,Object);

  }

  public GetLecByClassId(id:number): Observable<GetLectByClassIdDto>{

    return this.client.get(this.Base_URL3+id);

  }




}

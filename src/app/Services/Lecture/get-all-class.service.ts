import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LectuterAddDto } from 'src/app/TypeDto/LectureAddDto';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';
import { userLectureAttendancesDto } from 'src/app/TypeDto/StudentAudeanceDto';
import { AddUserAccessDto } from 'src/app/TypeDto/AddUserAccessDto';
import { ClassActive } from 'src/app/TypeDto/ClassIdActive';
import { UserInClassDto } from 'src/app/TypeDto/GetStudents';
import { Data } from '@angular/router';
import { CodeLecDto, GenrateCodeDto } from 'src/app/TypeDto/CodeGenrateDto';

@Injectable({
  providedIn: 'root'
})
export class GetAllLectureService {

  constructor(private client: HttpClient) { }
  private readonly Base_URL = "https://localhost:7206/api/Class/GetAllClasses";
  private readonly Base_URL2 = "https://localhost:7206/api/Lecture/addLecture";
  private readonly Base_URL3 = "https://localhost:7206/api/Lecture/GetLectureList/";
  private readonly Base_URL4 = "https://localhost:7206/api/Lecture/GetLectureAttendance/";
  private readonly Base_URL5 = "https://localhost:7206/api/Lecture/AddAcessToUser";
  private readonly Base_URL6 = "https://localhost:7206/api/User/GetStudents";
  private readonly Base_URL7 = "https://localhost:7206/api/Lecture/GenerateCodes";

  public GetAllClass(): Observable<ClassAllDto[]> {

    return this.client.get<ClassAllDto[]>(this.Base_URL);

  }


  public AddLec(Object: LectuterAddDto): Observable<any> {
    console.log(Object)
    return this.client.post(this.Base_URL2, Object);

  }

  public GetLecByClassId(id: number): Observable<GetLectByClassIdDto[]> {

    return this.client.get<GetLectByClassIdDto[]>(this.Base_URL3 + id);

  }




  public userAttendances(id: number): Observable<any> {

    return this.client.get(this.Base_URL4 + id);

  }

  public UserAddAccess(object: AddUserAccessDto[]): Observable<any> {

    return this.client.post(this.Base_URL5, object);

  }

  public UserActive(object: ClassActive): Observable< UserInClassDto[]> {
    console.log(object);

    return this.client.post<UserInClassDto[]>(this.Base_URL6, object);

  }
  public GenerateCodeLecture(object: GenrateCodeDto): Observable< CodeLecDto[]> {
    console.log(object);

    return this.client.post<CodeLecDto[]>(this.Base_URL7, object);

  }


}

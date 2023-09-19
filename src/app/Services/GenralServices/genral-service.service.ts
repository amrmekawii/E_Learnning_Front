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
import { UserYearDTO } from 'src/app/TypeDto/YearsDto';
import { UserClassDTO } from 'src/app/TypeDto/UserClassDTO';

@Injectable({
  providedIn: 'root'
})
export class GenralServiceService {

  constructor(private client: HttpClient) { }

  private readonly Base_URL = "https://localhost:7206/api/Class/GetAllYers";
  private readonly Base_URL2 = "https://localhost:7206/api/Class/GetClassByYear/";


public GetAllYears () : Observable<UserYearDTO>  {

  return this.client.get(this.Base_URL)

}
public GetAllClassesByYear ( id :any) :Observable<any> {

  return this.client.get(this.Base_URL2+id);

}




}

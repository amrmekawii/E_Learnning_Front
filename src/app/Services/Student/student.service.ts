import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddClassRequestdTO } from 'src/app/TypeDto/AddClassRequestDto';
import { StudentHomeDto } from 'src/app/TypeDto/StudentHomeDto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly Base_URL = "https://amrbackend.azurewebsites.net/api/User/userHome?userid=";
  private readonly Base_URL1 = "https://amrbackend.azurewebsites.net/api/Class/AddClassrequest";

  constructor(private myClient: HttpClient) { }


  public GetAssimentBtId(Id: number): Observable<StudentHomeDto> {
    return this.myClient.get<StudentHomeDto>(this.Base_URL+Id);
  }
  public AddClassrequest(Iobject: AddClassRequestdTO): Observable<any> {
    return this.myClient.post(this.Base_URL1,Iobject);
  }
}

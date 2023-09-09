import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePassDto } from 'src/app/TypeDto/ChangePassDto';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {
  constructor(private client: HttpClient) { }
  private readonly Base_URL = "http://localhost:5031/api/User/ChangePassword";


  public UpUser(User: ChangePassDto): Observable<any> {
    console.log(User)

    return this.client.put(this.Base_URL,User);

  }
}

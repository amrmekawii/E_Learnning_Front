import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminInfoService {

  constructor(private client: HttpClient) { }
  private readonly Base_URL = "http://localhost:5031/api/User/GetUser/";

  
  public GetUser(User: any): Observable<any> {
    console.log(User)

    return this.client.get(this.Base_URL+User);

  }
}

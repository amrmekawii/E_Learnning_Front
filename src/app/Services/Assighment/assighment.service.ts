import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  AssignmentDto } from 'src/app/TypeDto/AssighmentAllDto';

@Injectable({
  providedIn: 'root'
})
export class AssighmentService {

  constructor(private client: HttpClient) { }

  private readonly Base_URL = "https://localhost:7206/api/Assighment/GetAllAssighment";


  public GetAllAssoghment(): Observable<AssignmentDto[]> {

    return this.client.get<AssignmentDto[]>(this.Base_URL);

  }
}

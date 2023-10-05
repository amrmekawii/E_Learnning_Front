import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddAssighmentDto, DeleteAssighmentDto } from 'src/app/TypeDto/AssighmentAddDto';
import { AssignmentDto } from 'src/app/TypeDto/AssighmentAllDto';
import { AssignmentByIdDto } from 'src/app/TypeDto/AssighmentByIdDto';
import { UserAssighAnswerDTO } from 'src/app/TypeDto/AssighmentUaserAddDto';
import { UdateAssighmentDto } from 'src/app/TypeDto/AssighmentUpdateDto';
import { CorrectUserAssighmentDto } from 'src/app/TypeDto/AssighmenyCorrectDto';

@Injectable({
  providedIn: 'root'
})
export class AssighmentService {

  constructor(private client: HttpClient) { }

  private readonly Base_URL = "https://amrbackend.azurewebsites.net/api/Assighment/GetAllAssighment";
  private readonly Base_URL1 = "https://amrbackend.azurewebsites.net/api/Assighment/GetAssighmentById?id=";
  private readonly Base_URL2 = "https://amrbackend.azurewebsites.net/api/Assighment/AddAssihgment";
  private readonly Base_URL3 = "https://amrbackend.azurewebsites.net/api/Assighment/UpdateAssigmenty";
  private readonly Base_URL4 = "https://amrbackend.azurewebsites.net/api/Assighment/DeleteAssigment";
  private readonly Base_URL5 = "https://amrbackend.azurewebsites.net/api/Assighment/CorrectUserAss";
  private readonly Base_URL6 = "https://amrbackend.azurewebsites.net/api/Assighment/AddUserAssihgment";

  public GetAllAssoghment(): Observable<AssignmentDto[]> {
    return this.client.get<AssignmentDto[]>(this.Base_URL);
  }
  public GetAssimentBtId(Id: number): Observable<AssignmentByIdDto> {
    return this.client.get<AssignmentByIdDto>(this.Base_URL1 + Id);
  }
  public AddAssiment(Object: AddAssighmentDto): Observable<any> {
    return this.client.post(this.Base_URL2 ,Object);
  }
  public UpdateAssiment(Object: UdateAssighmentDto): Observable<any> {
    return this.client.put(this.Base_URL3 ,Object);
  }
  public DeleteAssiment(deleteObject: DeleteAssighmentDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Define the custom options object
    const options = {
      headers: headers,
      body: deleteObject, // Set the request body to your deleteObject
    };

    return this.client.delete<any>(this.Base_URL4,options);
  }
  public CorrectAssiment(Object: CorrectUserAssighmentDto): Observable<any> {
    return this.client.put(this.Base_URL5,Object);
  }
  public AddUserAssighAnswer(Object: UserAssighAnswerDTO): Observable<any> {
    return this.client.post(this.Base_URL6,Object);
  }



}

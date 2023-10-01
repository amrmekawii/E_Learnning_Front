import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LectuterAddDto, UpdateLucturDto } from 'src/app/TypeDto/LectureAddDto';
import { ClassAllDto } from 'src/app/TypeDto/ClassAll';
import { GetLectByClassIdDto } from 'src/app/TypeDto/GetLectByClassIdDto';
import { userLectureAttendancesDto } from 'src/app/TypeDto/StudentAudeanceDto';
import { AddUserAccessDto } from 'src/app/TypeDto/AddUserAccessDto';
import { ClassActive } from 'src/app/TypeDto/ClassIdActive';
import { UserInClassDto } from 'src/app/TypeDto/GetStudents';
import { Data } from '@angular/router';
import { CodeLecDto, GenrateCodeDto } from 'src/app/TypeDto/CodeGenrateDto';
import { AssignmentAndQuizCascadeDto } from 'src/app/TypeDto/AssighmentAllDto';
import { DeleteLectureDto } from 'src/app/TypeDto/AssighmentAddDto';

@Injectable({
  providedIn: 'root'
})
export class GetAllLectureService {

  constructor(private client: HttpClient) { }
  private readonly Base_URL = "https://e-learning-api.conveyor.cloud/api/Class/GetAllClasses";
  private readonly Base_URL2 = "https://e-learning-api.conveyor.cloud/api/Lecture/addLecture";
  private readonly Base_URL3 = "https://e-learning-api.conveyor.cloud/api/Lecture/GetLectureList/";
  private readonly Base_URL4 = "https://e-learning-api.conveyor.cloud/api/Lecture/GetLectureAttendance/";
  private readonly Base_URL5 = "https://e-learning-api.conveyor.cloud/api/Lecture/AddAcessToUser";
  private readonly Base_URL6 = "https://e-learning-api.conveyor.cloud/api/User/GetStudents";
  private readonly Base_URL7 = "https://e-learning-api.conveyor.cloud/api/Lecture/GenerateCodes";
  private readonly Base_URL8 = "https://e-learning-api.conveyor.cloud/api/Lecture/UpdateLecture";

  private readonly Base_URL20 = "https://e-learning-api.conveyor.cloud/api/Assighment/GetAllAssighmentsByClass?Classid=";
  private readonly Base_URL21 = "https://e-learning-api.conveyor.cloud/api/Quiz/GetAllQuizsByClass?Classid=";
  private readonly Base_URL22 = "https://e-learning-api.conveyor.cloud/api/Lecture/DeleteLecture";







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
    console.log("++++++++++++------------");

    console.log(object);
    console.log("++++++++++++------------");

    return this.client.post(this.Base_URL5, object);

  }

  public UserActive(object: ClassActive): Observable<UserInClassDto[]> {
    console.log(object);

    return this.client.post<UserInClassDto[]>(this.Base_URL6, object);

  }
  public GenerateCodeLecture(object: GenrateCodeDto): Observable<CodeLecDto[]> {
    console.log(object);

    return this.client.post<CodeLecDto[]>(this.Base_URL7, object);

  }
  public GetAllAssighmentsByClass(id: number): Observable<any> {
    return this.client.get<AssignmentAndQuizCascadeDto[]>(this.Base_URL20 + id);
  }
  public GetAllQuizsByClass(id: number): Observable<any> {
    return this.client.get<AssignmentAndQuizCascadeDto[]>(this.Base_URL21 + id);
  }
  public UpdateLecture(Obj: UpdateLucturDto): Observable<any> {
    return this.client.put(this.Base_URL8, Obj);
  }

  public DeleteLecture(deleteObject: DeleteLectureDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Define the custom options object
    const options = {
      headers: headers,
      body: deleteObject, // Set the request body to your deleteObject
    };

    return this.client.delete<any>(this.Base_URL22, options);
  }

}

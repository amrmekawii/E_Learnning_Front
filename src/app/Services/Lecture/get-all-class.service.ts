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
  private readonly Base_URL = "https://amrbackend.azurewebsites.net/api/Class/GetAllClasses";
  private readonly Base_URL2 = "https://amrbackend.azurewebsites.net/api/Lecture/addLecture";
  private readonly Base_URL3 = "https://amrbackend.azurewebsites.net/api/Lecture/GetLectureList/";
  private readonly Base_URL4 = "https://amrbackend.azurewebsites.net/api/Lecture/GetLectureAttendance/";
  private readonly Base_URL5 = "https://amrbackend.azurewebsites.net/api/Lecture/AddAcessToUser";
  private readonly Base_URL6 = "https://amrbackend.azurewebsites.net/api/User/GetStudents";
  private readonly Base_URL7 = "https://amrbackend.azurewebsites.net/api/Lecture/GenerateCodes";
  private readonly Base_URL8 = "https://amrbackend.azurewebsites.net/api/Lecture/UpdateLecture";

  private readonly Base_URL20 = "https://amrbackend.azurewebsites.net/api/Assighment/GetAllAssighmentsByClass?Classid=";
  private readonly Base_URL21 = "https://amrbackend.azurewebsites.net/api/Quiz/GetAllQuizsByClass?Classid=";
  private readonly Base_URL22 = "https://amrbackend.azurewebsites.net/api/Lecture/DeleteLecture";


  private readonly Base_URL23 = "https://amrbackend.azurewebsites.net/api/Lecture/DeleteLecture";

  
  private readonly Base_URL24 = "https://amrbackend.azurewebsites.net/api/Lecture/GetLectureWithUsers/";

  private readonly Base_URL25= "https://amrbackend.azurewebsites.net/api/Lecture/deleteLectueAccess/"

private readonly bas_url26 = "https://amrbackend.azurewebsites.net/api/Lecture/GettheLectureToadmin/"


private readonly getusertoaceessquiz  = "https://amrbackend.azurewebsites.net/api/Quiz/GetStudenttoUserAcess/"

private readonly savequizacess = "https://amrbackend.azurewebsites.net/api/Quiz/AddAcesstoQuiz"
private readonly GetQuizAcessToAdminN = "https://amrbackend.azurewebsites.net/api/Quiz/GetQuizAcessToAdmin/"
private DeleteUserAcessQuizu= "https://amrbackend.azurewebsites.net/api/Quiz/DeleteUserAcessQuiz/"
private getvideopart = "https://amrbackend.azurewebsites.net/api/Lecture/GetLecturePartsToUpdate/"

private readonly addvideolink ="https://amrbackend.azurewebsites.net/api/Lecture/AddVideoPart"
private readonly deletevideolink ="https://amrbackend.azurewebsites.net/api/Lecture/DeleteVideoPart/"
private readonly updatevideolink ="https://amrbackend.azurewebsites.net/api/Lecture/UpdateVideoPart"


private readonly addfilelink ="https://amrbackend.azurewebsites.net/api/Lecture/AddVideofile"
private readonly deletefilelink ="https://amrbackend.azurewebsites.net/api/Lecture/DeleteVideofile/"
private readonly updatefilelink ="https://amrbackend.azurewebsites.net/api/Lecture/UpdateVideofile"
private readonly  getcodes = "https://amrbackend.azurewebsites.net/api/Lecture/GetCodes"


private readonly  Getquizattendance = "https://amrbackend.azurewebsites.net/api/Quiz/GetStudentsWithUserQuiz/"

private readonly  GetPlaces = "https://amrbackend.azurewebsites.net/api/Lecture/GetTimePlaces/"
private readonly  GetPlacesuser = "https://amrbackend.azurewebsites.net/api/Lecture/GetTimePlacesUser/"

private readonly  AddUpdateDeleteQuiz = "https://amrbackend.azurewebsites.net/api/Quiz/AddUpdateDeleteQuiz"

private readonly  GetLectureattendance = "https://amrbackend.azurewebsites.net/api/Lecture/GetStudentsWithOfflineLecture/"

private readonly  AddUpdateDeleteLecture = "https://amrbackend.azurewebsites.net/api/Lecture/AddEditDeleteOfflineLecture"

private readonly  GetAllPlac = "https://amrbackend.azurewebsites.net/api/Lecture/GetPlaces"

private readonly  Addplace = "https://amrbackend.azurewebsites.net/api/Lecture/AddEditDeletePlace"


private readonly  GetAllTIMEPlac = "https://amrbackend.azurewebsites.net/api/Lecture/GetTimePlacesToEdit"
private readonly  AddEditDeleteTimePlace = "https://amrbackend.azurewebsites.net/api/Lecture/AddEditDeleteTimePlace"

private readonly  Updateassighmentonline = "https://amrbackend.azurewebsites.net/api/Lecture/AddAssighmentOnlineGrade"


public AddGradeOnline(x:any ) {

  return this.client.post(this.Updateassighmentonline , x );

}



public GetPlacessuser(x:any ) {

  return this.client.get(this.GetPlacesuser + x );

}



public Addedittimeplace(x:any ) {

  return this.client.post(this.AddEditDeleteTimePlace,x);

}

public GetAlltimePlaces( ) {

  return this.client.get(this.GetAllTIMEPlac);

}


public Addeditplace(x:any ) {

  return this.client.post(this.Addplace,x);

}

public GetAllPlaces( ) {

  return this.client.get(this.GetAllPlac);

}

public AddUpdateDeleteLecturee( x:any) {

  return this.client.post(this.AddUpdateDeleteLecture,x);

}


public GetLectureattendancee( id :any , none:any , place:any) {

  if (place!=null)
  return this.client.get(this.GetLectureattendance+id+'/'+none+"?PlaceTimeId="+place);
else
return this.client.get(this.GetLectureattendance+id+'/'+none);

}

public AddUpdateDeleteQuizz( x:any) {

  return this.client.post(this.AddUpdateDeleteQuiz,x);

}


public GetPlacess(x:any ) {

  return this.client.get(this.GetPlaces + x );

}


public Getquizattendancee( id :any) {

  return this.client.get(this.Getquizattendance+id);

}



public Getcode() {

  return this.client.get(this.getcodes);

}



public deletefile(aid:any) {

  return this.client.delete(this.deletefilelink+aid);

}


public updatefile(aid:any) {

  return this.client.put(this.updatefilelink , aid);

}

public addfile(aid:any) {

  return this.client.post(this.addfilelink, aid);

}


















public deletevideo(aid:any) {

  return this.client.delete(this.deletevideolink+aid);

}


public updatevideo(aid:any) {

  return this.client.put(this.updatevideolink , aid);

}

public addvideo(aid:any) {

  return this.client.post(this.addvideolink, aid);

}

public getvideoparts(aid:any) {

  return this.client.get(this.getvideopart+aid);

}


public DeleteUserAcessQuiz(aid:any) {

  return this.client.delete(this.DeleteUserAcessQuizu+aid);

}

public GetQuizAcessToAdmin(aid:any) {

  return this.client.get(this.GetQuizAcessToAdminN+aid);

}


public GetUsertoAcessQuiz(aid:any) {

  return this.client.get(this.getusertoaceessquiz+aid);

}

public SavequizAcess(usersid:any) {

  return this.client.post(this.savequizacess, usersid);

}



public GettheLectureToadmin(aid:any) {

  return this.client.get(this.bas_url26+aid);

}

  public Deleteaccess(aid:any) {

    return this.client.delete(this.Base_URL25+aid);

  }


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


  public Studentforacces( lectureId : any){

return this.client.get(this.Base_URL24+lectureId)


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

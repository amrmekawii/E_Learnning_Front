import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: HttpClient) { }

  private readonly Base_URL3 ="https://e-learning-api.conveyor.cloud/api/User/GetStudents"
  private readonly Base_URL1="https://e-learning-api.conveyor.cloud/api/Class/DeleteUserFromClass"
  private readonly Base_URL2=" https://e-learning-api.conveyor.cloud/api/User/GetUser/"
  private readonly Base_URL4="  https://e-learning-api.conveyor.cloud/api/User/UpdateUser"

  private readonly Base_URL5="https://e-learning-api.conveyor.cloud/api/Lecture/GetStudentLectureAttendence/"
  private readonly Base_URL6="https://e-learning-api.conveyor.cloud/api/Assighment/GetUserAssighmentsByUserId?UserId="

  private readonly Base_URL7="https://e-learning-api.conveyor.cloud/api/Class/GetAllClassesRequists/"

  private readonly Base_URL8="https://e-learning-api.conveyor.cloud/api/Class/AcceptDeclineClassrequest"
private readonly  lurl = "https://e-learning-api.conveyor.cloud/api/Lecture/getLecturestowatch/"
private readonly  getlecture  = "https://e-learning-api.conveyor.cloud/api/Lecture/GettheLecture/"

private readonly  Startwatch  = "https://e-learning-api.conveyor.cloud/api/Lecture/startWatching/"
private readonly  changeStatue  = "https://e-learning-api.conveyor.cloud/api/User/ChangeStudentStatu"
private readonly  Deletes  = "https://e-learning-api.conveyor.cloud/api/User/DeleteUser"

  public GetStudents(Filter:any)
  {
     return this.client.post(this.Base_URL3,Filter);  
  
  }
  
public DeleteStudentFromClass(userclass:any)
     {
        return this.client.post(this.Base_URL1,userclass );  
      }
     
  
      public GetStudentDetails(id:any)
      {
         return this.client.get(this.Base_URL2+id);  
       }
   
       public UpdateUser(user:any)
       {
          return this.client.put(this.Base_URL4,user);  
        }
 
        public GetUserLectureAttedance(user:any)
        {
           return this.client.get(this.Base_URL5+user);  
         }
         public GetUserAssighments(user:any)
        {
           return this.client.get(this.Base_URL6+user);  
         }


 
          public AcceptOrDeclineClassRequist(c:any)
          {
             return this.client.post(this.Base_URL8,c);  
           }
 
           public GetLectowatch(c:any, l:any)
           {
              return this.client.get(this.lurl+c+"/"+l);  
            }
            public GetTheLecture(c:any)
            {
               return this.client.get(this.getlecture+c);  
             }
          
          
             public StartWatch(c:any)
             {
                return this.client.get(this.Startwatch+c);  
              }
          
              public GetClassRequists(c:any)
              {
                 return this.client.get(this.Base_URL7+c);  
               }
     
     
               public changestatue(c:any)
               {
                  return this.client.post(this.changeStatue,c );  
                }
 
                public DeleteStuudent(c:any)
                {
                   return this.client.post(this.Deletes,c);  
                 }
      
         
            }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/TypeDto/LoginDto';
import { RegisterDto } from 'src/app/TypeDto/Register';
import { TokenDto } from 'src/app/TypeDto/TokenDto';
import { AddUserDto } from 'src/app/TypeDto/AddUserDto';
import { RegisteredUser } from 'src/app/TypeDto/RegisteredUser';   
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  UserData = {
    Id: null,
    name: null,
    role: null,
  };
  constructor(private client: HttpClient) { }

  //>npm i jwt-decode 
  decodeUserData() {
    let encoseToken = JSON.stringify(localStorage.getItem('token'));
    let decodeToken: any = jwtDecode(encoseToken);
    this.UserData.Id = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    this.UserData.name = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    this.UserData.role = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    console.log(this.UserData)

  }

  private readonly Add_User_url = "https://amrbackend.azurewebsites.net/api/User/UserRegister";


  public AddUser(newUser: AddUserDto )   {

    return this.client.post(this.Add_User_url, newUser);

  }

  public login(credentials: LoginDto): Observable<TokenDto> {
    return this.client
      .post<TokenDto>('https://amrbackend.azurewebsites.net/api/User/StudentLogin', credentials)
      .pipe(
        tap((tokenDto) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('token', tokenDto.token);
          this.decodeUserData();
        })
      );


  }
}

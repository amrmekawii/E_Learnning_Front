import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginDto } from 'src/app/TypeDto/LoginDto';
import { RegisterDto } from 'src/app/TypeDto/Register';
import { TokenDto } from 'src/app/TypeDto/TokenDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) { }
  private readonly Base_URL = "http://localhost:5031/api/User/StudentRigster";
  
  public AddUser(newUser: RegisterDto): Observable<any> {
    console.log(newUser)

    return this.client.post(this.Base_URL, newUser);

  }

  public login(credentials: LoginDto): Observable<TokenDto> {
    return this.client
      .post<TokenDto>('http://localhost:5031/api/User/StudentLogin', credentials)
      .pipe(
        tap((tokenDto) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('token', tokenDto.token);
        })
      );


  }
}

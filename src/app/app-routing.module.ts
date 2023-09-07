import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './Components/intro/intro.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [

  {path:"intro" , component:IntroComponent},
  {path:"" , component:IntroComponent}
  ,
{ path:"Register", component:RegisterComponent},
{
  path:"Login" , component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

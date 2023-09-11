import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './Components/intro/intro.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/Admin/Home/home/home.component';
import { LuctureHComponent } from './Components/Lecture/lucture-h/lucture-h.component';
import { AuthLogGuard } from './Components/Guards/auth-log.guard';
import { StudentMangmentComponent } from './Components/Admin/UserMangment/student-mangment/student-mangment.component';

const routes: Routes = [

  { path: "intro", component: IntroComponent },
  { path: "", redirectTo:'intro'  ,pathMatch:'full'},
  { path: "Register", component: RegisterComponent },
  { path: "Login", component: LoginComponent },
  {path: "AdminHome" ,canActivate:[AuthLogGuard] , component:HomeComponent, children:[{path:"StudentMangment", component: StudentMangmentComponent}]},
  {path:"Lecture" , component: LuctureHComponent},
  {path:'**' ,component:IntroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

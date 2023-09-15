import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './Components/intro/intro.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/Admin/Home/home/home.component';
import { LuctureHComponent } from './Components/Lecture/lucture-h/lucture-h.component';
import { AuthLogGuard } from './Components/Guards/auth-log.guard';
import { StudentMangmentComponent } from './Components/Admin/UserMangment/student-mangment/student-mangment.component';
import { LecDetailsComponent } from './Components/Lecture/lec-details/lec-details.component';
import { ChooseOptionComponent } from './Components/Lecture/choose-option/choose-option.component';
import { LecAudeanceComponent } from './Components/Lecture/lec-audeance/lec-audeance.component';
import { AddUserAccessComponent } from './Components/Lecture/add-user-access/add-user-access.component';
import { GlobalScreenComponent } from './Components/Admin/global-screen/global-screen.component';
import { ErrorComponent } from './Components/error/error.component';
import { CodeGenrationComponent } from './Components/Lecture/code-genration/code-genration.component';
import { AssighmentComponent } from './Components/Admin/AssighmentMangment/assighment/assighment.component';
import { DetailsAssighmentComponent } from './Components/Admin/AssighmentMangment/details-assighment/details-assighment.component';
import { AddAssighmentComponent } from './Components/Admin/AssighmentMangment/add-assighment/add-assighment.component';

const routes: Routes = [

  { path: 'intro', component: IntroComponent },
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  {
    path: 'EditOrDetailsLecture', component: LecDetailsComponent,
    children: [
      { path: 'ChooseOption', component: ChooseOptionComponent },
      { path: 'ShowAudance/:id', component: LecAudeanceComponent },
      { path: 'AddUserAcces', component: AddUserAccessComponent }
    ]
  },
  {
    path: "AdminHome", component: HomeComponent,
    children: [
      { path: "StudentMangment", component: StudentMangmentComponent },
      { path: 'Lecture', component: LuctureHComponent },
      { path: 'GlobalScreen', component: GlobalScreenComponent },
      { path: 'CodeGen', component: CodeGenrationComponent },
      { path: 'AllAssighment', component: AssighmentComponent },
      { path: 'DetailsAssighment/:id', component: DetailsAssighmentComponent },
      { path: 'AddAssighment', component: AddAssighmentComponent },

    ]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

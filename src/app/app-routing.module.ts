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
import { CorrectAnsComponent } from './Components/Admin/AssighmentMangment/correct-ans/correct-ans.component';
import { LectureAssighmentComponent } from './Components/Student/lecture-assighment/lecture-assighment.component';
import { StudentHomeComponent } from './Components/Student/student-home/student-home.component';
import { LectureComponent } from './Components/Student/lecture/lecture.component';
import { QuizHomeComponent } from './Components/Admin/Quiz/quiz-home/quiz-home.component';
import { QuizDetailsComponent } from './Components/Admin/Quiz/quiz-details/quiz-details.component';
import { UpdateQuationAnswerComponent } from './Components/Admin/Quiz/update-quation-answer/update-quation-answer.component';
import { QuizStudentComponent } from './Components/Student/quiz-student/quiz-student.component';
import { QuizsAvailableComponent } from './Components/Student/quizs-available/quizs-available.component';
import { ClassMangmentComponent } from './Components/Admin/ClassMangment/class-mangment/class-mangment.component';
import { StudentProfileComponent } from './Components/Admin/StudentProfile/student-profile/student-profile.component';
import { AdminGuard } from './Components/Guards/admin.guard';
import { UserresultComponent } from './Components/Student/userresuilt/userresult/userresult.component';
import { UserQuizComponent } from './Components/Admin/Quiz/UserQuiz/user-quiz/user-quiz.component';
import { LecturewatchComponent } from './Components/Admin/Lecturewatch/lecturewatch/lecturewatch.component';
import { QuizResult } from './TypeDto/QuizDetailsDto';
import { QuizgradesComponent } from './Components/Admin/Quiz/QuizGrades/quizgrades/quizgrades.component';

const routes: Routes = [

  { path: 'intro', component: IntroComponent },
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },

  {
    path: "AdminHome", canActivate: [AdminGuard], component: HomeComponent,
    children: [
      { path: "StudentMangment", component: StudentMangmentComponent },
      { path: 'Lecture', component: LuctureHComponent },
      { path: 'GlobalScreen', component: GlobalScreenComponent },
      { path: 'CodeGen', component: CodeGenrationComponent },
      { path: 'AllAssighment', component: AssighmentComponent },
      { path: 'DetailsAssighment/:id', component: DetailsAssighmentComponent },
      { path: 'AddAssighment', component: AddAssighmentComponent },
      { path: 'CorrectAns', component: CorrectAnsComponent },
      { path: 'QuizHome', component: QuizHomeComponent },
      { path: 'QuizDetails/:id', component: QuizDetailsComponent},
      { path: 'UpdateQuationAnswer/:id', component: UpdateQuationAnswerComponent},
      { path: 'resquiz/:id', component: QuizgradesComponent},

      { path: 'ClassMangment', component: ClassMangmentComponent },
      { path: 'StudentProfile/:id', component: StudentProfileComponent },
      {path: '', redirectTo:'GlobalScreen', pathMatch:'full' },
      {path : 'Lecture/lecturestudent/:id' , component: LecturewatchComponent} ,
      {
        path: 'EditOrDetailsLecture', canActivate: [AdminGuard], component: LecDetailsComponent,
        children: [
          { path: 'ChooseOption', component: ChooseOptionComponent },
          { path: 'ShowAudance/:id', component: LecAudeanceComponent },
          { path: 'AddUserAcces', component: AddUserAccessComponent }
        ]
      },

    ]
  },
  { path: 'LectureAssighment/:id', canActivate: [AuthLogGuard], component: LectureAssighmentComponent },
  { path: 'StudentHome', canActivate: [AuthLogGuard], component: StudentHomeComponent },
  { path: 'Lectures/:id', canActivate: [AuthLogGuard], component: LectureComponent },
  { path: 'QuizStudent/:id', canActivate: [AuthLogGuard], component: QuizStudentComponent },
  { path: 'QuizsAvailable', canActivate: [AuthLogGuard], component: QuizsAvailableComponent },
  { path: 'Userres', canActivate: [AuthLogGuard], component: UserresultComponent },
  { path: 'userquiz/:lid/:sid/:n', canActivate: [AdminGuard], component: UserQuizComponent },
  { path: 'resquiz/:id', canActivate: [AdminGuard], component: QuizgradesComponent },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

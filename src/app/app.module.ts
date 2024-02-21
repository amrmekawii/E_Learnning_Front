import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';

import { IntroComponent } from './Components/intro/intro.component';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Components/Admin/Home/home/home.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { PopUpComponent } from './Components/Admin/pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalScreenComponent } from './Components/Admin/global-screen/global-screen.component';
import { PopUpCangePassComponent } from './Components/Admin/pop-up-cange-pass/pop-up-cange-pass.component';
import { StudentMangmentComponent } from './Components/Admin/UserMangment/student-mangment/student-mangment.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { LuctureHComponent } from './Components/Lecture/lucture-h/lucture-h.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ClassCorsalComponent } from './Components/Lecture/ClassCarsol/class-corsal/class-corsal.component';
import { LecDetailsComponent } from './Components/Lecture/lec-details/lec-details.component';
import { ChooseOptionComponent } from './Components/Lecture/choose-option/choose-option.component';
import { LecAudeanceComponent } from './Components/Lecture/lec-audeance/lec-audeance.component';
import { SearchPipe } from './Services/Search-pipe';
import { AddUserAccessComponent } from './Components/Lecture/add-user-access/add-user-access.component';
import { MatTableModule } from '@angular/material/table';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ErrorComponent } from './Components/error/error.component';
import { CodeGenrationComponent } from './Components/Lecture/code-genration/code-genration.component';
import { AssighmentComponent } from './Components/Admin/AssighmentMangment/assighment/assighment.component';
import { DetailsAssighmentComponent } from './Components/Admin/AssighmentMangment/details-assighment/details-assighment.component';
import { AddAssighmentComponent } from './Components/Admin/AssighmentMangment/add-assighment/add-assighment.component';
import { CorrectAnsComponent } from './Components/Admin/AssighmentMangment/correct-ans/correct-ans.component';
import { LectureAssighmentComponent } from './Components/Student/lecture-assighment/lecture-assighment.component';
import { MatCardModule } from '@angular/material/card';
import { StudentHomeComponent } from './Components/Student/student-home/student-home.component';
import { LectureComponent } from './Components/Student/lecture/lecture.component';
import { FooterComponent } from './Components/Footer/footer/footer.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { QuizHomeComponent } from './Components/Admin/Quiz/quiz-home/quiz-home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { QuizDetailsComponent } from './Components/Admin/Quiz/quiz-details/quiz-details.component';
import { UpdateQuationAnswerComponent } from './Components/Admin/Quiz/update-quation-answer/update-quation-answer.component';
import { StudentProfileComponent } from './Components/Admin/StudentProfile/student-profile/student-profile.component';
import { ClassMangmentComponent } from './Components/Admin/ClassMangment/class-mangment/class-mangment.component';
import { QuizStudentComponent } from './Components/Student/quiz-student/quiz-student.component';
import { ShowQuizResultComponent } from './Components/Student/show-quiz-result/show-quiz-result.component';
import { QuizsAvailableComponent } from './Components/Student/quizs-available/quizs-available.component';
import { LectureCodeComponent } from './Components/Student/lecture-code/lecture-code.component';
import { PlyrModule } from 'ngx-plyr';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { UserresultComponent } from './Components/Student/userresuilt/userresult/userresult.component';
import { UserQuizComponent } from './Components/Admin/Quiz/UserQuiz/user-quiz/user-quiz.component';
import { LecturewatchComponent } from './Components/Admin/Lecturewatch/lecturewatch/lecturewatch.component';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { QuizgradesComponent } from './Components/Admin/Quiz/QuizGrades/quizgrades/quizgrades.component';
import { QuizAcessComponent } from './Components/Admin/Quiz/QuizAcess/quiz-acess/quiz-acess.component';
import { ParentMangmentComponent } from './Components/Admin/ParentMangment/parent-mangment/parent-mangment.component';
import { ParentHomeComponent } from './Components/Parent/ParentHome/parent-home/parent-home.component';
import { ChildGradesComponent } from './Components/Parent/ChildGrades/child-grades/child-grades.component';
import { QuizentryComponent } from './Components/Admin/Dataentry/Quizentry/quizentry/quizentry.component';
import { LectureEntryComponent } from './Components/Admin/Dataentry/LectureEntry/lecture-entry/lecture-entry.component';
import { PlaceMangmentComponent } from './Components/Admin/PlaceMangment/place-mangment/place-mangment.component';
import { PlaceTimeComponent } from './Components/Admin/PlaceTimeMangment/place-time/place-time.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    IntroComponent,
    HomeComponent,
    PopUpComponent,
    GlobalScreenComponent,
    PopUpCangePassComponent, ClassMangmentComponent, StudentProfileComponent,StudentMangmentComponent, LuctureHComponent, ClassCorsalComponent, LecDetailsComponent, ChooseOptionComponent, LecAudeanceComponent, AddUserAccessComponent
    ,
    SearchPipe,
    ErrorComponent,
    CodeGenrationComponent,
    AssighmentComponent,
    DetailsAssighmentComponent,
    AddAssighmentComponent,
    CorrectAnsComponent,
    LectureAssighmentComponent,
    StudentHomeComponent,
    LectureComponent,
    FooterComponent,
    QuizHomeComponent,
    QuizDetailsComponent,
    UpdateQuationAnswerComponent,
    ClassMangmentComponent,
StudentProfileComponent,
QuizStudentComponent,
ShowQuizResultComponent,
QuizsAvailableComponent,
LectureCodeComponent,
UserresultComponent,
UserQuizComponent,
LecturewatchComponent,
QuizgradesComponent,
QuizAcessComponent,
ParentMangmentComponent,
ParentHomeComponent,
ChildGradesComponent,
QuizentryComponent,
LectureEntryComponent,
PlaceMangmentComponent,
PlaceTimeComponent,

   ],
  imports: [
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    BrowserModule,PlyrModule, 
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,NgxMatNativeDateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    MatSlideToggleModule, MatToolbarModule, MatIconModule, MatListModule, MatExpansionModule,
    MatTooltipModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatSlideToggleModule,
    FormsModule,
    MatDialogModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatInputModule
    , MatRadioModule, NgbPaginationModule
    , NgbPaginationModule,PlyrModule,

    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    NgxExtendedPdfViewerModule,
    MatCardModule, // Add MatCardModule here
    NgxSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    

    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,     //For the interceptor
      useClass: AuthInterceptor,
      multi: true,
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';

import { IntroComponent } from './Components/intro/intro.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
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
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { LuctureHComponent } from './Components/Lecture/lucture-h/lucture-h.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { ClassCorsalComponent } from './Components/Lecture/ClassCarsol/class-corsal/class-corsal.component';
import { LecDetailsComponent } from './Components/Lecture/lec-details/lec-details.component';
import { ChooseOptionComponent } from './Components/Lecture/choose-option/choose-option.component';
import { LecAudeanceComponent } from './Components/Lecture/lec-audeance/lec-audeance.component';
import { AddUserAccessComponent } from './Components/Lecture/add-user-access/add-user-access.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({ 
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    IntroComponent,
    HomeComponent,
    PopUpComponent,
    GlobalScreenComponent,
    PopUpCangePassComponent,StudentMangmentComponent, LuctureHComponent, ClassCorsalComponent, LecDetailsComponent, ChooseOptionComponent, LecAudeanceComponent, AddUserAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    MatSlideToggleModule, MatToolbarModule,MatIconModule,MatListModule,MatExpansionModule,
    MatTooltipModule, MatButtonModule,MatSidenavModule,MatMenuModule,MatSlideToggleModule,
    FormsModule,
    MatDialogModule,MatFormFieldModule, MatCheckboxModule, MatSelectModule,MatInputModule ,MatRadioModule,NgbPaginationModule
    ,NgbPaginationModule,
    
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

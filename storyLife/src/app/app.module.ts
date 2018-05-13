import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { DatabaseService } from './services/database.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MainPageComponent } from './main-page/main-page.component';
import { TecherMainPageComponent } from './techer-main-page/techer-main-page.component';
import { AmIComponent } from './am-i/am-i.component';
import { MainPageParentComponent } from './main-page-parent/main-page-parent.component';
import { StudentSentenceComponent } from './student-sentence/student-sentence.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
//checkkk

const appRoutes: Routes=[
  { 
    path:'',
    component: MainPageComponent
  },
  { 
    path:'login',
    component: LoginComponent
  },
  {
    path:'admin',
    component: AdminPageComponent
  },
  {
    path:'parent',
    component: MainPageParentComponent
  },
  {
    path:'techer',
    component: TecherMainPageComponent
  },
  {
    path:'am-i',
    component: AmIComponent
  },
  {
    path:'studen-sentence',
    component: StudentSentenceComponent
  },
  {
    path:'studen-Questionnaire',
    component: QuestionnaireComponent
  },
  {
    path:'studentHomePage',
    component: StudentHomePageComponent
  },
  {
    path:'adminHome',
    component: AdminHomeComponent
  },
  
]
@NgModule({
  declarations: [

    AmIComponent,
    MainPageParentComponent,
    QuestionnaireComponent,
    StudentSentenceComponent,
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    MainPageComponent,
    TecherMainPageComponent,
    StudentHomePageComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule, 
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatabaseService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { GalleryComponent } from './gallery/gallery.component';
import { PublicMessageesComponent } from './public-messagees/public-messagees.component';
import { StudentsDataComponent } from './students-data/students-data.component';
import { UsersManageComponent } from './users-manage/users-manage.component';
import { DisplayService } from './services/display.service';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';
import { DropZoneDirective } from './drop-zone.directive';
import { UploadropComponent } from './uploadrop/uploadrop.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileSizePipe } from './file-size.pipe';
import { ScheduleComponent } from './schedule/schedule.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { User } from './users/user';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { AddLinkedUsersComponent } from './add-linked-users/add-linked-users.component';
import { UploadScheduleComponent } from './upload-schedule/upload-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { WriteMessageComponent } from './write-message/write-message.component';
import { ReadMessagesComponent } from './read-messages/read-messages.component';
import { DeleteMessageComponent } from './delete-message/delete-message.component';
import { ConfirmMessageComponent } from './confirm-message/confirm-message.component';



//checkkk


 




const appRoutes: Routes=[
  {path:'',component: MainPageComponent},

  {path:'login',component: LoginComponent},
  {path:'admin',component: AdminPageComponent,/*canActivate: [AuthGuard]*/},
  {path:'adminHome',component: AdminHomeComponent, /*canActivate: [AuthGuard]*/},
  {path:'studentHomePage',component: StudentHomePageComponent,/* canActivate: [AuthGuard]*/},
  {path:'am-i',component: AmIComponent, /*canActivate: [AuthGuard]*/},
  {path:'studen-sentence',component: StudentSentenceComponent, /*canActivate: [AuthGuard]*/},
  {path:'studen-Questionnaire', component: QuestionnaireComponent, /*canActivate: [AuthGuard]*/},
  {path:'usersManage', component: UsersManageComponent,/*canActivate: [AuthGuard]*/},
  {path:'usersDisplay', component:  UsersDisplayComponent, /*canActivate: [AuthGuard]*/},
  {path:'uplaodrop',component:  FileUploadComponent},  
  {path:'Schedule', component:  ScheduleComponent,/* canActivate: [AuthGuard]*/},
  {path:'msgDisplay', component:  WriteMessageComponent,/* canActivate: [AuthGuard]*/ },
  {path:'survey', component: SurveyResultsComponent },
  {path:'addLinkedUsers', component: AddLinkedUsersComponent},
  {path:'parent',component: MainPageParentComponent, /*canActivate: [AuthGuard]*/},
  {path:'techer', component: TecherMainPageComponent,/* canActivate: [AuthGuard]*/},
  {path:'messagees', component: PublicMessageesComponent,/*canActivate: [AuthGuard]*/},
  {path:'studentsData', component: StudentsDataComponent,/*canActivate: [AuthGuard]*/},
  {path:'gallery', component: GalleryComponent,/*canActivate: [AuthGuard]*/},
  { path:'uploadSchedule', component:  UploadScheduleComponent/*, canActivate: [AuthGuard] */},
  { path:'viewSchedule', component: ViewScheduleComponent /*, canActivate: [AuthGuard] */},
  { path: 'msgRead', component:  ReadMessagesComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'msgConf', component:   ConfirmMessageComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'msgDel', component:  DeleteMessageComponent, /*canActivate: [AuthGuard]*/ },


    
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
    AdminHomeComponent,
    GalleryComponent,
    PublicMessageesComponent,
    StudentsDataComponent,
    UsersManageComponent,
    UsersDisplayComponent,
    DropZoneDirective,
    UploadropComponent,
    FileUploadComponent,
    FileSizePipe,
    ScheduleComponent,
    WriteMessageComponent,
    SurveyResultsComponent,
    AddLinkedUsersComponent,
    UploadScheduleComponent,
    ViewScheduleComponent,
    ConfirmMessageComponent,
    DeleteMessageComponent,
    ReadMessagesComponent,

    
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
  providers: [DatabaseService,AuthService,AuthGuard,DisplayService, CookieService],
  bootstrap: [AppComponent],
  
})
export class AppModule {

}

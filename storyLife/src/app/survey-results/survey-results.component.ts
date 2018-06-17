import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { User } from '../users/user';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  survey: string[];
  email;
  fname;
  lname;
  constructor(private userService: DisplayService,private cookieService:CookieService,private db:DatabaseService, private router:Router) {
    if(this.userService.tmpUserForSurvey==undefined)
    {
      this.router.navigate(['/usersDisplay']);
      return;
    }
      
    this.survey = this.userService.tmpUserForSurvey.mySurvey;
    this.email = this.userService.tmpUserForSurvey.email;
    this.fname = this.userService.tmpUserForSurvey.firstName;
    this.lname = this.userService.tmpUserForSurvey.lastName;
  }



  ngOnInit() {
    if(<User>this.cookieService.getObject('user')!=undefined)
    this.db.loggedInUser = <User>this.cookieService.getObject('user');
   else
    this.router.navigate(['/'])
   
  }


}
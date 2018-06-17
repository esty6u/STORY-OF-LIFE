import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { User } from '../users/user';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {
  userL: User[];
  constructor(private userService: DisplayService, public router: Router,private cookieService:CookieService,private db:DatabaseService) { }

  ngOnInit() {
       if(<User>this.cookieService.getObject('user')!=undefined)
      {
           this.db.loggedInUser = <User>this.cookieService.getObject('user');
           if(this.db.loggedInUser.type==='תלמיד' || this.db.loggedInUser.type==='הורה')
               this.router.navigate(['/'])
  
      }
     else
         this.router.navigate(['/'])
    this.userService.getUserList().valueChanges().subscribe(userList => {
      this.userL = userList;
    });
  }


  showSurvey(users) {
    this.userService.tmpUserForSurvey = users;
  }

  showMyDetails(users) {
    for (var j = 0 ; j < this.userL.length ; j++) {
      if (this.userL[j].uid === users.uid) {
        break;
      }
    }
    if (this.userL[j].showInDisplay === true) {
      for (var i = 0 ; i < this.userL.length ; i++) {
        this.userL[i].showInDisplay = false;
      }
    } else {
      for (var i = 0 ; i < this.userL.length; i++) {
        if (this.userL[i].uid === users.uid) {
          this.userL[i].showInDisplay = true;
        } else {
          this.userL[i].showInDisplay = false;
        }
      }
    }
  }

  addLinkedUsers(users) {
    // tslint:disable-next-line:no-shadowed-variable

    for (let j = 0; j < this.userL.length ; j++) {
      if (this.userL[j].uid === users.uid) {
          if ( this.userL[j].showInDisplay === false) {
            this.userL[j].showInDisplay = false;
          }
          this.userService.tmpUserForAdd = users;
          this.router.navigate(['addLinkedUsers']);
      }
    }
    /*for (let j = 0 ; j < this.userL.length ; j++) {
      alert(this.userL);
      if (this.userL[j].type === 'הורה') {
        alert(this.userL[j]);
        this.userService.tmpUserForAdd = this.userL[j];
        alert(this.userService.tmpUserForAdd);
        this.router.navigate(['addLinkedUsers']);
        return;
    }
    alert('לא קיימים הורים במערכת');
    this.router.navigate(['usersDisplay']);
    return;*/

  }

  public onGoToPage2(users) {
    for (var j = 0 ; j < this.userL.length ; j++) {
      if (this.userL[j].uid === users.uid) {
        break;
      }
    }
    if (this.userL[j].professions === undefined) {
    } else {
      if (this.userL[j].showInDisplay === true) {
        for (var i = 0 ; i < this.userL.length ; i++) {
          this.userL[i].showInDisplay = false;
        }
      } else {
        for (var i = 0 ; i < this.userL.length; i++) {
          if (this.userL[i].uid === users.uid) {
            this.userL[i].showInDisplay = true;
          } else {
            this.userL[i].showInDisplay = false;
          }
        }
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { DisplayService } from '../services/display.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {
  userL: User[];
  currectUser: User;
    // schedule URL
    scheduleURL: string;
  constructor(private userService: DisplayService,public cookieService: CookieService,public db:DatabaseService, private router:Router) { }

  ngOnInit() {
    this.userService.getUserList().valueChanges().subscribe(userList =>{
      this.userL = userList;
      })
    if(<User>this.cookieService.getObject('user')!=undefined)
    {
    this.db.loggedInUser = <User>this.cookieService.getObject('user');
    this.currectUser=this.db.loggedInUser;
    if(this.currectUser.scheduleLink!="")
      this.scheduleURL=this.currectUser.scheduleLink;
    }
   else
    this.router.navigate(['/'])

  }
  getImage()
  {

      if(this.currectUser.scheduleLink!="")
        return this.currectUser.scheduleLink;
      
    
  }


}

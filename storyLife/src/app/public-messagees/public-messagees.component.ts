import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { User } from '../users/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-messagees',
  templateUrl: './public-messagees.component.html',
  styleUrls: ['./public-messagees.component.css']
})
export class PublicMessageesComponent implements OnInit {

  constructor( public db: DatabaseService,
   
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    if(<User>this.cookieService.getObject('user')!=undefined)
    {
         this.db.loggedInUser = <User>this.cookieService.getObject('user');
         if(this.db.loggedInUser.type==='הורה' || this.db.loggedInUser.type==='תלמיד')
             this.router.navigate(['/'])

    }
   else
       this.router.navigate(['/'])
  }

}

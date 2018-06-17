import { Component, OnInit } from '@angular/core';
import { database } from 'firebase';
import { DatabaseService } from '../services/database.service';
import { User } from '../users/user';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(public db: DatabaseService,public cookieService:CookieService,private router: Router) { }

  ngOnInit() {
    if(<User>this.cookieService.getObject('user')!=undefined)
     this.db.loggedInUser = <User>this.cookieService.getObject('user');
    else
     this.router.navigate(['/'])
  }

}

import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public db: DatabaseService,private cookieService: CookieService,private _firebaseAuth: AngularFireAuth,public router: Router) { }

  /*logout() 
  {
    this.cookieService.set('User login status', 'false');

    this._firebaseAuth.auth.signOut()
    .then((res) => {
    
    this.db.loggedInUser.loggedIn = false;
    this.db.updateListing(this.db.loggedInUser.uid);

     this.router.navigate(['/'])
     this.db.loggedIn = 'false';


  })
    .catch((err) =>{
    console.log(err + "")
    this.db.loggedInUser.loggedIn = true;
     this.db.updateListing(this.db.loggedInUser.uid);
    }
    
    );
  }*/
}

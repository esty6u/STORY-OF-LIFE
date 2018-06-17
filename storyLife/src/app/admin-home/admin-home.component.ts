import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { User } from '../users/user';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(public cookieService: CookieService,public db:DatabaseService, private router:Router, private _firebaseAuth:AngularFireAuth) { }

  ngOnInit() {
      if(<User>this.cookieService.getObject('user')!=undefined)
    {
         this.db.loggedInUser = <User>this.cookieService.getObject('user');
         if(this.db.loggedInUser.type!='מנהל')
             this.router.navigate(['/'])
    }
   else
       this.router.navigate(['/'])
  }
  logout() 
  {

    this.cookieService.putObject('user',undefined);

    this._firebaseAuth.auth.signOut()
    

    .then((res) => {  

      alert("יצא"+this.db.loggedInUser.email)
    this.db.loggedInUser.loggedIn = false;
    this.db.updateListing(this.db.loggedInUser.uid);
    this.db.loggedIn = 'false';
     this.router.navigate(['/'])
     


  })
    .catch((err) =>{
    console.log(err + "")
   // this.db.loggedInUser.loggedIn = true;
    // this.db.updateListing(this.db.loggedInUser.uid);
    }
    
    );
  }

}

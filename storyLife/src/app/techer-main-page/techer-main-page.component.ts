import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DatabaseService } from '../services/database.service';
import { User } from '../users/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-techer-main-page',
  templateUrl: './techer-main-page.component.html',
  styleUrls: ['./techer-main-page.component.css']
})
export class TecherMainPageComponent implements OnInit {

  constructor(public db: DatabaseService,
    private router:Router,
    private _firebaseAuth:AngularFireAuth,
   
    private cookieService: CookieService) { }

  ngOnInit() {    
       if(<User>this.cookieService.getObject('user')!=undefined)
      {
           this.db.loggedInUser = <User>this.cookieService.getObject('user');
           if(this.db.loggedInUser.type==='תלמיד' || this.db.loggedInUser.type==='הורה')
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

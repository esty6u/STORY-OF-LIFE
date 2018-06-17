import { Component, OnInit,Injectable  } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../users/user';
import { DatabaseService } from '../services/database.service';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DATABASE_PROVIDERS,AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database-deprecated';
import {AngularFireModule} from 'angularfire2'
import { database } from 'firebase';
import { CookieService } from 'angular2-cookie/services/cookies.service';




type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
  
})
export class LoginComponent implements OnInit {
  usr:FirebaseListObservable<any[]>;
  user = {
    email: '',
    password: '',
    type:''
 };
  userForm: FormGroup;
  formErrors: FormErrors = {
    'email': '',
    'password': '',
    
  };
  
  constructor( public authService: AuthService,
        private router:Router,
        public db: DatabaseService,
          public fb: FormBuilder,
          private cookieService: CookieService,
         ) 
  {
     

  }
  ngOnInit() {
    this.buildForm(); 
   
    if(this.cookieService.getObject('user')!=undefined)
    {
      this.db.loggedInUser = <User>this.cookieService.getObject('user');
      if(this.db.loggedInUser.type=="תלמיד")
          this.router.navigate(['studentHomePage']);
      if(this.db.loggedInUser.type=="הורה")
            this.router.navigate(['parent']);
      if(this.db.loggedInUser.type=="מנהל")
          this.router.navigate(['admin']);
      if(this.db.loggedInUser.type=="מורה")
          this.router.navigate(['techer']);

   }

  }
 
  signInWithEmail(formData) 
  { 
   this.authService.signInRegular(formData.value.email ,formData.value.password)
       .then((res) => { 
   
        this.db.loggedInUserUID = res.uid; 
        this.db.loggedIn = 'true';

          //takes logged in user UID
         this.authService.userDetails = res;
          //this.cookieService.set('User', res);
          this.db.getLoggedInUser()
          .then(() => { 
            this.cookieService.putObject('user',this.db.loggedInUser);
                    if(this.db.loggedInUser.type=="תלמיד")
                    this.router.navigate(['studentHomePage']);
                if(this.db.loggedInUser.type=="הורה")
                    this.router.navigate(['parent']);
                if(this.db.loggedInUser.type=="מנהל")
                    this.router.navigate(['admin']);
                if(this.db.loggedInUser.type=="מורה")
                    this.router.navigate(['techer']);

          })
        })    
        .catch((err) => alert(' שגיאה: משתמש או סיסמא לא נכונים '));


      

 }
 

 buildForm() { //form validation function - validates user input
  this.userForm = this.fb.group({
    'email': ['', [
      Validators.required,
      Validators.email,
    ]],
    'password': ['', [
      Validators.minLength(6),
      Validators.maxLength(25),
    ]],
  });
} 


}
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from './database.service';




@Injectable()
export class AuthService {
 private user: Observable<firebase.User>;
 userDetails: firebase.User = null;
 emailError = false;
 public x=0;
  constructor(private _firebaseAuth: AngularFireAuth, private router:Router) { 
    this.user = this._firebaseAuth.authState;
    
   
  }
  
  signInRegular(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
 }



  isLoggedIn() 
  {
      if (this.userDetails==null  ) 
      {
        return false;
      }
      else 
      {
        return true;
      }
  }
  

  emailSignUp(email: string, password: string) //this method allows user to signup to the web-app with provided email and password.
  {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string) //this method allow an registered user to reset his password
  {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)//this line send email to the user email address.
      .catch(error => {
        if (error.code == 'auth/user-not-found') { // in case that email not found in firebase server.
          this.emailError = true
        }
        else
          this.emailError = true //email valitation.
      })
  }


  public deleteUserFromAuth(str)
  {
    
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      // An error happened.
    });
    
   }
}
import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { User } from '../users/user';



import { AngularFirestore } from 'angularfire2/firestore';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {
  userL: User[];
  userTypes; //array of user types
  user: User; // User Object - Contains all fields. Will be uploaded as a Jason object to server
  userManageform: FormGroup; // tracks the value and validity state of a group of FormControl
  signUpError: boolean; //if true -> there is an error in the registration form

  ngOnInit() {
    this.userService.getUserList().valueChanges().subscribe(userList =>{
      this.userL = userList;
    })
    this.validateForm2()
  }

  constructor(private userService: DisplayService, private _firebaseAuth: AngularFireAuth, public router: Router,public db1: DatabaseService) { 
    this.userTypes = ['תלמיד', 'מורה' ,'הורה'];
    this.user = new User(false, this.userTypes[0]); //deafult type is student
    this.signUpError=false; // default- no registration form errors
  }

/***********************************************************************************************************************/
  public validateForm2() {
    // Limitations on fields in the registration form
    this.userManageform = new FormGroup({

      'email': new FormControl(this.user.email, [
        //Email is required, must be in email format
        Validators.required,
        Validators.email
      ]),   
      'password': new FormControl(this.user.password, [
        //password is required, must at least 6 letters.
        Validators.minLength(6),
        Validators.required
      ]),
      
    });
  }
/***********************************************************************************************************************/
  public freezeUser(){
    if(this.userManageform.get('email').invalid)
    {
      alert("יש למלא את השדות כנדרש");
      return;
    }
    for (var i = 0; i < this.userL.length; i++) 
    {
      if(this.userL[i].email==this.user.email)
      {
        this.db1.freezeUserFromDB(this.userL[i]);
        return;
      }
    }
    alert("משתמש לא קיים");
    this.userManageform = null;
    return;

  }
/***********************************************************************************************************************/
  public deleteUser(){
    
   if(this.userManageform.get('email').invalid)
    {
      alert("יש למלא את השדות כנדרש");
      return;
    }
    for (var i = 0; i < this.userL.length; i++) 
    {
      if(this.userL[i].email==this.user.email)
      {
        this.db1.deleteUserFromDB(this.userL[i]);
        return;
      }
    }
    alert("משתמש לא קיים");
    this.userManageform = null;
    return;
  
  }
/***********************************************************************************************************************/
  public resetPassword(){
    
    /*if(this.userManageform.get('email').invalid || this.userManageform.get('password').invalid)
     {
       alert("יש למלא את השדות כנדרש");
       return;
     }*/
     for (var i = 0; i < this.userL.length; i++) 
     {
       if(this.userL[i].email==this.user.email)
       {
        this.userL[i].password=this.user.password;
         this.db1.resetUserPasswordFromDB(this.userL[i]);
         return;
       }
     }
     alert("משתמש לא קיים");
     this.userManageform = null;
     return;
   
   }

/***********************************************************************************************************************/



  get email() { return this.userManageform.get('email'); }
  get password() { return this.userManageform.get('password'); }

}


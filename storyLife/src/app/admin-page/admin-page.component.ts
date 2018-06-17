import { User } from '../users/user'
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AmIComponent } from '../am-i/am-i.component';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../services/auth-guard.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  userTypes; //array of user types
  user: User; // User Object - Contains all fields. Will be uploaded as a Jason object to server
  userform: FormGroup; // tracks the value and validity state of a group of FormControl
  signUpError: boolean; //if true -> there is an error in the registration form
  userPasswordValidation : string; // will contain the password verification
  title : string;
  date;
  
  ngOnInit() {
    this.validateForm()
    if(<User>this.cookieService.getObject('user')!=undefined)
    {
         this.db.loggedInUser = <User>this.cookieService.getObject('user');
         if(this.db.loggedInUser.type!='מנהל')
             this.router.navigate(['/'])
    }
   else
       this.router.navigate(['/'])

   

  }

  constructor(public db: DatabaseService, public auth: AuthService,private _firebaseAuth: AngularFireAuth, public router: Router,public authGurdService:AuthGuard,public cookieService:CookieService) {
    
    this.userTypes = ['תלמיד', 'מורה','מנהל','הורה'];

    this.user = new User(false, this.userTypes[0]); //deafult type is student
    this.signUpError=false; // default- no registration form errors
    this.date = new Date();
    this.title = "מערכת רישום תלמידים " + this.date.getFullYear();
  }

  // on register user button click adds new user to Database according to the data that was collected from the registration form
  public registerUser() 
  {
      if(this.user.password.length<6)
      {
        alert("סיסמא חייבת להיות לפחות 6 תווים");
        return;
      }
      this.signUpError = false;
      this.auth.emailSignUp(this.user.email, this.user.password) // sign up User
        .catch(error => {
          this.signUpError = true;
          if (error.code == 'auth/email-already-in-use') { // in case that email already in use
            alert("משתמש קיים, אנא נסה שם משתמש חדש");// error message
          }
          else { alert("כתובת דואר אלקטרוני אינה תקינה") }
            return;
        })
        .then((res) => {

          //successfully registered:
          if(this.user.type=='תלמיד')
          {
            this.user.studSentence="";
            this.user.professions = new Array();
            this.user.myParents = new Array();
            this.user.myStrengths = new Array();
            this.user.mySurvey = new Array();
            this.user.showSurvey = false;
            this.user.SurveyCompleted = false;
          }
          if(this.user.type=='מורה')
            this.user.myStudents=new Array();

          this.user.uid = res.uid; // sets the uid value in the attribute
          this.db.addUserToDB(this.user); // add user to database
          alert("משתמש נרשם במערכת");
        })
  }


  public validateForm() {
    // Limitations on fields in the registration form
    this.userform = new FormGroup({
      'firstname': new FormControl(this.user.firstName, [
        //first name is required, must be in Hebrew, at least 2 letters.
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("[א-ת ]+")
      ]),
      'lastname': new FormControl(this.user.lastName, [
        //last name is required, must be in Hebrew, at least 2 letters.
        Validators.required,
        Validators.minLength(2),
        Validators.pattern("[א-ת ]+")
      ]),
      'email': new FormControl(this.user.email, [
        //Email is required, must be in email format
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl("", [
        //password is required, must at least 6 letters.
        Validators.minLength(6),
        Validators.required
      ]),

      
    });
  }

  //function to display fields from student or teacher registration
  public isUserStudent() {
    if (this.user.type == 'מורה')
      return false;
    else
      return true; // type is student
  }

  //check if a field is empty
  public CheckIfEmptyField(field: string) {
    if (field == '')
      return true; // field is empty
    else
      return false;
  }

  // compares the password field to the password verification field
  public validatePassword() {
    if (this.user.password == this.userPasswordValidation)
      return true; // Password is verified
    return false;
  }

  // gets - link the formControls to html
  get firstname() { return this.userform.get('firstname'); }
  get lastname() { return this.userform.get('lastname'); }
  get email() { return this.userform.get('email'); }
  get engfname() { return this.userform.get('engfname'); }
  get englname() { return this.userform.get('englname'); }
  get phone() { return this.userform.get('phone'); }
  get password() { return this.userform.get('password'); }
  get confimpassword() { return this.userform.get('confimpassword'); }
  get birthday() { return this.userform.get('birthday'); }
  get gender() { return this.userform.get('gender'); }
}

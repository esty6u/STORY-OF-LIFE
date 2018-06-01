import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { User } from '../users/user';
import { database } from 'firebase';
import { DatabaseService } from '../services/database.service';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
 var i=0;
@Component({
  selector: 'app-am-i',
  templateUrl: './am-i.component.html',
  styleUrls: ['./am-i.component.css']
})
export class AmIComponent implements OnInit {
  
  constructor(private _firebaseAuth: AngularFireAuth,public router: Router,public db:DatabaseService, private fb: FormBuilder,public authService: AuthService,) {}
  
  msg = "";
  ngOnInit() {
    //this.db.getLoggedInUser();

  }

 
  logout() 
  {
   
    this._firebaseAuth.auth.signOut()
    .then((res) => {
      this.db.loggedInUser.loggedIn = false;
    alert(this.db.loggedInUser.loggedIn)
  this.db.updateListing(this.db.loggedInUser.uid);
    //  this.router.navigate(['/'])
      

  })
    .catch((err) =>{
    console.log(err + "")
   // this.db.loggedInUser.loggedIn = true;
    // this.db.updateListing(this.db.loggedInUser.uid);
    }
    
    );
  }
 

  GoToStudenSentence()
  {
    var counter=0;
    for (var i=0;i<this.db.loggedInUser.professions.length;i++)
    {
      if(this.db.loggedInUser.professions[i]!="")
        counter++;
    }
    if(counter<3)
    {
      if (counter==0)
      alert("לא נבחרו מקצועות\n אנא בחר לפחות 3 מקצועות");
      
      if (counter==1)
          alert("בחרת רק מקצוע 1\n אנא בחר עוד 2 מקצועות לפחות");
      if (counter==2)
      alert("בחרת רק 2 מקצועות \n אנא בחר עוד מקצוע 1 לפחות");
      return;
    }
   this.db.updateListing(this.db.loggedInUser.uid);
  this.router.navigate(['studen-sentence']);
    
    
  }
  
  private writeProfession(str)
  {
    for (var i=0;i<this.db.loggedInUser.professions.length;i++)
    {
      if(this.db.loggedInUser.professions[i]==str)
        {
          this.db.loggedInUser.professions.splice(i,1);
          alert(str+" נמחק");
          return;
        }
    }
    for (var i=0;i<this.db.loggedInUser.professions.length;i++)
    {
      if(this.db.loggedInUser.professions[i]=="")
        {
          this.db.loggedInUser.professions[i]=str;
           return;
        }
    }
    
    this.db.loggedInUser.professions[i]=str;
    
///////////////////////////////////////////
  }
  private printPro()
  {
    this.msg=""; 
    for (var i=0;i<this.db.loggedInUser.professions.length;i++)
    {
      if(this.db.loggedInUser.professions[i]=="")
      continue;
         if(this.db.loggedInUser.professions[i]!="")
         {
          if(i==0)
          this.msg +=  this.db.loggedInUser.professions[i];
            else
          this.msg +=", "+  this.db.loggedInUser.professions[i]+ "";

         }

        
    }
  }
}

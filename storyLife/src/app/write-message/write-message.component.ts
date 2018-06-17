import { Component, OnInit } from '@angular/core';
import { Message } from '../messages/message';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})
export class WriteMessageComponent implements OnInit {
 // userTypes; //array of user types
  message: Message ; // message Object - Contains all fields. Will be uploaded as a Jason object to server
  date;
  userForm:FormGroup;
  

  ngOnInit() {
  }
  constructor(public fb:FormBuilder,public db: DatabaseService, public auth: AuthService,private _firebaseAuth: AngularFireAuth, public router: Router,public authGurdService:AuthGuard) {

    this.message = new Message();
    this.date = new Date();

  }

 
public  sendMessage(formData)
  {
    
    this.message.subject=formData.value.subject;
    this.message.to=formData.value.to;
    this.message.content=formData.value.content;
    this.message.date=this.date;
    this.message.from = this.db.loggedInUser.email;
    this.db.addMessageToDB(this.message);
    
    this.router.navigate(['msgConf']);
   
    
  }


  
    
}

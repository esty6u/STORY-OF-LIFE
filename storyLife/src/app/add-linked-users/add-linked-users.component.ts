import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { Database } from '@firebase/database';
import { DatabaseService } from '../services/database.service';
import { User } from '../users/user';
import { FormGroup , FormBuilder} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-add-linked-users',
  templateUrl: './add-linked-users.component.html',
  styleUrls: ['./add-linked-users.component.css']
})
export class AddLinkedUsersComponent implements OnInit {
  userL: User[];
  email;
  fname;
  lname;
  type;
  myParrents: string[];
  constructor(private userService: DisplayService, private db: DatabaseService, public router: Router) {
    this.email = this.userService.tmpUserForAdd.email;
    this.fname = this.userService.tmpUserForAdd.firstName;
    this.lname = this.userService.tmpUserForAdd.lastName;
    this.type = this.userService.tmpUserForAdd.type;
  }

  ngOnInit() {
    this.userService.getUserList().valueChanges().subscribe(userList => {
      this.userL = userList;
    });
  }
  public addParent(pemail) {
    for (var i = 0 ; i < this.userL.length ; i++) {
      if (this.userService.tmpUserForAdd.uid === this.userL[i].uid) {
        /*if (this.userL[i].myParents === undefined || this.userL[i].myParents === null || this.userL[i].myParents[0] === undefined) {
          this.userL[i].myParents = [''];
        }*/
        break;
      }
    }
    // tslint:disable-next-line:max-line-length
    /*if (this.userL[i].myParents[this.userL[i].myParents.length] == "" ) {
      this.userL[i].myParents[this.userL[i].myParents.length] = '';
    }*/
    for ( let j = 0 ; j < this.userL.length ; j++ ) {
      if (this.userL[i].myParents[j] === pemail) {
        this.userL[i].myParents.splice(j, 1);
        alert(pemail + ' הורה נמחק ');
        return;
      }
    }
    for ( let j = 0 ; j < this.userL.length ; j++ ) {
      if (this.userL[i].myParents[j] === undefined || this.userL[i].myParents[j] === "") {
        this.userL[i].myParents[j] = pemail;
        alert(pemail + ' הורה נוסף');
        return;
      }
    }
    /*this.userL[i].myParents[j] = pemail;*/
  }



  public addStudent(semail) {
    for (var i = 0 ; i < this.userL.length ; i++) {
      if (this.userService.tmpUserForAdd.uid === this.userL[i].uid) {
        break;
      }
    }
    // tslint:disable-next-line:max-line-length
   /* if (this.userL[i].myStudents[this.userL[i].myStudents.length] === undefined ||
      this.userL[i].myStudents[this.userL[i].myStudents.length] === null) {
      this.userL[i].myStudents[this.userL[i].myStudents.length] = '';
      }*/
    for ( let j = 0 ; j < this.userL.length ; j++ ) {
      if (this.userL[i].myStudents[j] === semail) {
        this.userL[i].myStudents.splice(j, 1);
        alert(semail + ' תלמיד נמחק');
        return;
      }
    }
    for ( let j = 0 ; j < this.userL.length ; j++ ) {
      if (this.userL[i].myStudents[j] === undefined || this.userL[i].myStudents[j] === "") {
        this.userL[i].myStudents[j] = semail;
        alert(semail + ' תלמיד נוסף');
        return;
      }
    }

  }

  public uploadLU() {
    for (var k = 0 ; k < this.userL.length ; k++) {
      if (this.userService.tmpUserForAdd.uid === this.userL[k].uid) {
        break;
      }
    }
    this.db.userpass = this.userL[k];
    this.db.uploadLinkedUsersToDatabase();
    alert('שינוי נעשה בהצלחה');

  }
}


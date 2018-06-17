import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { DisplayService } from '../services/display.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.css']
})
export class StudentsDataComponent implements OnInit {
  userL: User[];

  constructor(private userService: DisplayService,public db: DatabaseService,
    private cookieService: CookieService, private router:Router) { }

  ngOnInit() {
   
    this.userService.getUserList().valueChanges().subscribe(userList =>{
    this.userL = userList;

    })
  }

}

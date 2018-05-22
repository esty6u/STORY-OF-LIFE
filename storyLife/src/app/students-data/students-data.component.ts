import { Component, OnInit } from '@angular/core';
import { User } from '../users/user';
import { DisplayService } from '../services/display.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.css']
})
export class StudentsDataComponent implements OnInit {
  userL: User[];

  constructor(private userService: DisplayService) { }

  ngOnInit() {
    this.userService.getUserList().valueChanges().subscribe(userList =>{
      this.userL = userList;

    })
  }

}

import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { User } from '../users/user';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {
  userL: User[];
  constructor(private userService: DisplayService) { }

  ngOnInit() {
    this.userService.getUserList().valueChanges().subscribe(userList =>{
      this.userL = userList;

    })
  }

}

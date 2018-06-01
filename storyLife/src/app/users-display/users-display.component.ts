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
  x=2;
  constructor(private userService: DisplayService) { }

  ngOnInit() {
    this.userService.getUserList().valueChanges().subscribe(userList =>{
      this.userL = userList;
      var showMe=false;
    })
  }
  onGoToPage2(users)
  {
   // this.x=2/this.x;
    if(users.professions==undefined)
    {
    document.getElementById("professions").innerHTML =    'תלמיד זה עדיין לא בחר  מקצועות'
    
    }
  
    else
    {
      //if(this.x==1)
        document.getElementById("professions").innerHTML =   'מקצועות נבחרים: '+ users.professions
     // if(this.x==2)
     // document.getElementById("professions").innerHTML =   ''

    }
   
    // document.getElementById("yaki").innerHTML =    users.professions 

  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  constructor(public router: Router,public db: DatabaseService) { }

  ngOnInit() {
  }
  GoToAmI()
  {
      this.router.navigate(['am-i']);
    
    
  }
}

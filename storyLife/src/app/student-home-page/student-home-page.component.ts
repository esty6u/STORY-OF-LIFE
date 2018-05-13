import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  GoToAmI()
  {
    this.router.navigate(['am-i']);
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-am-i',
  templateUrl: './am-i.component.html',
  styleUrls: ['./am-i.component.css']
})
export class AmIComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  GoToStudenSentence()
  {
    this.router.navigate(['studen-sentence']);
  }
}

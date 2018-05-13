import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-student-sentence',
  templateUrl: './student-sentence.component.html',
  styleUrls: ['./student-sentence.component.css']
})
export class StudentSentenceComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  GoToQuestionnaire()
  {
    this.router.navigate(['studen-Questionnaire']);

  }
}

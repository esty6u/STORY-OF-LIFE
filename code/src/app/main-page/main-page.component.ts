import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';





import { User } from '../users/user'
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(public router: Router ) { }

  ngOnInit() {
  }
  log()
  {
    this.router.navigate(['login']);
  }

}

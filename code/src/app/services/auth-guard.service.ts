import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard  {

  constructor(private authService: AuthService,private router: Router) { }

  canActivate() {
    if  ( this.authService.isLoggedIn() ) {

      return true;

    }

this.router.navigate(['/']);
    return false;
  }

}
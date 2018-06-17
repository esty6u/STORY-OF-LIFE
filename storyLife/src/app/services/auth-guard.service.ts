import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { User } from '../users/user';
import { DatabaseService } from './database.service';


@Injectable()
export class AuthGuard 
 {

    constructor(private authService: AuthService,private router: Router, public db:DatabaseService) { }

    /*canActivate() 
    {
        if(this.authService.isLoggedIn()) 
        {
                return true;
        }
        else
        {
        this.router.navigate(['/']);
          return false;
        }
    }*/
   /* canActivateA()
    {
        if(this.authService.isLoggedIn()) 
        {
            if(this.db.loggedInUser.type=='אדמין')
                return true;
        }
        else
        {
        this.router.navigate(['/']);
          return false;
        }
    }
    canActivateB()
    {
        if(this.authService.isLoggedIn()) 
        {
            if(this.db.loggedInUser.type=='מורה')
                return true;
        }
        else
        {
        this.router.navigate(['/']);
          return false;
        }
    }
    canActivateC()
    {
        if(this.authService.isLoggedIn()) 
        {
            if(this.db.loggedInUser.type=='הורה')
                return true;
        }
        else
        {
        this.router.navigate(['/']);
          return false;
        }
    }
    canActivateD()
    {
        if(this.authService.isLoggedIn()) 
        {
            if(this.db.loggedInUser.type=='תלמיד')
                return true;
        }
        else
        {
        this.router.navigate(['/']);
          return false;
        }
    }*/


}
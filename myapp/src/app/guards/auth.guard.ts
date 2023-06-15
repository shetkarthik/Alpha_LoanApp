import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // authpass: boolean = false;

  constructor (private auth:AuthService,private router:Router,private toast:NgToastService){

  }
  
  canActivate():boolean {
    if(this.auth.isLogedIn()){
      // this.authpass = true;
      return true;
    }
    else{
      this.toast.error({detail:"ERROR",summary:"Please Login First"});
      this.router.navigate(["login"]);
      return false;
    }
  }

  
}

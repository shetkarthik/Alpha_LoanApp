import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/client/login/login.component';
import { SignupComponent } from './components/client/signup/signup.component';
import { HomeComponent } from './components/client/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoaneligibleComponent } from './components/client/loaneligible/loaneligible.component';
import { AuthlogComponent } from './components/client/authlog/authlog.component';
import { LoandetailsComponent } from './components/client/loandetails/loandetails.component';
import { LoanFormComponent } from './components/client/loan-form/loan-form.component';
import { LoancaltrComponent } from './components/client/loancaltr/loancaltr.component';
import { LoantypeComponent } from './components/client/loantype/loantype.component';
import { RouteGuardGuard } from './guards/route-guard.guard';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'loaneligible',component:LoaneligibleComponent},
  {path:'authlog',component:AuthlogComponent},
  {path:'applyLoan',component:LoandetailsComponent},
  {path:'loancaltr',component:LoancaltrComponent},
  {path:'loantype',component:LoantypeComponent},
  {path:'loanForm',component:LoanFormComponent,canActivate:[RouteGuardGuard]},
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

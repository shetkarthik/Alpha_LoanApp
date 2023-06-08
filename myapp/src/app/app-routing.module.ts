import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoaneligibleComponent } from './components/loaneligible/loaneligible.component';
import { AuthlogComponent } from './components/authlog/authlog.component';
import { LoandetailsComponent } from './components/loandetails/loandetails.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { LoancaltrComponent } from './components/loancaltr/loancaltr.component';
import { LoantypeComponent } from './components/loantype/loantype.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'loaneligible',component:LoaneligibleComponent},
  {path:'authlog',component:AuthlogComponent},
  {path:'applyLoan',component:LoandetailsComponent},
  {path:'loantype/loancaltr',component:LoancaltrComponent},
  {path:'loantype',component:LoantypeComponent},
  {path:'loanForm',component:LoanFormComponent},
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

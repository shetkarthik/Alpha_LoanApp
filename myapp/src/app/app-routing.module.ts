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
import { LoanReqComponent } from './components/loan-req/loan-req.component';
import { LoanAccDetailsComponent } from './components/loan-acc-details/loan-acc-details.component';
import { LoanAccInfoComponent } from './components/loan-acc-info/loan-acc-info.component';
import { LoanStatusComponent } from './components/loan-status/loan-status.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'loaneligible',component:LoaneligibleComponent},
  {path:'authlog',component:AuthlogComponent},
  {path:'applyLoan',component:LoandetailsComponent},
  {path:'loancaltr',component:LoancaltrComponent},
  {path:'loantype',component:LoantypeComponent},
  {path:'loanForm',component:LoanFormComponent},
  {path:"",component:HomeComponent,canActivate:[AuthGuard]},
  {path:'loanReq',component:LoanReqComponent},
  {path:'AccountDetails/:accountNum',component:LoanAccDetailsComponent},
  {path:'LoanAccountInfo/:id',component:LoanAccInfoComponent},
  {path:'loan-tracking/:id',component:LoanStatusComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

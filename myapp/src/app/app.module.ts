import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoaneligibleComponent } from './components/loaneligible/loaneligible.component';
import { AuthlogComponent } from './components/authlog/authlog.component';
import { NgxLoadingModule } from "ngx-loading";
import { LoandetailsComponent } from './components/loandetails/loandetails.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoancaltrComponent } from './components/loancaltr/loancaltr.component';
import { LoantypeComponent } from './components/loantype/loantype.component';
import { LoanReqComponent } from './components/loan-req/loan-req.component';
import { LoanAccDetailsComponent } from './components/loan-acc-details/loan-acc-details.component';
import { LoanAccInfoComponent } from './components/loan-acc-info/loan-acc-info.component';
import { LoanStatusComponent } from './components/loan-status/loan-status.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LoaneligibleComponent,
    AuthlogComponent,
    LoandetailsComponent,
    LoanFormComponent,
    NavbarComponent,
    LoancaltrComponent,
    LoantypeComponent,
    LoanReqComponent,
    LoanAccDetailsComponent,
    LoanAccInfoComponent,
    LoanStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

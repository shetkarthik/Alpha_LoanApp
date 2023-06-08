import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loantype',
  templateUrl: './loantype.component.html',
  styleUrls: ['./loantype.component.css']
})
export class LoantypeComponent {
  constructor (private router: Router){
  }
 
  routeToLoanForm(){
    // this.router.navigate(["loantype"])
    this.router.navigate(["applyLoan"])
  }

}
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loancaltr',
  templateUrl: './loancaltr.component.html',
  styleUrls: ['./loancaltr.component.css']
})
export class LoancaltrComponent {
  constructor (private router: Router){
  }
  routeToLoan(){
    this.router.navigate(["loantype"])
  }
    calculateEMI(): void {
      const loanAmount = parseFloat((<HTMLInputElement>document.getElementById('loan-amount')).value);
      const loanTenure = parseInt((<HTMLInputElement>document.getElementById('loan-tenure')).value);
      const interestRate = parseFloat((<HTMLInputElement>document.getElementById('interest-rate')).value);
  
      const interest = interestRate / 12 / 100;
      const emi = (loanAmount * interest * Math.pow(1 + interest, loanTenure)) / (Math.pow(1 + interest, loanTenure) - 1);
      const totalAmountPayable = emi * loanTenure;
      const totalInterestPayable = totalAmountPayable - loanAmount;
  
      (<HTMLDivElement>document.getElementById('emi')).textContent = emi.toFixed(2);
      (<HTMLDivElement>document.getElementById('total-amount')).textContent = totalAmountPayable.toFixed(2);
      (<HTMLDivElement>document.getElementById('total-interest')).textContent = totalInterestPayable.toFixed(2);
    }

}

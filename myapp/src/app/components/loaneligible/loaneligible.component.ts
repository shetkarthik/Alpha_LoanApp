import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
// import "./index";

@Component({
  selector: 'app-loaneligible',
  templateUrl: './loaneligible.component.html',
  styleUrls: ['./loaneligible.component.css']
})



export class LoaneligibleComponent {
  type:any;
  monthlyIncome: any;
  annualIncome: any;
  tenure: any;
  loanAmount: any;
  otheremi: any;
  interest: any;
  result: any;
  conclusionA: any;
  conclusionB: any;
  color: string = "danger";
  isLoanType = false;

  constructor(private toast:NgToastService) { }

  
 

  onChangeEvent(event: any) {
    this.monthlyIncome = parseFloat(event.target.value);
  }
  
  onChangeEvent2(event: any) {
    this.annualIncome = parseFloat(event.target.value);
  }
  onChangeEvent3(event: any) {
    this.tenure = parseFloat(event.target.value);
  }
  onChangeEvent4(event: any) {
    this.loanAmount = parseFloat(event.target.value);
  }
  onChangeEvent5(event: any) {
    this.otheremi = parseFloat(event.target.value);
  }


  loanType() {
    let loan_cred: any = document.getElementById("loanType");
    if(loan_cred.value != "")
    {
      this.interest = parseFloat(loan_cred.value);
      console.log(this.interest);
      this.isLoanType = true;
    }
    else{
      this.interest = "";
    }
  }

    
  onSubmit() {
    this.result = document.getElementById("app") as HTMLElement;
    this.conclusionA = document.getElementById("resulta") as HTMLElement;
    this.conclusionB = document.getElementById("resultb") as HTMLElement;

    let monthemi = Math.round(this.monthlyIncome / 2);
    let annualemi = Math.round(this.annualIncome / 24);

    let avgemi = Math.round((monthemi + annualemi) / 2);

    let availableamount = avgemi - this.otheremi;
    
    let totalloanemi = Math.round((this.loanAmount * (this.interest/1200) * Math.pow(1 + (this.interest/1200), (this.tenure * 12))) / (Math.pow(1 + (this.interest/1200), (this.tenure*12)) - 1));

    console.log(`this is total loan emi ${totalloanemi}`);
    console.log(`this is available:${availableamount}`);

    if(Number.isNaN(totalloanemi)===true || Number.isNaN(availableamount)===true)
    {
      this.color = "danger";
      this.result.innerHTML = "Invalid Input, Please Check Inputs again"
      this.conclusionA.innerHTML = ``
      this.conclusionB.innerHTML = ``
    }
    else if( this.monthlyIncome <= 25000 ||
      this.annualIncome <= 350000){
        this.result.innerHTML = "Sorry you don't match the eligibility criteria"
        this.conclusionA.innerHTML = ``
        this.conclusionB.innerHTML = ``
    }
    else if (
      totalloanemi> availableamount
    ) {
      this.color = "danger";
      this.result.innerHTML = "Sorry your Loan can not be approved, Please contact our Customer support for more info"
      this.conclusionA.innerHTML = `Your Total Available EMI is : ₹ ${availableamount}`
      this.conclusionB.innerHTML = `Your Total Loan EMI for the current input is : ₹ ${totalloanemi}`
    }
    
     
    else {
      this.color = "success";
      this.result.innerHTML = "Congratulations!!! You are Eligible for the Loan"
      this.conclusionA.innerHTML = `Your Total Available EMI is : ₹ ${availableamount}`
      this.conclusionB.innerHTML = `Your Total Loan EMI for the current input is : ₹ ${totalloanemi}`
    }   
  }

}

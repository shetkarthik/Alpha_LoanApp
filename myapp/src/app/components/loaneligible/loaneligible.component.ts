import { Component } from '@angular/core';
// import "./index";

@Component({
  selector: 'app-loaneligible',
  templateUrl: './loaneligible.component.html',
  styleUrls: ['./loaneligible.component.css']
})



export class LoaneligibleComponent {

  clicked:boolean = false;
  monthlyIncome: any;
  annualIncome: any;
  workexp: any;
  tenure: any;
  loanAmount: any;
  otheremi: any;
  age: any;
  interest: any = 9.15;
  result: any;
  conclusionA: any;
  conclusionB: any;
  color: string = "danger";
  isLoanType = false;

  constructor() { }

  

  onChangeEvent(event: any) {
    this.monthlyIncome = parseFloat(event.target.value);
    // console.log(num1);
  }
  onChangeEvent7(event: any) {
    this.workexp = parseFloat(event.target.value);
    // console.log(num1);
  }
  onChangeEvent2(event: any) {
    this.annualIncome = parseFloat(event.target.value);
    // console.log(num2);
  }
  onChangeEvent3(event: any) {
    this.tenure = parseFloat(event.target.value);
    // console.log(num2);
  }
  onChangeEvent4(event: any) {
    this.loanAmount = parseFloat(event.target.value);
    // console.log(num2);
  }
  onChangeEvent5(event: any) {
    this.otheremi = parseFloat(event.target.value);
    // console.log(num2);
  }
  onChangeEvent6(event: any) {
    this.age = parseFloat(event.target.value);
    // console.log(num2);
  }

  loanType() {
    let loan_cred: any = document.getElementById("loanType");
    this.interest = parseFloat(loan_cred.value);
    console.log(this.interest);
    this.isLoanType = true;
  }

    
  onSubmit() {
    this.clicked = true;
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

    if(Number.isNaN(totalloanemi)===true || Number.isNaN(availableamount)===true
    || this.age < 21 ||
    this.age > 60 ||
    this.monthlyIncome <= 25000 ||
    this.annualIncome <= 350000 ||
    this.workexp <= 1
    ){
      console.log("age below 21");
      this.color = "danger";
      this.result.innerHTML = "Invalid Input, Please Check Inputs again"
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

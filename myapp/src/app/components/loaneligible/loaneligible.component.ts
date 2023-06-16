import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-loaneligible',
  templateUrl: './loaneligible.component.html',
  styleUrls: ['./loaneligible.component.css']
})



export class LoaneligibleComponent {
  loanEligible!: FormGroup;
  interest: any;
  type: any;
  color!: string;
  result: any;
  conclusionA: any;
  conclusionB: any;



  constructor(private formBuilder: FormBuilder,
    private api: ApiService,private router:Router
  ) { }

  ngOnInit() {
   
    this.loanEligible = this.formBuilder.group({
      loanType: ['', Validators.required],
      loanAmount: ['', [Validators.required,Validators.pattern('^(?!0)[0-9]*$')]],
      tenure: ['', Validators.required],
      monthlyIncome: ['', [Validators.required,Validators.pattern('^(?!0)[0-9]*$')]],
      annualIncome: ['', [Validators.required,Validators.pattern('^(?!0)[0-9]*$')]],
      otherEmi: ['', [Validators.required,Validators.pattern('^(?!0)[0-9]*$')]],
    });

  }

  onChange(event: any) {
    const target = event.target as HTMLInputElement;
    const name = target.getAttribute('formControlName');
    this.type = target.value;
    console.log(name);
    if (name == "loanType") {
      console.log(target.value)

      this.api.getInterestByLoanType(target.value).subscribe(
        (interest: number) => {
          this.interest = interest;
          console.log(interest);
        },
        (error: any) => {

          console.error(error);
        }
      );
    }
    
  }

  onSubmit() {
    this.result = document.getElementById("app") as HTMLElement;
    this.conclusionA = document.getElementById("resulta") as HTMLElement;
    this.conclusionB = document.getElementById("resultb") as HTMLElement;

    if (this.loanEligible.valid) {

      console.log(this.loanEligible.value);

      this.api.checkEligible(this.loanEligible.value).subscribe(res => {
        this.result.innerHTML = res["results"]
        this.conclusionA.innerHTML = res["availableEMI"]
        this.conclusionB.innerHTML = res["loanEMI"]
        this.color = res["color"]
      }, (err: any) => {
        console.log(err);
      })

    } else {
      this.loanEligible.markAllAsTouched();
    }
  }
}
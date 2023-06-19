import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-loancaltr',
  templateUrl: './loancaltr.component.html',
  styleUrls: ['./loancaltr.component.css']
})
export class LoancaltrComponent {calculate!: FormGroup;
  result: any;
  Emi: any;
  TotalAmt: any;
  TotalInt: any;
 
  constructor (private formBuilder: FormBuilder,
    private api: ApiService,private router:Router){
  }
  routeToLoanForm(){
    this.router.navigate(["applyLoan"])
  }
  ngOnInit() {
   
    this.calculate = this.formBuilder.group({
      loanAmount: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.min(1)]],
      tenure: ['', [Validators.required,Validators.pattern('^[0-9]*$'),Validators.pattern('^[0-9]*$'),Validators.min(3),Validators.max(300)]],
      interest: ['', [Validators.required,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'),Validators.min(1)]]
    });
  }

  onSubmit() {
    
    this.Emi = document.getElementById("resulta") as HTMLElement;
    this.TotalAmt = document.getElementById("resultb") as HTMLElement;
    this.TotalInt = document.getElementById("resultc") as HTMLElement;

    if (this.calculate.valid ) {

     
      this.api.calculateEMI(this.calculate.value).subscribe(res => {
        console.log(res);
      
        this.Emi.innerHTML = res["loanEMI"]
        this.TotalAmt.innerHTML = res["totalAmountPayable"]
        this.TotalInt.innerHTML = res["totalInterestPayable"]
        
      }, (err: any) => {
        console.log(err);
      })

    } else {
      this.calculate.markAllAsTouched();
    }
  }


    
}

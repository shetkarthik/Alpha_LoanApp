
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserstoreService } from 'src/app/services/userstore.service';



@Component({
  selector: 'app-loandetails',
  templateUrl: './loandetails.component.html',
  styleUrls: ['./loandetails.component.css']
})
export class LoandetailsComponent {
  disabled : boolean = false;
  loanBasic!: FormGroup;
  accountNum!:string;
  formData:any = {};
  interest: any;
  type :any;
  response:any;
  section1:boolean = true
  section2:boolean = false

 

  constructor(private formBuilder: FormBuilder,
    private api:ApiService,
    private userStore:UserstoreService,
    private auth:AuthService,
    ) { }

  ngOnInit() {
    this.loanBasic = this.formBuilder.group({
      accountNum:[this.accountNum,Validators.required],
      loanType: ['', Validators.required],
      loanAmount: ['', Validators.required],
      tenure: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      annualIncome: ['', Validators.required],
      otherEmi: ['', Validators.required],
      loanPurpose: ['', Validators.required],
      propertyLoc: ['', Validators.required],
      propertyArea: ['', Validators.required],
      propertyValue: ['', Validators.required],
      
    });
   
    this.userStore.getAccountFromStore().subscribe(val => {
      let accountFromToken = this.auth.getAccountNumFromToken();
      this.accountNum = val || accountFromToken;
    })

  }

 
    
  

  onChange(event:any){
    const target = event.target as HTMLInputElement;
    const name = target.getAttribute('formControlName');
    this.type = target.value;
    console.log(name);
    if(name == "loanType"){
      console.log(target.value)

      this.api.getInterestByLoanType(target.value).subscribe(
        (interest: number) => {
         this.interest = interest;
          console.log(interest);
        },
        (error:any) => {
       
          console.error(error);
        }
      );
      }
  }


 onSection(){
    this.section1 = !this.section1;
    this.section2 = !this.section2;
 }

  onSubmit() {

    if (this.loanBasic.valid) {

      console.log(this.loanBasic.value);
  
     this.api.applyLoan(this.loanBasic.value).subscribe(res=>{
       console.log(res);
     },(err:any)=>{
      console.log(err);
     })
   
    } else {
      this.disabled = true;
      this.loanBasic.markAllAsTouched();
    }
  }

}

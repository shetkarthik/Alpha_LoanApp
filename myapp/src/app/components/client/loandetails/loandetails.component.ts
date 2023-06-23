
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { catchError, forkJoin, map, switchMap, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserstoreService } from 'src/app/services/userstore.service';
import { updateValidators } from 'src/app/helpers/validate';




@Component({
  selector: 'app-loandetails',
  templateUrl: './loandetails.component.html',
  styleUrls: ['./loandetails.component.css']
})
export class LoandetailsComponent {
  disabled: boolean = false;
  section: boolean = false;
  loanBasic!: FormGroup;
  accountNum!: string;
  formData: any = {};
  interest: any;
  type: any;
  loantypes: any;
  selectedFiles!: File[];
  files: File[] = [];
  updateValidators: any;




  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private userStore: UserstoreService,
    private auth: AuthService,
    private toast: NgToastService,
    private shared: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userStore.getAccountFromStore().subscribe(val => {
      let accountFromToken = this.auth.getAccountNumFromToken();
      this.accountNum = val || accountFromToken;
    })
    this.loanBasic = this.formBuilder.group({
      accountNum: [this.accountNum, Validators.required],
      loanType: ['', Validators.required],
      loanAmount: ['', [Validators.required, Validators.pattern('^(?!0)[0-9]*$')]],
      tenure: ['', Validators.required],
      // monthlyIncome: ['', [Validators.required, Validators.pattern('^(?!0)[0-9]*$')]],
      annualIncome: ['', [Validators.required, Validators.pattern('^(?!0)[0-9]*$')]],
      otherEmi: ['', [Validators.required, Validators.pattern('^(?!0)[0-9]*$')]],
      loanPurpose: ['', Validators.required],
      propertyLoc: ['',],
      propertyArea: ['',],
      propertyValue: ['',],
      ongoingLoan: [''],
      vehicleType: [''],
      vehiclercNumber: [''],
      vehiclePrice: [''],
      vendorName: [''],
      vendorAddress: [''],
      educationType: [''],
      courseName: [''],
      courseDuration: [''],
      instituteName: [''],
      totalFee: [''],

    });

    this.loanBasic.controls['loanType'].valueChanges.subscribe(value => {
      this.loantypes = value;
      updateValidators(this.loanBasic, this.loantypes)
    });



  }





  onFileSelected(event: any): void {
    this.files = event.target.files;
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
    // this.shouldApplyValidators();
  }

  // onFinalSubmit() {
  // if (this.loanBasic.valid) 
  //   {
  //     const formData = new FormData();
  //     console.log(this.loanBasic.value)

  //     formData.append('accountNumber', this.accountNum);
  //     formData.append('loanType', this.type);
  //     // formData.append('loanId', '2');
  //     for (const file of this.files) {
  //       formData.append('files', file);
  //     }

  //     const request1 = this.api.applyLoan(this.loanBasic.value).pipe(
  //       catchError(error => {
  //         console.log(error);
  //         this.toast.error({detail:"Error",summary:error.error.message,duration:5000})
  //         return throwError(error);
  //       }),
  //       map(response => {
  //         const loanId = response.loanId; 
  //         formData.append('loanId',loanId.toString())
  //         return response;
  //       })
  //     );
  //     const request2 = this.api.uploadFile(formData).pipe(
  //       catchError(error => {
  //         console.log(error);
  //         this.toast.error({detail:"Error",summary:error.error.message,duration:5000})
  //         return throwError(error);
  //       })
  //     );

  //     forkJoin([request1, request2]).subscribe(
  //       ([response1, response2]) => {
  //       formData.append('loanId', response1.loanId.toString());
  //         console.log(response1)
  //         console.log(formData);
  //         this.toast.success({detail:"Success",summary:response1.message,duration:5000})
  //         console.log(response2)
  //         this.router.navigate(["loanForm"])
  //       },
  //       error => {
  //         console.log(error.error.message);
  //       }
  //     );
  //   }
  //   else {
  //     this.loanBasic.markAllAsTouched();

  //   }
  // }

  onFinalSubmit() {
  if (this.loanBasic.valid)
  {
    const formData = new FormData();
    console.log(this.loanBasic.value);

    formData.append('accountNumber', this.accountNum);
    formData.append('loanType', this.type);
    // formData.append('loanId', '2');
    for (const file of this.files) {
      formData.append('files', file);
    }

    const request1 = this.api.applyLoan(this.loanBasic.value).pipe(
      catchError(error => {
        console.log(error);
        this.toast.error({ detail: 'Error', summary: error.error.message, duration: 5000 });
        return throwError(error);
      }),
      switchMap(response1 => {
        const loanId = response1.loanId;
        formData.append('loanId', loanId.toString());
        return this.api.uploadFile(formData).pipe(
          catchError(error => {
            console.log(error);
            this.toast.error({ detail: 'Error', summary: error.error.message, duration: 5000 });
            return throwError(error);
          }),
          map(response2 => [response1, response2]) // Combine response1 and response2 into an array
        );
      })
    );

    request1.subscribe(
      ([response1, response2]) => {
        formData.append('loanId', response1.loanId.toString());
        console.log(response1);
        console.log(formData);
        this.toast.success({ detail: 'Success', summary: "Loan Applied Successfully", duration: 5000 });
        console.log(response2);
        this.router.navigate(['loanForm']);
      },
      error => {
        console.log(error.error.message);
      }
    );

  }
  else{
    this.loanBasic.markAllAsTouched();
  }
  }
 
}


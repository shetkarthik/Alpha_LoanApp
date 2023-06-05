
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { catchError, forkJoin, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';



@Component({
  selector: 'app-loandetails',
  templateUrl: './loandetails.component.html',
  styleUrls: ['./loandetails.component.css']
})
export class LoandetailsComponent {
  disabled: boolean = false;
  loanBasic!: FormGroup;
  accountNum!: string;
  formData: any = {};
  interest: any;
  type: any;
  selectedFiles!: File[];
  files: File[] = [];
  section1: boolean = true
  section2: boolean = false



  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private userStore: UserstoreService,
    private auth: AuthService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.userStore.getAccountFromStore().subscribe(val => {
      let accountFromToken = this.auth.getAccountNumFromToken();
      this.accountNum = val || accountFromToken;
    })
    this.loanBasic = this.formBuilder.group({
      accountNum: [this.accountNum, Validators.required],
      loanType: ['', Validators.required],
      loanAmount: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      tenure: ['', Validators.required],
      monthlyIncome: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      annualIncome: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      otherEmi: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      loanPurpose: ['', Validators.required],
      propertyLoc: ['', Validators.required],
      propertyArea: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      propertyValue: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],

    });

  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
  }

  // onUpload() {

  //   // const formData = new FormData();

  //   // for (const file of this.files) {
  //   //   formData.append('accountNumber', this.accountNum);
  //   //   formData.append('loanType', this.type);
  //   //   formData.append('files', file);
  //   // }

  //   // console.log('FormData', formData);

  //   // formData.forEach((value, key) => {
  //   //   console.log(key + ':', value);
  //   // });

  //   // this.api.uploadFile(formData).subscribe(
  //   //   (response) => {
  //   //     console.log('Files uploaded successfully:', response);
  //   //   },
  //   //   (error) => {
  //   //     console.error('Error uploading files:', error);
  //   //   }
  //   // );
  // }



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


  onSection() {
    this.section1 = !this.section1;
    this.section2 = !this.section2;
  }

  // onSubmit() {
  //   if (this.loanBasic.valid) {

  //     console.log(this.loanBasic.value);

  //     this.api.applyLoan(this.loanBasic.value).subscribe(res => {
  //       console.log(res);
  //     }, (err: any) => {
  //       console.log(err);
  //     })

  //   } else {
  //     this.loanBasic.markAllAsTouched();
  //   }
  // }

  onFinalSubmit() {
  if (this.loanBasic.valid) 
    {
      const formData = new FormData();
      console.log(this.loanBasic.value)

      for (const file of this.files) {
        formData.append('accountNumber', this.accountNum);
        formData.append('loanType', this.type);
        formData.append('files', file);
      }

      const request1 = this.api.applyLoan(this.loanBasic.value).pipe(
        catchError(error => {
          console.log(error);
          this.toast.error({detail:"Error",summary:error.error.message,duration:5000})
          return throwError(error);
        })
      );
      const request2 = this.api.uploadFile(formData).pipe(
        catchError(error => {
          console.log(error);
          this.toast.error({detail:"Error",summary:error.error.message,duration:5000})
          return throwError(error);
        })
      );

      forkJoin([request1, request2]).subscribe(
        ([response1, response2]) => {
          console.log(response1)
          this.toast.success({detail:"Success",summary:response1.message,duration:5000})
          console.log(response2)
        },
        error => {
          console.log(error.error.message);
        }
      );
    }
    else {
      this.loanBasic.markAllAsTouched();
    }
  }

}


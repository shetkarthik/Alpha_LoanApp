
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { catchError, forkJoin, throwError } from 'rxjs';
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
  disabled: boolean = false;
  section:boolean = false;
  loanBasic!: FormGroup;
  accountNum!: string;
  formData: any = {};
  interest: any;
  type: any;
  loantypes:any;
  selectedFiles!: File[];
  files: File[] = [];




  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private userStore: UserstoreService,
    private auth: AuthService,
    private toast: NgToastService,
    private shared:SharedService,
    private router:Router
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
      loanPurpose: ['',Validators.required],
      propertyLoc: ['',],
      propertyArea: ['',],
      propertyValue: ['',],
      ongoingLoan: [''],  
      vehicleType:[''],
      vehiclercNumber:[''],
      vehiclePrice:[''],
      vendorName:[''],
      vendorAddress:[''],
      educationType:[''],
      courseName:[''],
      courseDuration:[''],
      instituteName:[''],
      totalFee:[''],

    });

    this.loanBasic.controls['loanType'].valueChanges.subscribe(value => {
     this.loantypes = value;
      this.updateValidators();
    });
  

  }


  updateValidators(){
      const propArea = this.loanBasic.controls['propertyArea']; 
    const propLoc = this.loanBasic.controls['propertyLoc']; 
    const propVal = this.loanBasic.controls['propertyValue']; 
    const ongoingLoan = this.loanBasic.controls['ongoingLoan']; 
    const vehicleType = this.loanBasic.controls['vehicleType']; 
    const vehiclercNumber = this.loanBasic.controls['vehiclercNumber']; 
    const vehiclePrice = this.loanBasic.controls['vehiclePrice']; 
    const vendorName = this.loanBasic.controls['vendorName']; 
    const vendorAddress = this.loanBasic.controls['vendorAddress']; 
    const educationType = this.loanBasic.controls['educationType']; 
    const totalFee = this.loanBasic.controls['totalFee']; 
    const instituteName = this.loanBasic.controls['instituteName']; 
    const courseDuration = this.loanBasic.controls['courseDuration']; 
    const courseName = this.loanBasic.controls['courseName']; 

    if(this.loantypes == 'houseLoan'){
      propArea.setValidators([Validators.required,Validators.pattern('^[0-9]*$')]);
      propLoc.setValidators(Validators.required);
      propVal.setValidators([Validators.required,Validators.pattern('^[0-9]*$')]);   
    }
    else if(this.loantypes == 'personalLoan')
    {
            propArea.clearValidators();
            propLoc.clearValidators();
            propVal.clearValidators();
            ongoingLoan.setValidators([Validators.required]);
    }
    else if(this.loantypes == 'vehicleLoan')
    {
      propArea.clearValidators();
      propLoc.clearValidators();
      propVal.clearValidators();
      ongoingLoan.clearValidators();
      vehiclePrice.setValidators([Validators.required,Validators.pattern('^[0-9]*$')]);
      vehicleType.setValidators(Validators.required);
      vendorName.setValidators([Validators.required,Validators.pattern('^[a-zA-Z]+$')]);
      vendorAddress.setValidators(Validators.required);
      vehiclercNumber.setValidators([Validators.required]);  
    }
    else if(this.loantypes == 'educationLoan')
    {
      propArea.clearValidators();
      propLoc.clearValidators();
      propVal.clearValidators();
      ongoingLoan.clearValidators();
      vehiclePrice.clearValidators();
      vehicleType.clearValidators();
      vendorName.clearValidators();
      vendorAddress.clearValidators();
      vehiclercNumber.clearValidators(); 
      totalFee.setValidators([Validators.required,Validators.pattern('^[0-9]*$')]);
      instituteName.setValidators(Validators.required);
      courseName.setValidators([Validators.required,Validators.pattern('^[a-zA-Z]+$')]);
      educationType.setValidators(Validators.required);
      courseDuration.setValidators([Validators.required,Validators.pattern('^[0-9]*$')]); 

    }
    
    propArea.updateValueAndValidity();
    propVal.updateValueAndValidity();
    propLoc.updateValueAndValidity();
    ongoingLoan.updateValueAndValidity();
    vehiclePrice.updateValueAndValidity();
    vehicleType.updateValueAndValidity();
    vendorName.updateValueAndValidity();
    vendorAddress.updateValueAndValidity();
    vehiclercNumber.updateValueAndValidity();
    courseDuration.updateValueAndValidity();
    courseName.updateValueAndValidity();
    instituteName.updateValueAndValidity();
    educationType.updateValueAndValidity();
    totalFee.updateValueAndValidity();
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


  // shouldApplyValidators() : boolean
  // {
  //   let shouldValidate = false;
  //   const propArea = this.loanBasic.get('propertyArea'); 
  //   const propLoc = this.loanBasic.get('propertyLoc'); 
  //   const propVal = this.loanBasic.get('propertyValue'); 
  //   const loanPurpose = this.loanBasic.get('loanPurpose'); 
  //   if (this.type == 'houseLoan') 
  //   {
  //     if(propArea && propLoc && propVal && loanPurpose)
  //     {
  //       propArea.setValidators([Validators.required]);
  //       propLoc.setValidators([Validators.required]);
  //       propVal.setValidators([Validators.required]);
  //       loanPurpose.setValidators([Validators.required]);
  //       shouldValidate = true;
  //       // console.log("perosnal")
  //     }
  //   }
 
  //   else if(this.type == 'personalLoan') 
  //   {
  //     if(propArea && propLoc && propVal && loanPurpose)
  //     {
  //       propArea.clearValidators();
  //       propLoc.clearValidators();
  //       propVal.clearValidators();
  //       loanPurpose.clearValidators();
  //       shouldValidate = true;
  //      console.log("personal");
  //     }
  //   }
    
  //    else{
  //     propArea?.clearValidators();
  //     propLoc?.clearValidators();
  //     propVal?.clearValidators();
  //     loanPurpose?.clearValidators();
  //     shouldValidate = false;
  //   }
    
  //   return shouldValidate
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
    // this.shouldApplyValidators();
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
 
      formData.append('accountNumber', this.accountNum);
      formData.append('loanType', this.type);
      for (const file of this.files) {
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
          this.router.navigate(["loanForm"])
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


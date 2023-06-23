import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export function updateValidators(loanBasic:any,loantypes:any){
      const propArea = loanBasic.controls['propertyArea']; 
    const propLoc = loanBasic.controls['propertyLoc']; 
    const propVal = loanBasic.controls['propertyValue']; 
    const ongoingLoan = loanBasic.controls['ongoingLoan']; 
    const vehicleType = loanBasic.controls['vehicleType']; 
    const vehiclercNumber = loanBasic.controls['vehiclercNumber']; 
    const vehiclePrice = loanBasic.controls['vehiclePrice']; 
    const vendorName = loanBasic.controls['vendorName']; 
    const vendorAddress = loanBasic.controls['vendorAddress']; 
    const educationType = loanBasic.controls['educationType']; 
    const totalFee = loanBasic.controls['totalFee']; 
    const instituteName = loanBasic.controls['instituteName']; 
    const courseDuration = loanBasic.controls['courseDuration']; 
    const courseName = loanBasic.controls['courseName']; 

    if(loantypes == 'houseLoan'){
      propArea.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);
      propLoc.setValidators(Validators.required);
      propVal.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);   
    }
    else if(loantypes == 'personalLoan')
    {
            propArea.clearValidators();
            propLoc.clearValidators();
            propVal.clearValidators();
            ongoingLoan.setValidators([Validators.required]);
    }
    else if(loantypes == 'vehicleLoan')
    {
      propArea.clearValidators();
      propLoc.clearValidators();
      propVal.clearValidators();
      ongoingLoan.clearValidators();
      vehiclePrice.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);
      vehicleType.setValidators(Validators.required);
      vendorName.setValidators([Validators.required,Validators.pattern('^[a-zA-Z ]+$')]);
      vendorAddress.setValidators(Validators.required);
      vehiclercNumber.setValidators([Validators.required]);  
    }
    else if(loantypes == 'educationLoan')
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
      totalFee.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$'),maxValueValidator(10000,1000000)]);
      instituteName.setValidators(Validators.required);
      courseName.setValidators([Validators.required,Validators.pattern('^[a-zA-Z ]+$')]);
      educationType.setValidators(Validators.required);
      courseDuration.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$'),maxValueValidator(1,10)]); 

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

  export function maxValueValidator( minValue : number ,maxValue: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = parseInt(control.value, 10);
  
      if (isNaN(value) || value > maxValue || value < minValue) {
        return { maxValue: { valid: false } };
      }
  
      return null;
    };
  }
  

   // updateValidators(){
  //     const propArea = this.loanBasic.controls['propertyArea']; 
  //   const propLoc = this.loanBasic.controls['propertyLoc']; 
  //   const propVal = this.loanBasic.controls['propertyValue']; 
  //   const ongoingLoan = this.loanBasic.controls['ongoingLoan']; 
  //   const vehicleType = this.loanBasic.controls['vehicleType']; 
  //   const vehiclercNumber = this.loanBasic.controls['vehiclercNumber']; 
  //   const vehiclePrice = this.loanBasic.controls['vehiclePrice']; 
  //   const vendorName = this.loanBasic.controls['vendorName']; 
  //   const vendorAddress = this.loanBasic.controls['vendorAddress']; 
  //   const educationType = this.loanBasic.controls['educationType']; 
  //   const totalFee = this.loanBasic.controls['totalFee']; 
  //   const instituteName = this.loanBasic.controls['instituteName']; 
  //   const courseDuration = this.loanBasic.controls['courseDuration']; 
  //   const courseName = this.loanBasic.controls['courseName']; 

  //   if(this.loantypes == 'houseLoan'){
  //     propArea.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);
  //     propLoc.setValidators(Validators.required);
  //     propVal.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);   
  //   }
  //   else if(this.loantypes == 'personalLoan')
  //   {
  //           propArea.clearValidators();
  //           propLoc.clearValidators();
  //           propVal.clearValidators();
  //           ongoingLoan.setValidators([Validators.required]);
  //   }
  //   else if(this.loantypes == 'vehicleLoan')
  //   {
  //     propArea.clearValidators();
  //     propLoc.clearValidators();
  //     propVal.clearValidators();
  //     ongoingLoan.clearValidators();
  //     vehiclePrice.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);
  //     vehicleType.setValidators(Validators.required);
  //     vendorName.setValidators([Validators.required,Validators.pattern('^[a-zA-Z]+$')]);
  //     vendorAddress.setValidators(Validators.required);
  //     vehiclercNumber.setValidators([Validators.required]);  
  //   }
  //   else if(this.loantypes == 'educationLoan')
  //   {
  //     propArea.clearValidators();
  //     propLoc.clearValidators();
  //     propVal.clearValidators();
  //     ongoingLoan.clearValidators();
  //     vehiclePrice.clearValidators();
  //     vehicleType.clearValidators();
  //     vendorName.clearValidators();
  //     vendorAddress.clearValidators();
  //     vehiclercNumber.clearValidators(); 
  //     totalFee.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]);
  //     instituteName.setValidators(Validators.required);
  //     courseName.setValidators([Validators.required,Validators.pattern('^[a-zA-Z]+$')]);
  //     educationType.setValidators(Validators.required);
  //     courseDuration.setValidators([Validators.required,Validators.pattern('^(?!0)[0-9]*$')]); 

  //   }
    
  //   propArea.updateValueAndValidity();
  //   propVal.updateValueAndValidity();
  //   propLoc.updateValueAndValidity();
  //   ongoingLoan.updateValueAndValidity();
  //   vehiclePrice.updateValueAndValidity();
  //   vehicleType.updateValueAndValidity();
  //   vendorName.updateValueAndValidity();
  //   vendorAddress.updateValueAndValidity();
  //   vehiclercNumber.updateValueAndValidity();
  //   courseDuration.updateValueAndValidity();
  //   courseName.updateValueAndValidity();
  //   instituteName.updateValueAndValidity();
  //   educationType.updateValueAndValidity();
  //   totalFee.updateValueAndValidity();
  // }


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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-allloans',
  templateUrl: './allloans.component.html',
  styleUrls: ['./allloans.component.css']
})
export class AllloansComponent {

  LoanArray:any = [];
  searchArray:any = [];
  allLoanArray:any = [];
  isResultLoaded=false;
  searchform!: FormGroup;
  searchParams: any = {};
  page:number=1;
  count:number=0;
  tableSize:number=7;
  tableSizes:any=[5,10,15,20];
 


  constructor(private api:ApiService,private formBuilder: FormBuilder,private http:HttpClient,private toast:NgToastService)
  {
    
  }

  ngOnInit(){

    this.searchform = this.formBuilder.group({
      accountNum: [''],
      loanType: [''],
      loanId: [''],
      loanStatus:['']
    });
   

    this.getAllLoanReq();
  }
  getAllLoanReq() { 
      const loanObservable: Observable<any> = this.api.getAllLoans();
      loanObservable.subscribe((resultData: any) => {
        this.isResultLoaded = true;
       this.LoanArray = resultData;
          
      });
      const loanAckObservable: Observable<any> = this.api.getAllAckLoans();
      loanAckObservable.subscribe((resultData: any) => {
        this.isResultLoaded = true;
       this.allLoanArray = resultData;
          
      });

      // this.searchform.reset();
      
  }

  onSearch(){

    let params = new HttpParams({ fromObject: this.searchParams });

    var loanId = this.searchform.value["loanId"]
    var accountNum = this.searchform.value["accountNum"]
    var loanType = this.searchform.value["loanType"]
    var loanStatus = this.searchform.value["loanStatus"]
    

    if (loanId) {
      params = params.set('loanId', loanId);
    }

    if (accountNum) {
      params = params.set('accountNum', accountNum);
    }

    if (loanType) {
      params = params.set('loanType', loanType);
    }
    if (loanStatus) 
    {
      params = params.set('loanStatus',loanStatus);
    }
      
    

    this.api.getSearchResults(params).subscribe(
      data => {
            console.log(data);
            
              this.searchArray = data;
            
           
            // this.ngOnInit();
          },
          error => {
            this.searchArray = 0;
            console.log(error);
            this.toast.info({detail:"No such records found",summary:error.error.message,duration:5000});
          }
        );

    
    
   
  }

  onTableDataChange(event:any){

    this.page=event;

    this.getAllLoanReq();

  }

  onTableSizeChange(event:any):void{

    this.tableSize=event.target.value;

    this.page=1;

    this.getAllLoanReq();

  }
 
}

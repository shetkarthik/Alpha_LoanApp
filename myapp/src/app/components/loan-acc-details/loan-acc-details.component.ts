import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Component({
  selector: 'app-loan-acc-details',
  templateUrl: './loan-acc-details.component.html',
  styleUrls: ['./loan-acc-details.component.css']
})
export class LoanAccDetailsComponent implements OnInit {
  accountNum: string='';
  userDetails: any;
  loanDetails: any;
  documentList: any[]=[];
  loanId: number=0;
  availableEmi:number=0;
  

  constructor(private route: ActivatedRoute, private http: HttpClient,private router:Router) { }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accountNum = params['accountNum'];
      this.getAccountDetails();
    });
    // this.route.params.subscribe(params => {
    //   this.loanId = +params['id'];
    // });
  }

  // approveLoan() {
  //   this.updateLoanStatus('Approved');
  // }

  // rejectLoan() {
  //   this.updateLoanStatus('Rejected');
  // }

  getAccountDetails() {
    this.http.get(`https://localhost:7080/api/LoanAccDetails/${this.accountNum}`)
      .subscribe((response: any) => {
        this.userDetails = response.customerAccountInfo;
        this.loanDetails = response.loanDetails;
        this.documentList = response.documents;
      });
  }

  getFilePath(filePath: string, fileName: string): string {
    const fileArray = filePath.split(',');
    const index = fileArray.indexOf(fileName);
    return index !== -1 ? fileArray[index] : '';
  }
  // updateLoanStatus(loanStatus: string) {
  //   this.apiService.updateLoanStatus(this.loanId, loanStatus)
  //     .subscribe(() => {
        
  //     }, error => {
        
  //     });
  // }

  
  Calculate(){
    const otherEmi = this.loanDetails.otherEmi;
    const annualIncome =this.loanDetails.annualIncome;
    const monthlyIncome=this.loanDetails.monthlyIncome ;
    

    const monthemi =(monthlyIncome/2) ;
    const annualemi=(annualIncome/24);
    const avgemi=(monthemi+annualemi)/2;
    this.availableEmi=Math.round(avgemi - otherEmi);
  }
  }
 



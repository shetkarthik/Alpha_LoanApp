import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-loan-req',
  templateUrl: './loan-req.component.html',
  styleUrls: ['./loan-req.component.css']
})
export class LoanReqComponent {
  LoanArray:any[]=[];
  isResultLoaded=false;
  // currentPage = 1;
  // itemsPerPage = 15;
  // totalPages = 0;

  constructor(private http:HttpClient)
  {
    this.getAllLoanReq();
  }
 
  getAllLoanReq()
    {
      this.http.get("https://localhost:7080/api/Loan/getAllLoans")
      .subscribe((resultData:any)=>
      {
        this.isResultLoaded=true;
        console.log(resultData);
        this.LoanArray=resultData;
        // this.totalPages = Math.ceil(this.LoanArray.length / this.itemsPerPage);
      });
    }

    // getPaginatedData() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.LoanArray.slice(startIndex, endIndex);
    // }

    // onPageChange(pageNumber: number) {
    //   this.currentPage = pageNumber;
    // }

}

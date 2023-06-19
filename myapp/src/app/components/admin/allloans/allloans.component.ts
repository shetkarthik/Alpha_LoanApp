import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-allloans',
  templateUrl: './allloans.component.html',
  styleUrls: ['./allloans.component.css']
})
export class AllloansComponent {
  // LoanArray:any[]=[];
  LoanArray:any = [];
  isResultLoaded=false;
  // currentPage = 1;
  // itemsPerPage = 15;
  // totalPages = 0;

  constructor(private api:ApiService)
  {
    
  }

  ngOnInit(){
    this.getAllLoanReq();
  }
  getAllLoanReq() { 
      const loanObservable: Observable<any> = this.api.getAllLoans();
      loanObservable.subscribe((resultData: any) => {
        this.isResultLoaded = true;
       this.LoanArray = resultData;
          
          
        
      });
  }
 
}

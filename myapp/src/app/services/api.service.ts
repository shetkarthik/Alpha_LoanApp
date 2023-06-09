import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "https://localhost:7080/api/Loan/";
  private fileurl = "https://localhost:7080/api/Files";
  private checkurl = "https://localhost:7080/api/LoanEligible/checkEligible";

  constructor(private http:HttpClient) { }

  getInterestByLoanType(loanType: string): Observable<number> {
    const url = `${this.baseUrl}getInterest?loanType=${loanType}`; 
    return this.http.get<number>(url);
  }

  applyLoan(loanObj:any){
    const url = `${this.baseUrl}applyLoan`;
    return this.http.post<any>(url,loanObj);
    
  }

  checkEligible(checkObJ:any){
    return this.http.post<any>(this.checkurl,checkObJ);
  }

  uploadFile(formData:any){
    return this.http.post<any>(this.fileurl,formData);
  }
  sendFile(formData:any){
    return this.http.post<any>(`${this.fileurl}/sendFile`,formData);
  }
  
  getLoanDetails(accountnum:string){
    const url = `${this.baseUrl}getLoanByAccountNum?accountnum=${accountnum}`; 
    return this.http.get<any>(url);
  }
  
}

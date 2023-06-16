import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanDetailsService {
  private apiUrl = 'https://localhost:7080/api/Loan/'; 
  private loanaccUrl='https://localhost:7080/api/LoanDetails/';
  

constructor(private http: HttpClient) { }

getLoanStatusById(loanId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${loanId}`);
}

}

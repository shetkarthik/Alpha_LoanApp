import { Component ,OnInit } from '@angular/core';
// import { LoanDetailsService } from 'src/app/services/loan-details.service';
// import { ActivatedRoute } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent implements OnInit {
  loanId: number=0;
  loanDetailsObj: any;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loanId = params['id'];
      this.getLoanDetails();
    });
  }
  
  getLoanDetails() {
    this.http.get(`https://localhost:7080/api/LoanDetails/${this.loanId}`).subscribe((response: any) => {
      this.loanDetailsObj = response;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  
  }



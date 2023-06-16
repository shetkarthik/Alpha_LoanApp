import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

// import { LoanDetailsService } from 'src/app/services/loan-details.service';


@Component({
  selector: 'app-loan-acc-info',
  templateUrl: './loan-acc-info.component.html',
  styleUrls: ['./loan-acc-info.component.css']
}) 
export class LoanAccInfoComponent implements OnInit {
  loanId: number=0;
  id:number=0;
  loanDetailsObj: any;
  commentForm!: FormGroup;
  fName:[]=[];
  fpath:[]=[];

 

  // isCommentSubmitted: boolean = false;
 
 
  constructor(private route: ActivatedRoute, private http: HttpClient,private fb:FormBuilder,private toast:NgToastService,private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loanId = params['id'];
      this.getLoanDetails();
    });
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });

  }

  getLoanDetails() {
    this.http.get(`https://localhost:7080/api/LoanDetails/${this.loanId}`).subscribe((response: any) => {
    
        this.loanDetailsObj = response;
        this.id=this.loanDetailsObj.document.id;
        this.fName=this.loanDetailsObj.document.fileName;
        this.fpath=this.loanDetailsObj.document.filePath;


        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  

  updateLoanStatus(status: string) {
    if (this.commentForm.valid) {
      const payload = {
        Id: this.loanDetailsObj.loanDetails.loanId,
        status: status,
         comment: this.commentForm.get('comment')?.value,
        
      };
    
  // const payload = { Id:this.loanDetailsObj.loanDetails.loanId,status: status};

    this.http.put(` https://localhost:7080/api/Loan/status`,payload).subscribe(
     
      response => {
        this.toast.success({detail:"Loan status updated successfully"});
        console.log('Loan status updated successfully.');
       
        this.loanDetailsObj.loanDetails.loanStatus = status;
        this.loanDetailsObj.loanDetails.comment = this.commentForm.get('comment')?.value;

        this.router.navigate(['/loanReq']);
      },
      error => {
        this.toast.success({detail:"Failed to update loan status"});
        console.log('Failed to update loan status.');
        console.log(error);
      }
    );
  }

  else {
    console.log('Please enter comment.');
    this.toast.success({detail:"Please enter  comment"});
    
  }
  
  }

  
}

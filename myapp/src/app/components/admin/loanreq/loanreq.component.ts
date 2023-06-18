import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-loanreq',
  templateUrl: './loanreq.component.html',
  styleUrls: ['./loanreq.component.css']
})
export class LoanreqComponent {
  loanId: number = 0;
  id: number = 0;
  loanDetailsObj: any;
  commentForm!: FormGroup;
  fName: [] = [];
  fpath: [] = [];



  // isCommentSubmitted: boolean = false;


  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService, private router: Router, private api: ApiService) { }
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
    // this.http.get(`https://localhost:7080/api/LoanDetails/${this.loanId}`).subscribe((response: any) => {
    this.api.getLoanDetailsById(this.loanId).subscribe((response: any) => {
      this.loanDetailsObj = response;
      this.id = this.loanDetailsObj.document.id;
      this.fName = this.loanDetailsObj.document.fileName;
      this.fpath = this.loanDetailsObj.document.filePath;
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

      this.api.updateLoanStatus(payload).subscribe(
        // this.http.put(` https://localhost:7080/api/Loan/status`,payload).subscribe(

        (response) => {
          this.toast.success({ detail: "Loan status updated successfully" });
          console.log('Loan status updated successfully.');

          this.loanDetailsObj.loanDetails.loanStatus = status;
          this.loanDetailsObj.loanDetails.comment = this.commentForm.get('comment')?.value;

          this.router.navigate(['/loanReq']);
        },
        error => {
          this.toast.success({ detail: "Failed to update loan status" });
          console.log('Failed to update loan status.');
          console.log(error);
        }
      );
    }

    else {
      console.log('Please enter comment.');
      this.toast.success({ detail: "Please enter  comment" });

    }

  }
}

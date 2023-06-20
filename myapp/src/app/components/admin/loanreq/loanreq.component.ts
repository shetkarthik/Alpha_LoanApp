import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Chart,registerables} from 'chart.js';

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
  fName: any = [];
  fpath: any = [];
  modalElement: HTMLElement | null = null;
  availableEmi:number=0;
  loanEmi:number=0;
  totalAmount:number=0;
  tenure:any;
  interest:any;
  totalAvailableAmount:any;
  selectedFile: string = '';

  myChart!: Chart;

  ngAfterViewInit() {
    this.createChart();
  }




  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService, private router: Router, private api: ApiService,private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loanId = params['id'];
      this.getLoanDetails();
    });
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });

  }

  

  createChart() {
    Chart.register(...registerables); // Register all modules

    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas context is null');
      return;
    }

    const chartData = {
      labels: ['Loan-EMI', 'Available-EMI','Total Loan Amount'],
      datasets: [{
        label: 'EMIs',
        data: [this.loanEmi,this.availableEmi,this.totalAmount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          
        ],
        borderWidth: 1
      }]
    };

    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true
          }
        }
      }
    });
  }

  getLoanDetails() {
    this.api.getLoanDetailsById(this.loanId).subscribe((response: any) => {
      this.loanDetailsObj = response;
      this.id = this.loanDetailsObj.document.id;
      this.fName=this.loanDetailsObj.document.fileName.split(',');

      this.fpath=this.loanDetailsObj.document.filePath.split(',');

      const otherEmi = this.loanDetailsObj.loanDetails.otherEmi;
      this.loanEmi = this.loanDetailsObj.loanDetails.loanEmi;
      this.totalAmount = this.loanDetailsObj.loanDetails.loanAmount;
      this.tenure = this.loanDetailsObj.loanDetails.tenure;
      this.interest = this.loanDetailsObj.loanDetails.interest;


      const annualIncome =this.loanDetailsObj.loanDetails.annualIncome;
      const monthlyIncome=this.loanDetailsObj.loanDetails.monthlyIncome ;
      const monthemi =(monthlyIncome/2) ;
      const annualemi=(annualIncome/24);
      const avgemi=(monthemi+annualemi)/2;
      this.availableEmi=Math.round(avgemi - otherEmi);


      const monthlyInterestRate = (this.interest / 12) / 100;
      this.totalAvailableAmount = (this.availableEmi / monthlyInterestRate) * (Math.pow(1 + monthlyInterestRate, this.tenure) - 1);

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

      this.api.updateLoanStatus(payload).subscribe(
        (response) => {
          this.toast.success({ detail: "Loan status updated successfully" });
          console.log('Loan status updated successfully.');

          this.loanDetailsObj.loanDetails.loanStatus = status;
          this.loanDetailsObj.loanDetails.comment = this.commentForm.get('comment')?.value;

          this.router.navigate(['allLoans']);
        },
        error => {
          this.toast.error({ detail: "Failed to update loan status" });
          console.log('Failed to update loan status.');
          console.log(error);
        }
      );
    }

    else {
      
      this.toast.info({ detail: "Please provide feedback"});

    }

  }
  openModal(file: string) {
    this.selectedFile = file;
    this.modalElement = document.getElementById('fileModal');
    if (this.modalElement) {
      this.modalElement.style.display = 'block';
      this.modalElement.classList.add('centered-modal');
    }
  }
  
  closeModal() {
    if (this.modalElement) {
      this.modalElement.style.display = 'none';
    }
  }
  
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

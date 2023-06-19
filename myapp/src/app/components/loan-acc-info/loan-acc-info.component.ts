import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  selectedFile: string = '';
  modalElement: HTMLElement | null = null;
  availableEmi:number=0;

 
 
 
  constructor(private route: ActivatedRoute, private http: HttpClient,private fb:FormBuilder,private toast:NgToastService,private router: Router,private sanitizer: DomSanitizer) { }
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
        this.fName=this.loanDetailsObj.document.fileName.split(',');
        this.fpath=this.loanDetailsObj.document.filePath.split(',');
        const otherEmi = this.loanDetailsObj.loanDetails.otherEmi;
  const annualIncome =this.loanDetailsObj.loanDetails.annualIncome;
  const monthlyIncome=this.loanDetailsObj.loanDetails.monthlyIncome ;
  

  const monthemi =(monthlyIncome/2) ;
  const annualemi=(annualIncome/24);
  const avgemi=(monthemi+annualemi)/2;
  this.availableEmi=Math.round(avgemi - otherEmi);


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

  // openFile(filePath: string) {
  //   const fileViewer = document.getElementById('fileViewer') as HTMLIFrameElement;
  //   fileViewer.src = filePath;
  //   fileViewer.style.display = 'block';
  // }

  // 
  
  // openModal(file: string) {
  //   this.selectedFile = file;
  //   this.modalElement = document.getElementById('fileModal');
  //   if (this.modalElement) {
  //     this.modalElement.style.display = 'block';
  //   }
  // }
  
  // closeModal() {
  //   if (this.modalElement) {
  //     this.modalElement.style.display = 'none';
  //   }
  // }
  

  
openModal(file: string) {
  this.selectedFile = file;
  this.modalElement = document.getElementById('fileModal');
  if (this.modalElement) {
    this.modalElement.style.display = 'block';
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

// Calculate(){
//   const otherEmi = this.loanDetailsObj.loanDetails.otherEmi;
//   const annualIncome =this.loanDetailsObj.loanDetails.annualIncome;
//   const monthlyIncome=this.loanDetailsObj.loanDetails.monthlyIncome ;
  

//   const monthemi =(monthlyIncome/2) ;
//   const annualemi=(annualIncome/24);
//   const avgemi=(monthemi+annualemi)/2;
//   this.availableEmi=Math.round(avgemi - otherEmi);
// }
  
}

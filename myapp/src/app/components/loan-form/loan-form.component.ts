import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserstoreService } from 'src/app/services/userstore.service';
import jsPDF from 'jspdf';


import { HTMLOptions } from 'jspdf';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})

export class LoanFormComponent {
  @ViewChild('htmlData', { static: false }) htmlData!: ElementRef;
  type: any;
  emptype: any;
  accountnumber: any;
  role: any;
  users: any = [];
  loans: any = [];

  constructor(private auth: AuthService, private userStore: UserstoreService, private api: ApiService) {

  }
  ngOnInit() {
    this.userStore.getAccountFromStore().subscribe(val => {
      let accountFromToken = this.auth.getAccountNumFromToken();
      this.accountnumber = val || accountFromToken;
    })

    this.auth.getUserDetails(this.accountnumber).subscribe(res => {
      this.users = res;
      // this.cust_name = this.users["userName"]
      this.emptype = this.users["empType"];

      console.log(this.users);
    });
    this.api.getLoanDetails(this.accountnumber).subscribe(res => {
      this.loans = res;
      console.log(this.loans);
      this.type = this.loans["loanType"];
    }
      , (err) => {
        console.log(err);
      })
      
  }

  downloadPdf() {
    const pdf = new jsPDF();
    const options: HTMLOptions = {
      html2canvas: { scale: 0.185 },
      // margin: [10, 10, 10, 10], 
      filename: `${this.accountnumber}loanApplication.pdf`,
      image: { type: 'jpeg', quality: 0.98 },


    };
    const content = this.htmlData.nativeElement;
    pdf.html(content, options).save(`${this.accountnumber}loanApplication.pdf`).then(() => {
      const pdfBlob = pdf.output('blob');
      const formData = new FormData();
      formData.append('file', pdfBlob, options.filename);
      this.api.sendFile(formData).subscribe(res=>{
        console.log(res);
      },err=>{
        console.log(err);
      })
    });
  }


}




import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public users: any = [];
  public role!:string;
  public accountnumber!:string;
  public cust_name! : string;
  public fullName: string = "";

  constructor(private auth: AuthService, private api: ApiService, private userStore: UserstoreService) { }


  ngOnInit() {
   
    this.userStore.getCustomerIdFromStore()
      .subscribe(val => {
        let fullNamefromToken = this.auth.getCustomerIdFromToken();
        this.fullName = val || fullNamefromToken;
      });

    this.userStore.getRoleFromStore().subscribe(val => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
    this.userStore.getAccountFromStore().subscribe(val => {
      let accountFromToken = this.auth.getAccountNumFromToken();
      this.accountnumber = val || accountFromToken;
    })

    this.auth.getUserDetails(this.accountnumber).subscribe(res => {
      this.users = res;
      this.cust_name = this.users["userName"]
      console.log(this.users);
    });


    // this.ngOnInit();
  }

  signOut() {
    this.auth.signOut();
  }

}

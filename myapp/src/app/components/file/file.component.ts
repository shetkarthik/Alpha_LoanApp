import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserstoreService } from 'src/app/services/userstore.service';
import { SharedService } from 'src/app/services/shared.service';
 


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  selectedFiles!: File[];
  imageUrl!: string;
  files: File[] = [];
  accountNum!:string;

 
 

  constructor(private api:ApiService, private userStore:UserstoreService,
    private auth:AuthService,private shared:SharedService,private formBuilder:FormBuilder) { }

    ngOnInit() {

      this.userStore.getAccountFromStore().subscribe(val => {
        let accountFromToken = this.auth.getAccountNumFromToken();
        this.accountNum = val || accountFromToken;
      })
     
    }

   


  onFileSelected(event:any): void {
    this.files = event.target.files;
  }

  onUpload(){
    
    const formData = new FormData();
   
    for (const file of this.files) {
      formData.append('accountNumber',this.accountNum);
      formData.append('files', file);
    }
    
    console.log('FormData',formData);

    formData.forEach((value, key) => {
      console.log(key + ':', value);
    });

    this.api.uploadFile(formData).subscribe(
      (response) => {
        console.log('Files uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading files:', error);
      }
    );
  }
}

    


  
  








  







      // userForm: FormGroup;
  // files: File[] = [];

  // constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  //   this.userForm = this.formBuilder.group({
    
  //     firstname: [''],
  //     email: ['']
  //   });
  // }



  // onSubmit(): void {
   
  
  //     const formData = new FormData()

  //     for (const file of this.files) {
  //       formData.append('filesData', file);
  //     }
  //     console.log(formData);

      
  //     const CombinedData = {
  //       "userData": {
          
  //         "firstname": this.userForm.value["firstname"],
  //         "email": this.userForm.value["email"]
  //       },
  //       "filesData": [
  //         formData
  //       ]
  //     }


      

  //     this.http.post<any>('https://localhost:7125/api/Files/combined', CombinedData).subscribe(
  //       () => {
  //         console.log('Combined action completed successfully');
  //         // Reset the form and file input
  //         this.userForm.reset();
  //         this.files = [];
  //       },
  //       (error) => {
  //         console.log( error);
  //       }
  //     )

    
  //  }
  //    onFileChange(files :File): void 
  // {
  //   // this.files = event.target.files;
  //   for (let i = 0; i < this.files.length; i++) {
  //     this.files.push(this.files[i]);
  // }
  
  
  //     }
  // 
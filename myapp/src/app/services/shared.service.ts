import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private formData = new BehaviorSubject<any>(null);
  formData$ = this.formData.asObservable();

  updateFormData(data: any) {
    if(data)
     this.formData.next(data);
  }
}

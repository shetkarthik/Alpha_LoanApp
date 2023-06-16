import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccDetailsComponent } from './loan-acc-details.component';

describe('LoanAccDetailsComponent', () => {
  let component: LoanAccDetailsComponent;
  let fixture: ComponentFixture<LoanAccDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAccDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAccDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccInfoComponent } from './loan-acc-info.component';

describe('LoanAccInfoComponent', () => {
  let component: LoanAccInfoComponent;
  let fixture: ComponentFixture<LoanAccInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanAccInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAccInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

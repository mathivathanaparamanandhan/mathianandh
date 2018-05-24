import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilitydetailsComponent } from './availabilitydetails.component';

describe('AvailabilitydetailsComponent', () => {
  let component: AvailabilitydetailsComponent;
  let fixture: ComponentFixture<AvailabilitydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilitydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilitydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

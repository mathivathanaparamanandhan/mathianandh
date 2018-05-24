import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityViewdetailComponent } from './availability-viewdetail.component';

describe('AvailabilityViewdetailComponent', () => {
  let component: AvailabilityViewdetailComponent;
  let fixture: ComponentFixture<AvailabilityViewdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityViewdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityViewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

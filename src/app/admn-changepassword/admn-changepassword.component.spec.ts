import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnChangepasswordComponent } from './admn-changepassword.component';

describe('AdmnChangepasswordComponent', () => {
  let component: AdmnChangepasswordComponent;
  let fixture: ComponentFixture<AdmnChangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmnChangepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmnChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

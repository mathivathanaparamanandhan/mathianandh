import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserprofileComponent } from './adminuserprofile.component';

describe('AdminuserprofileComponent', () => {
  let component: AdminuserprofileComponent;
  let fixture: ComponentFixture<AdminuserprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminuserprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

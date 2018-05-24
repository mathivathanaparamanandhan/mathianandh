import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortaluserprofileComponent } from './portaluserprofile.component';

describe('PortaluserprofileComponent', () => {
  let component: PortaluserprofileComponent;
  let fixture: ComponentFixture<PortaluserprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortaluserprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortaluserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

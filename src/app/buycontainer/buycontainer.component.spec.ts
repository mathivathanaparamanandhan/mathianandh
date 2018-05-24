import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuycontainerComponent } from './buycontainer.component';

describe('BuycontainerComponent', () => {
  let component: BuycontainerComponent;
  let fixture: ComponentFixture<BuycontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuycontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuycontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

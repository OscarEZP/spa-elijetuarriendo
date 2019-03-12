import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOwnerInformationComponent } from './complete-owner-information.component';

describe('CompleteOwnerInformationComponent', () => {
  let component: CompleteOwnerInformationComponent;
  let fixture: ComponentFixture<CompleteOwnerInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteOwnerInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteOwnerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

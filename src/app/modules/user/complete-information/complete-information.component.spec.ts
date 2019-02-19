import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInformationComponent } from './complete-information.component';

describe('CompleteInformationComponent', () => {
  let component: CompleteInformationComponent;
  let fixture: ComponentFixture<CompleteInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

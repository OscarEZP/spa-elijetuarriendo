import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesseComponent } from './lesse.component';

describe('LesseComponent', () => {
  let component: LesseComponent;
  let fixture: ComponentFixture<LesseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

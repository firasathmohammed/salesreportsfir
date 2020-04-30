import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllhireComponent } from './allhire.component';

describe('AllhireComponent', () => {
  let component: AllhireComponent;
  let fixture: ComponentFixture<AllhireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllhireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllhireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

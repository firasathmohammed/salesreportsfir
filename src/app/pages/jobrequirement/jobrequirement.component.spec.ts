import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobrequirementComponent } from './jobrequirement.component';

describe('JobrequirementComponent', () => {
  let component: JobrequirementComponent;
  let fixture: ComponentFixture<JobrequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobrequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayFormComponent } from './today-form.component';

describe('TodayFormComponent', () => {
  let component: TodayFormComponent;
  let fixture: ComponentFixture<TodayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

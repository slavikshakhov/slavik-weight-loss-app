import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySummeryComponent } from './today-summery.component';

describe('TodaySummeryComponent', () => {
  let component: TodaySummeryComponent;
  let fixture: ComponentFixture<TodaySummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaySummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaySummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

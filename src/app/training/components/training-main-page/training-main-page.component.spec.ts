import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMainPageComponent } from './training-main-page.component';

describe('TrainingMainPageComponent', () => {
  let component: TrainingMainPageComponent;
  let fixture: ComponentFixture<TrainingMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

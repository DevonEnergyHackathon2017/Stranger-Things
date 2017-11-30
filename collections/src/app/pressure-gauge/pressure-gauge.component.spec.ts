import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureGaugeComponent } from './pressure-gauge.component';

describe('PressureGaugeComponent', () => {
  let component: PressureGaugeComponent;
  let fixture: ComponentFixture<PressureGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressureGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressureGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

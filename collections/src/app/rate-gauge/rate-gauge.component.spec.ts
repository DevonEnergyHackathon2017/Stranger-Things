import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateGaugeComponent } from './rate-gauge.component';

describe('RateGaugeComponent', () => {
  let component: RateGaugeComponent;
  let fixture: ComponentFixture<RateGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, ViewChild } from '@angular/core';
import { BracketSet, BracketPoint } from '../models/bracket.model';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  data: BracketSet;
  options: Object;
  chart: any;

  gaugeType = 'semi';
  gaugeLabel = 'Pressure';
  gaugeAppendText = 'K psi';
  guageSize = 140;
  thresholdConfig: any = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
  };

  @ViewChild('wrapper')
  wrapper;

  constructor() {
    this.data = new BracketSet();
    this.data.Next = new BracketPoint();
    this.data.Previous = new BracketPoint();
  }

  redraw(data) {
    this.data = data;
    const min = this.data.Previous.Value;
    const max = this.data.Next.Value;

    this.thresholdConfig = {};
    const half = (min + max) / 2;
    this.thresholdConfig[min + (min * .075)] = { color: 'green' };
    this.thresholdConfig[half] = { color: 'orange' };
    this.thresholdConfig[max - (max * .075)] = { color: 'red' };
  }

  saveInstance(instance) {
    this.chart = instance;
  }

  ngOnInit() {
  }
}

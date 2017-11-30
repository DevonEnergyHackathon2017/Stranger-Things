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
    this.data.Current = this.randomIntFromInterval(0, 80);
    const min = this.data.Previous.Value = this.randomIntFromInterval(0, 40);
    const max = this.data.Next.Value = this.randomIntFromInterval(40, 80);

    this.thresholdConfig = {};
    const half = (min + max / 2);
    this.thresholdConfig[min] = { color: 'green' };
    this.thresholdConfig[half] = { color: 'orange' };
    this.thresholdConfig[max] = { color: 'red' };
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  saveInstance(instance) {
    this.chart = instance;
  }

  ngOnInit() {
  }
}

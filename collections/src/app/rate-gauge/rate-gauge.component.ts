import { Component, OnInit, ViewChild } from '@angular/core';
import { BracketSet, BracketPoint } from '../models/bracket.model';

@Component({
  selector: 'app-rate-gauge',
  templateUrl: './rate-gauge.component.html',
  styleUrls: ['./rate-gauge.component.scss']
})
export class RateGaugeComponent implements OnInit {
  data: BracketSet;
  options: Object;
  chart: any;

  gaugeType = 'semi';
  gaugeLabel = 'Rate';
  gaugeAppendText = '';
  guageSize = 140;
  thresholdConfig = {
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
    this.data.Current = this.randomIntFromInterval(60, 80);
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

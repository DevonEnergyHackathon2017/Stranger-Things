import { Component, OnInit } from '@angular/core';
import { BracketSet } from '../models/bracket.model';

@Component({
  selector: 'app-rate-gauge',
  templateUrl: './rate-gauge.component.html',
  styleUrls: ['./rate-gauge.component.scss']
})
export class RateGaugeComponent implements OnInit {
  data: BracketSet;
  options: Object;

  constructor() {

  }

  redraw(data) {
    this.data = data;
    this.options = {
      chart: {
        type: 'solidgauge'
      },
      series: [{
        name: 'Data',
        data: [this.data.Current],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span>'
        },
        tooltip: {
          valueSuffix: ' km/h'
        }
      }],
      title: null,
      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      tooltip: {
        enabled: false
      },
      // the value axis
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70
        },
        labels: {
          y: 16
        },
        min: this.data.Previous.Value,
        max: this.data.Next.Value
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      }
    };
  }

  ngOnInit() {}
}

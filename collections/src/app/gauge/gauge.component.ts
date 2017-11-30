import { Component, OnInit, ViewChild } from '@angular/core';
import { BracketSet } from '../models/bracket.model';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  data: BracketSet;
  options: Object;
  chart: any;
  @ViewChild('wrapper')
  wrapper;

  constructor() {

  }

  redraw(data) {
    this.data = data;
    if (this.chart) {
      this.chart.series[0].setData([this.randomIntFromInterval(this.data.Previous.Value, this.data.Next.Value)], false);
      this.chart.yAxis[0].setExtremes(this.data.Previous.Value, this.data.Next.Value);
      this.chart.redraw();
      const width = (this.wrapper.nativeElement.clientWidth * .9);
      this.chart.setSize(width,  (9 * width) / 16);
      this.chart.reflow();
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  saveInstance(instance) {
    this.chart = instance;
  }

  ngOnInit() {
    console.log(this.wrapper.nativeElement.clientWidth);
    this.options = {
      chart: {
        type: 'solidgauge',
        margin: [30, 0, 0, 0]
      },
      series: [{
        name: 'Data',
        data: [],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:1.7em;color:black;">{y}</span>'
        },
        tooltip: {
          valueSuffix: ''
        }
      }],
      title: {
        text: 'Pressure'
      },
      pane: {
        size: '100%',
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
          y: -50
        },
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      exporting: {
        buttons: {
            contextButton: {
                enabled: false
            }
        }
      }
    };
  }
}

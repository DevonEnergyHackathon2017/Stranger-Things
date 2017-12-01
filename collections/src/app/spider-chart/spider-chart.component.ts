import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrls: ['./spider-chart.component.scss']
})
export class SpiderChartComponent implements OnInit {
  options: Object;
  chart: any;

  constructor() { }

  ngOnInit() {
    this.options = {
      chart: {
        polar: true,
        type: 'area',
        width: 350,
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        // y: 100,
        layout: 'horizontal'
      },
      xAxis: {
        categories: [
          'Pressure',
          'Rate',
          'Sand',
          'FR'],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        lineWidth: 0,
        min: 0,
        max: 6000,
        angle: 45
      },
      series: [],
      exporting: {
        buttons: {
          contextButton: {
            enabled: false
          }
        }
      }
    };
  }

  saveInstance(instance) {
    this.chart = instance;
  }

  getName(key): string {
    switch (key) {
      case 0:
        return 'Current';
      case 1:
        return '-5 sec';
      case 2:
        return '-10 sec';
      case 3:
        return '-15 sec';
      case 4:
        return '-20 sec';
      case 5:
        return '-25 sec';
    }
  }

  calculateColor(current, design, index) {
    const status = design - current;
    let color = '';
    if (status < 0) {
      color = '#ff0000';
    } else {
      color = '#00ff00';
    }
    return color;
  }

  redraw(instant, design) {
    const series = [];
    Object.keys(instant).forEach(key => {
      const index = parseInt(key, null);
      const dataPoint = instant[key];
      series.push({
        data: [
          dataPoint.TP,
          dataPoint.SR,
          dataPoint.Sand,
          dataPoint.FR
        ],
        color: this.calculateColor(dataPoint.Cost, design.Cost, index),
        fillOpacity: key === '0' ? 100 : 0,
        name: this.getName(index)
      });
    });
    series.push({
      data: [
        design.TP,
        design.SR,
        design.Sand,
        design.FR
      ],
      color: '#000000',
      fillOpacity: 0,
      name: 'Design'
    });

    series.forEach((s, i) => {
      s['animation'] = false;
    });
    if (this.chart) {
      if (this.chart.series.length !== series.length) {
        series.forEach((serie, i) => {
          this.chart.addSeries(serie, false);
        });
      } else {
        this.chart.series.forEach((serie, i) => {
          serie.setData(series[i].data, true);
          serie.options.color = series[i].color;
          serie.options.opacity = series[i].opacity,
          serie.options.fillOpacity = series[i].fillOpacity;
          serie.update(serie.options);
        });
      }
      this.chart.redraw();
      this.chart.reflow();
    }
  }
}

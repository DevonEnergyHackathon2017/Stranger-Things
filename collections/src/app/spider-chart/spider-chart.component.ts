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
          'TP',
          'SR',
          'Sand',
          'FR'],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        // gridLineInterpolation: 'polygon',
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

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  saveInstance(instance) {
    this.chart = instance;
  }

  getName(key): string {
    switch (key) {
      case 0:
        return 'Current';
      case 1:
        return '5 seconds Ago';
      case 2:
        return '10 seconds Ago';
      case 3:
        return '15 seconds Ago';
      case 4:
        return '20 seconds Ago';
      case 5:
        return '25 seconds Ago';
    }
  }

  redraw(dataSet) {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const series = [];
    Object.keys(dataSet).forEach(key => {
      const index = parseInt(key, null);
      series.push({
        data: [
          dataSet[key].TP,
          dataSet[key].SR,
          dataSet[key].Sand,
          dataSet[key].FR
        ],
        color: colors[this.randomIntFromInterval(0, 5)],
        fillOpacity: .90 - (.15 * index),
        name: this.getName(index)
      });
    });

    series.forEach((s, i) => {
      s['animation'] = false;
    });
    if (this.chart) {
      // this.chart.title = dataSet.Well.Name;
      if (this.chart.series.length !== series.length) {
        series.forEach((serie, i) => {
          this.chart.addSeries(serie, false);
        });
      } else {
        this.chart.series.forEach((serie, i) => {
          serie.setData(series[i].data, true);
          serie.options.color = series[i].color;
          serie.options.fillOpacity = series[i].fillOpacity;
          serie.update(serie.options);
        });
      }
      this.chart.redraw();
      this.chart.reflow();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SnapshotInstance } from '../models/snapshot.model';

@Component({
  selector: 'app-spider-chart',
  templateUrl: './spider-chart.component.html',
  styleUrls: ['./spider-chart.component.scss']
})
export class SpiderChartComponent implements OnInit {
  options: Object;
  chart: any;
  greenGradient: any;
  redGradient: any;

  constructor() {
    this.greenGradient = {
      0: '#008000',
      1: '#7FFF7F',
      2: '#94FF94',
      3: '#BFFFBF',
      4: '#D4FFD4',
      5: '#E9FFE9',
      6: '#FFFFFF'
    };

    this.redGradient = {
      0: '#800000',
      1: '#FF7F7F',
      2: '#FF9494',
      3: '#FFBFBF',
      4: '#FFD4D4',
      5: '#FFE9E9',
      6: '#FFFFFF'
    };
  }

  ngOnInit() {
    this.options = {
      chart: {
        polar: true,
        type: 'area',
        width: 350,
        height: 350
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        // y: 100,
        layout: 'horizontal'
      },
      title: {
        text: 'Efficiency Target',
        y: 20
      },
      xAxis: {
        categories: [
          'Pressure',
          'Rate',
          'Sand Conc',
          'FR'],
        tickmarkPlacement: 'on',
        lineWidth: 0
      },
      yAxis: {
        lineWidth: 0,
        min: 0,
        max: 1,
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
      color = this.redGradient[index];
    } else {
      color = this.greenGradient[index];
    }
    return color;
  }

  normalize(instance) {
    const data: any = {};
    data.TP = instance.TP / 10000;
    data.SR = 1 - ( (instance.SR - 20) / 80 );
    data.Sand = 1 - ( ( instance.Sand ) / 5 );
    data.FR = instance.FR / 3;
    return data;
  }

  redraw(instant, design) {
    const series = [];
    Object.keys(instant).forEach(key => {
      const index = parseInt(key, null);
      const dataPoint = this.normalize(instant[key]);
      series.push({
        data: [
          dataPoint.TP,
          dataPoint.SR,
          dataPoint.Sand,
          dataPoint.FR
        ],
        color: this.calculateColor(instant[key].Cost, design.Cost, index),
        opacity: 1 - (.15 * index),
        fillOpacity: key === '0' ? 100 : 0,
        name: this.getName(index)
      });
    });
    const normalizedDesign = this.normalize(design);
    series.push({
      data: [
        normalizedDesign.TP,
        normalizedDesign.SR,
        normalizedDesign.Sand,
        normalizedDesign.FR
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

import { Component } from '@angular/core';
import { StreamSocket } from './ngWebSocket/stream-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  options: Object;
  score: String;
  chart: any;
  bar1: Object;
  bar2: Object;

  constructor(private streamService: StreamSocket) {
    this.bar1 = {
      chart: {
        type: 'column'
    },
    title: {
        text: 'World\'s largest cities per 2014'
    },
    subtitle: {
        text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['Shanghai', 23.7]
          ]}]
    };
    this.bar2 = {
      chart: {
        type: 'column'
    },
    title: {
      text: ''
    },
    xAxis: {
        type: 'category',
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: {
            enabled: false
        },
        minorTickLength: 0,
        tickLength: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        labels: {
            enabled: false
        },
        minorTickLength: 0,
        tickLength: 0,
        gridLineColor: 'transparent'
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
    },
    series: [{
        name: 'Population',
        data: [
            ['Shanghai', 69.7]
          ]}]
    };
    // this.options = {
    //   chart: {
    //     polar: true,
    //     type: 'line'
    //   },
    //   title: {
    //     text: 'Budget vs spending',
    //     x: -80
    //   },
    //   pane: {
    //     size: '80%'
    //   },
    //   yAxis: {
    //     gridLineInterpolation: 'polygon',
    //     lineWidth: 0,
    //     min: 0
    //   },
    //   tooltip: {
    //     shared: true,
    //     pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
    //   },
    //   legend: {
    //     align: 'right',
    //     verticalAlign: 'top',
    //     y: 70,
    //     layout: 'vertical'
    //   },
    //   xAxis: {
    //     categories: ['Treating Pressure', 'Slurry Rate', 'Surface Sand', 'FR'],
    //     tickmarkPlacement: 'on',
    //     lineWidth: 0,
    //     min: 0
    //   },
    //   series: [{
    //     name: 'Current',
    //     data: [this.randomIntFromInterval(4000, 6000),
    //     this.randomIntFromInterval(1000, 3200),
    //     this.randomIntFromInterval(3000, 10000),
    //     this.randomIntFromInterval(2000, 6000),
    //     ],
    //     pointPlacement: 'on'
    //   }, {
    //     name: 'Plan',
    //     data: [6000, 2400, 5000, 4500],
    //     pointPlacement: 'on'
    //   }]
    // };
    this.addData();

    this.streamService.messages.subscribe(data => {
      this.addData();
      // this.options = {
      //   chart: {
      //     polar: true,
      //     type: 'line'
      //   },
      //   title: {
      //     text: 'Budget vs spending',
      //     x: -80
      //   },
      //   pane: {
      //     size: '80%'
      //   },
      //   yAxis: {
      //     gridLineInterpolation: 'polygon',
      //     lineWidth: 0,
      //     min: 0
      //   },
      //   tooltip: {
      //     shared: true,
      //     pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
      //   },
      //   legend: {
      //     align: 'right',
      //     verticalAlign: 'top',
      //     y: 70,
      //     layout: 'vertical'
      //   },
      //   xAxis: {
      //     categories: ['Treating Pressure', 'Slurry Rate', 'Surface Sand', 'FR'],
      //     tickmarkPlacement: 'on',
      //     lineWidth: 0,
      //     min: 0
      //   },
      //   series: [{
      //     name: 'Current',
      //     animation: false,
      //     data: [this.randomIntFromInterval(4000, 6000),
      //     this.randomIntFromInterval(1000, 3200),
      //     this.randomIntFromInterval(3000, 10000),
      //     this.randomIntFromInterval(2000, 6000),
      //     ],
      //     pointPlacement: 'on'
      //   }, {
      //     name: 'Plan',
      //     animation: false,
      //     data: [6000, 2400, 5000, 4500],
      //     pointPlacement: 'on'
      //   }]
      // };
    });
  }

  OnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.

  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  OnDestroy() {
    this.streamService.messages.unsubscribe();
  }

  addData() {
    const series = [{
      yAxis: 0,
      data: [
        this.randomIntFromInterval(0, 10),
        this.randomIntFromInterval(5, 10),
        this.randomIntFromInterval(15, 30)
      ]
    }, {
      yAxis: 1,
      data: [
        this.randomIntFromInterval(0, 10000),
        this.randomIntFromInterval(5000, 10000),
        this.randomIntFromInterval(150, 3000)
      ]
    }, {
      yAxis: 2,
      data: [
        this.randomIntFromInterval(0, 10000),
        this.randomIntFromInterval(5000, 10000),
        this.randomIntFromInterval(150, 3000)
      ]
    }, {
      yAxis: 3,
      data: [
        this.randomIntFromInterval(0, 10000),
        this.randomIntFromInterval(5000, 10000),
        this.randomIntFromInterval(150, 3000)
      ]
    }, {
      yAxis: 4,
      data: [
        this.randomIntFromInterval(0, 10000),
        this.randomIntFromInterval(5000, 10000),
        this.randomIntFromInterval(150, 3000)
      ]
    }],
      yAxis = [],
      panes = [],
      colors = ['red', 'blue', 'aqua', 'purple', 'orange', 'aquamarine'];
    let startAngle = 0;
    this.score = colors[this.randomIntFromInterval(0, 5)];

    series.forEach((s, i) => {
      s['animation'] = false;
      yAxis.push({
        pane: i,
        showLastLabel: true,
        gridLineWidth: i === 0 ? true : false,
        labels: {
          useHTML: true,
          formatter: function () {
            return '<span style="color:' + colors[i] + '">' + this.value + '</span>';
          }
        }
      });
      panes.push({
        startAngle: startAngle
      });
      startAngle += 72;
    });

    this.options = {
      chart: {
        polar: true,
        type: 'line'
      },

      title: {
        text: 'Crappy Data Points'
      },

      subtitle: {
        text: 'Source: PI'
      },

      pane: panes,

      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical'
      },

      xAxis: {
        tickmarkPlacement: 'on'
      },

      yAxis: yAxis,

      series: series
    };
  }
}

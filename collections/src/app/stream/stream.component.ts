import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { StreamSocket } from '../ngWebSocket/stream-socket.service';
import { Dashboard } from '../models/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { observeOn } from 'rxjs/operator/observeOn';
import { Subscribable } from 'rxjs/Observable';
import { SpiderChartComponent } from '../spider-chart/spider-chart.component';
import { GaugeComponent } from '../gauge/gauge.component';
import { RateGaugeComponent } from '../rate-gauge/rate-gauge.component';

import { Adal4Service, Adal4HTTPService } from 'adal-angular4';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit, OnDestroy {
  @ViewChild(GaugeComponent)
  pressureGuage: GaugeComponent;

  @ViewChild(RateGaugeComponent)
  rateGuage: RateGaugeComponent;

  @ViewChild(SpiderChartComponent)
  spiderChart: SpiderChartComponent;

  title = 'app';
  options: Object;
  scoreColor: String;
  chart: any;
  dashboard: Dashboard;
  score: any;
  scoreTextColor: String;

  constructor(private streamService: StreamSocket, private _client: HttpClient,
    private service: Adal4Service, private http: Adal4HTTPService) {
    this.streamService.messages.subscribe((data: any) => {
      if (data) {
        if (!data.Msg) {
          this.handleNewData(data);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  public logout() {
    this.service.logOut();
  }

  getTextColor(hex) {
    hex = hex.replace('#', '');
    let r, g, b;
    r = hex.substring(0, 2);
    g = hex.substring(2, 4);
    b = hex.substring(4, 6);
    const a = 1 - ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;
    if (a < 0.5) {
      return '#000';
    }
    return '#fff';
  }

  handleNewData(data: Dashboard) {
    this.dashboard = data;
    const colors = [
      '#FF0000',
      '#FF3500',
      '#FF6B00',
      '#FFA100',
      '#FFD600',
      '#F1FF00',
      '#BBFF00',
      '#86FF00',
      '#00FF1A'
    ];
    const val = Math.trunc((this.dashboard.TotalScore / 100) * 8);
    this.scoreColor = colors[val];
    this.scoreTextColor = this.getTextColor(this.scoreColor);
    this.rateGuage.redraw(data.Bracket.Rate);
    this.pressureGuage.redraw(data.Bracket.Pressure);
    this.spiderChart.redraw(data.Instant, data.Design);
  }

  OnDestroy() {
    this.streamService.messages.unsubscribe();
  }
}


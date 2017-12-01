import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { StreamSocket } from './ngWebSocket/stream-socket.service';
import { Dashboard } from './models/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { observeOn } from 'rxjs/operator/observeOn';
import { Subscribable } from 'rxjs/Observable';
import { SpiderChartComponent } from './spider-chart/spider-chart.component';
import { GaugeComponent } from './gauge/gauge.component';
import { RateGaugeComponent } from './rate-gauge/rate-gauge.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(GaugeComponent)
  pressureGuage: GaugeComponent;

  @ViewChild(RateGaugeComponent)
  rateGuage: RateGaugeComponent;

  @ViewChild(SpiderChartComponent)
  spiderChart: SpiderChartComponent;

  subscription: Subscription;
  dashboard: Observable<Dashboard>;
  title = 'app';
  options: Object;
  scoreColor: String;
  chart: any;
  data: Dashboard;
  score: any;

  constructor(private streamService: StreamSocket, private _client: HttpClient) {
  }

  ngOnInit() {
    const observer = this._client.get<Dashboard>('../assets/test.json');
    this.dashboard = observer;
    this.subscription = observer.subscribe( (data: Dashboard) => {
      this.handleNewData(data);
    });
    this.streamService.messages.subscribe(data => {
      if (this.data) {
        console.log(data);
        this.handleNewData(this.data);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleNewData(data) {
    this.data = data;
    const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#0088ff', '#0000ff'];
    this.score = this.data.TotalScore;
    const val = Math.trunc((this.score / 100) * 6);
    this.scoreColor = colors[val - 1];
    this.rateGuage.redraw(data.Bracket.Rate);
    this.pressureGuage.redraw(data.Bracket.Pressure);
    this.spiderChart.redraw(data.Instant, data.Design);
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  OnDestroy() {
    this.streamService.messages.unsubscribe();
  }

  addData() {
    this.handleNewData(this.data);
  }
}

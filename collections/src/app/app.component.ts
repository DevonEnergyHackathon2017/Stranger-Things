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
import { Adal4Service } from 'adal-angular4';

const config: any = {
    tenant: '3b51b87c-ae84-4292-9dab-9bfc40c88c9c',
    clientId: '0960932c-f87b-4a42-8c4a-5365d0235f38',
    popUp: true
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  dashboard: any;
  authenticated: boolean;

  constructor(private service: Adal4Service) {
    this.service.init(config);
    this.authenticated = this.service.userInfo.authenticated;
  }

  ngOnDestroy() {

  }

  ngOnInit() {

  }
  // @ViewChild(GaugeComponent)
  // pressureGuage: GaugeComponent;

  // @ViewChild(RateGaugeComponent)
  // rateGuage: RateGaugeComponent;

  // @ViewChild(SpiderChartComponent)
  // spiderChart: SpiderChartComponent;

  // title = 'app';
  // options: Object;
  // scoreColor: String;
  // chart: any;
  // dashboard: Dashboard;
  // score: any;
  // scoreTextColor: String;

  // constructor(private streamService: StreamSocket, private _client: HttpClient) {
  //   this.streamService.messages.subscribe((data: any) => {
  //     if (data) {
  //       console.log(data);
  //       if (!data.Msg) {
  //         this.handleNewData(data);
  //       }
  //     }
  //   });
  // }

  // ngOnInit() {
  // }

  // ngOnDestroy() {

  // }

  // getTextColor(hex) {
  //   hex = hex.replace('#', '');
  //   let r, g, b;
  //   r = hex.substring(0, 2);
  //   g = hex.substring(2, 4);
  //   b = hex.substring(4, 6);
  //   const a = 1 - ( (0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;
  //   if (a < 0.5) {
  //     return '#000';
  //   }
  //   return '#fff';
  // }

  // handleNewData(data: Dashboard) {
  //   this.dashboard = data;
  //   const colors = [
  //     '#FF0000',
  //     '#FF3500',
  //     '#FF6B00',
  //     '#FFA100',
  //     '#FFD600',
  //     '#F1FF00',
  //     '#BBFF00',
  //     '#86FF00',
  //     '#00FF1A'
  //   ];
  //   const val = Math.trunc((this.dashboard.TotalScore / 100) * 8);
  //   this.scoreColor = colors[val];
  //   this.scoreTextColor = this.getTextColor(this.scoreColor);
  //   this.rateGuage.redraw(data.Bracket.Rate);
  //   this.pressureGuage.redraw(data.Bracket.Pressure);
  //   this.spiderChart.redraw(data.Instant, data.Design);
  // }

  // OnDestroy() {
  //   this.streamService.messages.unsubscribe();
  // }
}

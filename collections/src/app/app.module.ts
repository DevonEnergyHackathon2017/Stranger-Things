import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { StreamSocket } from './ngWebSocket/stream-socket.service';
import { NgSocketsService } from './ngWebSocket/ng-web-socket.service';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { SpiderChartComponent } from './spider-chart/spider-chart.component';
import { GaugeComponent } from './gauge/gauge.component';
import { RateGaugeComponent } from './rate-gauge/rate-gauge.component';

declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  const hcm = require('highcharts/highcharts-more');
  const exp = require('highcharts/modules/exporting');
  const sg = require('highcharts/modules/solid-gauge');

  hcm(hc);
  exp(hc);
  sg(hc);
  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    GaugeComponent,
    RateGaugeComponent,
    SpiderChartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ChartModule,
    HttpClientModule
  ],
  providers: [
    StreamSocket,
    NgSocketsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
